use serde::Serialize;
use std::{fs, path::Path, process::Command, time::{SystemTime, UNIX_EPOCH}};
use tauri::Manager;

#[derive(Serialize)]
struct DesktopStatus { platform: &'static str, version: &'static str }
#[derive(Serialize)]
struct PathValidation { valid: bool, message: String }
#[derive(Serialize)]
struct ApplyResult { success: bool, message: String, backup_path: Option<String> }

#[tauri::command]
fn desktop_status() -> DesktopStatus { DesktopStatus { platform: "windows-desktop", version: env!("CARGO_PKG_VERSION") } }

fn validate_executable(path: String, expected_name: Option<&str>, label: &str) -> PathValidation {
    let executable = Path::new(&path);
    if !executable.is_file() { return PathValidation { valid: false, message: "O arquivo selecionado não existe.".to_owned() }; }
    if executable.extension().and_then(|v| v.to_str()).map(|v| v.eq_ignore_ascii_case("exe")) != Some(true) { return PathValidation { valid: false, message: "Selecione um arquivo .exe.".to_owned() }; }
    if let Some(name) = expected_name {
        if !executable.file_name().and_then(|v| v.to_str()).map(|v| v.eq_ignore_ascii_case(name)).unwrap_or(false) { return PathValidation { valid: false, message: format!("Selecione o arquivo {}.", name) }; }
    }
    PathValidation { valid: true, message: format!("{} validado com sucesso.", label) }
}

fn enshrouded_running() -> bool {
    #[cfg(target_os = "windows")]
    { Command::new("tasklist").args(["/FI", "IMAGENAME eq enshrouded.exe", "/NH"]).output().map(|o| String::from_utf8_lossy(&o.stdout).to_ascii_lowercase().contains("enshrouded.exe")).unwrap_or(false) }
    #[cfg(not(target_os = "windows"))]
    { false }
}

#[tauri::command]
fn validate_game_executable(path: String) -> PathValidation { validate_executable(path, Some("enshrouded.exe"), "Enshrouded") }
#[tauri::command]
fn validate_patcher_executable(path: String) -> PathValidation { validate_executable(path, None, "Patcher externo") }
#[tauri::command]
fn is_enshrouded_running() -> bool { enshrouded_running() }

#[tauri::command]
fn apply_patcher(patcher_path: String, config_path: String, config_content: String) -> ApplyResult {
    if enshrouded_running() { return ApplyResult { success: false, message: "Feche o Enshrouded antes de aplicar o patch.".to_owned(), backup_path: None }; }
    if !validate_patcher_executable(patcher_path.clone()).valid { return ApplyResult { success: false, message: "Patcher externo inválido.".to_owned(), backup_path: None }; }
    let config = Path::new(&config_path);
    if !config.is_file() || config.extension().and_then(|v| v.to_str()).map(|v| v.eq_ignore_ascii_case("json")) != Some(true) { return ApplyResult { success: false, message: "Selecione um config.json existente e válido.".to_owned(), backup_path: None }; }
    if serde_json::from_str::<serde_json::Value>(&config_content).is_err() { return ApplyResult { success: false, message: "O config.json gerado não é válido.".to_owned(), backup_path: None }; }
    let stamp = SystemTime::now().duration_since(UNIX_EPOCH).map(|v| v.as_secs()).unwrap_or(0);
    let backup = config.with_file_name(format!("config.backup-{}.json", stamp));
    if let Err(error) = fs::copy(config, &backup) { return ApplyResult { success: false, message: format!("Não foi possível criar backup: {}", error), backup_path: None }; }
    if let Err(error) = fs::write(config, config_content) { return ApplyResult { success: false, message: format!("Backup criado, mas não foi possível salvar o config.json: {}", error), backup_path: Some(backup.display().to_string()) }; }
    let working_directory = Path::new(&patcher_path).parent().unwrap_or(Path::new("."));
    match Command::new(&patcher_path).current_dir(working_directory).spawn() {
        Ok(_) => ApplyResult { success: true, message: "Backup criado, config.json salvo e patcher iniciado.".to_owned(), backup_path: Some(backup.display().to_string()) },
        Err(error) => ApplyResult { success: false, message: format!("Configuração salva, mas o patcher não iniciou: {}", error), backup_path: Some(backup.display().to_string()) },
    }
}

pub fn run() {
    tauri::Builder::default().plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![desktop_status, validate_game_executable, validate_patcher_executable, is_enshrouded_running, apply_patcher])
        .setup(|app| { if let Some(window) = app.get_webview_window("main") { let _ = window.show(); } Ok(()) })
        .run(tauri::generate_context!()).expect("erro ao iniciar EmberForge");
}

use serde::Serialize;
use std::{path::Path, process::Command};
use tauri::Manager;

#[derive(Serialize)]
struct DesktopStatus { platform: &'static str, version: &'static str }

#[derive(Serialize)]
struct PathValidation { valid: bool, message: String }

#[tauri::command]
fn desktop_status() -> DesktopStatus {
    DesktopStatus { platform: "windows-desktop", version: env!("CARGO_PKG_VERSION") }
}

fn validate_executable(path: String, expected_name: Option<&str>, label: &str) -> PathValidation {
    let executable = Path::new(&path);
    if !executable.is_file() {
        return PathValidation { valid: false, message: "O arquivo selecionado não existe.".to_owned() };
    }
    if executable.extension().and_then(|value| value.to_str()).map(|value| value.eq_ignore_ascii_case("exe")) != Some(true) {
        return PathValidation { valid: false, message: "Selecione um arquivo .exe.".to_owned() };
    }
    if let Some(name) = expected_name {
        let correct_name = executable.file_name().and_then(|value| value.to_str()).map(|value| value.eq_ignore_ascii_case(name)).unwrap_or(false);
        if !correct_name {
            return PathValidation { valid: false, message: format!("Selecione o arquivo {}.", name) };
        }
    }
    PathValidation { valid: true, message: format!("{} validado com sucesso.", label) }
}

#[tauri::command]
fn validate_game_executable(path: String) -> PathValidation {
    validate_executable(path, Some("enshrouded.exe"), "Enshrouded")
}

#[tauri::command]
fn validate_patcher_executable(path: String) -> PathValidation {
    validate_executable(path, None, "Patcher externo")
}

#[tauri::command]
fn is_enshrouded_running() -> bool {
    #[cfg(target_os = "windows")]
    {
        Command::new("tasklist")
            .args(["/FI", "IMAGENAME eq enshrouded.exe", "/NH"])
            .output()
            .map(|output| String::from_utf8_lossy(&output.stdout).to_ascii_lowercase().contains("enshrouded.exe"))
            .unwrap_or(false)
    }
    #[cfg(not(target_os = "windows"))]
    { false }
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            desktop_status,
            validate_game_executable,
            validate_patcher_executable,
            is_enshrouded_running
        ])
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") { let _ = window.show(); }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("erro ao iniciar EmberForge");
}

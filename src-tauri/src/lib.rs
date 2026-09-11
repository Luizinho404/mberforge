use serde::Serialize;
use std::path::Path;
use tauri::Manager;

#[derive(Serialize)]
struct DesktopStatus {
    platform: &'static str,
    version: &'static str,
}

#[derive(Serialize)]
struct GamePathValidation {
    valid: bool,
    message: String,
}

#[tauri::command]
fn desktop_status() -> DesktopStatus {
    DesktopStatus {
        platform: "windows-desktop",
        version: env!("CARGO_PKG_VERSION"),
    }
}

#[tauri::command]
fn validate_game_executable(path: String) -> GamePathValidation {
    let executable = Path::new(&path);
    let correct_name = executable
        .file_name()
        .and_then(|name| name.to_str())
        .map(|name| name.eq_ignore_ascii_case("enshrouded.exe"))
        .unwrap_or(false);

    if !correct_name {
        return GamePathValidation {
            valid: false,
            message: "Selecione o arquivo enshrouded.exe.".to_owned(),
        };
    }

    if !executable.is_file() {
        return GamePathValidation {
            valid: false,
            message: "O arquivo selecionado não existe.".to_owned(),
        };
    }

    GamePathValidation {
        valid: true,
        message: "Enshrouded detectado com sucesso.".to_owned(),
    }
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![desktop_status, validate_game_executable])
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("erro ao iniciar EmberForge");
}

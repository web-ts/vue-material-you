export type DarkModeState = "auto" | "light" | "dark";
export type DarkModeSystemState = "light" | "dark";

export interface DarkModeSettings {
  userMode: DarkModeState;
  systemMode: DarkModeSystemState;
}

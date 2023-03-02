export type DarkModeState = "auto" | "light" | "dark";
export type DarkModeSystemState = "light" | "dark";

export interface DarkModeOptions {
  userMode: DarkModeState;
  systemMode: DarkModeSystemState;
}

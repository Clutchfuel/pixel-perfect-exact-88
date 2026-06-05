/** Set by the athlete app on login: localStorage.setItem("cf-athlete-authenticated", "1") */
export const ATHLETE_SESSION_KEY = "cf-athlete-authenticated";

export function isAthleteSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ATHLETE_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Dev / QA: ?athlete_session=1 on the marketing site simulates a returning athlete. */
export function applyAthleteSessionQueryFlag(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("athlete_session") === "1") {
    try {
      localStorage.setItem(ATHLETE_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }
  if (params.get("athlete_session") === "0") {
    try {
      localStorage.removeItem(ATHLETE_SESSION_KEY);
    } catch {
      /* ignore */
    }
  }
}

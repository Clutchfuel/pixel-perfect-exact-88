import { useEffect, useState } from "react";
import {
  applyAthleteSessionQueryFlag,
  isAthleteSessionActive,
} from "@/lib/athlete-session";

export function useAthleteSession() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    applyAthleteSessionQueryFlag();
    setLoggedIn(isAthleteSessionActive());

    function onStorage(e: StorageEvent) {
      if (e.key === "cf-athlete-authenticated") {
        setLoggedIn(isAthleteSessionActive());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return loggedIn;
}

import { useEffect } from "react";

export default function useKeypress(key, callback) {
  useEffect(() => {
    const onKeyup = (event) => {
      if (event.key === key) callback();
    };
    window.addEventListener("keyup", onKeyup);

    return () => window.removeEventListener("keyup", onKeyup);
  }, []);
}

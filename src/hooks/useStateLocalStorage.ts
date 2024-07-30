import { useState } from "react";

export function useStateLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue !== null ? savedValue : initialValue;
  });

  function setLocalStorageValue(newValue: string) {
    localStorage.setItem(key, newValue);
  }

  return [value, setValue, setLocalStorageValue] as const;
}

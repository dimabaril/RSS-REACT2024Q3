import Cookies from "js-cookie";
import { useState } from "react";

export function useStateStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const savedValue = Cookies.get(key);
    return savedValue !== undefined ? savedValue : initialValue;
  });
  function setStorageValue(newValue: string) {
    setValue(newValue);
    Cookies.set(key, newValue);
  }
  return [value, setValue, setStorageValue] as const;
}

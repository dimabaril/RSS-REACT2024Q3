// import { useState } from "react";
// export function useStateLocalStorage(key: string, initialValue: string) {
//   const [value, setValue] = useState(() => {
//     const savedValue = localStorage.getItem(key);
//     return savedValue !== null ? savedValue : initialValue;
//   });
//   function setLocalStorageValue(newValue: string) {
//     localStorage.setItem(key, newValue);
//   }
//   return [value, setValue, setLocalStorageValue] as const;
// }
// import { useState } from "react";
// export function useStateLocalStorage(key: string, initialValue: string) {
//   const [value, setValue] = useState(() => {
//     if (typeof window !== "undefined") {
//       const savedValue = localStorage.getItem(key);
//       return savedValue !== null ? savedValue : initialValue;
//     }
//     return initialValue;
//   });
//   function setLocalStorageValue(newValue: string) {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(key, newValue);
//     }
//     setValue(newValue);
//   }
//   return [value, setValue, setLocalStorageValue] as const;
// }
import Cookies from "js-cookie";
import { useState } from "react";

export function useStateLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const savedValue = Cookies.get(key);
    return savedValue !== undefined ? savedValue : initialValue;
  });
  function setLocalStorageValue(newValue: string) {
    setValue(newValue);
    Cookies.set(key, newValue);
  }
  return [value, setValue, setLocalStorageValue] as const;
}

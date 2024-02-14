import { useEffect, useState } from "react";

export function useLocalStorage(key: string, value: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue != null ? JSON.parse(savedValue) : value;
    } catch {
      return value;
    }
  });

  /* function setLocalStorage(item: any) {
    try {
      setStoredValue(item);
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log(error);
    }
  } */

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
}

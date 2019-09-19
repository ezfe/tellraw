import { useState } from "react";
import { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { loadV5State } from "./loaders";

export function useLSSnippets(key: string, initialValue: Array<Snippet>): [Array<Snippet>, (value: Array<Snippet>) => void] {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue, (lsValue: string) => {
    const parsed = JSON.parse(lsValue || "[]") as Array<object>
    return loadV5State(parsed)
  })

  const setValue = (value: Array<Snippet>) => {
    setStoredValue(value)
  }

  return [storedValue, setValue]
}

// https://usehooks.com/useLocalStorage/
export function useLocalStorage<A>(
    key: string,
    initialValue: A,
    localStorageLoader?: (string) => A
  ): [A, (value: A) => void] {
    
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)

      if (localStorageLoader) {
        return item ? localStorageLoader(item) : initialValue
      } else {
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: A) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
import { useState, useEffect } from 'react';

// A generic hook to manage state in localStorage
export function useLocalChatConfig<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Function to get the initial state from localStorage or use the provided initial value
  const readValue = (): T => {
    // Prevent build errors "window is not defined" during server-side rendering
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none, return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // This function will be returned by the hook to update the state
  const setValue = (value: T) => {
    // Prevent build errors
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Update the component's state
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };
  
  // This effect ensures that the state is updated if the localStorage value
  // changes from another tab or window.
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}

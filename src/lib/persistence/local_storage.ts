export function getItem<A>(
  key: string,
  initialValue: A,
  localStorageLoader?: (string) => A): A {

  // Get from local storage by key
  const item = window.localStorage.getItem(key)

  if (item === "null") {
    console.error(`Reset localStorage.${key} since it contains "null"`)
    window.localStorage.removeItem(key)
    return initialValue
  }

  if (localStorageLoader) {
    return item ? localStorageLoader(item) : initialValue
  } else {
    return item ? JSON.parse(item) : initialValue
  }
}
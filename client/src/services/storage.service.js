export default function StorageService() {
  return {
    get: (key) => {
      return localStorage.getItem(key);
    },
    set: (key, val) => {
      if (val !== undefined) {
        localStorage.setItem(key, val);
      }
    },
  };
}

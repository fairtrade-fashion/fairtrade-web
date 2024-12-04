export const storeToken = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
export const fetchToken = (key: string) => {
  return localStorage.getItem(key);
};

export const removeToken = (key: string) => {
  localStorage.removeItem(key);
};

localStorage.setItem("isAuthenticated", "true");

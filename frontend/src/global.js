export function setLoginToken() {
  return localStorage.setItem('loggedIn', true);
}

export function removeLoginToken() {
  return localStorage.removeItem('loggedIn');
}

export function getLoginToken() {
  return localStorage.getItem('loggedIn');
}

import { jwtDecode } from 'jwt-decode';

function getLoggedUser() {
  try {
    const data = localStorage.getItem('userData');
    const { user, token } = JSON.parse(data);
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    const timeNow = Math.floor(Date.now() / 1000);
    const isValid = timeNow < exp;
    if (!isValid) {
      localStorage.removeItem('userData');
      return false;
    }
    return { ...user, token };
  } catch (error) {
    localStorage.removeItem('userData');
    return false;
  }
}

export default getLoggedUser;

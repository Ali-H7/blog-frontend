import { jwtDecode } from 'jwt-decode';

function checkLoginStatus() {
  try {
    const user = localStorage.getItem('userData');
    const { token } = JSON.parse(user);
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    const timeNow = Math.floor(Date.now() / 1000);
    return timeNow < exp;
  } catch (error) {
    localStorage.removeItem('userData');
    return false;
  }
}

export default checkLoginStatus;

export const checkUserLoggedIn = () => {
  const user = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);
  return !!user; // Trả về true nếu user tồn tại, ngược lại trả về false
};

export const routes = {
  home: '/',
  menu: '/menu',
  table: '/table',
  addItem: '/add-item',
  login: '/login',
  register: '/register'
};
export const authGuard = (to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  };
export const authHeader=()=> {
    let  userData: string | null= localStorage.getItem('user');

    if (userData !== null) {
        const user = JSON.parse(userData);
        if (user && user.token) {
            return { 'x-token': user.token }; 
          } else {
            return {};
          }
    }  
  }
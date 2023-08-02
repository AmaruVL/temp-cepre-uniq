import { UserManager } from 'oidc-client-ts';

const userManagerParams = {
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_CLIENTID,
  response_type: 'code',
  redirect_uri: `${process.env.REACT_APP_REDIRECT}`,
  post_logout_redirect_uri: `${process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI}`,
};

export const authServiceGoogle = {
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/preinscripcion');
  },
};

const authService = {
  logout() {
    console.log('entre');
    // window.location.replace('/preinscripcion');
    const userManager = new UserManager(userManagerParams);
    const onUserUnloaded = (user) => {
      localStorage.clear();
      sessionStorage.clear();
    };
    userManager.events.addUserUnloaded(onUserUnloaded);
    userManager.getUser().then((user) => {
      if (user) {
        userManager.signoutRedirect();
      }
    });
    // console.log('entre');
  },
};

export default authService;

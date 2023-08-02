import React, { useState } from 'react';
import { UserManager } from 'oidc-client';
import { useHistory } from 'react-router';

export const GytContext = React.createContext(null);

export const GytContextProvider = ({ children }) => {
  const history = useHistory();
  const [value, setValue] = useState();
  const userManager = new UserManager({
    authority: process.env.REACT_APP_AUTHORITY,
    client_id: process.env.REACT_APP_CLIENTID,
    response_type: 'code',
    redirect_uri: process.env.REACT_APP_REDIRECT,
  });
  const onUserLoaded = async (user) => {
    // console.log(value);
    if (!user) {
      setValue(user);
    } else if (!value) {
      localStorage.setItem('userdata', JSON.stringify(user));
      // await axios
      //   .post(
      //     `${RutaGeneral}/verificar_token_uniq/`,
      //     {},
      //     {
      //       headers: {
      //         Authorization: `bearer ${user.access_token}`,
      //       },
      //     }
      //   )
      //   .then(async (resp) => {
      //     localStorage.setItem('usuario', JSON.stringify(resp.data.user));
      //     // history.push('/mantenimiento/padrondocumentos');
      //   })
      //   .catch((err) => {});
    }
  };

  const onUserUnloaded = (user) => {
    // console.log(user);
    setValue(null);
  };
  userManager.events.addUserLoaded(onUserLoaded);
  userManager.events.addUserUnloaded(onUserUnloaded);

  /*
    if(window.location.href.includes('code')) {
        userManager.signinRedirectCallback();
    }
    */

  /*
   */

  userManager.getUser().then((user) => {
    if (
      !window.location.href.includes('/docente') &&
      !window.location.href.includes('/examenes') &&
      !window.location.href.includes('/estudiante') &&
      !window.location.href.includes('/preinscripcion') &&
      !window.location.href.includes('/inscripcion') &&
      !window.location.href.includes('/prinscripcion')
    ) {
      if (user) {
        if (!value) setValue(user);
        onUserLoaded(user);
      } else if (!window.location.href.includes('code')) {
        userManager.signinRedirect();
      } else {
        userManager.signinRedirectCallback();
      }
    }
  });

  return <GytContext.Provider value={value}>{children}</GytContext.Provider>;
};

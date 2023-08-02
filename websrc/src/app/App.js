import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import { selectCurrLangDir } from 'app/store/i18nSlice';
import { AuthProvider } from 'react-oidc-context';
import withAppProviders from './withAppProviders';
import authConstants from './auth/auth-constants';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    prepend: true,
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    prepend: true,
  },
};

const App = () => {
  const langDirection = useSelector(selectCurrLangDir);

  return (
    <Router history={history}>
      <AuthProvider {...authConstants}>
        <FuseAuthorization>
          <FuseTheme>
            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              classes={{
                containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
              }}
            >
              <FuseLayout />
            </SnackbarProvider>
          </FuseTheme>
        </FuseAuthorization>
      </AuthProvider>
    </Router>
  );
};

export default withAppProviders(App)();

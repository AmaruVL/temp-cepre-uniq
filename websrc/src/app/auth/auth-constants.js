const authConstants = {
  authority: process.env.REACT_APP_AUTHORITY,
  client_id: process.env.REACT_APP_CLIENTID,
  redirect_uri: process.env.REACT_APP_REDIRECT,
  post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
  response_type: 'code',
};

export const METADATA_OIDC = {};

export default authConstants;

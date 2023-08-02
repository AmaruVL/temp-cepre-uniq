const usuario = sessionStorage.getItem('dataUsuario');
const dataUsuario = JSON.parse(usuario);
export const idUsuario = usuario !== null ? dataUsuario.id : '';
const RutaGeneral = `${process.env.REACT_APP_ENDPOINT}`;
// const RutaGeneral = `https://apidemocepre.uniq.edu.pe`;
export default RutaGeneral;

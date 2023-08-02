import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { motion } from 'framer-motion';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import OrdersStatus from 'app/shared-components/OrdersStatus';
import ModalPagarCuota from './modalPagarCuota';
import EditorPreinscripcion from './editor-preinscripcion';


function TesoreriaContent(props) {
  const { idCiclo } = props;
  const [page, setPage] = React.useState(0);
  const [dataDocumentos, setDataDocumentos] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datosCompromisosPago, setDatosCompromisosPago] = React.useState([]);
  const [estadoData, setEstadoData] = React.useState(false);
  const { term } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [itemActivo, setItemActivo] = React.useState(-1);
  const [menuEl, setMenuEl] = React.useState(null);
  const [editorAbierto, setEditorAbierto] = React.useState(false);
  const [dni, setDni] = React.useState('');


  React.useEffect(() => {
    axios
      .get(`${RutaGeneral}/consultas/ver-preinscripciones/${idCiclo}`)
      .then((res) => {
        setDatosCompromisosPago(res.data);
        setEstadoData(true);
      })
      .catch();
  }, [estadoData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const seleccionarItem = (e, id) => {
    console.log(id);
    const item_preinscripcion = datosCompromisosPago.find(x => x.id == id);
    if(! item_preinscripcion) {
        setItemActivo(null);
        window.alert('No se encuentra la preinscripcion');
        return;
    }

    setItemActivo(id);
    setMenuVisible(true);
    setMenuEl(e.currentTarget);
    setDni(item_preinscripcion.dni_persona.dni);
  };

  const anularPreinscripcion = () => {
    setMenuVisible(false);
    if(!itemActivo) {
        window.alert('Item no seleccionado');
        return;
    }

    const item_preinscripcion = datosCompromisosPago.find(x => x.id == itemActivo);
    if(!item_preinscripcion) {
        window.alert('Item no encontrado');
        return;
    }      

    if(!window.confirm('Desea anular la preinscripción de ' + 
        `${item_preinscripcion.dni_persona.nombres } `+
        `${item_preinscripcion.dni_persona.apellido_paterno}`+
        '?'
    )) return;
    axios.delete(`${RutaGeneral}/eliminar-reg-incompleto/${itemActivo}`)
      .then(data => {
        console.log(data);
        if(data.data.message && data.data.message != 'eliminado correctamente')
          return window.alert(data.data.message);
        setItemActivo(null);
        setEstadoData(false);
      })
      .catch();

  }

  const editarPreinscripcion = () => {
    setMenuVisible(false);
    setEditorAbierto(true);
  };

  function searchingTerm(x) {
        const value = props.term;
      const nombres = `${x.dni_persona.nombres} ${x.dni_persona.apellido_paterno} ${x.dni_persona.apellido_materno}`;
      return (
        nombres.toLowerCase().includes(value) ||
        x.dni_persona.dni.includes(value) ||
        !value
      );
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="w-full flex flex-col">
      <EditorPreinscripcion open={editorAbierto}
        ciclo={idCiclo} dni={dni}
        onClose={e => {
            setEditorAbierto(false);
            setEstadoData(false);
            }
        }
        />
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell align="center">NOMBRES</TableCell>
              <TableCell align="center">DNI</TableCell>
              <TableCell align="center">CICLO</TableCell>
              <TableCell align="center">ESCUELA PROFESIONAL</TableCell>
              <TableCell align="center">CUOTAS PAGADAS</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {datosCompromisosPago &&
              datosCompromisosPago
                .filter(searchingTerm)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover tabIndex={-1}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      {`${row.dni_persona.nombres} ${row.dni_persona.apellido_paterno} ${row.dni_persona.apellido_materno}`}
                    </TableCell>
                    <TableCell align="center">
                      {row.dni_persona.dni}
                    </TableCell>
                    <TableCell align="center">
                      {row.id_ciclo.denominacion}
                    </TableCell>
                    <TableCell align="center">
                      {row.id_escuela_profesional === null
                        ? ' '
                        : row.id_escuela_profesional
                            .nombre_escuela_profesional}
                    </TableCell>
                    <TableCell align="center">
                    </TableCell>
                    <TableCell>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
                      
                        {/*
                        <ModalPagarCuota data={row} />
                        */}
                      </motion.div>
                        <IconButton onClick={e =>seleccionarItem(e, row.id) }>
                            <MoreHorizIcon/>
                        </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Menu open={menuVisible} anchorEl={menuEl} onClose={e => setMenuVisible(false)}>
            <MenuItem onClick={editarPreinscripcion}>Editar preinscripción</MenuItem>
            <MenuItem onClick={anularPreinscripcion}>Anular preinscripción</MenuItem>
        </Menu>
      </FuseScrollbars>
      <TablePagination
        className="flex-shrink-0 border-t-1"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={datosCompromisosPago.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TesoreriaContent;

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center">
            <b>PAGO FISICO</b>
          </h1>
          <Typography id="modal-modal-description1" sx={{ mt: 2 }}>
            Lugar de Pago: <b>CAJA CENTRAL DE LA UNIQ.</b>
          </Typography>
          <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
            Direccion: <b>Jr. Kumpirushiato, Quillabamba..</b>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

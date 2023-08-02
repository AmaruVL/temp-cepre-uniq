import { IconButton, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PopperDescripcion = (props) => {
  const { descripcion } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickPopper = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Tooltip title="Ver descripción actual">
        <IconButton
          onClick={handleClickPopper('bottom-end')}
          color="secondary"
          aria-label="add to shopping cart"
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="px-48">
            <Typography
              className="text-14 my-24 leading-normal"
              variant="body2"
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default PopperDescripcion;

import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';

const useMessages = () => {
  const dispatch = useDispatch();

  const showError = (message) => {
    dispatch(
      showMessage({
        message,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'error',
      }),
    );
  };

  const showSuccess = (message) => {
    dispatch(
      showMessage({
        message,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        variant: 'success',
      }),
    );
  };

  return {
    showError,
    showSuccess,
  };
};

export default useMessages;

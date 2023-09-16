import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { X } from 'react-feather';

const Modal = (props) => {
  //
  const {
    open,
    handleClose,
    title,
    content,
    handleSuccess,
    closeLabel,
    successLabel,
    color,
    variant,
  } = props;
  //
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
        <IconButton
          size="small"
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <X />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent id="alert-dialog-description">{content}</DialogContent>
      <DialogActions sx={{ justifyContent: 'space-around', pb: 5 }}>
        <Button sx={{ px: 10 }} onClick={handleClose} variant="outlined" color="primary">
          {closeLabel}
        </Button>
        <Button sx={{ px: 10 }} onClick={handleSuccess} color={color} variant={variant} autoFocus>
          {successLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
//
export default Modal;

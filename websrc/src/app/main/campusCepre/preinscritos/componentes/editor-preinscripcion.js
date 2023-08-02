import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useState, useEffect, useContext} from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import FormulariosEdicion from '../../../preinscripcion/formulariosEdicion';

const EditorPreinscripcion = props => {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="md" height="600">
      <DialogTitle>Editor de preinscripción</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormulariosEdicion dni={props.dni} ciclo={props.ciclo}/>
            </Grid>
          </Grid>
        </DialogContent>
    </Dialog>
  )
};

export default EditorPreinscripcion;


import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, CircularProgress, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uidb64 = searchParams.get('uidb64');
    const token = searchParams.get('token');

    if (uidb64 && token) {
      axios.post(`/verify-account/`, { uidb64, token })
        .then(() => {
          toast.success('Cuenta verificada exitosamente.');
          setLoading(false);
        })
        .catch(() => {
          toast.error('Error al verificar la cuenta. Inténtalo de nuevo.');
          setLoading(false);
        });
    } else {
      toast.error('Parámetros inválidos.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h5">Tu cuenta ha sido verificada. Ahora puedes iniciar sesión.</Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Ir al inicio de sesión
        </Button>
      </Grid>
    </Grid>
  );
};

export default VerifyAccount;
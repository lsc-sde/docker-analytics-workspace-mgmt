import './App.css';

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { enGB } from 'dayjs/locale/en-gb.js'
import AppRoutes from './AppRoutes.js'

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={enGB}>
        <AppRoutes />
    </LocalizationProvider>
  );
};

export default App;

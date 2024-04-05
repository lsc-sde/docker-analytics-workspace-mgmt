import './App.css';

import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { enGB } from 'dayjs/locale/en-gb.js'
import WorkspaceList from './WorkspaceList.js';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/workspace');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={enGB}>
      <h1>Analytics Workspaces</h1>
      <WorkspaceList data={data} />
    </LocalizationProvider>
  );
};

export default App;

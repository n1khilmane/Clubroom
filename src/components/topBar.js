import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ClubRoomHeader from './clubRoomHeader';

export default function ButtonAppBar({ RightButton = (<></>) }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} color='transparent' position="sticky">
        <Toolbar>
          <ClubRoomHeader></ClubRoomHeader>
          <RightButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

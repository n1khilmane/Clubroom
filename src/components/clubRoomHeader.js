import React from 'react'

import { Grid, Box } from '@mui/material';
import ClubroomLogo from './clubRoomLogo';
import { spacing } from '@mui/system';
import { fontSize } from 'styled-system';

const ClubRoomHeader = (user) => {
    return (
    <Grid container>
        <Grid item md={3}></Grid>
        <Grid item md={6}>
            <Grid container sx={{ paddingTop: 3}} >
                <Grid item md={4} style={{textAlign: "right"}}>
                <ClubroomLogo></ClubroomLogo>
                </Grid>
                <Grid item md={8} style={{textAlign: "left"}}>
                <Box sx={{fontFamily:"Montserrat", fontSize:"2.5rem"}}>Clubroom</Box>
                </Grid>
            </Grid>
        </Grid>
        <Grid item md={3}>
            
        </Grid>
    </Grid>
    )
}

export default ClubRoomHeader;
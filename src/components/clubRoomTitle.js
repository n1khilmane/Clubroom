import React from 'react'

import { Grid,Box } from '@mui/material';

const ClubRoomTitle = (user) => {
    return (
    <Grid container>
            <Grid item md={12} style={{textAlign:"center"}}>
                <Box sx={{fontFamily:"Montserrat", fontSize:"6rem"}}>Clubroom</Box>
            </Grid>
    </Grid>
    )
}

export default ClubRoomTitle;
import React from 'react';
import { Button, Container } from '@mui/material';
import ClubRoomHeader from '../components/clubRoomHeader';
const Login = () =>{
    
    return(
    <Container>
    <ClubRoomHeader></ClubRoomHeader>
    <Button variant="contained" color="secondary">login</Button>
    <Button variant="contained">register</Button>
    </Container>
    )
}

export default Login;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { Auth } from "aws-amplify";
import SignOut from '../../components/signout';
import Api from '../../utils/api';
import TopBar from '../../components/topBar';
import RoomCard from '../../components/roomCard';

const { listRooms } = Api;

const Rooms = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const getUserName = async () => {
    try {
      const user = await Auth.currentUserInfo()
      console.log(user)
      const curUserName = user?.attributes?.name || user?.username || '';
      const curUserID = user?.attributes?.userId;
      setUserName(curUserName);
      setUserId(curUserID);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserName()
    listRooms().then((data) => data.filter(({ removed }) => !removed)).then((data) => setRooms((prev) => data));
  }, [])

  const getRoomCards = () => {
    return rooms.map((curRoom) => {
      console.log(curRoom)
      return <RoomCard curRoom={curRoom} />
    })
  }

  return (
    <>
      <TopBar RightButton={SignOut} />
      <Grid container marginX={0} marginY={0} spacing={6} columns={9}>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Button variant='contained' onClick={() => {navigate('/rooms/create')}}>Create new Room</Button>
        </Grid>
        {rooms.length ? <>{getRoomCards()}</> : <div>No Rooms</div>}
      </Grid>
    </>
  )
}

export default Rooms;

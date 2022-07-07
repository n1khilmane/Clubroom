import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { MeetingProvider, lightTheme } from 'amazon-chime-sdk-component-library-react';
import { Auth } from "aws-amplify";
import SignOut from './signout';
import MeetingForm from './meetingForm';
import Meeting from './meeting';
import { ThemeProvider } from 'styled-components';
import TopBar from './topBar';

const CreateRoom = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [showMeeting, setShowMeeting] = useState(false);

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
  }, [showMeeting])

  if(showMeeting) {
    return (
      <>
      <TopBar RightButton={SignOut}/>
        <Container maxWidth="sm">
          <ThemeProvider theme={lightTheme}>
            <MeetingProvider>
              <Meeting updateMeetingStatus={setShowMeeting}/> 
            </MeetingProvider>
          </ThemeProvider>
        </Container>
      </>
    )
  }


  return (
    <>
    <TopBar RightButton={SignOut}/>
      <Container maxWidth="sm">
        <ThemeProvider theme={lightTheme}>
          <MeetingProvider>
            <Meeting updateMeetingStatus={setShowMeeting}/> 
            <MeetingForm/>
          </MeetingProvider>
        </ThemeProvider>
      </Container>
    </>
  )
}

export default CreateRoom;

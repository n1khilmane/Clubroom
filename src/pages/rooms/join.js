// joinChimeMeeting
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { MeetingProvider, lightTheme } from 'amazon-chime-sdk-component-library-react';
import { Auth } from "aws-amplify";
import SignOut from '../../components/signout';
import Meeting from '../../components/meeting'
import { ThemeProvider } from 'styled-components';
import TopBar from '../../components/topBar';
import JoinMeetingView from '../../components/joinMeetingView';

const JoinMeeting = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const { meetingId } = useParams();

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
  }, [])

    return (
      <>
      <TopBar RightButton={SignOut}/>
        <Container maxWidth="sm">
          <ThemeProvider theme={lightTheme}>
            <MeetingProvider>
              <Meeting /> 
              <JoinMeetingView userId={userName} meetingId={meetingId}/>
            </MeetingProvider>
          </ThemeProvider>
        </Container>
      </>
    )
}

export default JoinMeeting;

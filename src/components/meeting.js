import React from 'react';

import {
    AudioInputControl,
    AudioOutputControl,
    ControlBar,
    ControlBarButton,
    Phone,
    useMeetingManager,
    MeetingStatus,
    useMeetingStatus,
    VideoInputControl,
    VideoTileGrid
  } from 'amazon-chime-sdk-component-library-react';
import { useNavigate } from 'react-router-dom';



  const Meeting = ({ updateMeetingStatus = (() => {}) }) => {
    const navigate = useNavigate();
    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();
    const clickedEndMeeting = async () => {
      const meetingId = meetingManager.meetingId;
      if (meetingId) {
        // await endMeeting(meetingId);
        await meetingManager.leave();
        updateMeetingStatus((prev) => false)
        navigate('/')
      }
    }

    const printToConsole = () => {
      console.log('HEY HEY HEY HEY meeting started')
      updateMeetingStatus((prev) => meetingStatus !== MeetingStatus.Succeeded)
      return true;
    }
    
    return (<>{meetingStatus === MeetingStatus.Succeeded ? printToConsole() &&
        <div style={{marginTop: '2rem', height: '40rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <VideoTileGrid/>
          
            <ControlBar
              layout="undocked-horizontal"
              showLabels
            >
              <AudioInputControl />
              <VideoInputControl />
              <AudioOutputControl />
              <ControlBarButton icon={<Phone />} onClick={clickedEndMeeting} label="End" />
            </ControlBar> 
        </div>:
            <></>
          }
    </>);
  };
export default Meeting;
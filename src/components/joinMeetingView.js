import React, { useEffect } from "react";
import {
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import utils from '../utils/api'

const { joinRooms } = utils;

const JoinMeetingView = ({ userId, meetingId }) => {
  const meetingManager = useMeetingManager();
  // joinChimeMeeting

  useEffect(() => {
    if(userId && meetingId) {
      const clickedJoinMeeting = async () => {
        try {
            const joinInfo = await joinRooms({
              roomId: meetingId,
              userId
            });
          
            const meetingConfig = new MeetingSessionConfiguration(joinInfo.meeting, joinInfo.attendee)
            console.log(joinInfo)
            console.log(meetingConfig)
            await meetingManager.join(meetingConfig);
        } catch (error) {
          console.log(error);
        }
    
        await meetingManager.start();
      };
      clickedJoinMeeting()
    } else {
      console.log('somethingWEntWrong')
      console.log(userId)
      console.log(meetingId)
    }
  }, [userId, meetingId, meetingManager]);

  return <></>
};

export default JoinMeetingView;

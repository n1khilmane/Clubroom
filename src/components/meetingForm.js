import React, { useState } from "react";
import {
  Flex,
  FormField,
  Input,
  PrimaryButton,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import utils from '../utils/api'

const { createRoom } = utils;

const MeetingForm = ({ userId }) => {
  const meetingManager = useMeetingManager();
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingTopic, setMeetingTopic] = useState("");
  const [attendeeName, setName] = useState("");
  const [meetingStatus, setStatus] = useState(false)
  const clickedJoinMeeting = async (event) => {
    event.preventDefault();
    const title = meetingTitle.trim().toLocaleLowerCase();
    const topic = meetingTopic.trim().toLocaleLowerCase();

    
    try {
        const joinInfo = await createRoom({
          title,
          topic,
          host: userId
        });
      
        const meetingConfig = new MeetingSessionConfiguration(joinInfo.meeting, joinInfo.attendee)
        console.log(joinInfo)
        console.log(meetingConfig)
        await meetingManager.join(meetingConfig);
    } catch (error) {
      console.log(error);
    }

    await meetingManager.start();
    setStatus(() => true)
  };

  if(meetingStatus) {
    return <></>
  }

  return (
    <>
      <FormField
        field={Input}
        label="Meeting Title"
        value={meetingTitle}
        fieldProps={{
          name: "Meeting Title",
          placeholder: "Enter a Meeting Title",
        }}
        onChange={(e) => {
          setMeetingTitle(e.target.value);
        }}
        layout="stack"
      />
      <FormField
        field={Input}
        label="Meeting Topic"
        value={meetingTopic}
        fieldProps={{
          name: "Meeting Topic",
          placeholder: "Enter a Meeting Topic",
        }}
        onChange={(e) => {
          setMeetingTopic(e.target.value);
        }}
        layout="stack"
      />
      <FormField
        field={Input}
        label="Name"
        value={attendeeName}
        fieldProps={{
          name: "Name",
          placeholder: "Enter your Attendee Name",
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
        layout="stack"
      />
      <Flex
        container
        layout="fill-space-centered"
        style={{ marginTop: "2.5rem" }}
      >
        <PrimaryButton label="Join Meeting" onClick={clickedJoinMeeting} />
      </Flex>
    </>
  );
};

export default MeetingForm;

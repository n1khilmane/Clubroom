/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_ROOMS_ARN
	STORAGE_ROOMS_NAME
	STORAGE_ROOMS_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const {uuid} = require('uuidv4');
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(cors())

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient()
const chime = new AWS.Chime({ region: 'us-east-1' });

console.log('hrerebnfnfkfn \n\n\n ===== \n\n\n HERE DUDE')


app.get('/rooms', function(req, res) {
  var params = {
    TableName : process.env.STORAGE_ROOMS_NAME
  }
  docClient.scan(params, onScan);
  function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Scan succeeded.");
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
        res.json({data:[...data.Items], success: 'get call succeed!', url: req.url});
    }
}
});

/****************************
* Example post method *
****************************/

app.post('/rooms', async function(req, res) {
  console.log(req);
  const roomId = uuid();
  const region = 'us-east-1';
  const request ={
    ClientRequestToken: req.body.host, //todo: handle unique user id
    MediaRegion: region,
    NotificationsConfiguration: {
      SqsQueueArn: process.env.SQS_QUEUE_ARN, //add variable ***
     }, 
    ExternalMeetingId: roomId
  };
  console.info('Creating new Room');
  const meetingInfo = await chime.createMeeting(request).promise();
  //new attendee
  console.info('Adding new attendee');
  const attendeeInfo = (await chime.createAttendee({
    MeetingId: meetingInfo.Meeting.MeetingId,
    ExternalUserId: `${uuid().substring(0, 8)}#${roomId}`.substring(0, 64),
  }).promise());
   const meeting_info ={
      meeting: meetingInfo.Meeting,
      attendee: attendeeInfo.Attendee,
    };
    console.log(meeting_info)
    console.log("Starting transcriptions")
    const transcriptEvent = (await chime.startMeetingTranscription({
      MeetingId: meetingInfo.Meeting.MeetingId,
      TranscriptionConfiguration: {EngineTranscribeSettings: { 
        LanguageCode: "en-US",
        Region: "us-east-1",
     }}
    }).promise());
    const params = {
      TableName : process.env.STORAGE_ROOMS_NAME,
      Item:{
        roomId: roomId,
        title: req.body.title,
        topic: req.body.topic,
        iconUri: req.body.iconUri,
        removed: false,
        host: req.body.host,
        createTime: Date.now(),
        ...meeting_info
      }
    }
  docClient.put(params, function(err, data){
    if(err) res.json({err})
    else res.json({...meeting_info, success: 'Room created'})
  })
});

app.post('/rooms/joinRoom', async function(req, res){
  console.log("Joining Room")
  try {
    const {roomId , user} = req.body;
    if (!roomId || !user) {
      return res.json({
        error: 'Required properties: roomId, user'
      });
    }
    const meetingInfo = (await docClient.get({
      TableName : process.env.STORAGE_ROOMS_NAME,
      Key: {
        roomId
      }
    }).promise()).Item;
    console.log(meetingInfo)
    const meetingId = meetingInfo.meeting?.MeetingId;
    const attendeeInfo = (await chime.createAttendee({
      MeetingId: meetingId,
      ExternalUserId: user,
    }).promise());

    res.json({meeting: meetingInfo, attendee: attendeeInfo.Attendee});
  } catch (e) {
    console.log(e);
    res.status(400).json();
  }
});

app.post('/rooms/endRoom',async function(req,res){
  console.log("Ending Room")
  console.log(req);
  const {meetingId,roomId} = req.body;
  await chime.deleteMeeting({ MeetingId: meetingId });
  if (!meetingId){
    throw new Error('meeting id required')
  }
 return docClient.update({
  TableName: process.env.STORAGE_ROOMS_NAME,
  Key: {
   roomId: roomId
  },
  UpdateExpression: 'set delete = :s',
  ExpressionAttributeValues: {
   ':s': true
  }
 }).promise()
  .then(() => {
    res.json({success:'room deleted'});
  })
})



app.post('/rooms/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/rooms', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/rooms/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/rooms', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/rooms/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app


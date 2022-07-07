import { API } from 'aws-amplify';


async function createRoom({
    title,
    topic,
    host,
    region = 'us-east-1',
    iconUri
}) {
    const data = {
        body : {
            title:title,
            topic:topic,
            host:host,
            region: region,
            iconUri: iconUri
        }
    };
    const apiData =await API.post('clubroom', '/rooms', data);
    return apiData
    
}

async function joinRooms ({ userId, roomId }) {
    console.log('join room called ')
    const data = {
        body: {
            roomId, 
            user: userId
        }
    }
    const apiData = await API.post('clubroom', '/rooms/joinRoom', data);
    console.log(apiData)
    return apiData;
}

async function listRooms () {    
    const apiData = await API.get('clubroom', '/rooms');
    return apiData.data;
}



// async function joinRoom(topic,host, region){
//     const data = {
//         // roomid is generated
//         body : {
//             title: title,
//             topic: topic,
//             host: host,
//             region: region,
//             iconUri: iconUri
//         }
//     };
//     const apiData =await API.post('clubroom', '/rooms', data);
//     console.log({apiData});
//     alert('Room Created');

// }



const toExport = {
    createRoom,
    listRooms,
    joinRooms
}

export default toExport;









// const formstate = { roomID : '', hostName : '', region : 'us-east-1', uri :''};
// export async function joinMeeting(meetingId, name) {
//     const joinInfo: any = await API.graphql(graphqlOperation(joinChimeMeeting, {meetingId: meetingId, name: name}));
//     const joinInfoJson = joinInfo.data.joinChimeMeeting;
//     const joinInfoJsonParse = JSON.parse(joinInfoJson.body);
//     return joinInfoJsonParse;
//   }
  
// meeting id
// title
// host
// attendee_name

// TODO:
//createRoom
//deleteRoom
//joinRoom






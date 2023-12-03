import React, {useState, useEffect} from 'react'
import { MeetingType } from '../utils/Types'
import { meetingsRef } from '../utils/FirebaseConfig'
import { where, query ,getDocs } from 'firebase/firestore'
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel ,EuiBadge} from '@elastic/eui';


export default function Meeting() {
    useAuth();
    const[meetings,setMeetings]=useState<Array<any>>([]);
    const userInfo=useAppSelector((zoom)=>zoom.auth.userInfo);

   
    
    useEffect(() => {
        const getMyMeetings = async () => {
          const firestoreQuery = query(meetingsRef);
          const fetchedMeetings = await getDocs(firestoreQuery);
          if (fetchedMeetings.docs.length) {
            const myMeetings: Array<MeetingType> = [];
            fetchedMeetings.forEach((meeting) => {
              const data = meeting.data() as MeetingType;
              if (data.createdBy === userInfo?.uid)
                myMeetings.push(meeting.data() as MeetingType);
              else if (data.meetingType === "anyone-can-join")
                myMeetings.push(meeting.data() as MeetingType);
              else {
                const index = data.invitedUsers.findIndex(
                  (user: string) => user === userInfo?.uid
                );
                if (index !== -1) {
                  myMeetings.push(meeting.data() as MeetingType);
                }
              }
            });
    
            setMeetings(myMeetings);
          }
        };
        if (userInfo) getMyMeetings();
      }, [userInfo]);
        

    const columns=[{
        field:"meetingName",
        name:"Meeting Name"
    },
{
    field:"meetingType",
    name:"Meeting Type"
},{

    field:"meetingDate",
    name:"Meeting Date"
},{
    field:"",
    name:"Status",
    render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
},

{
    field:"meetingId",
    name:"Copy Link",
    render:(meetingId:string)=>{
        return (
            <EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
                {(copy:any)=>(
                    <EuiButtonIcon
                        iconType="copy"
                        onClick={copy}
                        display='base'
                        aria-label='Meeting-copy'
                    />
                )}
            </EuiCopy>
        )
    }
}
]

  return (
    <div
    style={{
        display:"flex",
        height:"100vh",
        flexDirection:"column",
    }}
    >
      <Header/>
      <EuiFlexGroup 
        justifyContent='center' 
        alignItems='center'
        style={{margin:"1rem"}}
        >
        <EuiFlexItem>
            <EuiPanel>
                <EuiBasicTable
                    items={meetings}
                    columns={columns}
                />
            </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      
    </div>
  )
}

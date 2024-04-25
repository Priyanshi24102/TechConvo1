import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { firebaseAuth, meetingsRef } from '../utils/FirebaseConfig';
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { generateMeetingId } from '../utils/generateMeetingId';
import UserProfile from './UserProfile';
import CodeEditor from './CodeEditor';

var count=0,count2=0;

export default function JoinMeeting() {
  
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User switched to another tab
        alert('User switched to another tab');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser){
      setUser(currentUser);
    }
    setUserLoaded(true);
  });

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: "Meeting is on ${meeting.meetingDate}",
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: "Meeting is on ${meeting.meetingDate}",
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: "You are not invited to the meeting.",
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [params.id, user, userLoaded, createToast, navigate]);

  // Your existing code for rendering the meeting UI and handling user interaction...

  const appId=100678314;
  const serverSecret="114112e9ed2a67dd3af06d42938cdf9e";
  const myMeeting=async(element:any)=>{
    const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id as string,
      user.uid ? user.uid : generateMeetingId(),
      user.displayName ? user.displayName: generateMeetingId()
    );
      const zp=ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container:element,
        showPreJoinView: false,
        maxUsers:50,
        sharedLinks:[
          {
            name:"Personal Link",
            url:window.location.origin,
          },
        ],
        scenario:{
          mode:ZegoUIKitPrebuilt.VideoConference,
        }
      })
  }

  const [showUserProfile, setShowUserProfile] = useState(false);
  const handleClick = () => {
    count++;
    if(count%2==1)
    setShowUserProfile(true);
  else
  setShowUserProfile(false);
    setshowCodeEditor(false);
  }; 

  const [showCodeEditor, setshowCodeEditor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const handleClick2 = () => {
    count2++;
    if(count2%2==1){
      setshowCodeEditor(true);
      
    }
    
    else  setshowCodeEditor(false);
    setShowUserProfile(false);
  }; 

  return (
    <div>
      {isAllowed && (
        <div>
          <div className='myCallContainer' ref={myMeeting} style={{width:"100%" , height:"100vh"}}>
          </div>

          <button className='github' style={{width : "43px",height: "43px" , position:"absolute", color:"white", left:"60.5%", bottom:"2%",display:"flex",backgroundColor: isHovered ? '#404352' : '#313443',borderRadius:"12px",justifyContent : "center" , alignItems : "center"}}  onClick={handleClick}  onMouseEnter={() => setIsHovered(true)}  onMouseLeave={() => setIsHovered(false)} ><img width="30" height="30" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/FFFFFF/external-github-with-cat-logo-an-online-community-for-software-development-logo-bold-tal-revivo.png" alt="external-github-with-cat-logo-an-online-community-for-software-development-logo-bold-tal-revivo"/>   </button>
          {showUserProfile && <UserProfile />}
          <button className='code' style={{width : "43px",height: "43px" , position:"absolute", color:"white", left:"56.5%", bottom:"2%",display:"flex",backgroundColor: isHovered2 ? '#404352' : '#313443',borderRadius:"12px",justifyContent : "center" , alignItems : "center"}} onClick={handleClick2} onMouseEnter={() => setIsHovered2(true)}  onMouseLeave={() => setIsHovered2(false)}><img width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/source-code.png" alt="source-code"/>
          </button>
          {showCodeEditor && <CodeEditor/>}
        </div>
      )}
    </div>
  );
}
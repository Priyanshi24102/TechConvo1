import React, {useState} from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUsersFields from '../components/FormComponents/MeetingUsersFields';
import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import moment from 'moment';
import MeetingDateField from '../components/FormComponents/MeetingDateField';
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons';
import { FieldErrorType, UserType } from '../utils/Types';
import { meetingsRef } from '../utils/FirebaseConfig';
import { generateMeetingId } from '../utils/generateMeetingId';
import { addDoc } from 'firebase/firestore';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';

function OneOnOne() {
    useAuth()
    const [users]=useFetchUsers();
    const [createToast]=useToast();
    const naviagte=useNavigate();
    const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid);

    const[meetingName,setMeetingName]=useState("");
    const[selectedUsers,setSelectedUsers]=useState<Array<UserType>>([]);
    const[startDate,setStartDate]=useState(moment());
    const[showErrors, setShowErrors]=useState<{
      meetingName:FieldErrorType;
      meetingUser:FieldErrorType;
    }>({
        meetingName:{
          show:false,
          message:[],
        },
        meetingUser:{
          show:false,
          message:[],
        },
    });

    const onUserChange=(seletedOptions:any)=>{
      setSelectedUsers(seletedOptions);
    };
    
    const validateForm =()=>{
      let errors =false;
      const clonedShowErrors={...showErrors};
      if(!meetingName.length){
        clonedShowErrors.meetingName.show=true;
        clonedShowErrors.meetingName.message=["Please Enter Meeting Name"];
        errors=true;
      }
      else{
        clonedShowErrors.meetingName.show=false;
        clonedShowErrors.meetingName.message=[];
      }
      if(!selectedUsers.length){
        clonedShowErrors.meetingUser.show=true;
        clonedShowErrors.meetingUser.message=["Please Enter Meeting Name"];
      }
      else{
        clonedShowErrors.meetingUser.show=false;
        clonedShowErrors.meetingUser.message=[];
      }
      setShowErrors(clonedShowErrors);
      return errors;
    };
    
    const createMeeting=async()=>{
      if(!validateForm()){
          const meetingId=generateMeetingId();
          await addDoc(meetingsRef,{
            createdBy:uid,
            meetingId,
            meetingName,
            meetingType:"1-on-1",
            invitedUsers:[selectedUsers[0].uid],
            meetingDate: startDate.format("L"),
            maxUsers:1,
            status:true,
          });
          createToast({
            title:"One on One Meeting Created Successfully",
            type:"success",
          });
          naviagte("/");
      }
    }; 

  return (
    <div style={{
        display:"flex",
        height:"100vh",
        flexDirection:"column",
      }}>
      <Header/>
      <EuiFlexGroup justifyContent='center' alignItems='center'>
        <EuiForm>
            <MeetingNameField 
                label="Meeting Name"
                placeholder="Meeting Name"
                value={meetingName}
                setMeetingName={setMeetingName}
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
            />
            <MeetingUsersFields label="Invite User" options={users} onChange={onUserChange} selectedOptions={selectedUsers} singleSelection={{asPlainText:true}} isClearable={false} placeholder="Select a user" isInvalid={showErrors.meetingUser.show}
                error={showErrors.meetingUser.message}/>
            <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
            <EuiSpacer/>
            <CreateMeetingButtons createMeeting={createMeeting}/>
        </EuiForm>
      </EuiFlexGroup>

    </div>
  )
}

export default OneOnOne

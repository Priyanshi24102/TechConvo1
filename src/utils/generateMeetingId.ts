export const generateMeetingId=()=>{
    let meetingId="";
    const chars=
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
    const maxPos=chars.length;
    for(let i=0;i<8;i++){
        meetingId+= chars.charAt(Math.floor(Math.random()*maxPos));
    }
    return meetingId;
}
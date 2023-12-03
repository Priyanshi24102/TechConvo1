import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { changeTheme } from '../app/slices';
import { getCreateMeetingBreadCrumbs, getMeetingsBreadCrumbs, getMyMeetingsBreadCrumbs, getOneonOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from '../utils/breadCrumbs';

function Header() {
    const navigate=useNavigate();
    const location=useLocation();
    const userName=useAppSelector((zoom)=>zoom.auth.userInfo?.name);
    const isDarkTheme=useAppSelector((zoom)=>zoom.auth.isDarkTheme);
    const[breadCrumbs,setBreadCrumbs]=useState([ {text:"Dashboard"} ]);
    const[isResponsive,setIsResponsive]=useState(false);
    const dispatch=useDispatch();
    const logout=()=>{
        signOut(firebaseAuth);
    };
    useEffect(()=>{
        const {pathname}=location;
        if(pathname==="/create")
            setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
        else if(pathname==="/create1on1") setBreadCrumbs(getOneonOneMeetingBreadCrumbs(navigate));
        else if(pathname==="/videoconference")setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
        else if(pathname==="/mymeetings")setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
        else if(pathname==="/meetings")setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
        

    },[location,navigate]);
    const invertTheme=()=>{
        const theme=localStorage.getItem("zoom-theme");
        localStorage.setItem("zoom-theme",theme==="light"?"dark":"light");
        dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }
    const section=[
        {
            items:[
                <Link to="/">
                    <EuiText>
                        <h2 style={{padding:"0 1vw"}}>
                            <EuiTextColor color='#0b5cff'></EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>,
            ],
        },
        {
            items:[
                <>
                {userName ?(
                        <EuiText>
                            <h3>
                                <EuiTextColor color='white'>Hello, </EuiTextColor>
                                <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
                            </h3>
                        </EuiText>
                    ):null

                },
                
                </>,
            ]
        },
        {
            items:[
                <EuiFlexGroup justifyContent='center' alignItems='center'  direction='row' style={{gap:"2vw"}}>
                    <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                        {
                            isDarkTheme?(
                    <EuiButton 
                        onClick={invertTheme} 
                        iconType="sun" 
                        size='s' 
                        color='warning'
                        // display="fill" 
                        aria-label='invert-theme-button' />
                            ):(
                        <EuiButton 
                        onClick={invertTheme} 
                        iconType="moon" 
                        size='s' 
                        // display='fill'
                        color='ghost'
                        aria-label='invert-theme-button' />
                            )}
                     </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                        <EuiButton 
                        onClick={logout} 
                        iconType="lock" 
                        size='s' 
                        // display="fill" 
                        aria-label='logout-button' />
                        
                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }
    ];
    const responsiveSection=[
        {
            items:[
                <Link to="/">
                    <EuiText>
                        <h2 style={{padding:"0 1vw"}}>
                            <EuiTextColor color='#0b5cff'></EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>,
            ],

        },
        {
            items:[
                <EuiFlexGroup justifyContent='center' alignItems='center'  direction='row' style={{gap:"2vw"}}>
                    <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                        {
                            isDarkTheme?(
                    <EuiButton 
                        onClick={invertTheme} 
                        iconType="sun" 
                        size='s' 
                        color='warning'
                        // display="fill" 
                        aria-label='invert-theme-button' />
                            ):(
                        <EuiButton 
                        onClick={invertTheme} 
                        iconType="moon" 
                        size='s' 
                        // display='fill'
                        color='ghost'
                        aria-label='invert-theme-button' />
                            )}
                     </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                        <EuiButton 
                        onClick={logout} 
                        iconType="lock" 
                        size='s' 
                        // display="fill" 
                        aria-label='logout-button' />
                        
                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }
       
    ];
    useEffect(() => {
        if (window.innerWidth < 480) {
          // sectionSpliced.splice(1, 1);
          // setSection(sectionSpliced);
          setIsResponsive(true);
        }
      }, []);
    useEffect(()=>{
        if(window.innerWidth<480) setIsResponsive(true);
    })
  return (
    <>
    <EuiHeader
    style={{minHeight: "8vh"}}  theme='dark' sections={isResponsive ? responsiveSection : section}
    />
    <EuiHeader 
    style={{minHeight: "8vh"}} 
    sections={[{breadcrumbs:breadCrumbs}]}/>
    </>
  )
}

export default Header

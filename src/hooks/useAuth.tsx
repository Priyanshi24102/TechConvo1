import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FirebaseConfig';
import { setUser } from '../app/slices';
 
function useAuth() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    const unsubsucribe=onAuthStateChanged(firebaseAuth,(currentUser)=>{
        console.log(currentUser);
        if(!currentUser)navigate("/login")
        else {
            dispatch(setUser({
                uid:currentUser.uid,
                email:currentUser.email,
                name:currentUser.displayName,
            }))
        }
    })
    return ()=> unsubsucribe();
  },[dispatch,navigate])
}

export default useAuth

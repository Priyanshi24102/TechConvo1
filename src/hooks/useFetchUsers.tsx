import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { userRef } from '../utils/FirebaseConfig';
import {getDocs,query,where} from "firebase/firestore";
import { UserType } from '../utils/Types';
export default function useFetchUsers() {
  const [users,setUsers]=useState<Array<UserType>>([]);
  const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid);
  useEffect(()=>{
    if(uid){
        const getUsers=async()=>{
            const fireStoreQuery=query(userRef,where("uid","!=",uid));
            const data=await getDocs(fireStoreQuery);
            const firebaseUsers:Array<UserType>=[];
            data.forEach((user)=>{
                const userData=user.data() as UserType;
                firebaseUsers.push({
                    ...userData,
                    label:userData.name,
                });
            });
            setUsers(firebaseUsers);     
           };
           getUsers();
    }
    
  },[uid]);
  return[users];
}

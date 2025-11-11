import { useEffect, useState } from "react";
import { AuthContextProvider } from "./AuthContext";
import { nanoid } from "nanoid";
import type { User,OtherData } from "../Helper/Type";
import ProfilePopup from "../Popup/ProfilePopup";
export default function AuthContextProviderWithlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [RegisterUsersdata, setRegisterUsersdata] = useState<User[]>(() => {
    // return JSON.parse(localStorage.getItem("RegisterUsersdata")??"[]")||[] //Nullish Coalescing Operator
    return JSON.parse(localStorage.getItem("RegisterUsersdata") ?? "[]") || [];
  });
  const [CurrentUserLogindata, setCurrentUserLogindata] = useState<User | null>(
    () => {
      return (
        JSON.parse(localStorage.getItem("CurrentUserLogindata") ?? "null") ||
        null
      );
    }
  );
  const [UserProfiledata,setUserProfiledata]=useState<OtherData[]>(()=>{
    return JSON.parse(localStorage.getItem("UserProfiledata")??"[]")||[];
  })
    const [IsProfileopen, setProfile] = useState<boolean>(false);
  function AddUser(Data: Omit<User, "id">) {//Take everything from the User type except the id property.
    const Id = nanoid(10);
    const userExit = RegisterUsersdata.some(
      (user) =>
        user.Email.trim().toLowerCase() === Data.Email.trim().toLowerCase()
    );
    if (userExit) {
      alert("User already exists!");
      return;
    } else {
      setRegisterUsersdata((pre) => [{id:Id,  ...Data }, ...pre]);
    }
  }
  function Logout() {
    setCurrentUserLogindata(null);
  }
  function FoundUser(Email: string, Password: string) {
    const found = RegisterUsersdata.find(
      (user) => user.Email == Email && user.Password == Password
    );
    console.log("foundUser:", found);
    if (found) {
      setCurrentUserLogindata(found);
    }

    return found || null;
  }
  //profile
  function AddUpadteProfile(data: Omit<OtherData, "userId">){
    if(!CurrentUserLogindata) return;
    const foundid = UserProfiledata.find((data) => data.userId == CurrentUserLogindata.id);
    if (foundid) {
      setUserProfiledata((pre) =>
        pre.map((profiledata) =>
          foundid.userId == profiledata.userId
            ? { userId: foundid.userId, ...data }
            : profiledata
        )
      );
    } else {
      setUserProfiledata((pre) => [...pre, {userId:CurrentUserLogindata.id, ...data }]);
    }
  }
  function FetchExitProfile(){
    if (!CurrentUserLogindata) return null;
    const found = UserProfiledata.find((data) => data.userId == CurrentUserLogindata.id);
    if (found) {
      console.log("exit user data:",found);
      return found;
    } else {
      console.log("not exit user data:",CurrentUserLogindata);
      return CurrentUserLogindata;
    }

  }

  function closeProfile(){
setProfile(false)
  }
  function openProfile(){
setProfile(true);
  }
  //re-render
  useEffect(()=>
    {localStorage.setItem("RegisterUsersdata",JSON.stringify(RegisterUsersdata))

    },[RegisterUsersdata])
    useEffect(()=>{
        localStorage.setItem("CurrentUserLogindata",JSON.stringify(CurrentUserLogindata))

    },[CurrentUserLogindata])
    useEffect(()=>{
        localStorage.setItem("UserProfiledata",JSON.stringify(UserProfiledata))

    },[UserProfiledata])
  return (
    <>
      <AuthContextProvider
        value={{
          RegisterUsersdata,
          CurrentUserLogindata,
          UserProfiledata,
          Logout,
          AddUser,
          FoundUser,
          AddUpadteProfile,
          FetchExitProfile,
          IsProfileopen,
          closeProfile,
          openProfile

        }}
      >
        {children}
        <ProfilePopup/>
      </AuthContextProvider>
    </>
  );
}

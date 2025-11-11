import { createContext } from "react";
import { useContext } from "react";
import type { User,OtherData,  AuthContextInterface } from "../Helper/Type";

export const AuthContext=createContext<AuthContextInterface>(
    {
 RegisterUsersdata:[],
CurrentUserLogindata:null,
UserProfiledata:[],
Logout:()=>{},
AddUser:()=>{},
FoundUser:()=>null,
AddUpadteProfile: () => {},
FetchExitProfile: () => null,
closeProfile: () => {},
openProfile:()=>{},
IsProfileopen:false }
)
    
export const AuthContextProvider=AuthContext.Provider;
export default function useAuth(){
    return useContext(AuthContext);
}
import { createContext } from "react";
import { useContext } from "react";
import type{ShoesProducts,AddCartContextInterface} from "..//Helper/Type"
import type { UserShopData } from "..//Helper/Type";
export const AddCartContext=createContext<AddCartContextInterface>({
    Orderdata:[],
BuyNowItem:null,
AllUsersdata:{},
    setBuyNowItem: () => {},
    AddCard:()=>{},
    Deleteproduct:()=>{},
    RemoveAll:(UserId:string)=>{},
      AddUserShopData:()=>{},
    
})
export const AddCartProvider=AddCartContext.Provider;
export default function useAddCart(){
    return(useContext(AddCartContext))
}
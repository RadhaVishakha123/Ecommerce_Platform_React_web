import { useEffect, useState } from "react";
import { AddCartProvider } from "./AddCartContext"
import type{ ShoesProducts } from "../Helper/Type";
import useAuth from "./AuthContext";
import type{ AllUsersShopData } from "../Helper/Type";
import { json } from "zod";
import type{ ProductItem } from "../Helper/Type";
export default function AddCartProviderWithlayout({
  children,
}: {
  children: React.ReactNode;
}){
    const {CurrentUserLogindata}=useAuth();
    const [Orderdata,setOrderdata]=useState<ShoesProducts[]>(()=>{
        return JSON.parse(localStorage.getItem("Orderdata")??"[]")||[]
    });
    const [BuyNowItem,setBuyNowItem]=useState<ShoesProducts|null>(null);
    const [AllUsersdata,setAllUsersdata]=useState<AllUsersShopData>(()=>{
        return JSON.parse(localStorage.getItem("AllUsersdata")??"{}")||{}
    })
    function AddCard(data:Omit<ShoesProducts, "UserId">){
        // const {UserId,...rest}=data as any
if(!CurrentUserLogindata) return;
        setOrderdata((pre)=>[{UserId:CurrentUserLogindata.id,...data},...pre])
    }
    function Deleteproduct(proid:string){
        setOrderdata((pre)=>pre.filter((pro)=>pro.Productid!==proid))
    }
    function RemoveAll(UserId:string){
        setOrderdata((pre)=>pre.filter((pro)=>pro.UserId!==UserId))

    }
    function AddUserShopData(
  userId: string,
  newCart?: ProductItem[],
  newBuyNow?: ProductItem[]
) {
  if (!userId) return;

  // Use full datetime: YYYY-MM-DDTHH:MM:SS
  const timestamp = new Date().toISOString(); 

  setAllUsersdata((prev) => {
    const updated = { ...prev };

    // Ensure user object exists
    if (!updated[userId]) {
      updated[userId] = {};
    }

    // Initialize datetime object
    updated[userId][timestamp] = {};

    // Only one type per timestamp
    if (newCart && newCart.length > 0) {
      updated[userId][timestamp].Cart = newCart;
    } else if (newBuyNow && newBuyNow.length > 0) {
      updated[userId][timestamp].BuyNow = newBuyNow;
    }

    // Save to localStorage
    localStorage.setItem("AllUsersdata", JSON.stringify(updated));

    return updated;
  });
}

    useEffect(()=>{
        localStorage.setItem("Orderdata",JSON.stringify(Orderdata));
    },[Orderdata])
    return(
        <>
        <AddCartProvider value={{Orderdata,AllUsersdata,AddCard,Deleteproduct,BuyNowItem,setBuyNowItem,RemoveAll,AddUserShopData}}>
            {children}
        </AddCartProvider>
        </>
    )
}
export interface User {
    id:string;
    Username:string;
    Email:string;
    Password:string;
}
export interface OtherData{
userId:string;
Fullname:string;
Email:string;
Phone:string;
Address:string;
}
export interface AuthContextInterface {
  RegisterUsersdata: User[];
  CurrentUserLogindata: User | null;
  UserProfiledata:OtherData[];
  Logout: () => void;
  AddUser: (data: Omit<User,"id">) => void;
  FoundUser: (Email: string, Password: string) => User | null;
  AddUpadteProfile: (data: Omit<OtherData,"userId">) => void;
  FetchExitProfile: () => OtherData | User |null;
  IsProfileopen:boolean;
  closeProfile: () => void;
  openProfile:()=>void;
}
export interface ShoesProducts{
id:number;
UserId:string;
Productid:string;
title: string;
price: number;
description: string;
category: "Men's clothing"|"women's clothing"|"Electronics"|"Jewelery";
image: string;
}
export interface ProductItem {
  id: number;
  title: string;
  price: number;
  category: "Men's clothing" | "women's clothing" | "Electronics" | "Jewelery";
  image: string;
}

export interface SingleShopEntry {
  Cart?: ProductItem[];
  BuyNow?: ProductItem[];
}

export interface UserShopData {
  [dateTime: string]: SingleShopEntry; // each timestamp entry
}

export interface AllUsersShopData {
  [userId: string]: UserShopData;
}


export interface AddCartContextInterface {
  Orderdata:ShoesProducts[];
  BuyNowItem:null|ShoesProducts;
  AllUsersdata:AllUsersShopData;
  AddCard:(Data:Omit<ShoesProducts,"UserId">)=>void;
  Deleteproduct:(proid:string)=>void;
  RemoveAll:(UserId:string)=>void;
  AddUserShopData:(userId: string,
  newCart?: ProductItem[],
  newBuyNow?: ProductItem[])=>void;
  setBuyNowItem: (data: ShoesProducts | null) => void;
}
export interface SearchContextInterface{
  SearchTerm:string;
  setSearchTerm:(value:string)=>void;
  debouncedSearch:string;
  debouncedSearch2:string;
  setdebouncedSearch:(value:string)=>void;
}

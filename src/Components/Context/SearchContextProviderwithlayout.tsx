import { useState } from "react";
import { SearchContextprovider } from "./SearchContext"
export default function SearchContextProviderwithlayout({
  children,
}: {
  children: React.ReactNode;
}){
    const [SearchTerm,setSearchTerm]=useState("")
    return(
        <>
        <SearchContextprovider value={{SearchTerm,setSearchTerm}}>
            {children}
        </SearchContextprovider>
        </>
    )
}
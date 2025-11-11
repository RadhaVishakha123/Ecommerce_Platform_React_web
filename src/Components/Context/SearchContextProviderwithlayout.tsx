import { useState } from "react";
import { SearchContextprovider } from "./SearchContext"
import { useDebounce } from "use-debounce";
export default function SearchContextProviderwithlayout({
  children,
}: {
  children: React.ReactNode;
}){
    const [SearchTerm,setSearchTerm]=useState("")
    const [debouncedSearch,setdebouncedSearch]=useState("")
    const [debouncedSearch2]=useDebounce(SearchTerm,1000)
    return(
        <>
        <SearchContextprovider value={{SearchTerm,setSearchTerm,debouncedSearch,debouncedSearch2,
    setdebouncedSearch}}>
            {children}
        </SearchContextprovider>
        </>
    )
}
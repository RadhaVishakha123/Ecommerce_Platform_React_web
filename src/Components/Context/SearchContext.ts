import { useCallback, useContext } from "react";
import type{SearchContextInterface} from '..//Helper/Type'
import { createContext } from "react";
export const SearchContext=createContext<SearchContextInterface>({
    SearchTerm:"",
    setSearchTerm:()=>{},
    debouncedSearch:"",
    setdebouncedSearch:()=>{},
    debouncedSearch2:""
}
)
export const SearchContextprovider=SearchContext.Provider;
export default function useSearch(){
    return useContext(SearchContext);
}

import { useCallback, useContext } from "react";
import type{SearchContextInterface} from '..//Helper/Type'
import { createContext } from "react";
export const SearchContext=createContext<SearchContextInterface>({
    SearchTerm:"",
    setSearchTerm:()=>{},
}
)
export const SearchContextprovider=SearchContext.Provider;
export default function useSearch(){
    return useContext(SearchContext);
}

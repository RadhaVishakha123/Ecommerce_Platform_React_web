import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
export default function LayoutProjectApp2(){
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}
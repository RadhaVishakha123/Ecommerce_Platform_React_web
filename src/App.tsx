
import './App.css'
import Search from './Components/Search'
import Auth from './Components/Authentication/Auth'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import LayoutProjectApp2 from './LayoutProjectApp2'
import Home from './Components/Home/Home'
import AddCart from './Components/Orders/AddCart'
import AuthContextProviderWithlayout from './Components/Context/AuthContextProviderWithlayout'
import AddCartProviderWithlayout from './Components/Context/AddCartProviderWithlayout'
import Checkout from './Components/Checkout/Checkout'
import SearchContextProviderwithlayout from './Components/Context/SearchContextProviderwithlayout'
import Order from './Components/Orders/Order'
function App() {
  const router=createBrowserRouter([
    {path:"/",
      element:<Auth/>
    },
    {element:<LayoutProjectApp2/>,
    children:[
{path:"Home", element:<Home/>},
{path:"AddCart", element:<AddCart/>},
{path:"Checkout", element:<Checkout/>},
{path:"Orders", element:<Order/>}
    ]}
    
  ])

  return (
    <>
   {/* <Search></Search> */}
    <AuthContextProviderWithlayout>
      <AddCartProviderWithlayout>
        <SearchContextProviderwithlayout>
      <RouterProvider router={router}></RouterProvider>
      </SearchContextProviderwithlayout>
      </AddCartProviderWithlayout>
      </AuthContextProviderWithlayout>

    </>
  )
}

export default App

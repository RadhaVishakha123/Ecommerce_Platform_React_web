import useAuth from "../Context/AuthContext";
import useAddCart from "../Context/AddCartContext";
import type{ ShoesProducts } from "../Helper/Type";
import { useNavigate } from "react-router-dom";


export default function AddCart() {
  const { CurrentUserLogindata,UserProfiledata } = useAuth();
  const { Orderdata, Deleteproduct,setBuyNowItem } = useAddCart();
 
  const navigate=useNavigate()
  function Deleteproductfun(proid:string){
    Deleteproduct(proid)

  }
  const orderdata=Orderdata.filter((item)=>item.UserId==CurrentUserLogindata?.id)

  //If user not logged in
  if (!CurrentUserLogindata) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-600 bg-white shadow-md px-6 py-4 rounded-xl">
          Please <span className="text-blue-600 font-semibold">log in</span> to view your cart.
        </div>
      </div>
    );
  }

  //  If logged in but no orders
  if (orderdata.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Hello, {CurrentUserLogindata.Username}
        </h2>
        <p className="text-gray-500">Your cart is empty. Add something to get started!</p>
      </div>
    );
  }

  //  Calculate total price
  const totalPrice = orderdata.reduce((sum, item) => sum + item.price, 0);
function HandleBuy(data:ShoesProducts){
  setBuyNowItem(data);
  navigate("/Checkout",{state:{from:"BuyNow"}})
}
function HandelCart(){
  navigate("/Checkout",{state:{from:"Cart"}})
}
  // If logged in and have orders
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, <span className="text-blue-600">{CurrentUserLogindata.Username}</span>
          </h1>
          <p className="text-gray-500 text-lg">Your Shopping Cart 🛒</p>
        </div>

        {/* Product List */}
        <div className="space-y-6">
          {orderdata.map((item) => (
            <div
  key={item.Productid}
  className="flex flex-col md:flex-row items-center md:items-start bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
>
  {/* Image Left */}
  <div className="w-full md:w-1/4 flex justify-center">
    <img
      src={item.image}
      alt={item.title}
      className="w-40 h-40 object-contain rounded-lg"
    />
  </div>

  {/* Details Right */}
  <div className="flex flex-col justify-between flex-1 md:ml-6 mt-4 md:mt-0 h-full">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-gray-500 mt-1 capitalize">{item.category}</p>
      <p className="text-blue-600 font-bold text-xl mt-2">
        ₹{item.price.toFixed(2)}
      </p>
    </div>

    {/* Buttons */}
    <div className="flex justify-start md:justify-end gap-3 mt-4 flex-wrap">
      <button
        onClick={() => Deleteproductfun(item.Productid)}
        className="w-32 bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
      <button
        onClick={() => HandleBuy(item)}
        className="w-32 border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition"
      >
        Buy Now
      </button>
    </div>
  </div>
</div>


          ))}
        </div>

        {/* Total Section */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Total: <span className="text-blue-600">₹{totalPrice.toFixed(2)}</span>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition" onClick={HandelCart}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

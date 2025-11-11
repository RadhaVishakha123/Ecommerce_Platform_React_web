import useAuth from "../Context/AuthContext";
import useAddCart from "../Context/AddCartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { ShoesProducts, ProductItem } from "../Helper/Type";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { CurrentUserLogindata, UserProfiledata, openProfile } = useAuth();
  const { Orderdata, BuyNowItem, setBuyNowItem, AddUserShopData, RemoveAll } = useAddCart();

  const Frompage = location.state?.from;

  // ✅ Step 1: Get all valid products
  let Allproductitem = (
    Frompage === "BuyNow"
      ? [BuyNowItem]
      : Frompage === "Cart"
      ? Orderdata
      : Orderdata
  ).filter((item): item is ShoesProducts => !!item);

  // ✅ Step 2: Filter by logged-in user if not BuyNow
  const userFiltered =
    Frompage === "BuyNow"
      ? Allproductitem
      : Allproductitem.filter((item) => item.UserId === CurrentUserLogindata?.id);

  // ✅ Step 3: Convert to ProductItem[] for storage
  const productitem: ProductItem[] = userFiltered.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    category: item.category,
    image: item.image,
  }));

  const totalPrice = productitem.reduce((sum, p) => sum + Number(p.price), 0);

  const matchedProfile = UserProfiledata.find(
    (p) => p.userId === CurrentUserLogindata?.id
  );

  // ✅ Ensure user profile exists before proceeding
  useEffect(() => {
    if (CurrentUserLogindata && !matchedProfile) {
      openProfile();
    }
  }, [CurrentUserLogindata, matchedProfile, openProfile]);

  useEffect(() => {
    if (Frompage === "Cart") {
      setBuyNowItem(null);
    }
  }, [Frompage, setBuyNowItem]);

  // ✅ Handle place order
  function handlePlaceOrder() {
    if (!CurrentUserLogindata) return;
    const UserId = CurrentUserLogindata.id;

    if (productitem.length === 0) {
      alert("No items to place order!");
      return;
    }

    if (Frompage === "BuyNow") {
      AddUserShopData(UserId, undefined, productitem);
      setBuyNowItem(null);
    } else if (Frompage === "Cart") {
      AddUserShopData(UserId, productitem, undefined);
      RemoveAll(UserId);
    }

    alert("✅ Order placed successfully!");
    navigate("/Orders");
  }

  // ✅ UI
  if (CurrentUserLogindata) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

          {/* User Info */}
          <div className="mb-8 border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Shipping Details
            </h2>
            <div className="space-y-1 text-gray-600">
              <p><span className="font-medium">Name:</span> {matchedProfile?.Fullname}</p>
              <p><span className="font-medium">Email:</span> {matchedProfile?.Email}</p>
              <p><span className="font-medium">Phone:</span> {matchedProfile?.Phone}</p>
              <p><span className="font-medium">Address:</span> {matchedProfile?.Address}</p>
            </div>
          </div>

          {/* Product Summary */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
            {productitem.map((p) => (
              <div key={p.id} className="flex items-center gap-4 border-b pb-4">
                <img src={p.image} alt={p.title} className="w-24 h-24 object-contain rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{p.title}</h3>
                  <p className="text-gray-500">{p.category}</p>
                </div>
                <p className="font-semibold text-blue-600 text-lg">₹{p.price}</p>
              </div>
            ))}
          </div>

          {/* Total & Button */}
          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!matchedProfile) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen text-xl text-gray-700">
      Please log in to view this page.
    </div>
  );
}

import { useEffect, useState } from "react";
import useAuth from "../Context/AuthContext";
import useAddCart from "../Context/AddCartContext";
import type { AllUsersShopData, ProductItem,OtherData } from "../Helper/Type";


interface OrderRow {
  userId: string;
  timestamp: string;
  type: "cart" | "buy";
  products: ProductItem[];
}

export default function Orders() {
  const { UserProfiledata, CurrentUserLogindata } = useAuth();
  const { AllUsersdata } = useAddCart();
  const [orderRows, setOrderRows] = useState<OrderRow[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<OtherData | null>(null);


  useEffect(() => {
    if (!CurrentUserLogindata) return;
    const profile = UserProfiledata?.find((user) => user.userId === CurrentUserLogindata.id) || null;
    setCurrentUserProfile(profile);

    const rows: OrderRow[] = [];

    const userId = CurrentUserLogindata.id;
    const userData = AllUsersdata[userId];

    if (userData) {
      Object.entries(userData).forEach(([timestamp, data]) => {
        if (data.Cart && data.Cart.length > 0) {
          rows.push({
            userId,
            timestamp,
            type: "cart",
            products: data.Cart,
          });
        }
        if (data.BuyNow && data.BuyNow.length > 0) {
          rows.push({
            userId,
            timestamp,
            type: "buy",
            products: data.BuyNow,
          });
        }
      });
    }

    // Sort by datetime descending
    rows.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setOrderRows(rows);
  }, [AllUsersdata, CurrentUserLogindata]);

  if (!CurrentUserLogindata) {
     return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Please log in to view your orders.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* User Profile */}
        {currentUserProfile && (
          <div className="flex items-center gap-6 mb-10 bg-white p-6 rounded-2xl shadow-md">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
              {currentUserProfile.Fullname.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentUserProfile.Fullname}</h2>
              <p className="text-gray-600">{currentUserProfile.Email}</p>
              {currentUserProfile.Phone && <p className="text-gray-500 text-sm mt-1">📞 {currentUserProfile.Phone}</p>}
              {currentUserProfile.Address && <p className="text-gray-500 text-sm mt-1">🏠 {currentUserProfile.Address}</p>}
            </div>
          </div>
        )}
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Orders</h1>

        {orderRows.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            You have no orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orderRows.map((row) => {
              const totalPrice = row.products.reduce((sum, p) => sum + p.price, 0);

              return (
                <div
                  key={row.timestamp}
                  className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${
                        row.type === "buy" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {row.type}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(row.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {row.products.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{p.title}</p>
                          <p className="text-sm text-gray-500">{p.category}</p>
                          <p className="text-sm text-blue-600 font-medium">₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right text-lg font-semibold text-gray-800">
                    Total: ₹{totalPrice.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

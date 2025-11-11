import { useEffect, useState } from "react";
import type { ShoesProducts } from "../Helper/Type";
import Electronic from "..//../assets/Images/Electronic.jpeg";
import jewellary from "..//../assets/Images/jewellary.jpeg";
import man from "..//../assets/Images/man.jpeg";
import woman from "..//../assets/Images/woman.jpeg";
import SlideImage from "./SlideImage";
import useAuth from "../Context/AuthContext";
import useAddCart from "../Context/AddCartContext";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import useSearch from "../Context/SearchContext";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<
    ShoesProducts["category"] | "All"
  >("All");
  const [Products, setProducts] = useState<ShoesProducts[]>([]);
  const [Isloading, setIsloadng] = useState<boolean>(false);
  const categories: ShoesProducts["category"][] = [
    "women's clothing",
    "Men's clothing",
    "Electronics",
    "Jewelery",
  ];
  const { CurrentUserLogindata } = useAuth();
  const { AddCard, setBuyNowItem } = useAddCart();
  const productid = nanoid(10);
  const navigate = useNavigate();
  const { SearchTerm } = useSearch();
  useEffect(() => {
    async function FetchshoesFromApi() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        console.log("data", data);
        const productdata: ShoesProducts[] = data.map((item: ShoesProducts) => {
          let category: ShoesProducts["category"] = "Men's clothing";
          if (item.category.includes("women's clothing"))
            category = "women's clothing";
          else if (item.category.includes("electronics"))
            category = "Electronics";
          else if (item.category.includes("jewelery")) category = "Jewelery";
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: category,
            image: item.image,
          };
        });
        setProducts(productdata);
        setIsloadng(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsloadng(false);
      }
    }
    FetchshoesFromApi();
  }, []);
  const fiterproduct = Products.filter((item) => {
    const MatchCategory =
      activeCategory == "All" || item.category == activeCategory;

    const Searchfiterproduct = item.title
      .toLocaleLowerCase()
      .trim()
      .includes(SearchTerm.toLocaleLowerCase());
    return MatchCategory && Searchfiterproduct;
  });

  function AddCartfun(product: ShoesProducts) {
    if (product) {
      const { Productid, ...rest } = product;
      const productobj = { Productid: productid, ...rest };
      alert(`✅ ${rest.title} added to cart!`);
      AddCard(productobj);
    }
  }
  function HandleBuy(data: ShoesProducts) {
    setBuyNowItem(data);
    navigate("/Checkout", { state: { from: "BuyNow" } });
  }

  if (CurrentUserLogindata) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative w-screen max-w-[1300px] mx-auto  flex items-center justify-center overflow-visible ">
          <SlideImage />
        </div>

        {/* Categories */}
        <div className="py-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Shop by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2 rounded-full border ${
                activeCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              let catImg = "";
              switch (cat) {
                case "Men's clothing":
                  catImg = man;
                  break;
                case "women's clothing":
                  catImg = woman;
                  break;
                case "Electronics":
                  catImg = Electronic;
                  break;
                case "Jewelery":
                  catImg = jewellary;
                  break;
                default:
                  catImg =
                    "https://cdn-icons-png.flaticon.com/512/1946/1946488.png"; // fallback
              }

              return (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex flex-col items-center cursor-pointer transition ${
                    activeCategory === cat ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full border-2  flex items-center justify-center mb-2 transition ${
                      activeCategory === cat
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={catImg}
                      alt={cat}
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </div>
                  <p className="text-sm font-medium">{cat}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products */}
        <div className="py-10 px-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {activeCategory === "All"
              ? "All Products"
              : `${activeCategory} Collection`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {fiterproduct.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain bg-white p-2"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <div className="flex flex-col justify-end flex-1">
            <p className="text-blue-600 font-bold mt-3 mb-3">₹{product.price}</p>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => AddCartfun(product)}
              >
                Add to Cart
              </button>
              <button
                onClick={() => HandleBuy(product)}
                className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Please log in to view this page.
      </div>
    </>
  );
}

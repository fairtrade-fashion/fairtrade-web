import { setProduct } from "@/redux/slices/product.slice";
import { Product } from "@/lib/product";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const tshirtCard: Product[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
    content: "BUY NOW",
    name: "solomandaras",
    amount: 5000,
    description: "",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    content: "BUY NOW",
    name: "solomandaras",
    amount: 5000,
    description: "",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    content: "BUY NOW",
    name: "solomandaras",
    amount: 5000,
    description: "",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    content: "BUY NOW",
    name: "solomandaras",
    amount: 5000,
    description: "",
  },
];

export default function ShopTshirts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyNow = (product: Product) => {
    dispatch(setProduct(product));
    navigate(`/product/${product.id}`);
  };
  return (
    <section className="bg-gray-50">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mt-16">
        Shop T-Shirts
      </h1>
      <div className="md:grid my-5 pb-2 px-2 md:px-10 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 w-full overflow-auto flex ">
        {tshirtCard.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-auto"
          >
            <div className="relative mx-2 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl">
              <img
                src={item.image}
                alt="shirt"
                className="object-cover w-full h-96 hover:bg-white hover:blur-xs hover:opacity-80"
              />
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-base antialiased font-bold capitalize leading-relaxed text-gray-900">
                  {item.name}
                </p>
                <p className="font-sans text-base antialiased font-medium leading-relaxed ml-5 md:0 text-gray-500">
                  ₦{item.amount}
                </p>
              </div>
            </div>
            <div className="p-6">
              <button
                onClick={() => handleBuyNow(item)}
                className="align-middle bg-gray-700 text-white font-bold text-center uppercase transition-all text-xs py-2 md:py-3 px-6 rounded-lg w-full text-blue-gray-900 hover:scale-105"
                type="button"
              >
                Buy now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="items-center justify-center text-center">
        <Link to={"/category/tshirts"}>
          <button className="px-5 py-3 font-semibold text-xl rounded-lg border-[3px] border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 bg-gradient-to-r from-white via-white to-white bg-[size:_100%] hover:from-gray-600 hover:to-black hover:bg-[position:_100%_100%] transition-all duration-500">
            View More
          </button>
        </Link>
      </div>
    </section>
  );
}

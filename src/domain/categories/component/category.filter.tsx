import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

interface CategoryFilterProps {
  onFilterChange: (
    minPrice?: number,
    maxPrice?: number,
    sizes?: string[]
  ) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [priceOpen, setPriceOpen] = useState<boolean>(false);
  const [sizeOpen, setSizeOpen] = useState<boolean>(false);

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange(minPrice, maxPrice, selectedSizes);
    }
  }, [minPrice, maxPrice, selectedSizes, onFilterChange]);

  const sizes = ["small", "medium", "large", "xlarge", "xxlarge"];
  const labels = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (size: string, checked: boolean) => {
    setSelectedSizes((prev) => {
      if (checked) {
        return [...prev, size];
      } else {
        return prev.filter((s) => s !== size);
      }
    });
  };

  return (
    <div className="">
      <div className="lg:flex block mt-2 lg:mt-20">
        {/* Filter Component */}
        <div className="p-5 w-full">
          <h1 className="text-2xl lg:text-4xl pb-2 font-medium text-gray-800">
            Filter by
          </h1>

          <div className="flex lg:block gap-5 lg:gap-0">
            {/*==== PRICE ====*/}
            <div className="lg:overflow-hidden lg:border-t border-gray-400 rounded-md lg:rounded-none bg-gray-700 lg:bg-transparent p-2 md:p-4">
              <div
                className="flex justify-between"
                onClick={() => setPriceOpen(!priceOpen)}
              >
                <h1 className="font-bold text-sm md:text-base text-white lg:text-gray-600">
                  Price
                </h1>
                <button className="flex h-auto cursor-pointer items-center justify-between">
                  <svg
                    className="ml-8 shrink-0 fill-white lg:fill-[#413932]"
                    width="21"
                    height="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="9"
                      width="21"
                      height="2.5"
                      rx="1"
                      className={`origin-center transform transition duration-500 ease-out ${
                        priceOpen ? "!rotate-180" : ""
                      }`}
                    />
                    <rect
                      y="9"
                      width="21"
                      height="2.5"
                      rx="1"
                      className={`duration-700 origin-center rotate-90 transform transition ease-out ${
                        priceOpen ? "!rotate-180" : ""
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`overflow-hidden lg:px-2 px-8 text-justify text-base transition-all duration-700 ease-[cubic-bezier(1,0,1,0)] ${
                  priceOpen
                    ? "max-h-[9999px] absolute lg:relative mt-5 lg:mt-0 -ml-10 lg:-ml-0 z-10 lg:z-0 w-full bg-white p-5 lg:p-0 opacity-100"
                    : "absolute lg:relative z-0 w-full max-h-0 opacity-0"
                }`}
              >
                {/* === Price Range === */}
                <div className="my-5 space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="min-price" className="font-medium mb-1">
                      Minimum Amount
                    </label>
                    <input
                      id="min-price"
                      className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      type="number"
                      placeholder="Min"
                      value={minPrice || ""}
                      onChange={(e) =>
                        setMinPrice(
                          e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="max-price" className="font-medium mb-1">
                      Maximum Amount
                    </label>
                    <input
                      id="max-price"
                      className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      type="number"
                      placeholder="Max"
                      value={maxPrice || ""}
                      onChange={(e) =>
                        setMaxPrice(
                          e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*==== SIZE ====*/}
            <div className="overflow-hidden lg:border-t lg:mt-4 lg:border-b border-gray-400 rounded-md lg:rounded-none bg-gray-700 lg:bg-transparent p-2 md:p-4">
              <div
                className="flex justify-between"
                onClick={() => setSizeOpen(!sizeOpen)}
              >
                <h1 className="font-bold text-sm md:text-base text-white lg:text-gray-600">
                  Size
                </h1>
                <button className="flex h-auto cursor-pointer items-center justify-between lg:pb-6">
                  <svg
                    className="ml-8 shrink-0 fill-white lg:fill-[#413932]"
                    width="21"
                    height="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="9"
                      width="21"
                      height="2.5"
                      rx="1"
                      className={`origin-center transform transition duration-500 ease-out ${
                        sizeOpen ? "!rotate-180" : ""
                      }`}
                    />
                    <rect
                      y="9"
                      width="21"
                      height="2.5"
                      rx="1"
                      className={`duration-700 origin-center rotate-90 transform transition ease-out ${
                        sizeOpen ? "!rotate-180" : ""
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`overflow-hidden lg:px-2 px-8 text-justify text-base transition-all duration-700 ease-[cubic-bezier(1,0,1,0)] ${
                  sizeOpen
                    ? "max-h-[9999px] absolute lg:relative mt-5 lg:mt-0 -ml-40 lg:-ml-0 z-10 lg:z-0 w-full bg-white p-5 lg:p-0 opacity-100"
                    : "absolute lg:relative z-0 w-full max-h-0 opacity-0"
                }`}
              >
                {/* === size check === */}
                <div className="space-y-2">
                  {sizes.map((size, index) => (
                    <div key={size} className="flex items-center space-x-2">
                      <input
                        className="form-checkbox h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500 focus:border-gray-500"
                        type="checkbox"
                        id={`size-${size}`}
                        checked={selectedSizes.includes(size)}
                        onChange={(e) =>
                          handleSizeChange(size, e.target.checked)
                        }
                      />
                      <label
                        className="text-gray-800 cursor-pointer"
                        htmlFor={`size-${size}`}
                      >
                        {labels[index]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;

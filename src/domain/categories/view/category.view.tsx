import { useState } from "react";
import CategoryFilter from "../component/category.filter";
import CategoryProduct from "../component/category.Product";

export default function CategoryView() {
  // State to hold filter values
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleFilterChange = (
    minPrice?: number,
    maxPrice?: number,
    sizes?: string[]
  ) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setSelectedSizes(sizes || []);
  };

  return (
    <div className="w-full block lg:flex">
      <div className="w-full lg:w-[20%]">
        <CategoryFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full lg:w-[80%]">
        <CategoryProduct
          minPrice={minPrice}
          maxPrice={maxPrice}
          selectedSizes={selectedSizes}
        />
      </div>
    </div>
  );
}

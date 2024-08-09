import DeliverDoorstep from "../component/deliver_doorstep";
import HeroComp from "../component/hero_comp";
import NewArrival from "../component/new_arrival";
import ShopAccessories from "../component/shop_accessories";
import ShopJeans from "../component/shop_jeans";
import ShopShirt from "../component/shop_shirt";
import ShopTshirts from "../component/shop_T-shirts";
import SubscribeNow from "../component/subscribe_now";

export default function HomeView() {
  return (
    <div>
      <HeroComp />
      <NewArrival />
      <ShopTshirts />
      <ShopJeans />
      <ShopShirt />
      <DeliverDoorstep />
      <ShopAccessories />
      <SubscribeNow />
    </div>
  );
}

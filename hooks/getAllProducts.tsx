import { errorAlert } from "@/components/appAlerts/appAlert";
import { setProductList } from "@/redux/slice/ProductSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function useGetAllProducts() {
  const dispatch = useDispatch();
  const url = "https://dummyjson.com/products";
  async function getAllProductsApi() {
    const res = await axios.get(url);
    // console.log(res.data);
    const data = res.data;
    if (res.data) {
      console.log("PRODUCT DATA GET:: SUCCESS");
      if (data.products) {
        dispatch(setProductList(data.products));
      } else {
        console.error("Products list error");
      }
    } else {
      errorAlert(2000, "Error Fetching Products List");
    }
  }

  return { getAllProductsApi };
}

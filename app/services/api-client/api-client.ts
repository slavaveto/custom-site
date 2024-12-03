import axios from "axios";
import toast from "react-hot-toast";

//SITES
export const fetchSiteInformation = async () => {
  try {
    const { data } = await axios.get("/api/sites");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Site Information could not be loaded");
  }
};

//PAGES
export const fetchPages = async () => {
  try {
    const { data } = await axios.get("/api/pages");
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Pages could not be loaded");
  }
};

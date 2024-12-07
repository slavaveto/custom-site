import axios from "axios";
import toast from "react-hot-toast";

//SITES
export const fetchSiteInformation = async (userLanguage: string) => {
  try {
    const { data } = await axios.get("/api/sites", {
      params: {
        lang: userLanguage,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Site Information could not be loaded");
  }
};

//PAGES
export const fetchPages = async (userLanguage: String) => {
  try {
    const { data } = await axios.get("/api/pages", {
      params: {
        lang: userLanguage,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Pages could not be loaded");
  }
};

//MESSAGES

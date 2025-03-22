import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

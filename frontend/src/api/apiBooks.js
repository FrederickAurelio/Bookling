import { api } from "../utils/axios";

export async function getBook(bookId){
  try {
    const response = await api.get(`/booklist/${bookId}/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get book data")
  }
}
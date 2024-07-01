import { api } from "../utils/axios";

export async function getBook(bookId) {
  try {
    const response = await api.get(`/booklist/${bookId}/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get book data")
  }
}

export async function createBook(formData) {
  try {
    const response = await api.post("/booklist/create/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new book")
  }
}
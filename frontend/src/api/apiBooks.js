import { api } from "../utils/axios";
import { convertUrlToFile } from "../utils/helpers";

export async function getBook(bookId) {
  try {
    const response = await api.get(`/booklist/${bookId}/`);
    const imageInput = await convertUrlToFile(response.data.cover_url);
    return { ...response.data, imageInput: imageInput };
  } catch (error) {
    throw new Error("Failed to get book data")
  }
}

export async function editBook(formData, id) {
  try {
    const response = await api.put(`/booklist/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data;
  } catch (error) {
    throw new Error("Failed to update book")
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
export async function deleteBook(id) {
  try {
    const response = await api.delete(`/booklist/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete book")
  }
}
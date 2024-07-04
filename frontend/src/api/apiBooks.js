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

export async function likeBook(id) {
  try {
    const response = await api.post(`/booklist/${id}/like/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to like the book")
  }
}

export async function unlikeBook(id) {
  try {
    const response = await api.delete(`/booklist/${id}/unlike/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to unlike the book")
  }
}

export async function getBooks({ pageParam, sortBy, asc, searchType, searchValue, price, genre }) {
  const search = `${searchValue ? `&search-${searchType}=${searchValue}` : ""}`
  const genres = `${genre === "all" ? "" : `genres=${genre}&`}`
  try {
    const response = await api.get(`/booklist/?${genres}price=${price}${search}&sortBy=${asc === "asc" ? "" : "-"}${sortBy}&page=${pageParam}`);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch books")
  }
}

export async function getMyLike({ pageParam, username }) {
  try {
    const response = await api.get(`/booklist/like/?name=${username}&page=${pageParam}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch books")
  }
}

export async function getMyPost({ pageParam, username }) {
  try {
    const response = await api.get(`/booklist/owned/?name=${username}&page=${pageParam}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch books")
  }
}
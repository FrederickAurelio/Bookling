import Resizer from "react-image-file-resizer";

export const baseURL = "http://192.168.3.25:8000/"
// export const baseURL = "http://127.0.0.1:8000/"

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export const convertUrlToFile = async (url) => {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => new File([blob], "image.jpg", { type: blob.type }));
};


export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600, // width
      900, // height (1:1.5 ratio)
      "JPEG",
      100, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      "file",
      600, // min width
      900, // min height
      { aspectRatio: 2 / 3, lockAspectRatio: true } // Maintain aspect ratio
    );
  });

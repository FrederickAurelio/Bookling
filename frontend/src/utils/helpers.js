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

export const baseURL = "http://192.168.3.25:8000/"
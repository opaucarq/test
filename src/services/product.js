export default async function fetchProducts() {
  const options = { method: 'GET' };

  try {
    const response = await fetch('http://localhost:5000/api/products', options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
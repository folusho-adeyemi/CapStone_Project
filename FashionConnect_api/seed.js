import { Product } from './models/index.js';
import axios from 'axios';

export default async function fetchAndStoreProducts(currentPage, pageSize) {
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${currentPage}&pagesize=${pageSize}`;
  const options = {
    headers: {
      'X-RapidAPI-Key': '39fa560be9msh5ddfa46cd77e6ecp166650jsnc8206520d7a0',
      'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.get(url, options);
    const data = response.data;
    const { results } = data;

    // Map the API response to match your database schema
    const mappedProducts = results.map((result) => ({
      Name: result.name,
      Price: result.price?.value || 0,
      Image_URL: result.images[0]?.url || null,
      CategoryName: result.categoryName,
      BrandName: result.brandName,
    }));

    // Store the mapped products in the database using Sequelize's bulkCreate
    await Product.bulkCreate(mappedProducts);

    return mappedProducts;
  } catch (error) {
    throw error;
  }
}




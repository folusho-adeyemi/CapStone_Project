import { Product } from './models/index.js';

const url = 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=500';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4ecf7b02f6mshe1fb9d190d9f5f0p1dc11cjsn12e4e06a025c',
    'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
  }
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
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

  console.log('Products have been stored in the database successfully!');
} catch (error) {
  throw error;
}
import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Info about the best selling products</p>
      </div>
      
      <div className="products-container">
        {
          // Loop through the products and display them
          ["Product 1", "Product 2", "Product 3"].map((product) => (
            <div>{product}</div>
          ))
        }
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home
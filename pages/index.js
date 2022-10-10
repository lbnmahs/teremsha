import React from 'react'

const index = () => {
  return (
    <>
      HeroBanner

      <div className="products-heading">
        <div>Best selling products</div>
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

      Footer
    </>
  )
}

export default index
import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
    const { name, price, image, details } = product;
    const [ index, setIndex ] = useState(0);
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image" />
                    </div>
                    <div className="small-images-container">
                        {
                            image?.map((image, i) => (
                                <img 
                                    src={urlFor(image)}
                                    key={i}  
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={() => setIndex(i)}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>20</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">Ksh. {price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick=""><AiOutlineMinus /></span>
                            <span className="num" onClick="">0</span>
                            <span className="plus" onClick=""><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick="" className="add-to-cart">Add to cart</button>
                        <button type="button" onClick="" className="buy-now">Buy now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container">
                        {/* Add the track class if products exceeds the screen width */}
                        {
                            products?.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export const getStaticPaths = async () => {
    const productsQuery = `*[_type == "product"] {
        slug{
            current
        }
    }`;
    const products = await client.fetch(productsQuery);

    const paths = products.map((product) => ({
        params: { slug: product.slug.current },
    }));

    return { paths, fallback: 'blocking' };
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails

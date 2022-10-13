import React, { useRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import Link from 'next/link'


const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantity, cartItems, setshowCart, toggleCartItemQuantity, removeFromCart } = useStateContext()
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button 
          type="button" 
          className="cart-heading"
          onClick={() => setshowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">{totalQuantity} items</span>
          
        </button>
        {
          cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={100} />
              <h3>Your bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setshowCart(false)}
                >Continue shopping</button>
              </Link>
            </div>
          )
        }
        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} className="cart-product-image" alt="" />
                <div className="item-desc">
                  <div div="flex top">
                    <h5>{item.name}</h5>
                    <h4>Ksh. {item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                        <span className="num" onClick="">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                      </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => removeFromCart(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h4>Total</h4>
                <h4>Ksh. {totalPrice}</h4>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick="">Continue to checkout</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Cart
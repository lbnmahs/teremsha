import React from 'react'
import Link from 'next/link'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const NavBar = () => {
  const { showCart, setshowCart, totalQuantity } = useStateContext()
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">TEREMSHA</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => setshowCart(true)}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantity}</span>
      </button>
      { showCart && <Cart /> }
    </div>
  )
}

export default NavBar
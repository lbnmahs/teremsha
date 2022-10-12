import React from 'react'
import Link from 'next/link'

import { AiOutlineShoppingCart } from 'react-icons/ai'

const NavBar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">TEREMSHA</Link>
      </p>
      <button type="button" className="cart-icon" onCLick="">
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  )
}

export default NavBar
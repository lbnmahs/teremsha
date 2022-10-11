import React from 'react'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">Small Text</p>
        <h3>Mid Text</h3>
        <img src="" alt="" className="hero-banner-image" />

        <div>
          <Link href="/products/id">
            <button type="button" className="">Button Text</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>Info about the product</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroBanner

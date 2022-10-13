import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setshowCart] = useState(false)
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [totalQuantity, settotalQuantity] = useState(0)
    const [qty, setqty] = useState(1)


    let foundProduct;
    let index;

    const incrementQty = () => {
        setqty((prevQty) => prevQty + 1);
    }
    const decrementQty = () => {
        setqty((prevQty) => {
            if (prevQty - 1 > 1) return 1;
            return prevQty - 1;
        })
    }
    const addToCart = (product, quantity) => {
        const chackProductInCart = cartItems.find((item) => item._id === product._id);

        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (chackProductInCart) {
            const newCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    }
                }
            })
            setcartItems(newCartItems); 
        }else{
            product.quantity = quantity;
            setcartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to cart`);
    }

    const removeFromCart = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItem = cartItems.filter((item) => item._id !== product._id);

        settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
        setcartItems(newCartItem);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItem = cartItems.filter((item) => item._id !== id);

        if (value === 'inc') {
            setcartItems( [...newCartItem, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            settotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
        }else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setcartItems( [...newCartItem, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                settotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
            }
        }
    }

    return (
        <Context.Provider
            value={{ 
                showCart,
                setshowCart,
                cartItems, 
                totalPrice, 
                totalQuantity, 
                qty,
                incrementQty,
                decrementQty,
                addToCart,
                toggleCartItemQuantity,
                removeFromCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
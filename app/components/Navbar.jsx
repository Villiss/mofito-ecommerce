import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import Strings from '../config/strings'

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">
          {Strings.general_mofito}
        </Link>
      </p>

      <button type='button' className='cart-icon' onMouseEnter={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
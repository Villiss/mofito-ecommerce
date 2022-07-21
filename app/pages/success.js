import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'
import Strings from '../config/strings'

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireworks()
    }, [])
    

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>
                    {Strings.success_thank_you_for_your_order}
                </h2>
                <p className='email-msg'>
                    {Strings.success_check_your_email}
                </p>
                <p className='description'>
                    {Strings.success_if_you_have_questions}
                    <a className='email' href='mailto:lukas.vilim@outlook.com'>
                        lukas.vilim@outlook.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' width='300px' className='btn'>
                        {Strings.cart_continue_shopping}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success
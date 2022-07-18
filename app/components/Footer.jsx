import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import Strings from '../config/strings'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>{`${new Date().getFullYear()} ${Strings.general_mofito} ${Strings.footer_all_rights_reserved}`}</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer
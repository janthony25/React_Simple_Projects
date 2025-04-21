import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav>
            <ul>
                <li><Link to="/">Task Form</Link></li>
                <li><Link to="simpleForm">Simple Form</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header

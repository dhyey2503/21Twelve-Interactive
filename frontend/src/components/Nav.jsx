import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Nav(){
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-xl font-semibold">21Twelve Interactive</Link>
        <div className="space-x-3">
          {token ? (
            <>
              <Link to="/shops/new" className="text-sm">Create Shop</Link>
              <Link to="/products/new" className="text-sm">Create Product</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-sm">Register</Link>
              <Link to="/login" className="text-sm">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

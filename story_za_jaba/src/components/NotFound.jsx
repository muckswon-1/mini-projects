import React from 'react'
import { Link } from 'react-router-dom'


function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Page Not Found</h1>
        <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <p>
          Go back <Link to='/'>Home</Link>
        </p>
      </div>
    </div>
  )
}

export default NotFound
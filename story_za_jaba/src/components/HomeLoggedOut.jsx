import React from 'react'
import { Link } from 'react-router-dom'

function HomeLoggedOut() {
  return (
    <main className="flex flex-col items-center justify-center text-center p-8 mt-48 z-10">
      <p className="text-xl mb-4">
        Welcome to Story Za Jaba. Read and share  blogs from people across Africa.
      </p>
      <div>
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mr-2"
        >
          Register
        </Link>
        or
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ml-2"
        >
          Login  </Link>
          to get started.
      </div>
    </main>
  );
}

export default HomeLoggedOut
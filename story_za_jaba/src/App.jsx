
import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from './features/profile/profileSlice'
import HomeLoggedIn from './components/HomeLoggedIn'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import CreatePost from './components/CreatePost'
import EditProfileForm from './components/EditProfile'
import { selectUsers } from './features/users/usersSlice'
import React, { useEffect, useState } from 'react'


function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const allUsers = useSelector(selectUsers);
  const [users, setUsers] = useState(allUsers)

  useEffect(() => {
    
  },[isAuthenticated, users])

  
  return (
    <>
    <Router>
      <Header/>
      <Routes>
         <Route
         path='/'
         element={<HomeLoggedIn users={users}/>}
         />
           <Route
         path='login'
         element={<Login/>}
         />

          <Route
         path='register'
         element={<Register users={users}/>}
         />
         <Route path='profile/:username' element={ isAuthenticated ? <Profile users = {users}/> : <Navigate to='/login'/>}/>
         <Route path='posts/create/:username' element={ isAuthenticated ? <CreatePost/> : <Navigate to='/login'/>}/>
         <Route path='profile/:username/edit' element ={ isAuthenticated ?  <EditProfileForm/> : <Navigate to='/login'/> }/>
        

        

          <Route path="*" element={<NotFound />} />
      </Routes>

     
    </Router>
    </>
  )
}

export default App

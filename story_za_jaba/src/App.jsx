
import './App.css'
import { Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated } from './features/profile/profileSlice'
import HomeLoggedIn from './components/HomeLoggedIn'
import Login from './components/Login'
import Register from './components/Register'
import ErrorBoundary from './components/ErrorBoundary'

import CreatePost from './components/CreatePost'
import EditProfileForm from './components/EditProfile'
import { selectUsers } from './features/users/usersSlice'
import React, {  useState } from 'react'
import CurrentUserProfile from './components/CurrentUserProfile'
import UserProfile from './components/UserProfile'


function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const allUsers = useSelector(selectUsers);
  const [users, setUsers] = useState(allUsers);
 
  const currentUser = useSelector(selectCurrentUser);
 
  
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
         <Route path='profile/:username' element={ isAuthenticated ? <CurrentUserProfile users = {users}/> : <Navigate to='/login'/>}/>
         <Route path='users/profile/:username' element={<UserProfile currentUser={currentUser}/>} />
         <Route path='posts/create/:username' element={ isAuthenticated ? <CreatePost/> : <Navigate to='/login'/>}/>
         <Route path='profile/:username/edit' element ={ isAuthenticated ?  <EditProfileForm/> : <Navigate to='/login'/> }/>
        

        

          <Route path="*" element={<ErrorBoundary />} />
      </Routes>

     
    </Router>

   
    </>
  )
}

export default App

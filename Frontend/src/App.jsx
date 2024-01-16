import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Welcome from './components/Welcome'
import Login from './features/auth/Login'
import Header from './components/Navbar'
import DashLayout from './components/DashLayout'
import UserWelcome from './features/auth/UserWelcome'

function App() {

  return (
    <>
<Header/>
<Routes>

<Route>

<Route path='/' element = {<Layout/>}/>
<Route index element = {<Welcome/>}/>
<Route path='/login' element = {<Login/>}/>

<Route path='/dash' element = {<DashLayout/>}>
  <Route index element = {<UserWelcome/>}/>
</Route>


</Route>

</Routes>
    </>
  )
}

export default App
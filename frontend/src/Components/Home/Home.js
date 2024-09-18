import React from 'react'
// import Dashboard from '../Dashboard/Dashboard'
// import { MainLayout } from '../../styles/Layouts'

import Login from '../Login/Login'
import { MainLayout } from '../../styles/Layout'

const Home = () => {
  return (
    <div>
         <MainLayout>
        <main>
          <Login/>
        </main>
      </MainLayout> 
    </div>
  )
}

export default Home
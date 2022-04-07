import React from 'react'
import { Outlet } from 'react-router-dom'

import ProfileLeft from '../components/ProfileLeft'

const Profile = () => {
  return (
    <section className="body-font mx-48 flex justify-center text-gray-600">
      <div className="py-10">
        <ProfileLeft />
      </div>
      <div className="w-full py-10">
        <Outlet />
      </div>
    </section>
  )
}

export default Profile

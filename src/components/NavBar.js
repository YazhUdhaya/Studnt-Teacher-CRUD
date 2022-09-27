
import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css';
function NavBar() {
  return <>
  <nav >
    <div> <h5>Students & Teachers Management</h5> </div>
    <div >
   <Link to = "create-student" style={{textDecoration: 'none'}}><span>Create student</span></Link>
    <Link to = "create-mentor" style={{textDecoration: 'none'}}><span>Create mentor</span></Link>
    <Link to = "assign-mentor"style={{textDecoration: 'none'}} ><span>Assign mentor</span></Link>
    <Link to = "change-mentor" style={{textDecoration: 'none'}}><span>Change mentor</span></Link>
    

    
    </div>
   <div><Link to = "/" style={{textDecoration: 'none'}}><span> Dashboard</span></Link></div>
  </nav>
  </>
}

export default NavBar
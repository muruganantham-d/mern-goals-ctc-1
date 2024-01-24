import React from 'react';
import{FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../features/auth/authSlice';


const Header = () => {
        
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user}  =
    useSelector(
     (state) => state.auth 
     );
    //  for logout
    const onLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('./login')
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to="/">Goal Setter</Link>
        </div>
        <ul>
            <li>
                <FaUser/><Link to='/register'>Register</Link>
            </li>
            {user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                     <FaSignOutAlt/>
                     Logout
                    </button>
                </li>
            ) : (
                <li>
                <FaSignInAlt/><Link to='/login'>Login</Link>
            </li>
            )

            }
        </ul>
    </header>
  )
}

export default Header
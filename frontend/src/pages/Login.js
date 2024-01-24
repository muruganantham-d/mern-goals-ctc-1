import React, { useEffect, useState } from 'react';
import {FaSignInAlt, FaUser} from 'react-icons/fa';

import { reset, login} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const {user, isError, isLoading, isSuccess, message}  =
     useSelector(
      (state) => state.auth 
      );
    
      useEffect(() => {
        if(isError) {
         toast.error(message);
        }
        if(isSuccess && user) {
           navigate('/');
        }
        dispatch(reset());
   },[user, isError, isSuccess, message, navigate, dispatch])



    const onChange = (e) => {
        setFormData((prevState) => ({
            //this pre sate is above name,email... fields
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
          email,
          password,
        };
        dispatch(login(userData))
    }
    
  // for loading
   if(isLoading) {
   <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/>
          Login
        </h1>
        <p>Pleace Login and set goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Pleace Enter email"
              id="email"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Pleace Enter password"
              id="password"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className='form-group'> 
              <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
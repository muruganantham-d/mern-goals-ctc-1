import React, { useEffect, useState } from 'react';
import {FaUser} from 'react-icons/fa';
import { reset, register } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';



function Register()  {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const {name, email, password, password2} = formData;

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
        if(password !== password2) {
            toast.error('password is not matching');
        }else {
          const userData = {
            name,
            email,
            password
          };
          dispatch(register(userData))
        }
    }
// for loading
 if(isLoading) {
  <Spinner/>
 }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Pleace create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Pleace Enter Name"
              id="name"
              className="form-control"
              onChange={onChange}
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="Pleace Enter password2"
              id="password2"
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

export default Register
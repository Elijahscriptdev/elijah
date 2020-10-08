import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./sign-in.css";
import { EmailField, PasswordField } from "../../components/auth/auth";
import { postSignIn } from "../../actions/sign-in";
import { useDispatch } from 'react-redux';

const SignInPage = props => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [LoginErrors,setLoginErrors] = useState('');
  const dispatch = useDispatch();

  
  function handleSubmit(event) {
    // const { email, password } = this.state;
    dispatch(postSignIn(email, password));   
    event.preventDefault(); 
  }

  return (
      <div className="sign-in-form">
        <h3 className="sign-in-header">Sign in to your account</h3>
        <form onSubmit={handleSubmit}>
         
        <div className="input-group">
      <span className="input-group-addon"> <i className="fa fa-envelope"></i> </span>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="email@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
    </div>

        <div className="input-group">
      <span className="input-group-addon"> <i className="fa fa-lock"></i> </span>
      <input
        className="form-control"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
    </div>

          
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value="Sign in"
          />
        </form>
      </div>
    );  
}

SignInPage.propTypes = {  
  postSignIn: PropTypes.func.isRequired,
};
 
export default SignInPage;

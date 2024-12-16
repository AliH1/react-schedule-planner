import { useEffect, useState } from 'react';
import { registerUser } from '../api';

type registerProps = {
  handleRegister: Function;
  openModal: boolean;
}

export default function RegisterForm(props: registerProps) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState({email: '', errorMessage: ''});
  const [username, setUsername] = useState({username: '', errorMessage: 'Username must be alphanumeric and between 5-20 characters'});
  const [password, setPassword] = useState({password: '', errorMessage: 'password must contain a number and a special character'});
  const [confirmPassword, setConfirmPassword] = useState({confirmPassword: '', errorMessage: ''});

  const resetState = () => {
    setError('');
    setEmail({email: '', errorMessage: ''});
    setUsername({username: '', errorMessage: 'Username must be alphanumeric and between 5-20 characters'});
    setPassword({password: '', errorMessage: 'password must contain a number and a special character'});
    setConfirmPassword({confirmPassword: '', errorMessage: ''});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //api call to register user
    const submit = await registerUser({username: username.username, email: email.email, password: password.password});
    if(submit.message === 'User registered successfully'){
      props.handleRegister();
      resetState();
    }
    else{
      setError(submit.response.data.message);
    }
  }

  useEffect(() => {
    if(props.openModal){
      resetState();
    }
  },[props.openModal]);

  function validateEmail(e: React.FormEvent<HTMLInputElement>){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(e.currentTarget.value.match(emailRegex)){
      return '';
    }
    return 'Please enter a valid email address';
  }
  function validateUserName(e: React.FormEvent<HTMLInputElement>){

    if(e.currentTarget.value.length < 5) {
      return 'Enter a username with atleast 5 characters';
    }
    if(e.currentTarget.value.length > 20) {
      return 'Enter a username with less than 20 characters';
    }
    if(e.currentTarget.value === "Guest" || e.currentTarget.value === "guest") {
      return 'The username Guest cannot be used';
    }
    const usernameRegex = /^[a-zA-Z0-9]*$/;
    if(e.currentTarget.value.match(usernameRegex)){
      return '';
    }
    return 'Enter a username that contains only Letters and Numbers';
  }
  function validatePassword(e: React.FormEvent<HTMLInputElement>){
    if(e.currentTarget.value.length < 8) {
      return 'Enter a password with atleast 8 characters';
    }
    const specialRegex = /[^a-zA-Z0-9 ]/;
    const numberRegex = /\d/;
    if(!specialRegex.test(e.currentTarget.value) || !numberRegex.test(e.currentTarget.value)){
      return 'password must contain a special character and a number';
    }
    return '';
  }
  function validateConfirmPassword(e: React.FormEvent<HTMLInputElement>){
    if(e.currentTarget.value !== password.password){
      return 'Passwords do not match';
    }
    return '';
  }

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail({email: e.currentTarget.value, errorMessage: validateEmail(e)});
  }
  //function to handle usernames basically all usernames will default to format 'User' first ltter capitlized
  function capitalizeFirstLetterOnly(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const hanndleUserNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername({username: capitalizeFirstLetterOnly(e.currentTarget.value), errorMessage: validateUserName(e)});
  }
  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword({password: e.currentTarget.value, errorMessage: validatePassword(e)});
  }

  const handleConfirmPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword({confirmPassword: e.currentTarget.value, errorMessage: validateConfirmPassword(e)});
  }

  return(
    <>
      <form onSubmit={handleSubmit} className='register-form-container'>
        <div>
          <label htmlFor='email'>Email</label>
          <input value={email.email} type='email' id='email' placeholder='Enter email' autoComplete='off' onChange={handleEmailChange} required/>
          <label className='error-msg'>{email.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input value={username.username} type='text' id='username' autoComplete='off' placeholder='Enter Username' onChange={hanndleUserNameChange} required/>
          <label className='error-msg'>{username.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input value={password.password} type='password' id='password' placeholder='Enter password (atleast 8 characters)' onChange={handlePasswordChange} required/>
          <label className='error-msg'>{password.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='password'>Confiirm Password</label>
          <input value={confirmPassword.confirmPassword} type='password' id='password' placeholder='Enter matching password' onChange={handleConfirmPasswordChange} required/>
          <label className='error-msg'>{confirmPassword.errorMessage}</label>
        </div>
        <label className='error-msg'>{error}</label>
        <button aria-label='Complete Sign up' type='submit' disabled={!(email.errorMessage==='' && username.errorMessage=== ''
          && password.errorMessage=== '' && confirmPassword.errorMessage=== '')}>Register</button>
      </form>
    </>
  );
}
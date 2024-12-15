import { useState } from 'react';

export default function registerModal() {
  const [email, setEmail] = useState({email: '', errorMessage: ''});
  const [username, setUsername] = useState({username: '', errorMessage: 'Username must be alphanumeric and between 5-20 characters'});
  const [password, setPassword] = useState({password: '', errorMessage: 'password must contain a number and a character from !@#$%^&*()_+'});
  const [confirmPassword, setConfirmPassword] = useState({confirmPassword: '', errorMessage: ''});

  const handleSubmit = (e: React.FormEvent) => {
    //TODO if everything is valid input register the user to database
    e.preventDefault();
  }

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
    const usernameRegex = /^[a-z0-9]*$/;
    if(e.currentTarget.value.match(usernameRegex)){
      return '';
    }
    return 'Enter a username that contains only Letters and Numbers';
  }
  function validatePassword(e: React.FormEvent<HTMLInputElement>){
    if(e.currentTarget.value.length < 8) {
      return 'Enter a password with atleast 8 characters';
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
  const hanndleUserNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername({username: e.currentTarget.value, errorMessage: validateUserName(e)});
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
          <input type='email' id='email' placeholder='Enter email' autoComplete='off' onChange={handleEmailChange} required/>
          <label className='error-msg'>{email.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' autoComplete='off' placeholder='Enter Username' onChange={hanndleUserNameChange} required/>
          <label className='error-msg'>{username.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Enter password (atleast 8 characters)' onChange={handlePasswordChange} required/>
          <label className='error-msg'>{password.errorMessage}</label>
        </div>
        <div>
          <label htmlFor='password'>Confiirm Password</label>
          <input type='password' id='password' placeholder='Enter matching password' onChange={handleConfirmPasswordChange} required/>
          <label className='error-msg'>{confirmPassword.errorMessage}</label>
        </div>
        <button aria-label='Complete Sign up' type='submit' disabled={!(email.errorMessage==='' && username.errorMessage=== ''
          && password.errorMessage=== '' && confirmPassword.errorMessage=== '')}>Register</button>
      </form>
    </>
  );
}
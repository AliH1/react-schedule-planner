import { useState, useEffect } from 'react';
import { loginUser } from '../api';

type loginFormProps = {
  handleLogin: Function;
  openModal: boolean;
}

export default function LoginForm(props: loginFormProps) {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setError('');
    setUsername('');
    setPassword('');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //api call for login
    const submit = await loginUser({username, password});
    if(submit.message === 'User logged in successfully'){
      props.handleLogin(username);
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

  function capitalizeFirstLetterOnly(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const handleUsernameChage= (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(capitalizeFirstLetterOnly(e.currentTarget.value));
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return(
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div>
          <label htmlFor='username'>Username</label>
          <input value={username} type='text' id='username' placeholder='Enter username' autoComplete="off" onChange={handleUsernameChage} required/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input value={password} type='password' id='password' placeholder='Enter password' onChange={handlePasswordChange} required/>
        </div>
        <label className='error-msg'>{error}</label>
        <button aria-label='Log in' type='submit'>Login</button>
      </form>

  );
}
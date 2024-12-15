import { useState } from 'react';

type loginFormProps = {
  handleLogin: Function;
}
export default function LoginForm(props: loginFormProps) {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    //todo check if email and password match update error accordingly
    e.preventDefault();
    props.handleLogin(username);
  }

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
          <input type='text' id='username' placeholder='Enter username' autoComplete="off" onChange={handleUsernameChage} required/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Enter password' onChange={handlePasswordChange} required/>
        </div>
        <label className='err-msg'>{}</label>
        <button aria-label='Log in' type='submit'disabled={!(error==='')}>Login</button>
      </form>

  );
}
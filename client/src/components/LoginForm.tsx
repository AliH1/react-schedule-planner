import { useState } from 'react';

type loginFormProps = {
  handleLogin: Function;
}
export default function LoginForm(props: loginFormProps) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    //todo check if email and password match update error accordingly
    e.preventDefault();
    props.handleLogin('Harry');
  }

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return(
      <form onSubmit={handleSubmit} className='login-form-container'>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' placeholder='Enter email' autoComplete="off" onChange={handleEmailChange} required/>
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
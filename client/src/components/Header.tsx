import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

type headerProps = {
  userName: String;
  openLoginModal: Function;
  openRegisterModal: Function;
  handleLogOut: Function;
}

export default function Header({userName, openLoginModal, openRegisterModal, handleLogOut} : headerProps) {
  return (
    <>
      <header>
        <h2><FontAwesomeIcon icon={faUser} className='fa-solid'/>{' '+userName}</h2>
        <img src={logo} alt='logo' />
        {userName === 'Guest' ?
          <nav>
            <button onClick={() => openLoginModal()} aria-label='log in' >Log in</button>
            <button onClick={() => openRegisterModal()} aria-label='sign up' >Sign Up</button>: <></>
          </nav>:
          <nav>
            <button onClick={() => handleLogOut()} aria-label='log out' >Log Out</button>
          </nav>
      }
      </header>
    </>
  );
}
import { useEffect, useState} from 'react';
import EventCalendar from './components/EventCalendar';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [userName, setUserName] = useState<String>('Guest');
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  //this code will basically warn the user that created events will be lost if they close the tab without creating an account
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    if (userName === 'Guest') {
      window.addEventListener('beforeunload', handler);
      return () => {
        window.removeEventListener('beforeunload', handler);
      };
    }
    return () => {};
  }, [userName]);

  const handleLogin = (user: String) => {
    setUserName(user);
    setLoginModal(false);
  }

  const handleLogOut = () => {
    setTimeout(() => {
      setUserName('Guest');
    }, 1000);
  }

  return (
    <>
      <Header userName={userName}
        openLoginModal={() => setLoginModal(true)}
        openRegisterModal={() => setRegisterModal(true)}
        handleLogOut={handleLogOut} />
      <main>
        <EventCalendar userName={userName}/>
        <Modal openModal={loginModal} closeModal={() => setLoginModal(false)} >
          <LoginForm handleLogin={handleLogin}/>
        </Modal>
        <Modal openModal={registerModal} closeModal={() => setRegisterModal(false)} >
          <RegisterForm />
        </Modal>
      </main>
      <Footer userName={userName} />
    </>
  );
}

export default App;

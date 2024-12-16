import { useState } from 'react';
import EventCalendar from './components/EventCalendar';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [userName, setUserName] = useState<string>('Guest');
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleLogin = (user: string) => {
    setLoginModal(false);
    setUserName(user);
  }

  const handleRegister = () =>{
    setRegisterModal(false);
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
          <LoginForm handleLogin={handleLogin} openModal={loginModal} />
        </Modal>
        <Modal openModal={registerModal} closeModal={() => setRegisterModal(false)} >
          <RegisterForm handleRegister={handleRegister} openModal={registerModal}/>
        </Modal>
      </main>
      <Footer userName={userName} />
    </>
  );
}

export default App;

import logo from "../assets/logo.png";


type footerProps = {
  userName: String;

}

export default function Footer(props : footerProps) {
  return (
    <>
      <footer>
        <h3>{props.userName === 'Guest' ? 'Reminder: Make sure to register an account to save your schedule': ''}</h3>
        <img src={logo} alt='logo' />
      </footer>
    </>
  );
}
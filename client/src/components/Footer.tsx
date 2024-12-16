import logo from "../assets/logo.png";


type footerProps = {
  userName: String;
}

export default function Footer(props : footerProps) {
  return (
    <>
      <footer>
        <h3>{props.userName === 'Guest' ? 'Reminder: Your Schedule will not be saved in guest mode. Register an account to save Schedule': ''}</h3>
        <img src={logo} alt='logo' />
      </footer>
    </>
  );
}
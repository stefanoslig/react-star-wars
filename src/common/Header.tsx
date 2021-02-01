import './Header.scss';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="Header">
      <h1>{title}</h1>
    </header>
  );
}

export default Header;

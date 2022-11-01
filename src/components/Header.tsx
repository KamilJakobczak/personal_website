import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to={'/'}>
        <span className='header'>Kamil 'JAMAR' Jakóbczak</span>
      </Link>
    </header>
  );
};

export default Header;

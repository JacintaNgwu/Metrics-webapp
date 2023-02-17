import { Links } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Links to="/">
          <FaArrowLeft />
        </Links>
      </li>
      <li>
        <Links to="/details">
          {' '}
          <FaArrowLeft />
          {' '}
        </Links>
      </li>
    </ul>
  </nav>
);

export default Navigation;

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../Redux/configurestore';
import App from '../App';
import HomePage from '../components/Homepage';
import Details from '../components/Detailspage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/Homepage');
jest.mock('../components/Detailspage');
describe('Testing my App.js with pages', () => {
  test('should render the Header and Layout components', () => {
    HomePage.mockImplementation(() => <h1>WELCOME TO AFRICA</h1>);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const txt = screen.getByText('WELCOME TO AFRICA');
    expect(txt).toBeInTheDocument();
  });

  test('should render the homepage', () => {
    HomePage.mockImplementation(() => <h1>Hello From Home Page</h1>);
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const txt = screen.getByText('Hello From Home Page');
    expect(txt).toBeInTheDocument();
  });

  test('should render the Details Page', () => {
    Details.mockImplementation(() => <h1>Hello From Details Page</h1>);
    render(
      <MemoryRouter initialEntries={['/country/:country']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const txt = screen.getByText('Hello From Details Page');
    expect(txt).toBeInTheDocument();
  });
});

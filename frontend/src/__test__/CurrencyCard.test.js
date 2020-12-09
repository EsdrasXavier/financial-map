import { render, screen } from '@testing-library/react';
import CurrencyCard from '../components/CurrencyCard/CurrencyCard';

describe('Test the `<CurrencyCard />` component.', () => {

  test('Renders the app and check if the title is loaded.', () => {
    render(<CurrencyCard name={"Dolar"} price={"5.1203"} />);
    const linkElement = screen.getByText(/Dolar/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Renders the app and check if the title is loaded.', () => {
    render(<CurrencyCard name={"Euro"} price={"6.2073"} />);
    const linkElement = screen.getByText(/Euro/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Renders the app and check if the title is loaded.', () => {
    render(<CurrencyCard name={"Argentine Peso"} price={"0.0627"} />);
    const linkElement = screen.getByText(/Argentine Peso/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Renders the app and check if the title is loaded.', () => {
    render(<CurrencyCard name={"Pound Sterling"} price={"6.8493"} />);
    const linkElement = screen.getByText(/Pound Sterling/i);
    expect(linkElement).toBeInTheDocument();
  });
});
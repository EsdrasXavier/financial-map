import { render, screen } from '@testing-library/react';
import CurrencyCard from '../components/CurrencyCard/CurrencyCard';

describe('Test the `<CurrencyCard />` component.', () => {

  test('Renders the app and check if the title is loaded.', () => {
    render(<CurrencyCard name={"Dolar"} price={"5,32"} />);
    const linkElement = screen.getByText(/Dolar/i);
    expect(linkElement).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard/Dashboard';

describe('Test the `<Dashboard />` component.', () => {

  test('Renders the app and check if the title is loaded.', () => {
    render(<Dashboard />);
    const linkElement = screen.getByText(/Noticias /i);
    expect(linkElement).toBeInTheDocument();
  });
});
import { server } from '../mocks/server.js'
import { render, screen, waitFor } from '@testing-library/react';
import Stocks from '../components/Stocks/Stocks';

describe('Test the `<Stocks />` component.', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Renders the app and check if the title is loaded.',async () => {
    render(<Stocks />);
    await waitFor(() => screen.getByText(/Papel/i));
    const linkElement = screen.getByText(/top ações/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Render and assert that the grid was loaded.', async () => {
    render(<Stocks />);
    await waitFor(() => screen.getByText(/Papel/i));
    expect(screen.getByText(/Cotação/i)).toBeInTheDocument();
    expect(screen.getByText(/P\/L/i)).toBeInTheDocument();
    expect(screen.getByText(/ROE/i)).toBeInTheDocument();
    expect(screen.getByText(/12[,.]97/i)).toBeInTheDocument();
  });
});

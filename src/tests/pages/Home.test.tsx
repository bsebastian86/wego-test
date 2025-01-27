import { Home } from '@/pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('Home', () => {
  // Create a new instance of QueryClient as a provider for the Home component
  const queryClient = new QueryClient();
  const HomeComponent = () => (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );

  it('should render search input', () => {
    render(<HomeComponent />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Enter food name...');
  });

  it('should render loading and no categories or cards loaded yet', () => {
    render(<HomeComponent />);

    const loading = screen.getByText(/loading/i);
    const categories = screen.queryAllByRole('listitem');
    const cardsGrid = screen.queryAllByRole('grid');

    expect(loading).toBeInTheDocument();
    expect(categories).toHaveLength(0);
    expect(cardsGrid).toHaveLength(0);
  });

  it('should render categories and cards grid', async () => {
    render(<HomeComponent />);

    // Wait for the loading to disappear
    await screen.findByRole('grid');

    const categories = screen.getAllByRole('listitem');
    const grid = screen.getAllByRole('grid');

    expect(categories).toHaveLength(6);
    expect(grid).toHaveLength(1);
  });

  it(`should render no food found if "Invalid Food" is searched`, async () => {
    render(<HomeComponent />);

    // Wait for the loading to disappear
    await screen.findByRole('grid');

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(searchInput, 'Invalid food');
    const noFood = screen.queryByText(/no food found/i);
    expect(noFood).toBeInTheDocument();
  });

  it(`should render Grid if "Sushi" is searched`, async () => {
    render(<HomeComponent />);

    // Wait for the loading to disappear
    await screen.findByRole('grid');

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(searchInput, 'Sushi');
    const grid = screen.getAllByRole('grid');
    expect(grid).toHaveLength(1);
  });
});

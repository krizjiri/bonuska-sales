import { render, screen } from '@testing-library/react';
import App from './App';

// Mock MapComponent because react-leaflet causes issues with Jest/ESM
jest.mock('./components/MapComponent', () => () => <div data-testid="map-mock">Map</div>);

test('renders filters title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Filtry/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Hledat podnik.../i);
  expect(searchInput).toBeInTheDocument();
});

test('renders loyalty filter in sidebar', () => {
  render(<App />);
  const loyaltyTitle = screen.getByText(/Věrnostní systém/i);
  expect(loyaltyTitle).toBeInTheDocument();
  // We use queryAllByText because "Má" might be in categories or elsewhere if data was different, 
  // but here we check for its presence in filters
  expect(screen.getAllByText(/Má/i).length).toBeGreaterThan(0);
});

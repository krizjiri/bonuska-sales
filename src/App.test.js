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

test('loyalty checkbox is not present by default (until business is selected)', () => {
  render(<App />);
  const loyaltyCheckbox = screen.queryByLabelText(/Má věrnostní systém/i);
  expect(loyaltyCheckbox).not.toBeInTheDocument();
});

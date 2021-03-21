import { render, screen } from '@testing-library/react';
import App from '.';

test('renders hello world', () => {
    render(<App />);
    const text = screen.getByText(/hello world/i);
    expect(text).toBeInTheDocument();
});

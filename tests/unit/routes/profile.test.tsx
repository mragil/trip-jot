import { render, screen } from '@testing-library/react';
import { RouteComponent } from '@/routes/profile';
import { describe, it, expect, vi } from 'vitest';

// Mock the Construction component
vi.mock('@/components/Construction', () => ({
    default: ({ title, message }: { title: string; message: string }) => (
        <div data-testid="construction">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    ),
}));

describe('Profile Route', () => {
    it('renders correctly', () => {
        render(<RouteComponent />);

        expect(screen.getByTestId('construction')).toBeTruthy();
        expect(screen.getByText('Your Profile')).toBeTruthy();
    });
});

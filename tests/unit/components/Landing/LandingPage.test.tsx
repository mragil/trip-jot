import { render, screen } from '@testing-library/react';
import { LandingPage } from '@/components/Landing/LandingPage';
import { describe, it, expect, vi } from 'vitest';


vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to, className }: any) => (
        <a href={to} className={className}>{children}</a>
    ),
}));

vi.mock('@/components/Landing/HeroImage', () => ({
    HeroImage: () => <div data-testid="hero-image">Hero Image</div>,
}));

vi.mock('lucide-react', () => ({
    ArrowRight: () => <svg data-testid="arrow-right" />,
    FileText: () => <svg />,
    Map: () => <svg />,
    Navigation: () => <svg />,
    Users: () => <svg />,
    Wallet: () => <svg />,
    Zap: () => <svg />,
}));

describe('LandingPage', () => {
    it('renders correctly', () => {
        render(<LandingPage />);
        
        // Check main headings
        expect(screen.getByText(/Plan Less/i)).toBeTruthy();
        expect(screen.getByText(/Wander More/i)).toBeTruthy();
        expect(screen.getByText('Now available in beta')).toBeTruthy();
        
        // Check CTA
        expect(screen.getByText('Start Planning Free')).toBeTruthy();
        expect(screen.getByText('See How It Works')).toBeTruthy();
        
        // Check Sections
        expect(screen.getByText('Stop wrestling with spreadsheets.')).toBeTruthy();
        expect(screen.getByText(/Everything you need to/i)).toBeTruthy();
        
        // Check Feature Cards (indirectly content)
        expect(screen.getByText('Visual Route Planning')).toBeTruthy();
        expect(screen.getByText('Offline Document Vault')).toBeTruthy();
        
        // Check Footer
        expect(screen.getByText(/Built for explorers/i)).toBeTruthy();
    });
});

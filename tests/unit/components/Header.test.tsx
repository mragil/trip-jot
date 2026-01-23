
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Header from '@/components/Header';
import { useUserStore } from '@/store/user';
import { useLogoutMutation } from '@/hooks/useAuth';


vi.mock('@/store/user', () => ({
	useUserStore: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
	useLogoutMutation: vi.fn(),
}));


vi.mock('@tanstack/react-router', () => ({
	Link: ({ to, children, className }: any) => (
		<a href={to} className={className} data-testid={`link-${to}`}>
			{children}
		</a>
	),
	useNavigate: () => vi.fn(),
}));




describe('Header', () => {
	const mockLogoutMutate = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useLogoutMutation as any).mockReturnValue({
			mutate: mockLogoutMutate,
			isPending: false,
		});
	});

    afterEach(() => {
        cleanup();
    });

	it('renders correctly with user data', () => {
		(useUserStore as any).mockImplementation((selector: any) =>
			selector({
				user: {
					name: 'John Doe',
					email: 'john@example.com',
					avatar: 'https://example.com/avatar.jpg',
				},
			}),
		);

		render(<Header />);

		expect(screen.getByText('WanderLog')).toBeTruthy();
		expect(screen.getByText('Dashboard')).toBeTruthy();
		expect(screen.getByText('Explore')).toBeTruthy();

		const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
	});

	it('renders user initials when no avatar', () => {
		(useUserStore as any).mockImplementation((selector: any) =>
			selector({
				user: {
					name: 'Jane Doe',
					email: 'jane@example.com',
					avatar: undefined,
				},
			}),
		);

		render(<Header />);
		expect(screen.getByText('JD')).toBeTruthy();
	});

    it('renders default initial when name is missing', () => {
        (useUserStore as any).mockImplementation((selector: any) =>
            selector({
                user: {
                    name: undefined,
                    email: 'test@example.com',
                },
            }),
        );
        render(<Header />);
        expect(screen.getByText('U')).toBeTruthy();
    });

	it('logout button calls mutation', () => {
		(useUserStore as any).mockImplementation((selector: any) =>
			selector({
				user: { name: 'John Doe' },
			}),
		);

		render(<Header />);

		const fallbacks = screen.getAllByText('JD');
		const trigger = fallbacks[0].closest('button');
		expect(trigger).toBeTruthy();
        
		fireEvent.click(trigger!);


		const logoutBtn = screen.getByText('Log out');
		fireEvent.click(logoutBtn);

		expect(mockLogoutMutate).toHaveBeenCalled();
	});
});

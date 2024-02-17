import { render, screen, within } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import LinkSidebar from './LinkSidebar.svelte';

it('renders correctly', () => {
	render(LinkSidebar);

	const navContainerElement = screen.getByRole('navigation');
	const linkElement = within(navContainerElement).getByRole('link');
	expect(navContainerElement).toBeInTheDocument();
	expect(linkElement).toBeInTheDocument();
});

it('contains valid link', () => {
	render(LinkSidebar);

	const goToHomeLink = screen.getByRole('link');
	expect(goToHomeLink).toBeInTheDocument();
	expect(goToHomeLink).toHaveAttribute('href', 'https://plan.toggl.com');
});

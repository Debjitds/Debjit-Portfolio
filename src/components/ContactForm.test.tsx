import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fill every required field with valid data. */
async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), 'Jane Doe');
  await user.type(screen.getByLabelText(/your email/i), 'jane@example.com');
  await user.type(
    screen.getByLabelText(/your message/i),
    'Hello, I would like to discuss a new project opportunity with you!',
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ContactForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 1 — Renders all form fields with proper labels
  it('renders all fields and a submit button', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  // 2 — Shows validation errors when required fields are empty
  it('shows validation errors on empty submit', async () => {
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  // 3 — Submits successfully and shows success message
  it('shows success message after successful submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });

    // The success region should be inside an aria-live container
    const liveRegion = screen.getByText(/thank you for your message/i).closest('[aria-live]');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });

  // 4 — Shows error message on server failure
  it('shows error message when the server returns an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Server error' }), { status: 500 }),
    );

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });

  // 5 — Button is disabled while submitting (prevents double-submit)
  it('disables the submit button while submitting', async () => {
    // Keep fetch pending so we can observe loading state
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {}), // never resolves
    );

    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /sending/i });
      expect(btn).toBeDisabled();
    });
  });
});

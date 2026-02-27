// ============================================================================
// ContactForm.tsx — Production-ready contact form with Formspree integration
// ============================================================================
//
// ENVIRONMENT VARIABLE (add to your .env file):
//   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mpqjnlaz
//
// USAGE:
//   import ContactForm from '@/components/ContactForm';
//   <ContactForm />
//
// ============================================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Read endpoint from env; fall back to hardcoded value if not set. */
const FORMSPREE_ENDPOINT =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT ??
  'https://formspree.io/f/mpqjnlaz';

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Minimum seconds between consecutive submissions (rate-limit). */
const RATE_LIMIT_SECONDS = 5;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  // Name
  const name = data.name.trim();
  if (!name) errors.name = 'Name is required.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.';

  // Email
  const email = data.email.trim();
  if (!email) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  // Subject (optional)
  if (data.subject.length > 150) errors.subject = 'Subject must be 150 characters or fewer.';

  // Message
  const message = data.message.trim();
  if (!message) errors.message = 'Message is required.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.length > 5000) errors.message = 'Message must be 5 000 characters or fewer.';

  return errors;
}

// ---------------------------------------------------------------------------
// Spinner (inline SVG — no icon library needed)
// ---------------------------------------------------------------------------

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin h-4 w-4', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  /** Ref for the aria-live status region so we can focus it on change. */
  const statusRef = useRef<HTMLDivElement>(null);

  /** Timestamp of last successful submission (rate-limiting). */
  const lastSubmitRef = useRef<number>(0);

  // Focus the status message whenever it changes (accessibility).
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusRef.current?.focus();
    }
  }, [status]);

  // ---- Field change handler ------------------------------------------------

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear field-level error on edit
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [],
  );

  // ---- Submit handler -------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Rate-limit
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_SECONDS * 1000) {
      setStatus('error');
      setStatusMessage('Please wait a few seconds before sending again.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _gotcha: (e.target as HTMLFormElement).querySelector<HTMLInputElement>(
            'input[name="_gotcha"]',
          )?.value,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage(
          "Thank you for your message! I'll get back to you within 1–2 business days.",
        );
        setFormData(INITIAL_FORM);
        lastSubmitRef.current = Date.now();
      } else {
        const data = await res.json().catch(() => null);
        setStatus('error');
        setStatusMessage(
          data?.error ?? 'Something went wrong. Please try again or email me directly.',
        );
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error — please check your connection and try again.');
    }
  };

  // ---- Render ---------------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 p-4 md:p-6 rounded-2xl bg-card border border-border/50"
    >
      {/* ---- Honeypot (hidden from humans, traps bots) ---- */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-gotcha">Do not fill this out</label>
        <input
          type="text"
          id="contact-gotcha"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ---- Name ---- */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
          Your Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* ---- Email ---- */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
          Your Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* ---- Subject (optional) ---- */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
          Subject <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <Input
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project inquiry"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
        />
        {errors.subject && (
          <p id="contact-subject-error" className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* ---- Message ---- */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
          Your Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="bg-secondary/50 border-border/50 focus:border-primary resize-none transition-colors"
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-destructive" role="alert">
            {errors.message}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground text-right">
          {formData.message.length} / 5 000
        </p>
      </div>

      {/* ---- Status region (aria-live) ---- */}
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="outline-none"
      >
        {status === 'success' && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400">
            <p className="font-medium">{statusMessage}</p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setStatusMessage('');
              }}
              className="mt-2 text-xs underline underline-offset-2 hover:text-emerald-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
            <p>{statusMessage}</p>
          </div>
        )}
      </div>

      {/* ---- Submit button ---- */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Spinner className="mr-2" />
            Sending…
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
              aria-hidden="true"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9l20-7z" />
            </svg>
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

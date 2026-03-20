import { useState, useRef } from 'react';
import { mockAuthHandler } from '../auth/mockAuthHandler';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    // Clear all errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setSuccessMessage('');

    // Validate
    let hasError = false;
    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      hasError = true;
    }

    if (hasError) {
      // Focus first errored field
      if (!email.trim()) {
        emailRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
      return;
    }

    try {
      setIsLoading(true);
      const result = await mockAuthHandler({ email, password });
      setIsLoading(false);

      if (result.success) {
        setSuccessMessage("You're in! Welcome back.");
        setTimeout(onLoginSuccess, 1500);
      } else {
        setGeneralError(result.error);
      }
    } catch {
      setIsLoading(false);
      setGeneralError('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {/* Email field */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-gray-800 mb-1"
          style={{ fontSize: '18px' }}
        >
          Your email address
        </label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
          }}
          aria-describedby={emailError ? 'email-error' : undefined}
          aria-invalid={!!emailError}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          style={{ minHeight: '48px' }}
        />
        {emailError && (
          <p id="email-error" role="alert" className="mt-1 text-red-600 font-medium" style={{ fontSize: '16px' }}>
            ⚠ {emailError}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block text-lg font-medium text-gray-800 mb-1"
          style={{ fontSize: '18px' }}
        >
          Your password
        </label>
        <div className="relative">
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            aria-describedby={passwordError ? 'password-error' : undefined}
            aria-invalid={!!passwordError}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-28 text-gray-900 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            style={{ minHeight: '48px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-amber-700 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
            style={{ minHeight: '44px' }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {passwordError && (
          <p id="password-error" role="alert" className="mt-1 text-red-600 font-medium" style={{ fontSize: '16px' }}>
            ⚠ {passwordError}
          </p>
        )}
      </div>

      {/* General error / success message */}
      <div className="mb-4 min-h-[24px]">
        {successMessage && (
          <p role="status" className="text-amber-700 font-medium text-base">
            ✓ {successMessage}
          </p>
        )}
        {generalError && !successMessage && (
          <p role="alert" className="text-red-600 font-medium" style={{ fontSize: '16px' }}>
            ⚠ {generalError}
          </p>
        )}
      </div>

      {/* Sign In button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        style={{ minHeight: '48px', minWidth: '48px' }}
      >
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/New Logo-Photoroom.png';

export default function LoginPage({ onLoginSuccess }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* Left panel — logo */}
      <div className="hidden md:flex w-1/2 bg-amber-600 items-center justify-center p-12">
        <img
          src={logo}
          alt="NeighborCircle logo"
          className="w-[560px] max-w-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 bg-amber-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-10">

          {/* Logo on mobile only */}
          <div className="flex justify-center mb-6 md:hidden">
            <img src={logo} alt="NeighborCircle logo" className="h-20 object-contain" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Welcome back.
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Sign in to connect with your community.
          </p>

          <LoginForm onLoginSuccess={onLoginSuccess} />

          {/* Help toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowHelp(prev => !prev)}
              aria-expanded={showHelp}
              aria-controls="help-message"
              className="text-amber-700 hover:text-amber-900 underline text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-3 py-2"
              style={{ minHeight: '44px' }}
            >
              Need help signing in?
            </button>

            {showHelp && (
              <p
                id="help-message"
                className="mt-3 text-gray-700 text-base bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
              >
                No problem! Call us at{' '}
                <span className="font-semibold text-gray-900">1-800-123-4567</span>{' '}
                or email{' '}
                <span className="font-semibold text-gray-900">help@neighborcircle.com</span>{' '}
                and we'll get you sorted.
              </p>
            )}
          </div>

          {/* Guest path */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onLoginSuccess}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded-xl text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              style={{ minHeight: '48px' }}
              aria-label="Continue without signing in"
            >
              Continue without signing in
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

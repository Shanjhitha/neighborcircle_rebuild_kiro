import { useState, useRef, useEffect } from 'react';
import DashboardPage from '../pages/DashboardPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import VolunteerPage from '../pages/VolunteerPage';
import CommunityPage from '../pages/CommunityPage';
import FriendsPage from '../pages/FriendsPage';
import ProfilePage, { getInitials } from '../pages/ProfilePage';
import logo from '../assets/New Logo-Photoroom.png';

const NAV_LINKS = [
  { label: 'Dashboard',       page: 'dashboard' },
  { label: 'Community Forum', page: 'community' },
  { label: 'Friends Match',   page: 'friends'   },
  { label: 'Volunteer Match', page: 'volunteer' },
  { label: 'Profile',         page: 'profile'   },
];

// Inline placeholder for Settings and Help — no separate file needed
function StaticPanel({ title }) {
  return (
    <div className="flex items-center justify-center min-h-full py-16 px-4">
      <div className="bg-white rounded-2xl shadow-md px-8 py-10 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-amber-700 mb-3">{title}</h1>
        <p className="text-gray-700 text-base">This section is coming soon. We're working on it!</p>
      </div>
    </div>
  );
}

const PAGE_TITLES = {
  dashboard: (firstName) => `Welcome, ${firstName}! This is your Dashboard.`,
  profile:   (firstName) => `Welcome, ${firstName}! This is your Profile Page.`,
  volunteer: (firstName) => `Welcome, ${firstName}! This is your Volunteer Page.`,
  community: (firstName) => `Welcome, ${firstName}! This is your Community Forum Page.`,
  friends:   (firstName) => `Welcome, ${firstName}! This is your Friends Match Page.`,
  settings:  ()          => 'Settings',
  help:      ()          => 'Help',
};

export default function AppLayout({ currentPage, onNavigate, onSignOut, user, posts, onMarkRead, onAddPost, unreadBySection, profileData, setProfileData, isNewMember, onClearNewMember }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Prefer profileData.displayName for the header badge when a profile exists
  const avatarName = profileData?.displayName
    ? profileData.displayName
    : `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  const initials = getInitials(avatarName);
  const firstName = profileData?.displayName
    ? profileData.displayName.split(' ')[0]
    : (user?.firstName ?? 'Friend');
  const pageTitle = (PAGE_TITLES[currentPage] ?? PAGE_TITLES['dashboard'])(firstName);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  function renderContent() {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage user={user} onNavigate={onNavigate} unreadBySection={unreadBySection} />;
      case 'community': return <CommunityPage user={user} onNavigate={onNavigate} posts={posts} onMarkRead={onMarkRead} onAddPost={onAddPost} />;
      case 'friends':   return <FriendsPage user={user} />;
      case 'volunteer': return <VolunteerPage />;
      case 'profile':   return <ProfilePage profileData={profileData} setProfileData={setProfileData} user={user} isNewMember={isNewMember} onClearNewMember={onClearNewMember} onSignIn={() => onNavigate('login')} />;
      case 'settings':  return <StaticPanel title="Settings" />;
      case 'help':      return <StaticPanel title="Help" />;
      default:          return <DashboardPage user={user} onNavigate={onNavigate} />;
    }
  }

  return (
    <div className="flex min-h-screen bg-amber-50">

      {/* Left Sidebar */}
      <aside className="w-72 bg-amber-800 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-4 py-6 border-b border-amber-700 flex items-center justify-center">
          <img src={logo} alt="NeighborCircle" className="w-full max-w-[220px] object-contain" />
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-5" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`w-full text-left px-5 py-4 rounded-xl mb-2 text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300
                ${currentPage === page
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-100 hover:bg-amber-700'}`}
              style={{ minHeight: '56px' }}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Tech support contact */}
        <div className="px-5 py-5 border-t border-amber-700">
          <p className="text-amber-200 text-base font-semibold mb-2">Need tech help?</p>
          <p className="text-amber-100 text-base">📞 1-800-123-4567</p>
          <p className="text-amber-100 text-base">✉️ support@neighborcircle.com</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Shared page header — appears on every authenticated page */}
        <header className="bg-gradient-to-r from-amber-500 to-orange-400 px-6 py-5 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-white leading-snug">
            {pageTitle}
          </h1>
          <div className="relative ml-4 flex-shrink-0" ref={dropdownRef}>
            {/* Profile badge button */}
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="Open profile menu"
              className="w-12 h-12 rounded-full bg-white text-amber-700 font-bold text-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-500 hover:bg-amber-100"
            >
              {initials}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                role="menu"
              >
                {[
                  { label: 'Profile',   action: () => { onNavigate('profile');  setDropdownOpen(false); } },
                  { label: 'Settings',  action: () => { onNavigate('settings'); setDropdownOpen(false); } },
                  { label: 'Help',      action: () => { onNavigate('help');     setDropdownOpen(false); } },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    role="menuitem"
                    className="w-full text-left px-4 py-3 text-gray-800 text-base hover:bg-amber-50 focus:outline-none focus:bg-amber-50"
                    style={{ minHeight: '48px' }}
                  >
                    {label}
                  </button>
                ))}
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={() => { setDropdownOpen(false); onSignOut(); }}
                  role="menuitem"
                  className="w-full text-left px-4 py-3 text-red-600 font-medium text-base hover:bg-red-50 focus:outline-none focus:bg-red-50"
                  style={{ minHeight: '48px' }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

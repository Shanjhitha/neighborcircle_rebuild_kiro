import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AppLayout from './components/AppLayout';
import { MOCK_POSTS } from './data/mockForumData';

// MVP-only: mock user. Replace with real auth data when backend is connected.
const MOCK_USER = { firstName: 'Margaret', lastName: 'Thompson' };

const SECTION_ORDER = ['all', 'groups', 'oneOnOne', 'general'];

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user] = useState(MOCK_USER);
  const [profileData, setProfileData] = useState(null);
  const [isNewMember, setIsNewMember] = useState(false);

  // posts state lives here so both CommunityPage and DashboardPage share
  // the same source of truth for unread counts.
  const [posts, setPosts] = useState(MOCK_POSTS);

  function handleMarkRead(postId) {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isRead: true } : p));
  }

  function handleAddPost(newPost) {
    setPosts(prev => [newPost, ...prev]);
  }

  // Derived — never stored separately. Used by Dashboard Activity Notifications.
  const unreadBySection = SECTION_ORDER.reduce((acc, id) => {
    acc[id] = posts.filter(p => p.section === id && !p.isRead).length;
    return acc;
  }, {});

  if (currentPage === 'login') {
    return (
      <LoginPage
        onLoginSuccess={() => { setIsNewMember(false); setCurrentPage('dashboard'); }}
      />
    );
  }

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={(page) => { setIsNewMember(false); setCurrentPage(page); }}
      onSignOut={() => setCurrentPage('login')}
      user={user}
      posts={posts}
      onMarkRead={handleMarkRead}
      onAddPost={handleAddPost}
      unreadBySection={unreadBySection}
      profileData={profileData}
      setProfileData={setProfileData}
      isNewMember={isNewMember}
      onClearNewMember={() => setIsNewMember(false)}
    />
  );
}

import { useState, useEffect, useRef } from 'react';

// ─── Section constants ────────────────────────────────────────────────────────
const SECTIONS = {
  all: {
    id: 'all',
    label: 'All Community',
    helperText: 'Announcements and important updates for everyone.',
    emptyText: 'No messages here yet. Feel free to say hello when you are ready.',
  },
  groups: {
    id: 'groups',
    label: 'Small Groups',
    helperText: 'Clubs, hobby circles, and personal groups.',
    emptyText: 'No group updates here yet.',
  },
  oneOnOne: {
    id: 'oneOnOne',
    label: 'One-on-One',
    helperText: 'Private conversations between two people.',
    emptyText: 'No personal conversations here yet.',
  },
  general: {
    id: 'general',
    label: 'General',
    helperText: 'Friendly everyday sharing with the community.',
    emptyText: 'No messages here yet. Feel free to say hello when you are ready.',
  },
};

const SECTION_ORDER = ['all', 'groups', 'oneOnOne', 'general'];

const REACTIONS = [
  { key: 'care',      emoji: '❤️', label: 'Care' },
  { key: 'smile',     emoji: '😊', label: 'Smile' },
  { key: 'support',   emoji: '🙏', label: 'Support' },
  { key: 'celebrate', emoji: '🎉', label: 'Celebrate' },
  { key: 'thinking',  emoji: '🌷', label: 'Thinking of you' },
];

// ─── SectionTabs ──────────────────────────────────────────────────────────────
function SectionTabs({ activeSection, onSelect, unreadBySection }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Forum sections">
      {SECTION_ORDER.map(id => {
        const isActive = activeSection === id;
        const count = unreadBySection[id] || 0;
        const label = count > 0 ? `${SECTIONS[id].label} (${count})` : SECTIONS[id].label;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={`px-5 py-3 rounded-xl text-lg font-medium transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-amber-400
              ${isActive
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-white border border-amber-400 text-amber-700 hover:bg-amber-50'}`}
            style={{ minHeight: '52px' }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── SafeSpaceCard ────────────────────────────────────────────────────────────
function SafeSpaceCard() {
  return (
    <div className="bg-amber-100 border border-amber-300 rounded-2xl p-5">
      <p className="text-amber-800 font-semibold text-xl">🏡 This is a Safe and Caring Space</p>
      <p className="text-amber-700 text-lg mt-1">
        Everyone here is a neighbor. Please be kind, patient, and supportive with one another.
      </p>
    </div>
  );
}

// ─── SectionHelperText ────────────────────────────────────────────────────────
function SectionHelperText({ activeSection }) {
  return (
    <div className="space-y-1 px-1">
      <p className="text-amber-700 text-lg italic">
        {SECTIONS[activeSection].helperText}
      </p>
      <p className="text-gray-500 text-lg italic">
        You are welcome to read and stay connected, even if you do not feel like posting today.
      </p>
    </div>
  );
}

// ─── ReplyItem ────────────────────────────────────────────────────────────────
function ReplyItem({ reply }) {
  return (
    <li className="space-y-0.5">
      <div className="flex items-baseline gap-2">
        <span className="text-gray-800 font-semibold text-base">{reply.author}</span>
        <span className="text-gray-400 text-sm">{reply.timestamp}</span>
      </div>
      <p className="text-gray-700 text-base leading-relaxed">{reply.body}</p>
    </li>
  );
}

// ─── ReplyList ────────────────────────────────────────────────────────────────
function ReplyList({ replies }) {
  if (!replies || replies.length === 0) return null;
  return (
    <ul className="ml-6 mt-3 space-y-3 border-l-2 border-amber-100 pl-4" aria-label="Replies">
      {replies.map(reply => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </ul>
  );
}

// ─── ReactionBar ──────────────────────────────────────────────────────────────
function ReactionBar({ reactions, toggled, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Reactions">
      {REACTIONS.map(({ key, emoji, label }) => {
        const isToggled = toggled[key];
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            aria-label={`React with ${label}`}
            aria-pressed={isToggled}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-base
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400
              ${isToggled
                ? 'bg-amber-100 border-amber-400 text-amber-800 font-semibold'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-amber-50 hover:border-amber-300'}`}
            style={{ minHeight: '52px', minWidth: '52px' }}
          >
            <span aria-hidden="true">{emoji}</span>
            <span>{reactions[key]}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────
function PostCard({ post, onRead }) {
  const [reactions, setReactions] = useState({ ...post.reactions });
  const [toggled, setToggled] = useState({
    care: false, smile: false, support: false, celebrate: false, thinking: false,
  });
  const cardRef = useRef(null);
  const hasCalledRead = useRef(post.isRead); // skip observer if already read

  // Mark as read when card enters viewport (50% visible), once only.
  useEffect(() => {
    if (hasCalledRead.current) return;
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasCalledRead.current = true;
          onRead();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onRead]);

  function handleToggle(key) {
    // Also mark as read on first interaction
    if (!hasCalledRead.current) {
      hasCalledRead.current = true;
      onRead();
    }
    setReactions(prev => ({
      ...prev,
      [key]: toggled[key] ? Math.max(0, prev[key] - 1) : prev[key] + 1,
    }));
    setToggled(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const isUnread = !post.isRead && !hasCalledRead.current;

  return (
    <article
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3
        ${isUnread ? 'border-l-4 border-l-amber-400' : ''}`}
    >
      {/* Group badge — Small Groups only */}
      {post.groupName && (
        <span className="inline-block bg-amber-100 text-amber-700 text-base font-medium px-3 py-1 rounded-full">
          {post.groupName}
        </span>
      )}

      {/* Author + timestamp + read/unread indicator */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-gray-900 font-semibold text-lg">{post.author}</span>
        <span className="text-gray-400 text-base">{post.timestamp}</span>
        {isUnread
          ? <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-sm font-medium px-2 py-0.5 rounded-full">● New</span>
          : <span className="text-blue-400 text-sm">✓ Seen</span>
        }
      </div>

      {/* Body */}
      <p className="text-gray-800 text-lg leading-relaxed">{post.body}</p>

      {/* Reactions */}
      <ReactionBar reactions={reactions} toggled={toggled} onToggle={handleToggle} />

      {/* Replies */}
      <ReplyList replies={post.replies} />
    </article>
  );
}

// ─── PostList ─────────────────────────────────────────────────────────────────
function PostList({ posts, activeSection, onMarkRead }) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
        <p className="text-gray-500 text-lg italic">
          {SECTIONS[activeSection].emptyText}
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-4">
      {posts.map(post => (
        <li key={post.id}>
          <PostCard post={post} onRead={() => onMarkRead(post.id)} />
        </li>
      ))}
    </ul>
  );
}

// ─── ShareArea ────────────────────────────────────────────────────────────────
function ShareArea({ onSubmit }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleShare() {
    if (!text.trim()) {
      setError('Please write a little message before sharing.');
      return;
    }
    onSubmit(text.trim());
    setText('');
    setError('');
  }

  return (
    <section
      className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3"
      aria-label="Share with your neighbors"
    >
      <p className="text-amber-800 font-semibold text-xl">Share Something With Your Circle</p>

      <textarea
        value={text}
        onChange={e => { setText(e.target.value); if (error) setError(''); }}
        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleShare())}
        placeholder="Would you like to share something with your neighbors today?"
        aria-label="What would you like to share today?"
        rows={4}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        style={{ minHeight: '90px' }}
      />

      {error && (
        <p className="text-red-600 text-lg" role="alert">{error}</p>
      )}

      <button
        onClick={handleShare}
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg rounded-xl px-6 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
        style={{ minHeight: '52px' }}
      >
        Share with Neighbors
      </button>
    </section>
  );
}

// ─── CommunityPage ────────────────────────────────────────────────────────────
// posts, onMarkRead, onAddPost are lifted to App.jsx so Dashboard can share
// the same unread counts without a separate state management layer.
export default function CommunityPage({ user, posts, onMarkRead, onAddPost }) {
  const [activeSection, setActiveSection] = useState('all');

  const filteredPosts = posts.filter(p => p.section === activeSection);

  // Derived unread counts for tab labels — never stored separately.
  const unreadBySection = SECTION_ORDER.reduce((acc, id) => {
    acc[id] = posts.filter(p => p.section === id && !p.isRead).length;
    return acc;
  }, {});

  function handleSubmit(text) {
    const author = user?.firstName || 'Neighbor';
    const groupName = activeSection === 'groups' ? 'Community Circle' : undefined;
    const newPost = {
      id: Date.now().toString(),
      section: activeSection,
      author,
      timestamp: 'Just now',
      body: text,
      reactions: { care: 0, smile: 0, support: 0, celebrate: 0, thinking: 0 },
      replies: [],
      isRead: true, // author has already seen their own message
      ...(groupName ? { groupName } : {}),
    };
    onAddPost(newPost);
  }

  return (
    <div className="w-full space-y-5">
      {/* 1. Section tabs with live unread counts */}
      <SectionTabs
        activeSection={activeSection}
        onSelect={setActiveSection}
        unreadBySection={unreadBySection}
      />

      {/* 2. Safe Space Reminder — always visible, below tabs */}
      <SafeSpaceCard />

      {/* 3. Section helper text + passive participation note */}
      <SectionHelperText activeSection={activeSection} />

      {/* 4. Post list — reading first */}
      <PostList
        posts={filteredPosts}
        activeSection={activeSection}
        onMarkRead={onMarkRead}
      />

      {/* 5. Share area — at the bottom, low pressure */}
      <ShareArea onSubmit={handleSubmit} />
    </div>
  );
}

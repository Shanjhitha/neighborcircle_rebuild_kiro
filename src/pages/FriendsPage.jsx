import { useState } from 'react';
import { MOCK_PROFILES, MOCK_INCOMING, INTEREST_POOL } from '../data/mockFriendsData';

// ─── Constants ────────────────────────────────────────────────────────────────

const PRE_SEEDED_OUTGOING_ID = 'f3';
const MY_INTERESTS = ['Gardening', 'Reading', 'Walking', 'Cooking'];
const LOCATION_RANK = { same: 0, nearby: 1, other: 2 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countCommon(profile) {
  return profile.interests.filter(i => MY_INTERESTS.includes(i)).length;
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── InitialsAvatar ───────────────────────────────────────────────────────────
// Large, warm, intentional initials circle — the primary identity element.
function InitialsAvatar({ name, size = 'lg' }) {
  const sizeClass = size === 'lg'
    ? 'w-20 h-20 text-3xl'
    : 'w-16 h-16 text-2xl';
  return (
    <div
      aria-hidden="true"
      className={`${sizeClass} rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center flex-shrink-0 border-2 border-amber-300`}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── PageIntro ────────────────────────────────────────────────────────────────
function PageIntro() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold text-amber-700">Find a Friend</h1>
      <p className="text-xl text-gray-600">
        Take your time and browse. There is no rush — just a few neighbors who might enjoy getting to know you.
      </p>
      <p className="text-lg text-gray-400 italic">Everyone here is a neighbor, just like you.</p>
    </div>
  );
}

// ─── ViewToggle ───────────────────────────────────────────────────────────────
function ViewToggle({ view, setView, pendingIncomingCount }) {
  return (
    <div className="flex gap-3" role="tablist">
      <button
        role="tab"
        aria-selected={view === 'suggested'}
        tabIndex={view === 'suggested' ? 0 : -1}
        onClick={() => setView('suggested')}
        className={`px-6 py-3 rounded-xl text-lg font-semibold transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-400
          ${view === 'suggested'
            ? 'bg-amber-600 text-white'
            : 'bg-white border-2 border-amber-400 text-amber-700 hover:bg-amber-50'}`}
        style={{ minHeight: '52px' }}
      >
        Suggested Friends
      </button>
      <button
        role="tab"
        aria-selected={view === 'incoming'}
        tabIndex={view === 'incoming' ? 0 : -1}
        onClick={() => setView('incoming')}
        className={`px-6 py-3 rounded-xl text-lg font-semibold transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-400
          ${view === 'incoming'
            ? 'bg-amber-600 text-white'
            : 'bg-white border-2 border-amber-400 text-amber-700 hover:bg-amber-50'}`}
        style={{ minHeight: '52px' }}
      >
        Hellos Received{pendingIncomingCount > 0 ? ` (${pendingIncomingCount})` : ''}
      </button>
    </div>
  );
}

// ─── FilterSortBar ────────────────────────────────────────────────────────────
function FilterSortBar({ filterLocation, setFilterLocation, filterGender, setFilterGender, filterInterests, setFilterInterests, sortBy, setSortBy }) {
  function toggleInterest(interest) {
    setFilterInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  }

  function clearAll() {
    setFilterLocation('');
    setFilterGender('');
    setFilterInterests([]);
    setSortBy('common');
  }

  const selectClass = 'text-lg rounded-xl border-2 border-gray-200 px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white';

  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-6 space-y-5">

      {/* Location */}
      <div className="space-y-1">
        <label htmlFor="filter-location" className="text-lg font-semibold text-gray-700">Near</label>
        <select
          id="filter-location"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          className={selectClass}
          style={{ minHeight: '52px' }}
        >
          <option value="">All locations</option>
          <option value="same">Same city</option>
          <option value="nearby">Nearby</option>
        </select>
      </div>

      {/* Gender */}
      <div className="space-y-1">
        <label htmlFor="filter-gender" className="text-lg font-semibold text-gray-700">Gender</label>
        <select
          id="filter-gender"
          value={filterGender}
          onChange={e => setFilterGender(e.target.value)}
          className={selectClass}
          style={{ minHeight: '52px' }}
        >
          <option value="">Any</option>
          <option value="Woman">Woman</option>
          <option value="Man">Man</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <label id="interests-label" className="text-lg font-semibold text-gray-700">Interests</label>
        <div className="flex flex-wrap gap-2" aria-labelledby="interests-label">
          {INTEREST_POOL.map(interest => {
            const isActive = filterInterests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-base font-medium transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-amber-400
                  ${isActive
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border-2 border-amber-300 text-amber-700 hover:bg-amber-50'}`}
                style={{ minHeight: '44px' }}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-1">
        <label htmlFor="sort-by" className="text-lg font-semibold text-gray-700">Sort by</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className={selectClass}
          style={{ minHeight: '52px' }}
        >
          <option value="common">Most in common</option>
          <option value="location">Closest location</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={clearAll}
        className="text-base text-amber-700 underline focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
        style={{ minHeight: '44px' }}
      >
        Clear filters
      </button>
    </div>
  );
}

// ─── ProfileCard ──────────────────────────────────────────────────────────────
function ProfileCard({ profile, outgoingStatus, onSend, onCancel }) {
  const isPending = outgoingStatus === 'pending';

  return (
    <article
      aria-label={profile.name}
      className="bg-white rounded-2xl shadow-sm border-2 border-amber-100 p-6 space-y-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Avatar + name header */}
      <div className="flex items-center gap-4">
        <InitialsAvatar name={profile.name} size="lg" />
        <div>
          <p className="text-xl font-semibold text-gray-900">{profile.name}</p>
          <p className="text-lg text-gray-500">{profile.age} · {profile.location}</p>
          <p className="text-base text-gray-400">{profile.gender}</p>
        </div>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2">
        {profile.interests.map(interest => (
          <span key={interest} className="bg-amber-100 text-amber-700 text-base px-4 py-1.5 rounded-full">
            {interest}
          </span>
        ))}
      </div>

      {/* Connect preference */}
      {profile.connectPref && (
        <p className="text-base text-amber-600">💬 Prefers: {profile.connectPref}</p>
      )}

      {/* Bio */}
      <p className="text-lg text-gray-700 italic leading-relaxed">{profile.bio}</p>

      {/* Match reason */}
      <p className="text-lg text-amber-800">🤝 {profile.matchReason}</p>

      {/* Action area */}
      {isPending ? (
        <div className="space-y-2">
          <div className="w-full bg-amber-100 border border-amber-400 text-amber-700 font-medium text-lg rounded-xl px-4 py-3 text-center">
            Hello sent
            <span className="block text-base font-normal text-amber-600 mt-0.5">Waiting for a reply</span>
          </div>
          <button
            onClick={() => onCancel(profile.id)}
            aria-label={`Take back hello sent to ${profile.name}`}
            className="w-full text-base text-gray-500 underline text-center focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
            style={{ minHeight: '44px' }}
          >
            Take Back Hello
          </button>
        </div>
      ) : (
        <button
          onClick={() => onSend(profile.id)}
          aria-label={`Say hello to ${profile.name}`}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xl rounded-xl px-4 py-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={{ minHeight: '56px' }}
        >
          Say Hello
        </button>
      )}
    </article>
  );
}

// ─── ProfileList ──────────────────────────────────────────────────────────────
function ProfileList({ sortedProfiles, outgoing, onSend, onCancel }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sortedProfiles.map(profile => (
        <li key={profile.id}>
          <ProfileCard
            profile={profile}
            outgoingStatus={outgoing[profile.id]}
            onSend={onSend}
            onCancel={onCancel}
          />
        </li>
      ))}
    </ul>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="bg-amber-50 rounded-2xl p-10 text-center">
      <p className="text-gray-500 text-lg italic">
        No new suggestions just yet. Try changing a preference.
      </p>
    </div>
  );
}

// ─── IncomingCard ─────────────────────────────────────────────────────────────
function IncomingCard({ request, onAccept, onDecline }) {
  const { fromProfile, status } = request;
  const name = fromProfile.name;

  return (
    <article
      aria-label={`Hello from ${name}`}
      className="bg-white rounded-2xl shadow-sm border-2 border-amber-100 p-6 space-y-4"
    >
      {/* Avatar + header */}
      <div className="flex items-center gap-4">
        <InitialsAvatar name={name} size="lg" />
        <div>
          <p className="text-xl font-semibold text-gray-900">{name}</p>
          <p className="text-lg text-gray-500">{fromProfile.age} · {fromProfile.location}</p>
          <p className="text-base text-gray-400">{fromProfile.gender}</p>
        </div>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2">
        {fromProfile.interests.map(interest => (
          <span key={interest} className="bg-amber-100 text-amber-700 text-base px-4 py-1.5 rounded-full">
            {interest}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-lg text-gray-700 italic leading-relaxed">{fromProfile.bio}</p>

      {/* Action area */}
      {status === 'pending' && (
        <div className="space-y-3">
          <p className="text-lg text-gray-600">{name} would like to get to know you.</p>
          <div className="flex gap-3">
            <button
              onClick={() => onAccept(request.id)}
              aria-label={`Accept hello from ${name}`}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg rounded-xl px-4 py-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              style={{ minHeight: '56px' }}
            >
              Accept Hello
            </button>
            <button
              onClick={() => onDecline(request.id)}
              aria-label={`Decline hello from ${name}`}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-600 font-medium text-lg rounded-xl px-4 py-4 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              style={{ minHeight: '56px' }}
            >
              Not right now
            </button>
          </div>
        </div>
      )}
      {status === 'accepted' && (
        <p className="text-green-700 font-semibold text-lg">You are now friends 🌻</p>
      )}
      {status === 'declined' && (
        <p className="text-gray-500 italic text-lg">You have gently passed on this one.</p>
      )}
    </article>
  );
}

// ─── IncomingList ─────────────────────────────────────────────────────────────
function IncomingList({ incoming, onAccept, onDecline }) {
  return (
    <ul className="space-y-6">
      {incoming.map(request => (
        <li key={request.id}>
          <IncomingCard request={request} onAccept={onAccept} onDecline={onDecline} />
        </li>
      ))}
    </ul>
  );
}

// ─── IncomingEmptyState ───────────────────────────────────────────────────────
function IncomingEmptyState() {
  return (
    <div className="bg-amber-50 rounded-2xl p-10 text-center">
      <p className="text-gray-500 text-lg italic">
        No one has said hello yet, but new connections may appear soon.
      </p>
    </div>
  );
}

// ─── FriendsPage ──────────────────────────────────────────────────────────────
export default function FriendsPage({ user }) {
  const [view, setView]                       = useState('suggested');
  const [filterLocation, setFilterLocation]   = useState('');
  const [filterGender, setFilterGender]       = useState('');
  const [filterInterests, setFilterInterests] = useState([]);
  const [sortBy, setSortBy]                   = useState('common');
  const [outgoing, setOutgoing]               = useState({ [PRE_SEEDED_OUTGOING_ID]: 'pending' });
  const [incoming, setIncoming]               = useState(MOCK_INCOMING);

  function handleSendHello(profileId) {
    setOutgoing(prev => ({ ...prev, [profileId]: 'pending' }));
  }

  function handleCancelHello(profileId) {
    setOutgoing(prev => {
      const next = { ...prev };
      delete next[profileId];
      return next;
    });
  }

  function handleAccept(requestId) {
    setIncoming(prev => prev.map(r => r.id === requestId ? { ...r, status: 'accepted' } : r));
  }

  function handleDecline(requestId) {
    setIncoming(prev => prev.map(r => r.id === requestId ? { ...r, status: 'declined' } : r));
  }

  const filteredProfiles = MOCK_PROFILES
    .filter(p => !filterLocation || p.locationGroup === filterLocation)
    .filter(p => !filterGender   || p.gender === filterGender)
    .filter(p => filterInterests.length === 0 || filterInterests.some(i => p.interests.includes(i)));

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sortBy === 'common')   return countCommon(b) - countCommon(a);
    if (sortBy === 'location') return LOCATION_RANK[a.locationGroup] - LOCATION_RANK[b.locationGroup];
    if (sortBy === 'newest')   return b.addedOrder - a.addedOrder;
    return 0;
  });

  const pendingIncomingCount = incoming.filter(r => r.status === 'pending').length;

  return (
    <div className="w-full space-y-5">

      <PageIntro />

      <ViewToggle
        view={view}
        setView={setView}
        pendingIncomingCount={pendingIncomingCount}
      />

      {view === 'suggested' && (
        <>
          <FilterSortBar
            filterLocation={filterLocation}   setFilterLocation={setFilterLocation}
            filterGender={filterGender}       setFilterGender={setFilterGender}
            filterInterests={filterInterests} setFilterInterests={setFilterInterests}
            sortBy={sortBy}                   setSortBy={setSortBy}
          />

          {sortedProfiles.length > 0 ? (
            <>
              <p className="text-lg text-gray-500">
                {sortedProfiles.length} suggested {sortedProfiles.length === 1 ? 'friend' : 'friends'}
              </p>
              <ProfileList
                sortedProfiles={sortedProfiles}
                outgoing={outgoing}
                onSend={handleSendHello}
                onCancel={handleCancelHello}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}

      {view === 'incoming' && (
        incoming.length === 0
          ? <IncomingEmptyState />
          : <IncomingList
              incoming={incoming}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
      )}

    </div>
  );
}

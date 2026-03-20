/**
 * Mock forum data for the Community Forum page.
 *
 * DATA SHAPE NOTES:
 * - `section`: one of 'all' | 'groups' | 'oneOnOne' | 'general'
 * - `groupName`: present on section === 'groups' posts only.
 *   Future use: filter posts by groupName within the Small Groups section
 *   to show group-specific views without restructuring the component tree.
 * - `reactions`: initial counts for all 5 reaction types.
 * - `replies`: array of reply objects (may be empty).
 * - `isRead`: session-only read state. true = user has seen this post.
 *   Initialized here as a starting value; App.jsx manages live state.
 *   Read state resets on page reload (backend persistence is Phase 2).
 */

export const MOCK_POSTS = [
  // ── All Community ────────────────────────────────────────────────────────
  {
    id: 'p1',
    section: 'all',
    author: 'Margaret T.',
    timestamp: '2 hours ago',
    body: 'Good morning, everyone! The community garden is looking beautiful this week. If anyone would like to come by and pick some tomatoes, please feel free — there are more than enough to share.',
    reactions: { care: 4, smile: 6, support: 1, celebrate: 2, thinking: 0 },
    replies: [
      { id: 'r1', author: 'Harold B.', timestamp: '1 hour ago', body: 'Thank you, Margaret! I will stop by this afternoon. Your garden is always so lovely.' },
      { id: 'r2', author: 'Dorothy K.', timestamp: '45 minutes ago', body: 'How wonderful! I will bring a basket.' },
    ],
    isRead: false,
  },
  {
    id: 'p2',
    section: 'all',
    author: 'Robert M.',
    timestamp: 'Yesterday',
    body: 'Reminder that the community potluck is this Saturday at 2 PM in the main hall. Please bring a dish to share if you are able. All are welcome — no need to sign up in advance.',
    reactions: { care: 2, smile: 8, support: 3, celebrate: 5, thinking: 1 },
    replies: [
      { id: 'r3', author: 'Eleanor S.', timestamp: 'Yesterday', body: 'I will bring my apple crumble. Looking forward to seeing everyone!' },
    ],
    isRead: true,
  },
  {
    id: 'p3',
    section: 'all',
    author: 'Patricia L.',
    timestamp: '2 days ago',
    body: 'Has anyone found a good place nearby to get shoes repaired? My favourite walking shoes need new soles and I would hate to give them up.',
    reactions: { care: 1, smile: 2, support: 4, celebrate: 0, thinking: 3 },
    replies: [],
    isRead: true,
  },

  // ── Small Groups ─────────────────────────────────────────────────────────
  {
    id: 'p4',
    section: 'groups',
    groupName: 'Book Club',
    author: 'Eleanor S.',
    timestamp: '3 hours ago',
    body: 'Our next Book Club meeting is on Thursday at 10 AM. We will be discussing the first half of "The Thursday Murder Club." If you have not started yet, no worries — come along anyway and enjoy the company!',
    reactions: { care: 3, smile: 5, support: 2, celebrate: 1, thinking: 0 },
    replies: [
      { id: 'r4', author: 'Margaret T.', timestamp: '2 hours ago', body: 'I am halfway through and absolutely loving it. See you Thursday!' },
    ],
    isRead: false,
  },
  {
    id: 'p5',
    section: 'groups',
    groupName: 'Garden Circle',
    author: 'Harold B.',
    timestamp: 'Yesterday',
    body: 'The Garden Circle will be planting spring bulbs this weekend. We have tulips, daffodils, and hyacinths ready to go. Come join us Saturday morning — all skill levels welcome, and we will have tea and biscuits afterwards.',
    reactions: { care: 5, smile: 7, support: 2, celebrate: 3, thinking: 1 },
    replies: [],
    isRead: true,
  },
  {
    id: 'p6',
    section: 'groups',
    groupName: 'Walking Group',
    author: 'Dorothy K.',
    timestamp: '2 days ago',
    body: 'Our Wednesday morning walk will start from the park entrance at 9 AM as usual. The route will be the gentle riverside path — about 45 minutes at a comfortable pace. Do bring a light jacket as it may be breezy.',
    reactions: { care: 2, smile: 4, support: 1, celebrate: 0, thinking: 2 },
    replies: [
      { id: 'r5', author: 'Robert M.', timestamp: '2 days ago', body: 'I will be there! Looking forward to it, Dorothy.' },
    ],
    isRead: true,
  },

  // ── One-on-One ───────────────────────────────────────────────────────────
  {
    id: 'p7',
    section: 'oneOnOne',
    author: 'Eleanor S.',
    timestamp: '1 hour ago',
    body: 'Dorothy, I was thinking of you after our walk last Tuesday. I hope you are feeling well and that your knee is giving you less trouble. Sending warm thoughts your way.',
    reactions: { care: 6, smile: 3, support: 4, celebrate: 0, thinking: 2 },
    replies: [
      { id: 'r6', author: 'Dorothy K.', timestamp: '30 minutes ago', body: 'Eleanor, that is so kind of you. My knee is much better, thank you. I hope to join the next walk!' },
    ],
    isRead: false,
  },
  {
    id: 'p8',
    section: 'oneOnOne',
    author: 'Harold B.',
    timestamp: 'Yesterday',
    body: 'Robert, thank you so much for helping me carry those boxes last week. I truly could not have managed without you. I would love to have you over for a cup of tea sometime soon.',
    reactions: { care: 4, smile: 5, support: 2, celebrate: 1, thinking: 0 },
    replies: [],
    isRead: true,
  },
  {
    id: 'p9',
    section: 'oneOnOne',
    author: 'Patricia L.',
    timestamp: '3 days ago',
    body: 'Margaret, I made your lemon drizzle cake recipe and it turned out wonderfully! My grandchildren were very impressed. Thank you so much for sharing it with me.',
    reactions: { care: 3, smile: 7, support: 1, celebrate: 4, thinking: 0 },
    replies: [
      { id: 'r7', author: 'Margaret T.', timestamp: '3 days ago', body: 'Oh Patricia, that makes me so happy to hear! I am glad the grandchildren enjoyed it.' },
    ],
    isRead: true,
  },

  // ── General ──────────────────────────────────────────────────────────────
  {
    id: 'p10',
    section: 'general',
    author: 'Robert M.',
    timestamp: '4 hours ago',
    body: 'Does anyone have a good recipe for homemade soup? The weather has turned chilly and I fancy something warm and comforting for the week ahead.',
    reactions: { care: 2, smile: 4, support: 1, celebrate: 0, thinking: 3 },
    replies: [
      { id: 'r8', author: 'Eleanor S.', timestamp: '3 hours ago', body: 'I have a lovely leek and potato soup recipe I would be happy to share. I will write it out for you!' },
    ],
    isRead: false,
  },
  {
    id: 'p11',
    section: 'general',
    author: 'Dorothy K.',
    timestamp: 'Yesterday',
    body: 'I spotted a family of ducks on the pond this morning — three little ducklings following their mother. Such a cheerful sight to start the day. I hope it brightens your morning too!',
    reactions: { care: 8, smile: 10, support: 0, celebrate: 5, thinking: 1 },
    replies: [],
    isRead: true,
  },
  {
    id: 'p12',
    section: 'general',
    author: 'Margaret T.',
    timestamp: '2 days ago',
    body: 'I have been enjoying the new large-print puzzle books from the library. If anyone would like to borrow one when I am finished, please let me know. They are very relaxing on a quiet afternoon.',
    reactions: { care: 3, smile: 5, support: 2, celebrate: 1, thinking: 2 },
    replies: [
      { id: 'r9', author: 'Patricia L.', timestamp: '2 days ago', body: 'I would love to borrow one, Margaret. Thank you for thinking of us!' },
    ],
    isRead: true,
  },
];

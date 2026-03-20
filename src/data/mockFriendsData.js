/**
 * Mock data for the Friends Match page.
 *
 * DATA SHAPE NOTES:
 * - `locationGroup`: 'same' | 'nearby' | 'other' — used for filter + sort ranking
 * - `connectPref`: optional preferred way to connect; null on some profiles
 * - `matchReason`: human-written, warm — reused as the "why this card" helper line
 * - `addedOrder`: integer for "Newest" sort
 * - `profileImageIndex`: number | null
 *     0–7 = portrait position in Friends_Match.png (4 cols × 2 rows, left-to-right, top-to-bottom)
 *     null = show initials fallback banner
 *
 * PRE_SEEDED_OUTGOING_ID: 'f3' — FriendsPage initialises outgoing state with this ID as pending.
 */

export const INTEREST_POOL = [
  'Gardening', 'Reading', 'Walking', 'Cooking', 'Music',
  'Crafts', 'Birdwatching', 'Puzzles', 'Travel memories',
  'Family stories', 'Faith & spirituality', 'Card games',
];

export const MOCK_PROFILES = [
  // ── High overlap with MY_INTERESTS (Gardening, Reading, Walking, Cooking) ──
  {
    id: 'f1',
    name: 'Dorothy Hargreaves',
    age: 72,
    location: 'Springfield',
    locationGroup: 'same',
    gender: 'Woman',
    interests: ['Gardening', 'Reading', 'Walking', 'Cooking'],
    bio: 'I have kept a garden for over forty years and there is nothing I love more than a quiet morning among the flowers. I also enjoy a good novel and cooking for family on Sundays.',
    connectPref: 'Tea or a chat',
    matchReason: 'You both enjoy gardening, reading, and quiet walks — there is plenty to talk about.',
    addedOrder: 1,
    profileImageIndex: 0, // col 0, row 0
  },
  {
    id: 'f2',
    name: 'Harold Pemberton',
    age: 78,
    location: 'Springfield',
    locationGroup: 'same',
    gender: 'Man',
    interests: ['Walking', 'Cooking', 'Family stories', 'Card games'],
    bio: 'Retired schoolteacher who loves a brisk morning walk and a good card game in the afternoon. I have plenty of family stories to share and enjoy hearing others\' too.',
    connectPref: 'Walking together',
    matchReason: 'You both enjoy walking and cooking, and Harold loves a good conversation over a shared meal.',
    addedOrder: 2,
    profileImageIndex: 2, // col 2, row 0
  },
  // ── pre-seeded: outgoing hello pending ──
  {
    id: 'f3',
    name: 'Eleanor Sutton',
    age: 69,
    location: 'Springfield',
    locationGroup: 'same',
    gender: 'Woman',
    interests: ['Reading', 'Music', 'Crafts', 'Gardening'],
    bio: 'I spend my mornings reading and my afternoons knitting or playing the piano. I find great comfort in creative things and love meeting people who share that gentle pace of life.',
    connectPref: 'Book club',
    matchReason: 'You both love reading and gardening, and Eleanor brings a warm creative energy to every conversation.',
    addedOrder: 3,
    profileImageIndex: 3, // col 3, row 0
  },
  {
    id: 'f4',
    name: 'Robert Ashworth',
    age: 74,
    location: 'Springfield',
    locationGroup: 'same',
    gender: 'Man',
    interests: ['Birdwatching', 'Walking', 'Travel memories', 'Reading'],
    bio: 'I have been birdwatching since I was a boy and still go out every weekend with my binoculars. I also love sharing stories from my travels and hearing about other people\'s adventures.',
    connectPref: 'Walking together',
    matchReason: 'You both enjoy walking and reading, and Robert has wonderful travel stories to share.',
    addedOrder: 4,
    profileImageIndex: 4, // col 0, row 1
  },
  {
    id: 'f5',
    name: 'Patricia Lowe',
    age: 81,
    location: 'Maplewood',
    locationGroup: 'nearby',
    gender: 'Woman',
    interests: ['Cooking', 'Faith & spirituality', 'Family stories', 'Crafts'],
    bio: 'Faith and family are at the heart of everything I do. I love cooking for others, making handmade cards, and sharing stories about the people I love.',
    connectPref: 'Community events',
    matchReason: 'You both enjoy cooking and sharing family stories — Patricia would love to swap recipes.',
    addedOrder: 5,
    profileImageIndex: 5, // col 1, row 1
  },
  {
    id: 'f6',
    name: 'George Whitfield',
    age: 76,
    location: 'Maplewood',
    locationGroup: 'nearby',
    gender: 'Man',
    interests: ['Puzzles', 'Card games', 'Music', 'Reading'],
    bio: 'I do a crossword every morning and a jigsaw every evening — puzzles keep my mind sharp and my spirits up. I also play the harmonica and enjoy a friendly card game.',
    connectPref: 'Phone call',
    matchReason: 'George loves reading and music, and would enjoy a relaxed chat or a friendly game.',
    addedOrder: 6,
    profileImageIndex: 6, // col 2, row 1
  },
  {
    id: 'f7',
    name: 'Margaret Okafor',
    age: 67,
    location: 'Maplewood',
    locationGroup: 'nearby',
    gender: 'Woman',
    interests: ['Gardening', 'Cooking', 'Faith & spirituality', 'Walking'],
    bio: 'I moved here three years ago and have been slowly building a little community garden plot. Cooking and faith keep me grounded, and I am always happy to meet a new neighbour.',
    connectPref: 'Walking together',
    matchReason: 'You share a love of gardening, cooking, and walking — Margaret would be a wonderful companion.',
    addedOrder: 7,
    profileImageIndex: 1, // col 1, row 0
  },
  // ── Low overlap with MY_INTERESTS — contrast profile ──
  {
    id: 'f8',
    name: 'Sylvia Chen',
    age: 70,
    location: 'Riverside',
    locationGroup: 'other',
    gender: 'Woman',
    interests: ['Music', 'Crafts', 'Birdwatching', 'Puzzles'],
    bio: 'I play the violin in a small community ensemble and spend my free time making paper crafts and watching birds from my balcony. Life is full of small beautiful things.',
    connectPref: null,
    matchReason: 'Sylvia brings a creative and peaceful energy — you might enjoy discovering new interests together.',
    addedOrder: 8,
    profileImageIndex: 7, // col 3, row 1
  },
  {
    id: 'f9',
    name: 'Thomas Brennan',
    age: 83,
    location: 'Riverside',
    locationGroup: 'other',
    gender: 'Man',
    interests: ['Travel memories', 'Family stories', 'Card games', 'Faith & spirituality'],
    bio: 'I have lived in five countries and have a story for every one of them. These days I enjoy a quiet card game, Sunday services, and sharing memories with good company.',
    connectPref: 'Phone call',
    matchReason: 'Thomas has a lifetime of stories and a warm, unhurried way of connecting with people.',
    addedOrder: 9,
    profileImageIndex: null, // initials fallback
  },
  {
    id: 'f10',
    name: 'Jean Moreau',
    age: 65,
    location: 'Oakdale',
    locationGroup: 'other',
    gender: 'Non-binary',
    interests: ['Music', 'Reading', 'Crafts', 'Travel memories'],
    bio: 'I retired early to focus on music and making things with my hands. I love a good book, a long conversation, and finding beauty in everyday moments.',
    connectPref: 'Tea or a chat',
    matchReason: 'You both enjoy reading, and Jean has a gentle, thoughtful way of connecting with others.',
    addedOrder: 10,
    profileImageIndex: null, // initials fallback
  },
];

export const MOCK_INCOMING = [
  {
    id: 'inc1',
    fromProfile: {
      id: 'inc-p1',
      name: 'Beatrice Holloway',
      age: 73,
      location: 'Springfield',
      gender: 'Woman',
      interests: ['Gardening', 'Reading', 'Family stories'],
      bio: 'I have lived in Springfield all my life and love nothing more than a good book and a cup of tea in the garden. I am hoping to meet a few more friendly faces in the neighbourhood.',
      connectPref: 'Tea or a chat',
    },
    status: 'pending',
  },
  {
    id: 'inc2',
    fromProfile: {
      id: 'inc-p2',
      name: 'Arthur Nkosi',
      age: 79,
      location: 'Maplewood',
      gender: 'Man',
      interests: ['Walking', 'Card games', 'Music', 'Cooking'],
      bio: 'I enjoy a morning walk, a good meal, and a friendly card game in the evening. I moved here last year and would love to meet some neighbours who share my interests.',
      connectPref: 'Walking together',
    },
    status: 'pending',
  },
  {
    id: 'inc3',
    fromProfile: {
      id: 'inc-p3',
      name: 'Constance Webb',
      age: 68,
      location: 'Springfield',
      gender: 'Woman',
      interests: ['Crafts', 'Puzzles', 'Faith & spirituality', 'Birdwatching'],
      bio: 'I make handmade quilts and spend quiet afternoons doing puzzles or watching the birds in my garden. I find great peace in simple, creative things and warm company.',
      connectPref: 'Community events',
    },
    status: 'pending',
  },
];

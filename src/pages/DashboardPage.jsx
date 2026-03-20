import { useState, useEffect } from 'react';

// ─── Constants ───────────────────────────────────────────────────────────────

const MOODS = [
  { value: 1, emoji: '😄', label: 'Great',    response: "That's wonderful! We're so glad you're feeling great today. 🌟" },
  { value: 2, emoji: '🙂', label: 'Good',     response: "Good to hear! Keep enjoying your day. 😊" },
  { value: 3, emoji: '😐', label: 'Okay',     response: "That's okay — some days are just steady. You're doing fine. 💛" },
  { value: 4, emoji: '😔', label: 'Low',      response: "We're sorry you're feeling low. You're not alone — we're here for you. 💙" },
  { value: 5, emoji: '😢', label: 'Very Low', response: "Thank you for sharing that. It takes courage. Please know we care about you. 💜" },
];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEFAULT_REMINDERS = [
  { id: 1, text: 'Call Emily',                      done: false },
  { id: 2, text: 'Bring glasses',                   done: false },
  { id: 3, text: 'Dinner with Ms. Brookes',         done: false },
  { id: 4, text: 'Cardiologist appointment at 2 PM',done: false },
];

const DEFAULT_MEDICATIONS = {
  Morning:   [{ id: 1, name: 'Aspirin 81mg', taken: false }, { id: 2, name: 'Metformin 500mg', taken: false }],
  Afternoon: [{ id: 3, name: 'Lisinopril 10mg', taken: false }],
  Evening:   [{ id: 4, name: 'Atorvastatin 20mg', taken: false }, { id: 5, name: 'Vitamin D3', taken: false }],
  Night:     [{ id: 6, name: 'Melatonin 5mg', taken: false }],
};

// ─── CheckInNudgeCard ─────────────────────────────────────────────────────────
function CheckInNudgeCard() {
  return (
    <div className="bg-amber-100 border border-amber-300 rounded-2xl p-5">
      <p className="text-amber-800 font-semibold text-xl">🌤 Daily Check-In Reminder</p>
      <p className="text-amber-700 text-lg mt-1">
        You haven't checked in today yet. Scroll down to let us know how you're feeling!
      </p>
    </div>
  );
}

// ─── DateTimeCard ─────────────────────────────────────────────────────────────
function DateTimeCard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
      <p className="text-amber-700 font-semibold text-xl mb-1">📅 Date &amp; Time</p>
      <p className="text-gray-800 text-lg font-medium">{dateStr}</p>
      <p className="text-gray-700 text-4xl font-bold mt-2">{timeStr}</p>
    </div>
  );
}

// ─── WeatherCard ──────────────────────────────────────────────────────────────
function WeatherCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
      <p className="text-amber-700 font-semibold text-xl mb-1">🌤 Weather</p>
      <p className="text-gray-800 text-2xl font-bold">Partly Cloudy · 72°F</p>
      <p className="text-gray-500 text-base mt-2">📍 Springfield</p>
      <p className="text-gray-400 text-sm mt-1 italic">Sample data — live weather coming soon</p>
    </div>
  );
}

// ─── CheckInCard ──────────────────────────────────────────────────────────────
function CheckInCard({ selectedMood, setSelectedMood, supportStep, setSupportStep, setCheckedInToday, onNavigate }) {
  function handleMoodSelect(mood) {
    setSelectedMood(mood);
    setCheckedInToday(true);
    if (mood.value === 5) setSupportStep('crisis');
    else if (mood.value === 4) setSupportStep('support');
    else setSupportStep('none');
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-amber-700 font-semibold text-xl mb-4">💬 How are you feeling today?</p>

      <div className="flex flex-wrap gap-3 mb-4">
        {MOODS.map(mood => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood)}
            aria-pressed={selectedMood?.value === mood.value}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-400
              ${selectedMood?.value === mood.value
                ? 'border-amber-500 bg-amber-100 text-amber-800'
                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-amber-300 hover:bg-amber-50'}`}
            style={{ minHeight: '56px' }}
          >
            <span aria-hidden="true">{mood.emoji}</span> {mood.label}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-amber-800 text-lg">{selectedMood.response}</p>
        </div>
      )}

      {/* Support prompt — moods 4 or 5 */}
      {(supportStep === 'support' || supportStep === 'crisis') && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium text-lg mb-3">Would you like to connect with someone?</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '💬 Community Forum', action: () => onNavigate('community') },
              { label: '👥 Friends Match',   action: () => onNavigate('friends')   },
              { label: '🤝 Volunteer Match', action: () => onNavigate('volunteer') },
              { label: 'Maybe Later',        action: () => setSupportStep('none')  },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                className="px-5 py-3 rounded-xl border border-amber-400 text-amber-800 bg-amber-50 hover:bg-amber-100 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                style={{ minHeight: '52px' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Crisis prompt — mood 5 only */}
      {supportStep === 'crisis' && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium text-lg mb-3">You can also reach out to someone you trust:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '👨‍👩‍👧 Talk to family',           action: () => setSupportStep('none') },
              { label: '👫 Talk to a friend',           action: () => setSupportStep('none') },
              { label: '🤗 Talk to someone you trust',  action: () => setSupportStep('none') },
              { label: '🩺 Professional support',       action: () => setSupportStep('professional') },
              { label: 'Maybe later',                   action: () => setSupportStep('none') },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                className="px-5 py-3 rounded-xl border border-orange-300 text-orange-800 bg-orange-50 hover:bg-orange-100 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{ minHeight: '52px' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {supportStep === 'professional' && (
        <div className="mb-4">
          <p className="text-gray-700 font-medium text-lg mb-3">How would you like to connect with a professional?</p>
          <div className="flex flex-wrap gap-2">
            {['📞 Phone', '📹 Video', '💬 Chat'].map(label => (
              <button key={label} onClick={() => setSupportStep('confirmed')}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{ minHeight: '52px' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {supportStep === 'confirmed' && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <p className="text-green-800 font-semibold text-lg">✅ A professional will be with you shortly.</p>
          <p className="text-green-700 text-base mt-1">Please stay on this page. Help is on the way.</p>
        </div>
      )}
    </div>
  );
}

// ─── MedicationReminderCard (structured sticky note) ─────────────────────────
function MedicationReminderCard() {
  const [meds, setMeds] = useState(DEFAULT_MEDICATIONS);

  function toggleTaken(section, id) {
    setMeds(prev => ({
      ...prev,
      [section]: prev[section].map(m => m.id === id ? { ...m, taken: !m.taken } : m),
    }));
  }

  function addMed(section, name) {
    if (!name.trim()) return;
    setMeds(prev => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now(), name: name.trim(), taken: false }],
    }));
  }

  function removeMed(section, id) {
    setMeds(prev => ({
      ...prev,
      [section]: prev[section].filter(m => m.id !== id),
    }));
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm p-5">
      <p className="text-amber-800 font-semibold text-xl mb-4">💊 Medication Reminders</p>
      <div className="space-y-4">
        {Object.entries(meds).map(([section, items]) => (
          <MedSection key={section} section={section} items={items}
            onToggle={(id) => toggleTaken(section, id)}
            onAdd={(name) => addMed(section, name)}
            onRemove={(id) => removeMed(section, id)}
          />
        ))}
      </div>
    </div>
  );
}

function MedSection({ section, items, onToggle, onAdd, onRemove }) {
  const [input, setInput] = useState('');
  const icons = { Morning: '🌅', Afternoon: '☀️', Evening: '🌆', Night: '🌙' };
  return (
    <div>
      <p className="text-amber-700 font-semibold text-lg mb-2">{icons[section]} {section}</p>
      <ul className="space-y-2 mb-2">
        {items.map(med => (
          <li key={med.id} className="flex items-center gap-2">
            <input type="checkbox" checked={med.taken} onChange={() => onToggle(med.id)}
              id={`med-${med.id}`}
              className="w-5 h-5 accent-amber-500 cursor-pointer"
              aria-label={`Mark ${med.name} as taken`}
            />
            <label htmlFor={`med-${med.id}`}
              className={`text-lg flex-1 cursor-pointer ${med.taken ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {med.name}
            </label>
            <button onClick={() => onRemove(med.id)}
              className="text-red-400 hover:text-red-600 text-base focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1"
              aria-label={`Remove ${med.name}`}>✕</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { onAdd(input); setInput(''); } }}
          placeholder="Add medication…"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label={`Add ${section} medication`}
          style={{ minHeight: '44px' }}
        />
        <button onClick={() => { onAdd(input); setInput(''); }}
          className="bg-amber-400 hover:bg-amber-500 text-white text-base font-medium rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={{ minHeight: '44px' }}>
          Add
        </button>
      </div>
    </div>
  );
}

// ─── ActivityNotificationsCard ────────────────────────────────────────────────
const SECTION_LABELS = {
  all:      { singular: 'new update in All Community',   plural: 'new updates in All Community' },
  groups:   { singular: 'new message in Small Groups',   plural: 'new messages in Small Groups' },
  oneOnOne: { singular: 'new note in One-on-One',        plural: 'new notes in One-on-One' },
  general:  { singular: 'new message in General',        plural: 'new messages in General' },
};

function ActivityNotificationsCard({ unreadBySection = {} }) {
  const sections = ['all', 'groups', 'oneOnOne', 'general'];
  const activeItems = sections.filter(id => (unreadBySection[id] || 0) > 0);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl shadow-sm p-5">
      <p className="text-blue-700 font-semibold text-xl mb-2">🔔 Activity Notifications</p>
      {activeItems.length === 0 ? (
        <p className="text-blue-600 text-lg">
          You are all caught up! Nothing new since your last visit.
        </p>
      ) : (
        <ul className="space-y-1">
          {activeItems.map(id => {
            const count = unreadBySection[id];
            const { singular, plural } = SECTION_LABELS[id];
            return (
              <li key={id} className="text-blue-700 text-lg">
                {count} {count === 1 ? singular : plural}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── TodaysReminderCard (checklist) ──────────────────────────────────────────
function TodaysReminderCard() {
  const [reminders, setReminders] = useState(DEFAULT_REMINDERS);
  const [newText, setNewText] = useState('');

  function toggleDone(id) {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  }

  function addReminder() {
    if (!newText.trim()) return;
    setReminders(prev => [...prev, { id: Date.now(), text: newText.trim(), done: false }]);
    setNewText('');
  }

  function removeReminder(id) {
    setReminders(prev => prev.filter(r => r.id !== id));
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-sm p-5">
      <p className="text-orange-700 font-semibold text-xl mb-3">📌 Today's Reminders</p>
      <ul className="space-y-3 mb-3">
        {reminders.map(r => (
          <li key={r.id} className="flex items-center gap-3">
            <input type="checkbox" checked={r.done} onChange={() => toggleDone(r.id)}
              id={`rem-${r.id}`}
              className="w-6 h-6 accent-orange-500 cursor-pointer"
              aria-label={`Mark "${r.text}" as done`}
            />
            <label htmlFor={`rem-${r.id}`}
              className={`text-lg flex-1 cursor-pointer ${r.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {r.text}
            </label>
            <button onClick={() => removeReminder(r.id)}
              className="text-red-400 hover:text-red-600 text-base focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1"
              aria-label={`Remove reminder: ${r.text}`}>✕</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input value={newText} onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addReminder()}
          placeholder="Add a reminder…"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
          aria-label="New reminder"
          style={{ minHeight: '48px' }}
        />
        <button onClick={addReminder}
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg px-4 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          style={{ minHeight: '48px' }}>
          Add
        </button>
      </div>
    </div>
  );
}

// ─── WeeklyJournalCard (day-by-day) ──────────────────────────────────────────
function WeeklyJournalCard() {
  const [entries, setEntries] = useState(
    Object.fromEntries(WEEK_DAYS.map(d => [d, { note: '', photos: [] }]))
  );

  function updateNote(day, note) {
    setEntries(prev => ({ ...prev, [day]: { ...prev[day], note } }));
  }

  function handlePhotos(day, files) {
    const urls = Array.from(files).slice(0, 2).map(f => URL.createObjectURL(f));
    setEntries(prev => ({ ...prev, [day]: { ...prev[day], photos: urls } }));
  }

  function removePhoto(day, idx) {
    setEntries(prev => ({
      ...prev,
      [day]: { ...prev[day], photos: prev[day].photos.filter((_, i) => i !== idx) },
    }));
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-amber-700 font-semibold text-xl mb-4">📓 My Weekly Journal</p>
      <div className="space-y-4">
        {WEEK_DAYS.map(day => (
          <div key={day} className="border border-gray-100 rounded-xl p-4 bg-amber-50">
            <p className="text-amber-800 font-semibold text-lg mb-2">{day}</p>
            <textarea
              value={entries[day].note}
              onChange={e => updateNote(day, e.target.value)}
              placeholder={`How was your ${day}?`}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-lg text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
              aria-label={`Journal entry for ${day}`}
            />
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              <label className="cursor-pointer text-base text-amber-700 underline focus-within:ring-2 focus-within:ring-amber-400 rounded">
                📷 Add photos (up to 2)
                <input type="file" accept="image/*" multiple className="sr-only"
                  onChange={e => handlePhotos(day, e.target.files)}
                  aria-label={`Upload photos for ${day}`}
                />
              </label>
              {entries[day].photos.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} alt={`${day} photo ${i + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-amber-200" />
                  <button onClick={() => removePhoto(day, i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center focus:outline-none"
                    aria-label={`Remove photo ${i + 1} from ${day}`}>✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DashboardPage ────────────────────────────────────────────────────────────
export default function DashboardPage({ user, onNavigate, unreadBySection = {} }) {
  const [selectedMood, setSelectedMood]     = useState(null);
  const [supportStep, setSupportStep]       = useState('none');
  const [checkedInToday, setCheckedInToday] = useState(false);

  return (
    <div className="w-full space-y-5">

      {/* 1. Nudge */}
      {!checkedInToday && <CheckInNudgeCard />}

      {/* 3. Date/Time + Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DateTimeCard />
        <WeatherCard />
      </div>

      {/* 4. Daily Check-In */}
      <CheckInCard
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        supportStep={supportStep}
        setSupportStep={setSupportStep}
        setCheckedInToday={setCheckedInToday}
        onNavigate={onNavigate}
      />

      {/* 5. Sticky note row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MedicationReminderCard />
        <ActivityNotificationsCard unreadBySection={unreadBySection} />
        <TodaysReminderCard />
      </div>

      {/* 6. Weekly Journal */}
      <WeeklyJournalCard />

    </div>
  );
}

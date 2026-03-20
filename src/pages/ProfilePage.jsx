import { useState, useRef, useEffect } from 'react';
import {
  LANGUAGE_OPTIONS,
  INTEREST_OPTIONS,
  CONNECTION_STYLE_OPTIONS,
  TIME_SPENDING_OPTIONS,
  CONNECT_PREFERENCE_OPTIONS,
  CULTURAL_PREFS_OPTIONS,
  HELPING_INTERESTS_OPTIONS,
  AVAILABILITY_OPTIONS,
} from '../data/profileOptions';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const EMPTY_PROFILE = {
  displayName:               '',
  age:                       '',
  location:                  '',
  gender:                    '',
  genderCustom:              '',
  languages:                 [],
  languagesCustom:           [],
  interests:                 [],
  interestsCustom:           [],
  connectionStyle:           [],
  connectionStyleCustom:     [],
  timeSpending:              [],
  timeSpendingCustom:        [],
  connectPreference:         [],
  connectPreferenceCustom:   [],
  culturalPreferences:       [],
  culturalPreferencesCustom: [],
  bio:                       '',
  volunteerAnswer:           '',
  volunteerHelpingInterests: [],
  volunteerAvailability:     [],
  profilePhoto:              null,
  volunteerFlag:             false,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getInitials(name) {
  if (!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function isProfileEmpty(profileData) {
  return profileData === null;
}

function hasValue(v) {
  if (Array.isArray(v)) return v.length > 0;
  return v !== null && v !== undefined && String(v).trim().length > 0;
}

// ---------------------------------------------------------------------------
// InitialsAvatar
// ---------------------------------------------------------------------------

function InitialsAvatar({ name, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-base',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
  };
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold flex-shrink-0`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PhotoUploader
// ---------------------------------------------------------------------------

function PhotoUploader({ photo, name, onChange, onRemove }) {
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.onerror = () => {}; // silently ignore
    reader.readAsDataURL(file);
    // reset input so same file can be re-selected
    e.target.value = '';
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {photo ? (
          <img
            src={photo}
            alt="Your profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-amber-300"
          />
        ) : (
          <InitialsAvatar name={name || '?'} size="lg" />
        )}
      </div>
      <p className="text-base text-amber-700 italic">A photo is welcome, but not required.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          style={{ minHeight: '48px' }}
        >
          {photo ? 'Change photo' : 'Choose a photo'}
        </button>
        {photo && (
          <button
            type="button"
            onClick={onRemove}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{ minHeight: '48px' }}
          >
            Remove photo
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-label="Upload profile photo"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// TagSelector
// ---------------------------------------------------------------------------

function TagSelector({ label, options, selected, customValues, onChange, allowCustom }) {
  const [customInput, setCustomInput] = useState('');

  function togglePreset(option) {
    const next = selected.includes(option)
      ? selected.filter(v => v !== option)
      : [...selected, option];
    onChange(next, customValues);
  }

  function removeTag(value) {
    const nextSelected = selected.filter(v => v !== value);
    const nextCustom = customValues.filter(v => v !== value);
    onChange(nextSelected, nextCustom);
  }

  function addCustom() {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    // case-insensitive duplicate check, but preserve entered capitalisation
    const isDuplicate = selected.some(v => v.toLowerCase() === trimmed.toLowerCase());
    if (isDuplicate) { setCustomInput(''); return; }
    onChange([...selected, trimmed], [...customValues, trimmed]);
    setCustomInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
  }

  return (
    <fieldset className="mb-6">
      <legend className="text-xl font-semibold text-amber-900 mb-4">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => togglePreset(option)}
              aria-pressed={isSelected}
              className={`px-5 py-2 rounded-full text-lg font-medium border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isSelected
                  ? 'bg-amber-400 border-amber-500 text-white'
                  : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
              }`}
              style={{ minHeight: '52px' }}
            >
              {option}
            </button>
          );
        })}
        {/* Custom chips */}
        {customValues.map(val => (
          <span
            key={val}
            className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-lg font-medium bg-orange-100 border-2 border-orange-300 text-orange-800"
            style={{ minHeight: '52px' }}
          >
            {val}
            <button
              type="button"
              onClick={() => removeTag(val)}
              aria-label={`Remove ${val}`}
              className="ml-1 text-orange-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {allowCustom && (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add your own…"
            aria-label={`Add a custom option for ${label}`}
            className="flex-1 border-2 border-amber-300 rounded-xl px-5 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{ minHeight: '52px' }}
          />
          <button
            type="button"
            onClick={addCustom}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            style={{ minHeight: '52px' }}
          >
            Add
          </button>
        </div>
      )}
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// VolunteerSubFields
// ---------------------------------------------------------------------------

function VolunteerSubFields({ draft, setDraft }) {
  return (
    <div className="mt-2 pl-4 border-l-4 border-amber-200 space-y-2">
      <p className="text-base text-amber-700 mb-4">
        That's wonderful! Tell us a little about how you'd like to help — you can always update this later.
      </p>
      <TagSelector
        label="What kinds of help feel right for you?"
        options={HELPING_INTERESTS_OPTIONS}
        selected={draft.volunteerHelpingInterests}
        customValues={[]}
        onChange={(next) => setDraft(prev => ({ ...prev, volunteerHelpingInterests: next }))}
        allowCustom={false}
      />
      <TagSelector
        label="When are you usually available?"
        options={AVAILABILITY_OPTIONS}
        selected={draft.volunteerAvailability}
        customValues={[]}
        onChange={(next) => setDraft(prev => ({ ...prev, volunteerAvailability: next }))}
        allowCustom={false}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionCard
// ---------------------------------------------------------------------------

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-l-4 border-amber-400 px-6 py-5 mb-5">
      <h2 className="text-xl font-bold text-amber-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TagGroup — read-only chip list for view mode
// ---------------------------------------------------------------------------

function TagGroup({ label, values }) {
  if (!values || values.length === 0) return null;
  return (
    <div className="mb-3">
      {label && <p className="text-base font-semibold text-gray-600 mb-2">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {values.map(v => (
          <span
            key={v}
            className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-base"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProfileHeader — top of view mode
// ---------------------------------------------------------------------------

function ProfileHeader({ profileData, onEdit }) {
  const { displayName, age, location, profilePhoto } = profileData;

  // Build inline meta line — only include present values, no dangling separators
  const metaParts = [];
  if (hasValue(age)) metaParts.push(`Age ${age}`);
  if (hasValue(location)) metaParts.push(location);
  const metaLine = metaParts.join(' · ');

  return (
    <div className="bg-white rounded-2xl shadow-sm px-6 py-6 mb-5 flex items-center gap-5">
      {profilePhoto ? (
        <img
          src={profilePhoto}
          alt={`${displayName}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-amber-300 flex-shrink-0"
        />
      ) : (
        <InitialsAvatar name={displayName} size="lg" />
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-amber-900 leading-tight">{displayName}</h1>
        {metaLine && <p className="text-base text-gray-500 mt-1">{metaLine}</p>}
      </div>
      <button
        onClick={onEdit}
        className="px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-amber-400 flex-shrink-0"
        style={{ minHeight: '48px' }}
      >
        Edit My Profile
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProfileView — warm portfolio layout
// ---------------------------------------------------------------------------

function ProfileView({ profileData, onEdit }) {
  const {
    gender, genderCustom, languages, bio,
    interests, connectionStyle, timeSpending,
    connectPreference, culturalPreferences,
    volunteerFlag, volunteerHelpingInterests, volunteerAvailability,
  } = profileData;

  // Merge preset + custom into a single display list
  const genderDisplay = gender === 'Something else' && genderCustom
    ? genderCustom
    : gender;

  const showThingsIEnjoy = hasValue(interests) || hasValue(connectionStyle) || hasValue(timeSpending);
  const showHowIConnect  = hasValue(connectPreference) || hasValue(culturalPreferences);
  const showHelping      = volunteerFlag === true;

  return (
    <div className="max-w-2xl mx-auto">
      <ProfileHeader profileData={profileData} onEdit={onEdit} />

      {/* About Me */}
      <SectionCard title="About Me">
        {hasValue(genderDisplay) && (
          <p className="text-base text-gray-700 mb-3">
            <span className="font-semibold text-gray-600">Gender: </span>{genderDisplay}
          </p>
        )}
        <TagGroup label="Languages" values={languages} />
        {hasValue(bio) && (
          <p className="text-base text-gray-700 mt-2 leading-relaxed">{bio}</p>
        )}
      </SectionCard>

      {/* Things I Enjoy */}
      {showThingsIEnjoy && (
        <SectionCard title="Things I Enjoy">
          <TagGroup label="Interests" values={interests} />
          <TagGroup label="What makes me feel connected" values={connectionStyle} />
          <TagGroup label="How I like to spend my time" values={timeSpending} />
        </SectionCard>
      )}

      {/* How I Like to Connect */}
      {showHowIConnect && (
        <SectionCard title="How I Like to Connect">
          <TagGroup label="I prefer to connect by" values={connectPreference} />
          <TagGroup label="Personal preferences" values={culturalPreferences} />
        </SectionCard>
      )}

      {/* Helping Others */}
      {showHelping && (
        <SectionCard title="Helping Others">
          <TagGroup label="Ways I'd like to help" values={volunteerHelpingInterests} />
          <TagGroup label="When I'm available" values={volunteerAvailability} />
        </SectionCard>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SetupPrompt
// ---------------------------------------------------------------------------

function SetupPrompt({ onBegin }) {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-md px-8 py-10 text-center border-t-4 border-amber-400">
        <div className="text-5xl mb-4">👋</div>
        <h1 className="text-2xl font-bold text-amber-900 mb-3">
          Let's get to know you a little better
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Your profile helps us connect you with the right people and activities.
          It only takes a few minutes, and you can always come back to update it later.
        </p>
        <button
          onClick={onBegin}
          className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          style={{ minHeight: '56px' }}
          aria-label="Begin setting up your profile"
        >
          Let's get started
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SuccessBanner
// ---------------------------------------------------------------------------

function SuccessBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 px-5 py-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-base font-medium text-center"
    >
      ✓ Your profile has been updated
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProfileForm
// ---------------------------------------------------------------------------

function ProfileForm({ draft, setDraft, onSave, onCancel, isFirstTime, displayNameError, setDisplayNameError }) {
  const bioLength = draft.bio?.length ?? 0;
  const bioRemaining = 500 - bioLength;

  function update(field, value) {
    setDraft(prev => ({ ...prev, [field]: value }));
  }

  function updateTags(mainField, customField) {
    return (nextSelected, nextCustom) => {
      setDraft(prev => ({
        ...prev,
        [mainField]: nextSelected,
        [customField]: nextCustom,
      }));
    };
  }

  function handleVolunteerAnswer(answer) {
    setDraft(prev => ({
      ...prev,
      volunteerAnswer: answer,
      // clear sub-fields when switching to no
      ...(answer === 'no' ? { volunteerHelpingInterests: [], volunteerAvailability: [] } : {}),
    }));
  }

  const GENDER_OPTIONS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say', 'Something else'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
      <form
        onSubmit={e => { e.preventDefault(); onSave(draft); }}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* 1. About You — spans full width on its own row so photo + fields sit side by side */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">About You</h2>
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Photo */}
              <div className="flex-shrink-0">
                <PhotoUploader
                  photo={draft.profilePhoto}
                  name={draft.displayName || '?'}
                  onChange={url => update('profilePhoto', url)}
                  onRemove={() => update('profilePhoto', null)}
                />
              </div>
              {/* Fields */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Display Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="displayName" className="block text-xl font-semibold text-amber-900 mb-2">
                    What would you like us to call you? <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={draft.displayName}
                    onChange={e => { update('displayName', e.target.value); setDisplayNameError(false); }}
                    placeholder="Just a first name is fine"
                    className={`w-full border-2 rounded-xl px-5 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      displayNameError ? 'border-amber-500 bg-amber-50' : 'border-amber-300'
                    }`}
                    style={{ minHeight: '52px' }}
                    aria-required="true"
                    aria-describedby={displayNameError ? 'displayName-error' : undefined}
                  />
                  {displayNameError && (
                    <p id="displayName-error" className="mt-2 text-lg text-amber-700">
                      We'd love to know what to call you — just a first name is fine!
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-xl font-semibold text-amber-900 mb-2">
                    How old are you? <span className="text-gray-400 font-normal text-base">(optional)</span>
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={draft.age}
                    onChange={e => update('age', e.target.value)}
                    placeholder="Your age"
                    min={18}
                    max={120}
                    className="w-full border-2 border-amber-300 rounded-xl px-5 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    style={{ minHeight: '52px', maxWidth: '180px' }}
                  />
                  {draft.age !== '' && (
                    (() => {
                      const n = Number(draft.age);
                      const invalid = !Number.isInteger(n) || n < 18 || n > 120;
                      return invalid ? (
                        <p className="mt-2 text-base text-amber-700">
                          Please enter a number between 18 and 120.
                        </p>
                      ) : null;
                    })()
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-xl font-semibold text-amber-900 mb-2">
                    What town or city are you in? <span className="text-gray-400 font-normal text-base">(optional)</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={draft.location}
                    onChange={e => update('location', e.target.value)}
                    placeholder="e.g. Bristol, Manchester…"
                    className="w-full border-2 border-amber-300 rounded-xl px-5 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    style={{ minHeight: '52px' }}
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-2">
                  <p className="text-xl font-semibold text-amber-900 mb-3" id="gender-label">
                    How do you describe your gender? <span className="text-gray-400 font-normal text-base">(optional)</span>
                  </p>
                  <div className="flex flex-wrap gap-3" role="group" aria-labelledby="gender-label">
                    {GENDER_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update('gender', opt)}
                        aria-pressed={draft.gender === opt}
                        className={`px-5 py-2 rounded-full text-lg font-medium border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                          draft.gender === opt
                            ? 'bg-amber-400 border-amber-500 text-white'
                            : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
                        }`}
                        style={{ minHeight: '52px' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {draft.gender === 'Something else' && (
                    <div className="mt-4">
                      <label htmlFor="genderCustom" className="block text-lg text-amber-800 mb-2">
                        Feel free to describe it in your own words (optional):
                      </label>
                      <input
                        id="genderCustom"
                        type="text"
                        value={draft.genderCustom}
                        onChange={e => update('genderCustom', e.target.value)}
                        placeholder="Your own description"
                        className="w-full border-2 border-amber-300 rounded-xl px-5 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        style={{ minHeight: '52px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. About Me */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">About Me</h2>
            <label htmlFor="bio" className="block text-xl font-semibold text-amber-900 mb-3">
              Is there anything you'd like your neighbours to know about you?{' '}
              <span className="text-gray-400 font-normal text-base">(optional)</span>
            </label>
            <textarea
              id="bio"
              value={draft.bio}
              onChange={e => update('bio', e.target.value)}
              placeholder="A few words about yourself — whatever feels right"
              maxLength={500}
              rows={7}
              className="w-full border-2 border-amber-300 rounded-xl px-5 py-4 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none leading-relaxed"
            />
            {bioRemaining <= 50 && (
              <p className="mt-2 text-base text-amber-600 text-right">{bioRemaining} characters left</p>
            )}
          </div>

          {/* 3. Your Interests */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">Your Interests</h2>
            <div className="space-y-8">
              <TagSelector
                label="What kinds of things do you enjoy?"
                options={INTEREST_OPTIONS}
                selected={draft.interests}
                customValues={draft.interestsCustom}
                onChange={updateTags('interests', 'interestsCustom')}
                allowCustom={true}
              />
              <TagSelector
                label="How do you usually like to spend your time?"
                options={TIME_SPENDING_OPTIONS}
                selected={draft.timeSpending}
                customValues={draft.timeSpendingCustom}
                onChange={updateTags('timeSpending', 'timeSpendingCustom')}
                allowCustom={true}
              />
            </div>
          </div>

          {/* 4. How I Like to Connect */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">How I Like to Connect</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <TagSelector
                label="What languages do you speak or feel comfortable using?"
                options={LANGUAGE_OPTIONS}
                selected={draft.languages}
                customValues={draft.languagesCustom}
                onChange={updateTags('languages', 'languagesCustom')}
                allowCustom={true}
              />
              <TagSelector
                label="What kinds of conversations or activities make you feel connected?"
                options={CONNECTION_STYLE_OPTIONS}
                selected={draft.connectionStyle}
                customValues={draft.connectionStyleCustom}
                onChange={updateTags('connectionStyle', 'connectionStyleCustom')}
                allowCustom={true}
              />
              <TagSelector
                label="How do you prefer to connect with people?"
                options={CONNECT_PREFERENCE_OPTIONS}
                selected={draft.connectPreference}
                customValues={draft.connectPreferenceCustom}
                onChange={updateTags('connectPreference', 'connectPreferenceCustom')}
                allowCustom={true}
              />
              <TagSelector
                label="Are there any cultural, faith-based, or personal preferences that matter to you when meeting others?"
                options={CULTURAL_PREFS_OPTIONS}
                selected={draft.culturalPreferences}
                customValues={draft.culturalPreferencesCustom}
                onChange={updateTags('culturalPreferences', 'culturalPreferencesCustom')}
                allowCustom={true}
              />
            </div>
          </div>

          {/* 5. Helping Others */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-amber-700 mb-6">Helping Others</h2>
            <p className="text-xl font-semibold text-amber-900 mb-4" id="volunteer-label">
              Would you be open to helping others as a volunteer?{' '}
              <span className="text-gray-400 font-normal text-base">(optional)</span>
            </p>
            <div className="flex flex-wrap gap-4 mb-4" role="group" aria-labelledby="volunteer-label">
              <button
                type="button"
                onClick={() => handleVolunteerAnswer('yes')}
                aria-pressed={draft.volunteerAnswer === 'yes'}
                className={`px-8 py-3 rounded-xl text-lg font-semibold border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  draft.volunteerAnswer === 'yes'
                    ? 'bg-amber-400 border-amber-500 text-white'
                    : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
                }`}
                style={{ minHeight: '56px' }}
              >
                Yes, I'd love to help
              </button>
              <button
                type="button"
                onClick={() => handleVolunteerAnswer('no')}
                aria-pressed={draft.volunteerAnswer === 'no'}
                className={`px-8 py-3 rounded-xl text-lg font-semibold border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  draft.volunteerAnswer === 'no'
                    ? 'bg-amber-400 border-amber-500 text-white'
                    : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
                }`}
                style={{ minHeight: '56px' }}
              >
                Not right now
              </button>
            </div>
            {draft.volunteerAnswer === 'yes' && (
              <VolunteerSubFields draft={draft} setDraft={setDraft} />
            )}
          </div>

        </div>

        {/* Save / Cancel */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button
            type="submit"
            className="flex-1 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            style={{ minHeight: '60px' }}
          >
            {isFirstTime ? 'Save My Profile' : 'Save Changes'}
          </button>
          {!isFirstTime && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              style={{ minHeight: '60px' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProfilePage — main export
// ---------------------------------------------------------------------------

export default function ProfilePage({ profileData, setProfileData, user, isNewMember, onClearNewMember, onSignIn }) {
  const [mode, setMode] = useState('view');
  const [draft, setDraft] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);

  const isFirstTime = isProfileEmpty(profileData);

  function handleBeginSetup() {
    setDraft({ ...EMPTY_PROFILE });
    setMode('edit');
  }

  function handleEdit() {
    setDraft({ ...profileData });
    setMode('edit');
  }

  function handleCancel() {
    setMode('view');
    setDraft(null);
    setDisplayNameError(false);
  }

  function handleSave(currentDraft) {
    if (!currentDraft.displayName?.trim()) {
      setDisplayNameError(true);
      return;
    }

    const volunteerFlag = currentDraft.volunteerAnswer === 'yes';
    const updated = {
      ...(profileData ?? EMPTY_PROFILE),
      ...currentDraft,
      volunteerFlag,
    };

    setProfileData(updated);
    setMode('view');
    setDraft(null);
    setDisplayNameError(false);
    if (onClearNewMember) onClearNewMember();

    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000);
  }

  // New member welcome banner shown above setup prompt or form
  const newMemberBanner = isNewMember && (
    <div className="mb-6 px-6 py-5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-lg font-medium text-center">
      👋 Welcome! Let's set up your profile to get started.
    </div>
  );

  // "Already have an account?" link for new members
  const signInLink = onSignIn && (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={onSignIn}
        className="text-amber-700 hover:text-amber-900 underline text-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-3 py-2"
        style={{ minHeight: '44px' }}
      >
        Already have an account? Sign in
      </button>
    </div>
  );

  if (isFirstTime && mode !== 'edit') {
    return (
      <div>
        {newMemberBanner}
        <SetupPrompt onBegin={handleBeginSetup} />
        {signInLink}
      </div>
    );
  }

  if (mode === 'edit') {
    return (
      <div>
        {newMemberBanner}
        <ProfileForm
          draft={draft}
          setDraft={setDraft}
          onSave={handleSave}
          onCancel={handleCancel}
          isFirstTime={isFirstTime}
          displayNameError={displayNameError}
          setDisplayNameError={setDisplayNameError}
        />
        {isNewMember && signInLink}
      </div>
    );
  }

  return (
    <div>
      {showBanner && <SuccessBanner />}
      <ProfileView profileData={profileData} onEdit={handleEdit} />
    </div>
  );
}

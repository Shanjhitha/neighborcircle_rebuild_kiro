import { useState } from 'react';
import { ACTIVITY_OPTIONS } from '../data/activityOptions';
import { AVAILABILITY_DAYS, AVAILABILITY_TIMES } from '../data/availabilityOptions';
import { COMMUNICATION_OPTIONS } from '../data/communicationOptions';

function ToggleChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`py-3 px-6 rounded-2xl border-2 text-lg font-semibold min-h-[52px] transition-colors focus:outline-none focus:ring-4 focus:ring-orange-200 ${
        active
          ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
          : 'bg-white border-orange-300 text-orange-700 hover:bg-orange-50'
      }`}
    >
      {label}
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 border border-orange-100">
      {title && <h3 className="text-2xl font-bold text-orange-900 mb-6">{title}</h3>}
      {children}
    </div>
  );
}

export default function VolunteerSignupForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [activities, setActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState('');
  const [availabilityDay, setAvailabilityDay] = useState('');
  const [availabilityTime, setAvailabilityTime] = useState('');
  const [communication, setCommunication] = useState([]);
  const [personalNote, setPersonalNote] = useState('');
  const [errors, setErrors] = useState({});

  function toggleActivity(option) {
    setActivities((prev) =>
      prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]
    );
  }

  function toggleCommunication(option) {
    setCommunication((prev) =>
      prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
    );
  }

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Just let us know your name — anything you're comfortable with.";
    if (!city.trim()) newErrors.city = 'Just pop in your town or city — it helps us find neighbours near you.';
    if (activities.length === 0) newErrors.activities = "Pick at least one thing you'd enjoy — there's no wrong answer.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ name: name.trim(), city: city.trim(), activities, customActivity, availabilityDay, availabilityTime, communication, personalNote });
  }

  const inputClass =
    'w-full border-2 border-orange-200 rounded-xl px-5 py-4 text-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 placeholder-gray-400';
  const labelClass = 'block text-xl font-semibold text-orange-900 mb-3';
  const errorClass = 'mt-2 text-lg text-red-600';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md px-8 py-8 border border-orange-100 mb-8">
        <h2 className="text-4xl font-bold text-orange-900 mb-2">We're so glad you want to help</h2>
        <p className="text-xl text-orange-700">
          Fill in as much or as little as you like — every answer is completely up to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

        {/* Your Name */}
        <Card title="Your Name">
          <label htmlFor="volunteer-name" className={labelClass}>
            What would you like us to call you?
          </label>
          <input
            id="volunteer-name"
            type="text"
            className={inputClass}
            placeholder="Your first name is enough"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            style={{ minHeight: '56px' }}
          />
          {errors.name && <p id="name-error" className={errorClass}>{errors.name}</p>}
        </Card>

        {/* Your Location */}
        <Card title="Your Location">
          <label htmlFor="volunteer-city" className={labelClass}>
            What town or city are you in?
          </label>
          <input
            id="volunteer-city"
            type="text"
            className={inputClass}
            placeholder="e.g. Bristol, Manchester, Edinburgh…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-required="true"
            aria-describedby={errors.city ? 'city-error' : undefined}
            style={{ minHeight: '56px' }}
          />
          {errors.city && <p id="city-error" className={errorClass}>{errors.city}</p>}
        </Card>

        {/* What You Enjoy — full width */}
        <div className="md:col-span-2">
          <Card title="What You Enjoy Helping With">
            <p className="text-lg text-gray-500 mb-5">Pick as many as feel right — there's no wrong answer.</p>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Activity options">
              {ACTIVITY_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={activities.includes(option)}
                  onClick={() => toggleActivity(option)}
                />
              ))}
            </div>
            {activities.includes('Something else') && (
              <input
                type="text"
                className={`${inputClass} mt-5`}
                placeholder="Tell us what you have in mind"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                aria-label="Describe your custom activity"
                style={{ minHeight: '56px' }}
              />
            )}
            {errors.activities && <p className={errorClass}>{errors.activities}</p>}
          </Card>
        </div>

        {/* When You're Free */}
        <Card title="When You're Free">
          <p className={labelClass}>Which days work for you?</p>
          <div className="flex flex-wrap gap-3 mb-6" role="group" aria-label="Available days">
            {AVAILABILITY_DAYS.map((day) => (
              <ToggleChip
                key={day}
                label={day}
                active={availabilityDay === day}
                onClick={() => setAvailabilityDay(availabilityDay === day ? '' : day)}
              />
            ))}
          </div>
          <p className={labelClass}>What time of day suits you?</p>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Available times of day">
            {AVAILABILITY_TIMES.map((time) => (
              <ToggleChip
                key={time}
                label={time}
                active={availabilityTime === time}
                onClick={() => setAvailabilityTime(availabilityTime === time ? '' : time)}
              />
            ))}
          </div>
        </Card>

        {/* How to Stay in Touch */}
        <Card title="How to Stay in Touch">
          <p className="text-lg text-gray-500 mb-5">How do you prefer to hear from us?</p>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Communication preferences">
            {COMMUNICATION_OPTIONS.map((option) => (
              <ToggleChip
                key={option}
                label={option}
                active={communication.includes(option)}
                onClick={() => toggleCommunication(option)}
              />
            ))}
          </div>
        </Card>

        {/* A Note About You — full width */}
        <div className="md:col-span-2">
          <Card title="A Note About You">
            <label htmlFor="volunteer-note" className={labelClass}>
              Is there anything you'd like your neighbours to know about you?{' '}
              <span className="text-gray-400 font-normal text-lg">(optional)</span>
            </label>
            <textarea
              id="volunteer-note"
              className={`${inputClass} resize-none leading-relaxed`}
              rows={5}
              placeholder="Just a sentence or two is perfect — whatever feels right."
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
            />
          </Card>
        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          type="submit"
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold py-5 px-8 rounded-2xl min-h-[64px] focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors shadow-md"
        >
          Send My Details
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-5 rounded-2xl bg-white border-2 border-orange-300 text-orange-700 text-xl font-semibold min-h-[64px] hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

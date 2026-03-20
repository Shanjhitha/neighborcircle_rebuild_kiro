import { useState } from 'react';
import { mockVolunteers } from '../data/mockVolunteers';
import PathwayToggle from '../components/PathwayToggle';
import VolunteerList from '../components/VolunteerList';
import VolunteerSignupForm from '../components/VolunteerSignupForm';

export default function VolunteerPage() {
  const [activePathway, setActivePathway] = useState('support');
  const [contentView, setContentView] = useState('browse');
  const [activeFilter, setActiveFilter] = useState(null);
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [newVolunteerName, setNewVolunteerName] = useState('');

  function handlePathwayChange(pathway) {
    setActivePathway(pathway);
    setActiveFilter(null);
    setContentView(pathway === 'support' ? 'browse' : 'signup');
  }

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  function handleSelectVolunteer(volunteer) {
    alert(`You selected ${volunteer.name}. A full profile view is coming soon!`);
  }

  function handleSignupSubmit(formData) {
    const firstName = formData.name.split(' ')[0];
    const newVolunteer = {
      id: `v-${Date.now()}`,
      name: formData.name,
      firstName,
      city: formData.city,
      supportTypes: formData.activities.filter((a) => a !== 'Something else'),
      availabilityStatus: true,
      personalNote: formData.personalNote || '',
    };
    setVolunteers((prev) => [...prev, newVolunteer]);
    setNewVolunteerName(firstName);
    setContentView('success');
  }

  function handleCancelSignup() {
    setActivePathway('support');
    setActiveFilter(null);
    setContentView('browse');
  }

  function handleBackToVolunteers() {
    setActivePathway('support');
    setActiveFilter(null);
    setContentView('browse');
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-8">

        {/* Page heading */}
        <div className="bg-white rounded-2xl shadow-md px-8 py-8 border border-orange-100">
          <h1 className="text-4xl font-bold text-orange-900 mb-2">Volunteer Support</h1>
          <p className="text-xl text-orange-700">
            Find a neighbour who can help, or offer your own kindness to someone nearby.
          </p>
        </div>

        {/* Pathway toggle */}
        <PathwayToggle
          activePathway={activePathway}
          onPathwayChange={handlePathwayChange}
        />

        {/* Content area */}
        {contentView === 'browse' && (
          <VolunteerList
            volunteers={volunteers}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            onSelectVolunteer={handleSelectVolunteer}
          />
        )}

        {contentView === 'signup' && (
          <VolunteerSignupForm
            onSubmit={handleSignupSubmit}
            onCancel={handleCancelSignup}
          />
        )}

        {contentView === 'success' && (
          <div className="bg-white rounded-2xl shadow-md px-8 py-12 border border-orange-100 flex flex-col items-center gap-6 text-center">
            <div className="text-7xl" aria-hidden="true">🌟</div>
            <h2 className="text-4xl font-bold text-orange-900">
              You're officially a Neighbour Helper, {newVolunteerName}!
            </h2>
            <p className="text-xl text-gray-600 max-w-xl">
              Thank you for signing up — your neighbours are lucky to have you.
            </p>
            <p className="text-xl text-orange-700 italic max-w-xl">
              Every connection starts with someone willing to show up — and that's you.
            </p>
            <button
              onClick={handleBackToVolunteers}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold py-4 px-12 rounded-2xl min-h-[60px] focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors"
            >
              Back to Volunteers
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

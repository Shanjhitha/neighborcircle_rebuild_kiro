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
    // Placeholder for future profile view
    alert(`You selected ${volunteer.name}. A full profile view is coming soon!`);
  }

  function handleSignupSubmit(formData) {
    const firstName = formData.name.split(' ')[0];
    const newVolunteer = {
      id: `v-${Date.now()}`,
      name: formData.name,
      firstName,
      photo: formData.photo ? URL.createObjectURL(formData.photo) : 'https://randomuser.me/api/portraits/lego/1.jpg',
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
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Page heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">Volunteer Support</h1>
          <p className="text-lg text-gray-600">
            Find a neighbor who can help, or offer your own kindness to someone nearby.
          </p>
        </div>

        {/* Pathway toggle — always visible */}
        <PathwayToggle
          activePathway={activePathway}
          onPathwayChange={handlePathwayChange}
        />

        {/* Content area */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
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
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="text-6xl" aria-hidden="true">🌟</div>
              <h2 className="text-3xl font-bold text-gray-800">
                You're officially a Neighbor Helper, {newVolunteerName}!
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">
                Thank you for signing up — your neighbors are lucky to have you.
              </p>
              <p className="text-lg text-orange-700 italic max-w-lg">
                Every connection starts with someone willing to show up — and that's you.
              </p>
              <button
                onClick={handleBackToVolunteers}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold py-4 px-10 rounded-2xl min-h-[56px] focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors"
              >
                Back to Volunteers
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

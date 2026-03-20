import VolunteerFilterPanel from './VolunteerFilterPanel';
import VolunteerCard from './VolunteerCard';

export default function VolunteerList({ volunteers, activeFilter, onFilterChange, onSelectVolunteer }) {
  const filtered = volunteers
    .filter((v) => activeFilter === null || v.supportTypes.includes(activeFilter))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="bg-white rounded-2xl shadow-md px-8 py-8 border border-orange-100">
        <h2 className="text-4xl font-bold text-orange-900 mb-2">
          Meet Your Neighbours
        </h2>
        <p className="text-xl text-orange-700">
          You don't have to do this alone — these kind people are here for you.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md px-8 py-6 border border-orange-100">
        <p className="text-xl font-semibold text-orange-900 mb-4">Filter by what you need:</p>
        <VolunteerFilterPanel activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* Cards or empty states */}
      {volunteers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md px-8 py-10 border border-orange-100 text-center">
          <p className="text-2xl text-gray-600">
            Our neighbours are busy right now — please check back soon. You matter to us.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md px-8 py-10 border border-orange-100 text-center">
          <p className="text-2xl text-gray-600">
            No one available for this right now — please check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((volunteer) => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              onSelect={onSelectVolunteer}
            />
          ))}
        </div>
      )}
    </div>
  );
}

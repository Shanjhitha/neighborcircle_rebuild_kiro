export default function VolunteerCard({ volunteer, onSelect }) {
  const { name, city, supportTypes, availabilityStatus, personalNote } = volunteer;

  // Derive initials for avatar replacement
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(volunteer);
    }
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
      role="button"
      tabIndex={0}
      aria-label={`View profile for ${name}`}
      onClick={() => onSelect(volunteer)}
      onKeyDown={handleKeyDown}
    >
      {/* Initials + name */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-xl font-bold text-orange-700">{initials}</span>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{name}</p>
          <p className="text-lg text-gray-500">{city}</p>
        </div>
      </div>

      {/* Availability */}
      <p
        className={`text-lg font-semibold ${availabilityStatus ? 'text-green-700' : 'text-gray-500'}`}
        aria-label={`Availability: ${availabilityStatus ? 'Available now' : 'Not available right now'}`}
      >
        {availabilityStatus ? '✓ Available now' : '✗ Not available right now'}
      </p>

      {/* Support types */}
      <div className="flex flex-wrap gap-2">
        {supportTypes.map((type) => (
          <span
            key={type}
            className="bg-orange-100 text-orange-800 text-base font-medium px-4 py-1 rounded-full"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Personal note */}
      {personalNote && (
        <p className="text-lg text-gray-600 italic">"{personalNote}"</p>
      )}
    </div>
  );
}

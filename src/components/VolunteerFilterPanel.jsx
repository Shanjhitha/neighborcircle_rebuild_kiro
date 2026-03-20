const FILTER_TYPES = ['Friendly Chat', 'Grocery Help', 'Tech Help', 'Errands'];

export default function VolunteerFilterPanel({ activeFilter, onFilterChange }) {
  const base =
    'py-3 px-6 text-lg rounded-2xl border-2 min-h-[52px] font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-orange-200';
  const active = 'bg-orange-500 border-orange-500 text-white shadow-sm';
  const inactive = 'bg-white border-orange-300 text-orange-700 hover:bg-orange-50';

  function handleClick(type) {
    onFilterChange(activeFilter === type ? null : type);
  }

  return (
    <div
      className="flex flex-wrap gap-3"
      role="group"
      aria-label="Filter volunteers by support type"
    >
      <button
        className={`${base} ${activeFilter === null ? active : inactive}`}
        aria-pressed={activeFilter === null}
        onClick={() => onFilterChange(null)}
      >
        Show All
      </button>
      {FILTER_TYPES.map((type) => (
        <button
          key={type}
          className={`${base} ${activeFilter === type ? active : inactive}`}
          aria-pressed={activeFilter === type}
          onClick={() => handleClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

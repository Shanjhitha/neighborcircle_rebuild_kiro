export default function PathwayToggle({ activePathway, onPathwayChange }) {
  const base =
    'flex-1 py-4 px-6 text-xl font-bold rounded-2xl border-2 transition-colors min-h-[60px] focus:outline-none focus:ring-4 focus:ring-orange-300';
  const active = 'bg-orange-500 border-orange-500 text-white shadow-md';
  const inactive = 'bg-white border-orange-300 text-orange-600 hover:bg-orange-50';

  return (
    <div
      className="flex gap-4 p-5 bg-white rounded-2xl shadow-md border border-orange-100"
      role="group"
      aria-label="Choose your pathway"
    >
      <button
        className={`${base} ${activePathway === 'support' ? active : inactive}`}
        aria-pressed={activePathway === 'support'}
        onClick={() => onPathwayChange('support')}
      >
        🤝 Request a Volunteer
      </button>
      <button
        className={`${base} ${activePathway === 'volunteer' ? active : inactive}`}
        aria-pressed={activePathway === 'volunteer'}
        onClick={() => onPathwayChange('volunteer')}
      >
        💛 I Want to Volunteer
      </button>
    </div>
  );
}

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="flex items-center justify-center min-h-full py-16 px-4">
      <div className="bg-white rounded-2xl shadow-md px-8 py-10 text-center max-w-md w-full">
        <p className="text-4xl mb-4">🌻</p>
        <h1 className="text-2xl font-bold text-amber-700 mb-3">{title}</h1>
        <p className="text-gray-700 text-base">
          {description || 'This section is coming soon. Check back later!'}
        </p>
      </div>
    </div>
  );
}

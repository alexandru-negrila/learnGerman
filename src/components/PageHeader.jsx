export default function PageHeader({ icon, title, description }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h1>
      {description && (
        <p className="text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

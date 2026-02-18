export default function PageHeader({ icon, title, description }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">{title}</h1>
          {description && (
            <p className="text-stone-500 mt-1 text-sm sm:text-base">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-3 h-0.5 bg-gradient-to-r from-brand-500 via-brand-300 to-transparent rounded-full" />
    </div>
  );
}

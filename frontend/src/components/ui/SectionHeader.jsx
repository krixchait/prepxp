export default function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="section-header">
      {Icon && (
        <div className="section-icon">
          <Icon size={18} />
        </div>
      )}
      <div>
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-desc">{description}</p>}
      </div>
    </div>
  );
}

export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="mb-4">
      <ul className="nav nav-pills">
        {categories.map((category) => (
          <li key={category} className="nav-item me-2">
            <button
              className={`nav-link ${selected === category ? 'active' : ''}`}
              onClick={() => onSelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

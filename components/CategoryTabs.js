export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="mb-4">
      <ul className="nav nav-pills">
        {categories.map((category) => (
          <li className="nav-item" key={category}>
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

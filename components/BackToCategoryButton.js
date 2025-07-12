'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function BackToCategoryButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  const scroll = searchParams.get('scroll');

  const handleBack = () => {
    if (category) {
      router.push(`/category/${category}?scroll=${scroll || 0}`);
    } else {
      router.back();
    }
  };

  return (
    <div
      className="mx-auto mb-4 px-3"
      style={{
        maxWidth: '1030px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <button
        onClick={handleBack}
        className="btn btn-light border shadow-sm"
        style={{
          padding: '8px 16px',
          fontSize: '0.90rem',
          fontWeight: 600,
          borderRadius: '8px',
          color: '#333',
        }}
      >
        ← Back to {category ? category.replace(/-/g, ' ') : 'Category'}
      </button>
    </div>
  );
}

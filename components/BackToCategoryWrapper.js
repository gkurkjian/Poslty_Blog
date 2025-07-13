'use client';

import { Suspense } from 'react';
import BackToCategoryButton from './BackToCategoryButton';

export default function BackToCategoryWrapper() {
  return (
    <Suspense fallback={null}>
      <BackToCategoryButton />
    </Suspense>
  );
}

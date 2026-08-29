import { Suspense } from 'react';
import { SearchClient } from './SearchClient';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-3 gap-6 pt-8">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="aspect-[4/5] w-full" />
              </div>
            </div>
          }
        >
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}

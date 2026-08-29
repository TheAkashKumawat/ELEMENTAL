import { Suspense } from 'react';
import { ConfirmationClient } from './ConfirmationClient';
import { Skeleton } from '@/components/ui/Skeleton';

export default function OrderConfirmationPage() {
  return (
    <div className="py-12 sm:py-20 bg-stone-50/40 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-6">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-8 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-1/3 mx-auto" />
              <Skeleton className="h-40 w-full" />
            </div>
          }
        >
          <ConfirmationClient />
        </Suspense>
      </div>
    </div>
  );
}

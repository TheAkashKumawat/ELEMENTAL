'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { ProductReview } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { clsx } from 'clsx';

export interface ProductReviewsProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews: initialReviews,
  rating,
  reviewCount,
}) => {
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);
  const { showToast } = useToast();

  // Form State
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  const handleHelpful = (id: string) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((prev) => [...prev, id]);
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast('Feedback recorded. Thank you!');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim()) return;

    const newReview: ProductReview = {
      id: `rev_${Date.now()}`,
      author: formName.trim(),
      rating: formRating,
      date: new Date().toISOString().split('T')[0],
      title: formTitle.trim() || 'Exceptional craftsmanship',
      content: formContent.trim(),
      verified: true,
      helpfulCount: 0,
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsModalOpen(false);
    setFormName('');
    setFormTitle('');
    setFormContent('');
    showToast('Your verified review has been published!');
  };

  return (
    <div className="pt-12 border-t border-stone-200" id="reviews">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-stone-200">
        
        {/* Rating Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xl font-serif font-semibold text-stone-900">
            Client Impressions & Reviews
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-serif font-bold text-stone-950">{rating.toFixed(1)}</span>
            <div className="space-y-1">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={clsx(
                      'w-4 h-4',
                      i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-500">Based on {reviewCount} verified client purchases</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<MessageSquarePlus className="w-4 h-4" />}
          >
            Write a Review
          </Button>
        </div>

      </div>

      {/* Reviews List */}
      <div className="divide-y divide-stone-100 py-6 space-y-6">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={clsx('w-3.5 h-3.5', i < rev.rating ? 'fill-amber-400' : 'text-stone-200')}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-900">{rev.title}</span>
              </div>
              <span className="text-xs text-stone-400">{rev.date}</span>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">{rev.content}</p>

            <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="font-medium text-stone-900">{rev.author}</span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    <CheckCircle className="w-3 h-3" />
                    Verified Buyer
                  </span>
                )}
              </div>

              <button
                onClick={() => handleHelpful(rev.id)}
                className={clsx(
                  'flex items-center gap-1.5 hover:text-stone-900 transition-colors',
                  helpfulIds.includes(rev.id) && 'text-stone-900 font-semibold'
                )}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Client Review"
      >
        <form onSubmit={handleAddReview} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
              Rating
            </label>
            <div className="flex items-center gap-2 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={clsx('w-6 h-6', star <= formRating ? 'fill-amber-400' : 'text-stone-200')}
                  />
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Your Name"
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="e.g. Julian Sterling"
          />

          <Input
            label="Review Headline"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="e.g. Exceptional quality and fit"
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider">
              Your Review *
            </label>
            <textarea
              required
              rows={4}
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="Describe the fabric, sizing, texture, or craftsmanship..."
              className="w-full p-3 bg-white border border-stone-300 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

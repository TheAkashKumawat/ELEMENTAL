'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Accordion: React.FC<{
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}> = ({ items, defaultOpenId, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                {item.title}
              </span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-stone-500 transition-transform duration-200',
                  isOpen && 'transform rotate-180 text-stone-900'
                )}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-stone-600 leading-relaxed pr-6 animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

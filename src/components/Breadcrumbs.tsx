import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-2 sm:px-0 text-xs text-[#5C4D44]">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="text-[#5C4D44] hover:text-[#577861] inline-flex items-center transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-[#A8988C] mx-1" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-[#5C4D44] hover:text-[#577861] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#261E1A] truncate max-w-xs sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

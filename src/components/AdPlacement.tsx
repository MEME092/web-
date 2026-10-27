import React, { useEffect, useRef } from 'react';

interface AdPlacementProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({
  slotId,
  format = 'auto',
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only attempt push if an official ad slot ID is provided and adsbygoogle is loaded
    if (slotId && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch {
        // Safe failover if AdSense script is blocked by user ad-blockers or pending site approval
      }
    }
  }, [slotId]);

  // If no official ad-slot is configured yet, do not invent fake ads or render empty clutter
  if (!slotId) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`w-full overflow-hidden my-6 text-center ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] uppercase tracking-wider text-[#8C7A6B] mb-1">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5714100747253670"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

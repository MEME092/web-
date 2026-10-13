import React from 'react';

export type AdSlotFormat = 'top-banner' | 'in-article' | 'sidebar' | 'bottom-banner';

interface AdSlotProps {
  format: AdSlotFormat;
  slotId?: string;
  className?: string;
  active?: boolean;
}

/**
 * Componente preparado para Google AdSense.
 * Por defecto permanece invisible para no mostrar banners ni cajas de prueba,
 * reservando el espacio semántico en el DOM para cuando el usuario agregue su ID de AdSense.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  format,
  slotId = '1234567890',
  className = '',
  active = false,
}) => {
  // Cuando active es false, solo dejamos el contenedor semántico preparado en el DOM
  if (!active) {
    return (
      <div
        id={`adsense-slot-${format}-${slotId}`}
        data-adsense-slot={slotId}
        data-adsense-format={format}
        className={`hidden ${className}`}
        aria-hidden="true"
      >
        {/* Espacio reservado para inserción de AdSense (ca-pub) */}
      </div>
    );
  }

  // Si se activa en el futuro con un código oficial de AdSense:
  return (
    <div
      id={`adsense-slot-${format}-${slotId}`}
      className={`w-full overflow-hidden my-6 text-center ${className}`}
      data-adsense-slot={slotId}
      data-adsense-format={format}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-5714100747253670"
        data-ad-layout={format === 'in-article' ? 'in-article' : undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-slot={slotId}
      />
    </div>
  );
};

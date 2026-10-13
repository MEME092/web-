import React from 'react';
import { Terminal, ShieldCheck, User } from 'lucide-react';

interface AuthorAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  size = 'md',
  className = '',
  showBadge = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-3xl',
  }[size];

  const badgeSize = {
    sm: 'w-3 h-3 text-[8px]',
    md: 'w-3.5 h-3.5 text-[9px]',
    lg: 'w-5 h-5 text-xs',
    xl: 'w-7 h-7 text-sm',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Avatar corporativo técnico sin fotos de stock genéricas */}
      <div
        className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 border-2 border-cyan-500/50 flex items-center justify-center font-mono font-extrabold text-cyan-300 shadow-lg shadow-cyan-950/40 select-none`}
        aria-label="Avatar oficial de Andrés Martínez"
      >
        <span className="tracking-tighter bg-gradient-to-b from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
          AM
        </span>
      </div>

      {showBadge && (
        <div
          className={`absolute -bottom-1 -right-1 bg-slate-950 border border-cyan-400/80 rounded-lg p-0.5 text-cyan-400 flex items-center justify-center ${badgeSize}`}
          title="Autor y Editor Verificado"
        >
          <Terminal className="w-full h-full stroke-[2.5]" />
        </div>
      )}
    </div>
  );
};

import type { FC } from 'react';

export const Header: FC<{ title?: string; subtitle?: string }> = ({ title = 'Lista de Compras', subtitle = 'Organize seus itens' }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-light text-slate-800 mb-1 tracking-tight">{title}</h1>
      <p className="text-slate-500 text-xs font-light">{subtitle}</p>
    </div>
  );
};

export default Header;

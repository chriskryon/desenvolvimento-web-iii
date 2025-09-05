import type { FC } from 'react';
import type { Item } from '../types/Item';
import ItemRow from './ItemRow';

type Props = {
  items: Item[];
  loading: boolean;
};

export const ItemList: FC<Props> = ({ items, loading }) => {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-300 border-t-slate-600 mx-auto" />
          <p className="text-slate-500 mt-2 text-xs font-light">Carregando...</p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Lista vazia">
              <title>Lista vazia</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-slate-500 text-xs font-light">Nenhum item ainda</p>
          <p className="text-slate-400 text-xs font-light mt-1">Adicione acima</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {items.map((item) => (
          <ItemRow key={item._id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-sm font-light mb-3 text-center text-slate-700">Seus Itens</h2>
      {renderContent()}
    </div>
  );
};

export default ItemList;

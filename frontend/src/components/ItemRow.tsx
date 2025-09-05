import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import type { Item } from '../types/Item';
import { useItemsContext } from '../context/useItemsContext';

type Props = { item: Item };

export const ItemRow: FC<Props> = ({ item }) => {
  const { editItem, removeItem } = useItemsContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.quantity.toString());

  const handleSave = async () => {
    if (!item._id) return;
    await editItem(item._id, { name, quantity: Number.parseFloat(price) });
    setEditing(false);
  };

  const handleRemove = async () => {
    if (item._id) await removeItem(item._id);
  };
  const renderMain = () => {
    if (editing) {
      return (
        <>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 h-7 bg-white border-slate-200 rounded text-xs font-light" placeholder="Nome" />
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-20 h-7 bg-white border-slate-200 rounded text-xs font-light" placeholder="Valor" />
            </div>
          </div>
          <div className="flex gap-1 ml-3">
            <>
              <Button size="sm" onClick={handleSave} className="h-6 w-6 p-0 bg-green-600 hover:bg-green-700 rounded text-xs text-white">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><title>Salvar edição</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="h-6 w-6 p-0 border-slate-300 bg-white hover:bg-slate-50 rounded text-xs">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><title>Cancelar edição</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </Button>
            </>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-800 font-light text-xs truncate">{item.name}</h3>
            <p className="text-slate-600 font-medium text-sm">R$ {item.quantity}</p>
          </div>
        </div>
        <div className="flex gap-1 ml-3">
          <>
            <Button size="sm" onClick={() => setEditing(true)} className="h-6 w-6 p-0 bg-slate-600 hover:bg-slate-700 rounded text-xs text-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><title>Editar item</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </Button>
            <Button size="sm" onClick={handleRemove} className="h-6 w-6 p-0 bg-red-600 hover:bg-red-700 rounded text-xs text-white">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><title>Excluir item</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </Button>
          </>
        </div>
      </>
    );
  };

  return (
    <div className="bg-slate-50 rounded p-3 shadow-sm border border-slate-100 hover:bg-slate-100 transition-all duration-200">
      <div className="flex items-center justify-between">
        {renderMain()}
      </div>
    </div>
  );
};

export default ItemRow;

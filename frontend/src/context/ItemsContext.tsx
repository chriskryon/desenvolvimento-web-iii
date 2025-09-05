import type { FC, PropsWithChildren } from 'react';
import { createContext } from 'react';
import { useItems } from '../hooks/useItems';
import type { Item, CreateItemData, UpdateItemData } from '../types/Item';

export type ItemsContextType = {
  items: Item[];
  loading: boolean;
  error: string | null;
  addItem: (data: CreateItemData) => Promise<void>;
  editItem: (id: string, data: UpdateItemData) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const { items, loading, error, addItem, editItem, removeItem, refetch } = useItems();

  return (
    <ItemsContext.Provider value={{ items, loading, error, addItem, editItem, removeItem, refetch }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;

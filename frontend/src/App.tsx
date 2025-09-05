import { useItemsContext } from './context/useItemsContext';
import Card from './components/Card';
import Header from './components/Header';
import AddForm from './components/AddForm';
import ItemList from './components/ItemList';

function App() {
  const { items, loading, error } = useItemsContext();
  

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <Card>
          <Header />

          {error && (
            <div className="p-3 rounded-xl mb-4 text-center border border-red-200/50">
              <p className="text-red-600 font-light text-xs">{error}</p>
            </div>
          )}

          <AddForm />

            <ItemList
              items={items}
              loading={loading}
            />
        </Card>
      </div>
    </div>
  );
}

export default App;

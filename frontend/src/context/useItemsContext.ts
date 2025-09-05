import { useContext } from "react";
import ItemsContext from "./ItemsContext";
import type { ItemsContextType } from "./ItemsContext";

export const useItemsContext = () => {
	const ctx = useContext(ItemsContext) as ItemsContextType | undefined;
	if (!ctx)
		throw new Error("useItemsContext must be used within ItemsProvider");
	return ctx;
};

export default useItemsContext;

import mongoose, { Schema, type Document } from "mongoose";

/**
 * Interface representando um documento Item no MongoDB.
 */
export interface IItem extends Document {
	/** O nome do item. */
	name: string;

	/** A quantidade do item. */
	quantity: number;

	/** Se o item foi comprado. */
	purchased: boolean;

	/** A data de criação do item. */
	createdAt: Date;
}

/**
 * Schema Mongoose para o modelo Item.
 */
const ItemSchema: Schema = new Schema({
	name: { type: String, required: true },
	quantity: { type: Number, required: true, default: 1 },
	purchased: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

/**
 * Modelo Mongoose para Item.
 */
export default mongoose.model<IItem>("Item", ItemSchema, "shoppingitems");

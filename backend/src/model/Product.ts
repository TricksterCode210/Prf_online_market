import mongoose, {Schema, Document, Model} from 'mongoose'

interface IProduct extends Document {
	name: string;
	price: number;
	description: string;
	imageSrc: string;
	username: string;
	state: string;
}

const ProductSchema: Schema<IProduct> = new mongoose.Schema({
	name: {type: String, required:true},
	price: {type: Number, required:true},
	description: {type: String, required:true},
	imageSrc: {type: String, required:true},
	username: {type: String, required: true},
	state: {type: String, required: false}
})

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
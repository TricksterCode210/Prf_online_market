import mongoose, {Schema, Document, Model} from 'mongoose'

interface IShipping extends Document {
	from: string;
	to: string;
	buyer: string;
	seller: string;
	arrivalFirst: Date;
	arrivalLast: Date;
	productName: string;
}

const ShippingSchema: Schema<IShipping> = new mongoose.Schema({
	from: {type: String, required:true},
	to: {type: String, required:true},
	buyer: {type: String, required:true},
	seller: {type: String, required:true},
	arrivalFirst: {type: Date, required:true},
	arrivalLast: {type: Date, required:true},
	productName: {type: String, required:true},
})

export const Shipping: Model<IShipping> = mongoose.model<IShipping>('Shipping', ShippingSchema)
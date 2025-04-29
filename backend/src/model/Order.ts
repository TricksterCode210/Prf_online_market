import mongoose, {Schema, Document, Model} from 'mongoose'

interface IOrder extends Document {
	buyerName: string;
	sellerName: string;
	productName: string;
	price: number;
	shippingAddress: string;
	imageSrc: string,
	productId: string
}

const OrderSchema: Schema<IOrder> = new mongoose.Schema({
	buyerName: {type: String, required:true},
	sellerName: {type: String, required:true},
	productName: {type: String, required:true},
	price: {type: Number, required:true},
	shippingAddress: {type: String, required:true},
	imageSrc: {type: String, required:true},
	productId: {type: String, required:true}
})

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema)
import mongoose, {Schema, Document, Model} from 'mongoose'

interface IOrder extends Document {
	buyerName: string;
	productName: string;
	price: number;
	shippingAdress: string;
}

const OrderSchema: Schema<IOrder> = new mongoose.Schema({
	buyerName: {type: String, required:true},
	productName: {type: String, required:true},
	price: {type: Number, required:true},
	shippingAdress: {type: String, required:true}
})

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema)
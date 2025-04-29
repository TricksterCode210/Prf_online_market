export interface Order {
  _id: string;
  buyerName: string;
  sellerName: string;
  productName: string;
  price: number;
  shippingAddress: string;
  imageSrc: string
}

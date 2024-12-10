export default interface Product {
  id: string;
  singular: string;
  plural: string;
  description: string;
  baseStock: number;
  currentStock: number;
  price: number;
  image: string;
}

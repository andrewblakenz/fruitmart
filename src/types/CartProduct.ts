export default interface CartProduct {
  id: string;
  singular: string;
  plural: string;
  inCart?: number;
  price: number;
  baseStock: number;
}

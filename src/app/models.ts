export interface MenuItem {
  name: string;
  description: string;
  price: string;
  priceNum: number;
  image: string;
  category: 'hot' | 'cold' | 'specialty';
}

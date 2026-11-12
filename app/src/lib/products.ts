import { assets } from './assets';

export type Product = {
  id: string;
  name: string;
  price: number;
  distance: string;
  condition: 'Good' | 'Excellent';
  image: string;
  category: string;
  size: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 'headphones',
    name: 'Sony MDR-7506 Headphones',
    price: 71,
    distance: '5.1 km',
    condition: 'Good',
    image: assets.headphones,
    category: 'Music Gear',
    size: 'Fits in a backpack',
    description:
      "The blue-stripe studio pair everyone has an opinion about. Coiled cable is intact, cups fold, the 1/4 adapter is still on the clip. Ear pads were replaced last year so they don't smell like a control room. Honest, slightly bright, and they last forever.",
  },
  {
    id: 'blanket',
    name: 'Pixel Icon Throw Blanket',
    price: 80,
    distance: '6.0 km',
    condition: 'Excellent',
    image: assets.blanket,
    category: 'Home Goods',
    size: 'Fits in a tote',
    description:
      'Heavy woven cotton throw with a grid of tiny pixel icons and fringe on both ends. Washed once, never used outdoors. Big enough for a sofa nap.',
  },
  {
    id: 'plant',
    name: 'Variegated Rubber Plant',
    price: 55,
    distance: '8.0 km',
    condition: 'Good',
    image: assets.plant,
    category: 'Home Goods',
    size: 'Needs two hands',
    description:
      'Healthy ficus elastica with cream-edged leaves, about 60 cm tall. Comes in its nursery pot. Likes bright, indirect light and forgets if you skip a watering.',
  },
  {
    id: 'jacket',
    name: 'Camel Bomber Jacket',
    price: 40,
    distance: '5.5 km',
    condition: 'Good',
    image: assets.jacket,
    category: 'Clothes',
    size: 'Fits in a backpack',
    description:
      'Soft suede-feel bomber in a warm camel tone, size M. Ribbed cuffs and hem, both zips run smoothly. Light wear at the collar.',
  },
];

export const DELIVERY_FEE = 9;
export const SELLER = { name: 'Dev Anand', area: 'Koramangala', rating: '4.8', sales: 34 };

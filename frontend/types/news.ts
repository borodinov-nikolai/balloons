import { StaticImageData } from 'next/image';

export interface INews {
  id: number;
  image?: StaticImageData;
  title: string;
  content: string;
}

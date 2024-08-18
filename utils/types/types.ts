export type ProductCardType = {
  imgSrc: string;
  name: string;
  rating: string;
  price: string;
  id: string;
};

export type CartCardType = {
  imgSrc: string;
  name: string;
  rating: string;
  price: string;
  id: string;
  qty: string;
};

export type ProductDataType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
};

export type CartValueDataType = {
  itemDetails: ProductDataType;
  qty: string;
};

export type CartDataType = {
  id: number;
  qty: number;
};

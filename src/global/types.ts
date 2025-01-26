export type Food = {
  id: string;
  index: number;
  rating: number;
  promotion: string | null;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
};

export type FoodCategory = {
  id: string;
  name: string;
};

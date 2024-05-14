export type Category = {
  id: number;
  name: string;
};

export type Activity = {
  id: string;
  categoryId: number;
  name: string;
  calories: number;
};

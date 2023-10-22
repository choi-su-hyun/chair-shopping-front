interface IreviewList {
  product_idx: number;
  title: string;
  paragraph: string;
  evaluation_star: number;
  review_image_path: string | null;
  user_idx: number;
  user_name: string;
  created_date: string;
}

export type { IreviewList };

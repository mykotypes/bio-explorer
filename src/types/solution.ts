export type Category = 'Food' | 'Health' | 'Sustainability';

export interface Solution {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string; // public/ path
  impact?: string[]; // e.g., ['Lower CO₂', 'Cost saving']
  tags?: string[];
}


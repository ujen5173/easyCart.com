export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  parent?: Category | null;
  children: Category[];
  created_at?: string;
  updated_at?: string;
};

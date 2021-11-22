export interface Geo {
  id: number;
  title: string;
  path: string;
  parentId: number;
  children: Geo[];
  hasChildren: boolean;
}

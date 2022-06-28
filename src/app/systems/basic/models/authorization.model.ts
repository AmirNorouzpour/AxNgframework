export interface Authorization {
  id: number;
  key: string;
  title: string;
  checked: boolean;
  isLeaf: boolean;
  children: Authorization[];
}

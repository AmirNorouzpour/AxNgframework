export interface AxMenuItem {
  id: number;
  title: string;
  parentId: number;
  key: string;
  icon: string;
  children?: AxMenuItem[];
}

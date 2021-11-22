export interface AxTreeNode {
  title: string;
  key: number;
  icon?: string;
  children?: AxTreeNode[];
  isLeaf?: boolean;
  checked?: boolean;
  selected?: boolean;
  expanded?: boolean;
  selectabel?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
}

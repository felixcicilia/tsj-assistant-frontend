export type MenuItemType = {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItemType[];
};

// Si no usas aún el menú lateral, puedes dejarlo vacío.
export const MENU_ITEMS: MenuItemType[] = [];
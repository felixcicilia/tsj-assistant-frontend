// src/app/core/models.ts

// Tipo genérico para los items del menú lateral / header del theme.
// Lo hacemos flexible para no romper mientras terminamos el diseño.

export type MenuItemType = {
  id?: number | string;
  label?: string;
  icon?: string;
  href?: string;
  badge?: string;
  // hijos anidados (submenús)
  children?: MenuItemType[];
  // cualquier otra propiedad que use el theme
  [key: string]: any;
};
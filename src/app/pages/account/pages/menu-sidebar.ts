// src/app/account/account-menu.data.ts

type AccountItem = {
  label: string;
  icon?: string;
  link: string;
  badge?: string;
};

export type AccountMenuType = {
  label: string;
  icon?: string;
  items?: AccountItem[];
  link?: string;
};

export const accountData: AccountMenuType[] = [
  {
    label: "Cuenta",
    items: [
      {
        label: "Mi perfil",
        icon: "ai-settings",
        link: "/account/settings",
      },
    ],
  },
  {
    label: "Panel de control",
    items: [
      {
        label: "Uso de tokens",
        icon: "ai-pie-chart",
        link: "/account/token-usage",
      },
      {
        label: "Usuarios",
        icon: "ai-user",
        link: "/account/users",
      },
      {
        label: "Chat",
        icon: "ai-messages",
        link: "/account/chat",
        // badge opcional si lo necesitas
        // badge: '4',
      },
    ],
  },
];

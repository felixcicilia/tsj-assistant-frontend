export type MenuItemType = {
  key: string
  label: string
  image?: string
  isMega?: boolean
  isNew?: boolean
  url?: string
  parentKey?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  children?: MenuItemType[]
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'landings',
    label: 'Landings',
    isMega: true,
    children: [
      {
        key: 'template-intro-page',
        label: 'Template Intro Page',
        url: '/',
        parentKey: 'landings',
        image: 'assets/img/megamenu/landings.jpg',
      },
    ],
  },
  {
    key: 'account',
    label: 'Account',
    children: [
      {
        key: 'account-auth',
        label: 'Auth pages',
        parentKey: 'account',
        children: [
          {
            key: 'account-sign-in',
            url: '',
            parentKey: 'account-auth',
            label: 'Sign In',
            target: '_blank',
          },
          {
            key: 'account-sign-up',
            url: 'sign-up',
            parentKey: 'account-auth',
            label: 'Sign Up',
            target: '_blank',
          },
          {
            key: 'account-sign-in-n-up',
            url: 'sign-in-n-up',
            parentKey: 'account-auth',
            label: 'Sign In / Up',
            target: '_blank',
          },
          {
            key: 'account-password-recovery',
            url: 'password-recovery',
            parentKey: 'account-auth',
            label: 'Password Recovery',
            target: '_blank',
          },
        ],
      },
      {
        key: 'account-overview',
        label: 'Overview',
        url: '/account/overview',
        parentKey: 'account',
      },
      {
        key: 'account-settings',
        label: 'Settings',
        url: '/account/settings',
        parentKey: 'account',
      },
      {
        key: 'account-billing',
        label: 'Billing',
        url: '/account/billing',
        parentKey: 'account',
      },
      {
        key: 'account-orders',
        label: 'Orders',
        url: '/account/orders',
        parentKey: 'account',
      },
      {
        key: 'account-earnings',
        label: 'Earnings',
        url: '/account/earnings',
        parentKey: 'account',
      },
      {
        key: 'account-chat',
        label: 'Chat (Messages)',
        url: '/account/chat',
        parentKey: 'account',
      },
      {
        key: 'account-favorites',
        label: 'Favorites (Wishlist)',
        url: '/account/favorites',
        parentKey: 'account',
      },
    ],
  }
]

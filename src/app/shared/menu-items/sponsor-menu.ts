import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const SPONSORMENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'sponsor-profile',
        short_label: 'S',
        name: 'Profile',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'sponsor-students-list',
        short_label: 'S',
        name: 'Sponsor Students',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'sponsor-wallet-details',
        short_label: 'S',
        name: 'Transaction',
        type: 'link',
        icon: 'ti-money'
      },
    //   {
    //     state: 'fees-structure',
    //     short_label: 'S',
    //     name: 'Fees Structure',
    //     type: 'link',
    //     icon: 'ti-user'
    //   }
      // {
      //   state: 'basic',
      //   short_label: 'B',
      //   name: 'Basic Components',
      //   type: 'sub',
      //   icon: 'ti-layout-grid2-alt',
      //   children: [
      //     {
      //       state: 'button',
      //       name: 'Button'
      //     },
      //     {
      //       state: 'typography',
      //       name: 'Typography'
      //     }
      //   ]
      // },
      // {
      //   state: 'notifications',
      //   short_label: 'n',
      //   name: 'Notifications',
      //   type: 'link',
      //   icon: 'ti-crown'
      // },
    ],
  },
  // {
  //   label: 'Tables',
  //   main: [
  //     {
  //       state: 'bootstrap-table',
  //       short_label: 'B',
  //       name: 'Bootstrap Table',
  //       type: 'link',
  //       icon: 'ti-receipt'
  //     }
  //   ]
  // },
  // {
  //   label: 'Map And Extra Pages ',
  //   main: [
  //     {
  //       state: 'map',
  //       short_label: 'M',
  //       name: 'Maps',
  //       type: 'link',
  //       icon: 'ti-map-alt'
  //     },
  //     {
  //       state: 'authentication',
  //       short_label: 'A',
  //       name: 'Authentication',
  //       type: 'sub',
  //       icon: 'ti-id-badge',
  //       children: [
  //         {
  //           state: 'login',
  //           type: 'link',
  //           name: 'Login',
  //           target: true
  //         }, {
  //           state: 'registration',
  //           type: 'link',
  //           name: 'Registration',
  //           target: true
  //         }
  //       ]
  //     },
  //     {
  //       state: 'user',
  //       short_label: 'U',
  //       name: 'User Profile',
  //       type: 'link',
  //       icon: 'ti-user'
  //     }
  //   ]
  // },
  // {
  //   label: 'Other',
  //   main: [
  //     {
  //       state: '',
  //       short_label: 'M',
  //       name: 'Menu Levels',
  //       type: 'sub',
  //       icon: 'ti-direction-alt',
  //       children: [
  //         {
  //           state: '',
  //           name: 'Menu Level 2.1',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.2',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.2',
  //               target: true
  //             }
  //           ]
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.3',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.4',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.2',
  //               target: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       state: 'simple-page',
  //       short_label: 'S',
  //       name: 'Simple Page',
  //       type: 'link',
  //       icon: 'ti-layout-sidebar-left'
  //     }
  //   ]
  // }, {
  //   label: 'Support',
  //   main: [
  //     {
  //       state: 'Upgrade To Pro',
  //       short_label: 'U',
  //       external: 'https://codedthemes.com/item/guru-able-admin-template/',
  //       name: 'Upgrade To Pro',
  //       type: 'external',
  //       icon: 'ti-layout-list-post',
  //       target: true
  //     }
  //   ]
  // }
];

@Injectable()
export class sponsorMenuItems {
  getAll(): Menu[] {
    return SPONSORMENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}

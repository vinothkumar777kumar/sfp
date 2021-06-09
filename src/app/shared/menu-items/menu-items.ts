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
  dataset:string;
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'admin-dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home',
        dataset:'1'
      },
      {
        state: 'students-list',
        short_label: 'S',
        name: 'Students',
        type: 'link',
        icon: 'ti-user',
        dataset:'1'
      },
      {
        state: 'sponsors-list',
        short_label: 'S',
        name: 'Sponsors',
        type: 'link',
        icon: 'ti-shortcode',
        dataset:'1'
      },
      {
        state: 'sponsorship-paid-details',
        short_label: 'S',
        name: 'Sponsorship Paid',
        type: 'link',
        icon: 'ti-shortcode',
        dataset:'1'
      },
      {
        state: 'student-approval',
        short_label: 'S',
        name: 'Approval',
        type: 'link',
        icon: 'ti-user',
        dataset:'1'
      },
      {
        state: 'admin-notification-details',
        short_label: 'S',
        name: 'Notification',
        type: 'link',
        icon: 'ti-user',
        dataset:'1'
      },
      {
        state: 'sponsor-finansed-list',
        short_label: 'S',
        name: 'Financed',
        type: 'link',
        icon: 'ti-money',
        dataset:'1'
      },
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
export class MenuItems {
  getAll(): Menu[] {
    let login_info = JSON.parse(sessionStorage.getItem('login_details'));
    if(login_info['role_type'] == '4'){
      MENUITEMS[0].main[6].dataset = '0';
    }else if(login_info['role_type'] == '1'){
      MENUITEMS[0].main[6].dataset = '1';
    }
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}

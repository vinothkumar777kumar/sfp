import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/menu-items/menu-items';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  navType: string; /* st1, st2(default), st3, st4 */
  themeLayout: string; /* vertical(default) */
  layoutType: string; /* dark, light */
  verticalPlacement: string; /* left(default), right */
  verticalLayout: string; /* wide(default), box */
  deviceType: string; /* desktop(default), tablet, mobile */
  verticalNavType: string; /* expanded(default), offcanvas */
  verticalEffect: string; /* shrink(default), push, overlay */
  vNavigationView: string; /* view1(default) */
  pcodedHeaderPosition: string; /* fixed(default), relative*/
  pcodedSidebarPosition: string; /* fixed(default), absolute*/
  headerTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */
  logoTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */

  innerHeight: string;
  windowWidth: number;

  toggleOn: boolean;

  headerFixedMargin: string;
  navBarTheme: string; /* theme1, themelight1(default)*/
  activeItemTheme: string; /* theme1, theme2, theme3, theme4(default), ..., theme11, theme12 */

  isCollapsedMobile: string;
  isCollapsedSideBar: string;

  chatToggle: string;
  chatToggleInverse: string;
  chatInnerToggle: string;
  chatInnerToggleInverse: string;

  menuTitleTheme: string; /* theme1, theme2, theme3, theme4, theme5(default), theme6 */
  itemBorder: boolean;
  itemBorderStyle: string; /* none(default), solid, dotted, dashed */
  subItemBorder: boolean;
  subItemIcon: string; /* style1, style2, style3, style4, style5, style6(default) */
  dropDownIcon: string; /* style1(default), style2, style3 */
  configOpenRightBar: string;
  isSidebarChecked: boolean;
  isHeaderChecked: boolean;

  @ViewChild('searchFriends', /* TODO: add static flag */ {static: false}) search_friends: ElementRef;

  public config: any;
  logininfo:any;
  profiledata = {
    address:'',
    dateofbirth:'',
    email:'',
    gender:'',
    mobile:'',
    name:'',
    zip_code:''
  }
  notificationarray = [];
  profile_image_api:any;
  profileimage_name:any;
  profileimage_url:any;
  role_type:any;
  constructor(public menuItems: MenuItems,private ds:DataserviceService,private toastr:ToastrService,
    private myacser:MyaccountService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
      this.role_type = this.logininfo['role_type'];
      this.profile_image_api = this.myacser.getprofileimageAPI();
    this.navType = 'st5';
    this.themeLayout = 'vertical';
    this.vNavigationView = 'view1';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.deviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.pcodedHeaderPosition = 'fixed';
    this.pcodedSidebarPosition = 'fixed';
    this.headerTheme = 'theme1';
    this.logoTheme = 'theme1';

    this.toggleOn = true;

    this.headerFixedMargin = '80px';
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme4';

    this.isCollapsedMobile = 'no-block';
    this.isCollapsedSideBar = 'no-block';

    this.chatToggle = 'out';
    this.chatToggleInverse = 'in';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'on';

    this.menuTitleTheme = 'theme5';
    this.itemBorder = true;
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.subItemIcon = 'style6';
    this.dropDownIcon = 'style1';
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;

    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributes(this.windowWidth);

    // dark
    /*this.setLayoutType('dark');
    this.headerTheme = 'theme5';
    this.logoTheme = 'theme5';*/

    // light-dark
    /*this.setLayoutType('dark');
    this.setNavBarTheme('themelight1');
    this.navType = 'st2';*/

    // dark-light
    // this.setNavBarTheme('theme1');
    // this.navType = 'st3';

    this.myacser.getdata('myaccount/'+this.logininfo['user_id']).then(async  res => {
      if(res['status'] == 'success'){
        console.log(res);
        let data = res['data'][0];
        this.profiledata.name = data.name;
        this.profiledata.gender = data.gender;
        this.profiledata.dateofbirth = data.dateofbirth;
        this.profiledata.address = data.address;
        this.profiledata.email = data.email;
        this.profiledata.mobile = data.mobile;
        this.profiledata.zip_code = data.zip_code;
        var profile_img = await this.urlToObject(data.profile_image);
        if(profile_img != null){
        this.profileimage_name = data.profile_image;
        this.profileimage_url = this.profile_image_api+''+data.profile_image;
        }
        var notification = res['reveldata'];
        if(notification != undefined && notification != '' && notification.length > 0){
notification.forEach(n => {
  let msg = '';
  if(n.revel_status === '1'){
    msg = 'Hi admin revel sponsor details to '+n.student_firstname+''+n.student_lastname;
  }else{
    msg = 'Hi admin not revel sponsor details to '+n.student_firstname+''+n.student_lastname;
  }
  console.log(n.created_on);
  const dateTimeAgo = moment(n.created_on).fromNow();
console.log(dateTimeAgo); //> 6 minutes ago
  this.notificationarray.push({id:n.student_id,image:this.profile_image_api+''+n.sponsor_image,name:n.sponsor_firstname+' '+n.sponsor_lastname,msg:msg,paid_on:dateTimeAgo})
})
console.log(this.notificationarray);
        }
        
        
       
        
            }
    },error => {
      console.log(error);
     if(error['error']){
      this.toastr.error(error['error'].message, 'Error', {
        progressBar:true
      });
      return;
     }
     
    })

  }

  ngOnInit() {
    this.setBackgroundPattern('pattern2');
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
  }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
    this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'off';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
    this.chatInnerToggleInverse = this.chatInnerToggleInverse === 'off' ? 'on' : 'off';
  }

  searchFriendList(e: Event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function(elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '80px' : '';
  }

  setBackgroundPattern(pattern) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.logoTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else {
      this.headerTheme = 'theme1';
      this.navBarTheme = 'themelight1';
      this.logoTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
    } else {
      this.navBarTheme = 'theme1';
    }
  }

  urlToObject = async (imageName) => {
    const response = await fetch((this.profile_image_api + imageName));
    if(response.ok) {
      const blob = await response.blob();
      // console.log(blob)
      // const file = new File([blob], imageName, {type: blob.type});
      return blob;
    } else {
      return null;
    }
  }

  logout(){
    this.ds.logout('admin');
      }

}

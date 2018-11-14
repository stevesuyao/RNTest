// import { Navigation } from 'react-native-navigation';
// import screenIDs from '../constants/screenIDs';
//
// const LEFT_SIDE_MENU_ID = 'navigation.drawer.left';
// const RIGHT_SIDE_MENU_ID = 'navigation.drawer.right';
// const ROOT_CENTER_HOME_ID = 'navigation.root.center.home';
//
// export const goHome = (passProps: Object = null) => Navigation.setRoot({
//   root: {
//     sideMenu: {
//       left: {
//         component: {
//           name: screenIDs.PROFILE,
//           id: LEFT_SIDE_MENU_ID,
//           passProps,
//         },
//       },
//       center: {
//         stack: {
//           id: 'main_stack',
//           children: [
//             {
//               component: {
//                 name: screenIDs.MAIN,
//                 id: ROOT_CENTER_HOME_ID,
//                 passProps,
//               },
//             },
//           ],
//         },
//       },
//     },
//   },
// });
//
// export const goAuth = (passProps: Object = null) => Navigation.setRoot({
//   root: {
//     stack: {
//       id: 'Auth',
//       children: [
//         {
//           component: {
//             name: screenIDs.LOGIN,
//             passProps,
//           },
//         },
//       ],
//     },
//   },
// });
//
// export const popOut = id => Navigation.pop(id);
//
// export const pushIn = (id, name) => Navigation.push(id, { component: { name } });
//
// export const startInitalScreen = (passProps: Object = null) => {
//   Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setDefaultOptions({ // global screen's style. Must set before setRoot();
//       layout: {
//       // backgroundColor: 'white',
//         orientation: ['portrait'], // An array of supported orientations
//       },
//     });
//
//     Navigation.setRoot({
//       root: {
//         component: {
//           name: screenIDs.INIT,
//           passProps,
//         },
//       },
//     });
//   });
// };
//
//
// type Side = 'left' | 'right';
//
// const getId = (side:Side) => {
//   if (side === 'left') return LEFT_SIDE_MENU_ID;
//   return RIGHT_SIDE_MENU_ID;
// };
//
// /*
//  * Create a drawer class to control left and right drawer.
//  * @Note: React-native-navigation-v2 has not implemented the toggle-drawer method (11/13/2018),
//  * so we need to build our own.
//  */
// class Drawer {
//   constructor() {
//     this.visibility = {
//       left: false,
//       right: false,
//     };
//
//     Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
//       console.log('fkdklfjdl;f' + componentName);
//       if (componentId === LEFT_SIDE_MENU_ID) {
//         console.log('fjdlkfjdlkfjdlkfjdlkfjklfjlkdjfd');
//         this.visibility.left = true;
//       }
//
//       if (componentId === RIGHT_SIDE_MENU_ID) {
//         this.visibility.right = true;
//       }
//     });
//
//     Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
//       if (componentId === LEFT_SIDE_MENU_ID) {
//         this.visibility.left = false;
//       }
//
//       if (componentId === RIGHT_SIDE_MENU_ID) {
//         this.visibility.right = false;
//       }
//     });
//   }
//
//   open = (side:Side) => {
//     try {
//       const id = getId(side);
//       Navigation.mergeOptions(id, {
//         sideMenu: {
//           [side]: {
//             visible: true,
//           },
//         },
//       });
//       this.visibility[side] = true;
//     } catch (error) {
//       //
//     }
//   }
//
//   close(side:Side) {
//     try {
//       const id = getId(side);
//       Navigation.mergeOptions(id, {
//         sideMenu: {
//           [side]: {
//             visible: false,
//           },
//         },
//       });
//       this.visibility[side] = false;
//     } catch (error) {
//       //
//     }
//   }
//
//   toggle(side:Side) {
//     try {
//       const id = getId(side);
//       const visibility = !this.visibility[side];
//       Navigation.mergeOptions(id, {
//         sideMenu: {
//           [side]: {
//             visible: !this.visibility[side],
//           },
//         },
//       });
//       this.visibility[side] = visibility;
//     } catch (error) {
//       //
//     }
//   }
// }
//
// export const drawer = new Drawer();

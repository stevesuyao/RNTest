/** @format */

import { Navigation } from "react-native-navigation";
import App from './App';

Navigation.registerComponent(`navigation.test.WelcomeScreen`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
 Navigation.setRoot({
   root: {
     component: {
       name: "navigation.test.WelcomeScreen"
     }
   }
 });
});

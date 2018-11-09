/*
 * Entry point of the react native app.
 * @format
 */
import { Provider } from 'react-redux';
import { screenConfigs } from './app/screens';
import { store, persistor } from './app/store';
import App from './App';

const app = new App(screenConfigs, store, persistor, Provider);
app.startApp();

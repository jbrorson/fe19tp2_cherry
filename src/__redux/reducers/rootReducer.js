import { authReducer } from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { clientReducer } from './clientReducer';
import { userInfoReducer } from './userInfoReducer';
import { EmployeeReducer } from './employeeReducer';

//Här är vårt lilla butik (Redux Container som jag visade på paint)
//här samlar vi resultatet
//Root reducer combiens multiple reducers for putting in to store
//Frågor? skulle jag tex skapa upp en grap : grapReducer ?
//exakt! Då alltså kallar på din reducers och helt enkelt lägger in här. OCH
//tex, om vi ska nu kalla på din 'graph' från tex, employeeAccount.js, hur gör vi?
// import {graphReducer} from './employeeReducer'; Menar du så? du är nästan där, men, vad är 'Graph'? liten g tack :D såja precis
//och lägg det i vår butik grap: grapReducer. Precis!!! Och nu när man vill ta 'graph' från employeeAccount då? hur gör man det? visa mig
// inte här alltså gå till employeeAccount :D wtf!! nej. du har gammal repo :/ aha :P, det fanns ett gigantiskt bug med din nuvarande. Så
//Bäst att vi tar från master nu ja, 
export const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  employee: EmployeeReducer,
  //userinfo finns - låt oss titta på userInfoReducer metoden
  //och här döper vi vårt reducer till userinfo
  userinfo: userInfoReducer,
  //firebase finns, alltså, userprofile, jag märkte att
  //vi också tar firebase.auth från firebase och inte från authReducer
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

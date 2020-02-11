import { USER_INFO_FETCH_SUCCESS, USER_INFO_FETCH_FAILURE } from "./types";


//Den metoden dispatchs när vi laddas in på account.js för att vi har valt att anropa metoden
//från useEffect() => alltså componentDidMount()
export const getInfo = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const userid = firebase.auth().currentUser.uid;
    firestore.collection('clients').doc(userid).get()
      .then((res) => {
        const logo = res.data().logo;
        firebase.storage().ref(logo).getDownloadURL().then((imgurl) => {
          //Då tar det och dispatchar användar bildlänken (klarna, swedbank etc) och med flaggan USER_INFO_FETCH_SUCCESS
          dispatch({
            type: USER_INFO_FETCH_SUCCESS,
            payload: imgurl
          })
        })
      })
      .catch((err) => {
        dispatch({
          type: USER_INFO_FETCH_FAILURE,
          payload: null
        })
      })
  }
}

import { SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT } from "./types"


//här t.ex.

//Vi skapar en metod vilket vi idagsläget kallar från vår login vy (du vet form, email och password)
export const signin = (credentials) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //Senare tar vi vårt databas instans och 'dispatchar' ifall det har lyckats.
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        //I detta fall, om användarinfon är korrekt, alltså, signInWithEmailAndPassword
        //har gått igenom då returnerar vi en dispatch med typen: SIGN_IN_SUCCESS
        dispatch({
          type: SIGN_IN_SUCCESS
        })
      })
      .catch(fail => {
        //Ifall vår signInWithEmailAndPassword har misslyckats, då dispatchar vi typen SIGN_IN_ERROR
        //med payload (extra info) fail.message. fail är då värdet signInWithEmailAndPassword() skickar tilblaka till catch()
        //och vi tar ur message fältet från fail objekten
        //frågor ?
        // nej, hänger du med än så länge? okej
        //Men vet att , denna metod som vi skapade här alltså, signin(credentials), måste vi kalla på det för att få ur
        //information. Det gör vi i login.js
        //följ
        dispatch({
          type: SIGN_IN_ERROR,
          payload: fail.message
        })
      });
  }
}

export const signout = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
      .then(() => {
        dispatch({
          type: SIGN_OUT
        })
      })
  }
}
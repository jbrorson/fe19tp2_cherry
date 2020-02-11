import { SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT } from "../actions/types";

const initialState = {
  authError: null
}

//Tänk denna som fångar in resultat från action och skickar tillbaka 
//'state'. Sen får alla andra komponenter extrahera information från redux container.

//Upon first launch, state is inactive. Thus pass an initial state
export const authReducer = (state = initialState, action) => {
  //När vår action.type, alltså SIGN_IN_SUCCESS eller SIGN_IN_ERROR etc, fångas då skickar vi till förfrågaren olika typ av data

  switch(action.type) {
    case SIGN_IN_SUCCESS:
      //När tex. användaren lyckas komma in, då skickar vi ut bara authError: null vilket säger att, inga authentition error har hänt,
      return {
        ...state,
        authError: null
      }
    case SIGN_IN_ERROR:
      return {
        //När vi failar, då fångar vi action.payload, och tillämpar till authError,
        //Reducers bara plockar ut information och skickar till vårt redux 'butik'
        //följ
        ...state,
        authError: action.payload
      }
    case SIGN_OUT:
      return state;
    default:
      return state;
  }
}

import React, { useState } from 'react';
import { LoginArea, LoginLogo, InputArea, InputImage, EmailInput, LoginButton, ErrorArea, LoginContainerArea } from './styledLogin';
import { connect } from 'react-redux';
import { signin } from '../../__redux/actions/authActions';
import { Redirect } from 'react-router-dom';

//Här kallar vi på signin metoden vi precis gick igenom
//och passar in ett objekt {email, password} som vi får utifrån vår login vy
const Login = (props) => {
  const [creds, setCreds] = useState({ email: '', password: ''});

  //ser du
  const handleLogin = (e) => {
    e.preventDefault();
    props.signin(creds);
  }

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setCreds({...creds, [name]: value });
  }

  return (
    props.uid ? <Redirect to='/account'/> :
      <LoginContainerArea>
        <LoginArea onSubmit={handleLogin}>
          <LoginLogo src={require('../../assets/logo_transparent.png')} alt="complogo"></LoginLogo>
          <InputArea>
            <InputImage src={require('../../assets/login/user.svg')}></InputImage>
            <EmailInput placeholder="Email" name="email" type="email" onChange={onChangeInputHandler}></EmailInput>
          </InputArea>
          <InputArea>
            <InputImage src={require('../../assets/login/key.svg')}></InputImage>
            <EmailInput placeholder="Password" name="password" type="password" onChange={onChangeInputHandler}></EmailInput>
          </InputArea>
          <LoginButton type="submit">Login</LoginButton>
          {props.authError ? <ErrorArea >{props.authError}</ErrorArea> : null}
        </LoginArea>
      </LoginContainerArea>
  )
}

//Det är jätte bra att gå steg för steg.
//Redux funkar på så sätt
//Du har nåt slags data som du vill distribuera till olika komponenter.
//För det så ska vi först skapa en action metod. Tex, en fetch metod som fångar och laddar hem
//JSON data  från github
//följ mig så visar jag dig

//authError is linked through auth reducer
const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    authError: state.auth.authError
  }
}

//Tänk dispatch som kör dina metoder, dess enda uppgift egentligen att
//köra nåtslags anrop mot server/databas/endpoint/api
//är du med så länge?ja 
//för att sen få ut information ur actions, då måste vi skapa reducers
//följ

//Det viktiga är att man också skapar dispatch metod om man har något slags action metod.
//Det gör vi via mapDispatchToProps vilket vi själv skapar
const mapDispatchToProps = (dispatch) => {
  //Vi då returnerar signin nykeln med värdet dispatch signin
  return {
    signin: (credentials) => dispatch(signin(credentials))
  }
}

//First parameter is state, second dispatch
export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { useEffect, useState } from 'react';
import IconAddUser from "../../assets/account/adduser.svg";
import IconListUsers from "../../assets/account/listusers.svg";
import IconBarChart from '../../assets/account/barchart.svg';
import IconApi from '../../assets/account/api.svg';
import IconLogout from '../../assets/account/logout.svg';
import { connect } from 'react-redux';
import { signout } from '../../__redux/actions/authActions';
import { Wrapper, FeatureWrapper, ClientCompanyLogo,  MainArea, FeatureContainer, ClientArea, ClientNameArea, FeatureImage, FeatureArea, FeatureDescription, BorderUnderline } from './styledAccount';
import { getInfo } from '../../__redux/actions/userInfoActions';
import AddEmployee from '../../components/AddEmployee/addEmployee';
import Graph from '../../components/Graph/graph';

//här tex, vår komponent har inte längre 'props'. Har du märkt det?jaa :D
//juste, för att, props nu kallas från utifrån (ska visa snart),
//det vi kallar är nyckeln. följ

//Låt oss börja med signout
//Sen info()
const Account = ({ userinfo, signout, info, userprofile }) => {
  const [img, setImg] = useState(null)
  const [stateAddUser, setStateAddUser] = useState(false)
  const [stateDisplayUser, setStateDisplayUser] = useState(false)

  //här, kallar vi egentligen props.signout men vår parameter tar in ett objekt så behöver inte inte skriva props längre
  const logutBtn = () => {
    signout()
  }
  useEffect(() => {
    info();
    setImg(userinfo);
    return () => {
      //Denna är då componentWillUnmount alltså när vi lämnar komponenten (byter till en annan komponent, etc)
      setImg(null)
    }
  }, [userinfo, signout, info, userprofile])

  const toggleStateAddUser = () => {
    setStateDisplayUser(false)
    setStateAddUser(!stateAddUser)
  }
  const toggleStateDisplayUser = () => {
    setStateAddUser(false)
    setStateDisplayUser(!stateDisplayUser)
  }
  const toggleStateDisplayGraph = () => { 
  }

  return (
    <Wrapper>
      <ClientArea>
        <ClientCompanyLogo src={img} />
        <ClientNameArea>{userprofile.firstname + ' ' + userprofile.lastname}</ClientNameArea>
      </ClientArea>
      <BorderUnderline></BorderUnderline>

      <MainArea>
        <FeatureWrapper>
          <FeatureArea onClick={toggleStateAddUser}>
            <FeatureImage src={IconAddUser} />
            <FeatureDescription>Add user</FeatureDescription>
          </FeatureArea>

          <FeatureArea onClick={toggleStateDisplayUser}>
            <FeatureImage src={IconListUsers} />
            <FeatureDescription>Show users</FeatureDescription>
          </FeatureArea>

          <FeatureArea onClick={toggleStateDisplayGraph}>
            <FeatureImage src={IconBarChart} />
            <FeatureDescription>Generate graph</FeatureDescription>
          </FeatureArea>

          <FeatureArea>
            <FeatureImage src={IconApi} />
            <FeatureDescription>Get data</ FeatureDescription>
          </FeatureArea>
          
          {/*När man loggar ut, då körs vårt funktion och dispatchar vår signout() metod*/}
          <FeatureArea onClick={() => logutBtn()}>
            <FeatureImage src={IconLogout} />
            <FeatureDescription>Sign out</FeatureDescription>
          </FeatureArea>
        </FeatureWrapper>

        <FeatureContainer>
          {stateAddUser ? <AddEmployee></AddEmployee> : null}
        </FeatureContainer>
      </MainArea>

    </Wrapper>
  );
}


//här! mapStateToProps, titta på namnet :P mappa state alltså typ redux butik till props
//här har vi valt att lägga auth, userprofile, och userinfo, låt oss se om alla 3 finns i butiken
const mapStateToProps = (state) => {
  return {
    //här igen! vi tar firebase.auth 
    auth: state.firebase.auth,
    userprofile: state.firebase.profile,
    //och här döper vi om det till userinfo (spelar inget roll om samma namn)
    //och extraherar userinfo.info som vi såg från vårt reducer metoden
    userinfo: state.userinfo.info
    //vänstra fält (auth, userprofile, userinfo) är nycklen du själv döper,
    //det på höger är state.det reducern du vill ta med den datan det skickar ut
    //via reducer metoden, titta på userinfo.info, ser du?
  }
}

//Precis! Glöm inte att, för att få ut information frpn mapStateToProps, måste själva action metoden ha körts innan,
//I vårt fall, t.ex., signout() metoden kommer vi endast att köra från account vyn så därför är det vettigt at ha signout
//här istället på andra ställen
//om du har parametrar. t.ex., signout action metoden har ett objekt parameter, 'credentials',
//det måste du också ha här, om action metoden har parametrar, i ditt fall, när grafen kommer att ha parametrar då gör du det
//i dispatch metoden

//Låt oss se hur vi använder dem.
const mapDispatchToProps = (dispatch) => {
  return {
    info: () => dispatch(getInfo()),
    //såhär
    //signout: (creds) => dispatch(signout(creds))
    signout: () => dispatch(signout())
  }
}


//Slutligen, vi måste ansluta komponenten till redux genom connect() metoden.
//första parametern tar mapState, och andra mapDispatch
export default connect(mapStateToProps, mapDispatchToProps)(Account);


//Frågor?nej,
//väl, det var det hur jag ska lyckas är en annan femma. Men nu förstår jag mer och bättre
//viktigaste är att du förstår
//

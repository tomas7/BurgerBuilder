import React, { Component } from 'react'
import myClass from './MainLeftNavItems.module.css'
import SearchBar from '../../SearchBar/searchBar'
import MainNavItem from './MainLeftNavItem/MainLeftNavItem'
import LoadingSpinner from '../../../UI_elements/LoadingSpinner/LoadingSpinner'
import SilentToken from '../../../HOC/GetAccessTokenSilently/getAccessTokenSIlently'
import sortByKey from '../../../Helpers/sortArrOfObjByEl'

export class MainLeftNavItems extends Component {
  state = {
    dataArr : [,],
    sessionExpired: false,

    clickedIdx: 12344,

    loading: false,
    sessionExpired: false,

    numbersOfTries: 0,
    expadnded: true,
    userEmail:null
  }
  catchExpiredToken = () => {
    console.log("token expired from: mainLeftNavItem")
 
    this.props.catchToken()
  }

  passDeviceArr = (returnData) => {
      console.log(returnData)
      this.props.getMyState_(returnData)
  }

  passClickedDevListIndex = (Idx) => {
    if(Idx == 12344){
    
      console.log("expanding/colapsing")
    }
    console.log(Idx)

    this.props.getIdx(Idx)
    this.setState({clickedIdx: Idx})
  }

  expandHandler = () => {
    let exp = this.state.expadnded
    this.setState({
      expadnded: !exp
    })
  }

  callGetDeviceListAPI = () => {
    var token = window.sessionStorage.getItem("theToken")
 
    var theUrl = "https://visblueiotfunctionapptest.azurewebsites.net/api/GetDeviceList"
    var xmlHttp = new XMLHttpRequest();
    this.setState({
      loading: true
    })
    xmlHttp.onreadystatechange = () =>  {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          let returnData = JSON.parse(xmlHttp.response);
      
          console.log(returnData)

          returnData.forEach(element => {
        

          });

         
          
     
          this.setState({
            loading: false
          })
      
     
          let arrDevices = []

          returnData.forEach(element => {
            //was DeviceId
            arrDevices.push(element.DeviceName)
          });

          // let result = (returnData) = returnData.reduce((r, a) => {
          //     r[a.CustomerId] = r[a.CustomerId] || [];
          //     r[a.CustomerId].push(a);
          //     return r;
          // }, Object.create(null));
      
          this.setState({
            dataArr:returnData,
            // userEmail:returnData[1][0].CustomerName
          })
          // console.log(returnData[1][0].CustomerName)
          // console.log(result)
          this.passDeviceArr(arrDevices)
        }
         else if (xmlHttp.status == 401) {
          this.props.catchToken()
          console.log("<<<<<Session expired>>>>>>")
        }else if (xmlHttp.status == 400){

          
          if (this.state.numbersOfTries === 3) {
            console.log("we tried it 3 times")
            this.setState({
              dataArr: [],
              loading:false
            })
          }else {
            this.setState({
              numbersOfTries: this.state.numbersOfTries + 1
            })
            console.log("<<<<<400 - reestablishing>>>>>>")
            this.callGetDeviceListAPI()
          }
        }

        else {    
            console.log("we are NOT authenticated");
        
    }         
}



console.log("this is my TOKEN" + token)
xmlHttp.open("POST", theUrl, true); // true for asynchronous
xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
var dataJSON = JSON.stringify({ FromDataUTC: "2012-04-23T18:25:43.511Z" })
xmlHttp.send(dataJSON);
  }
  componentDidMount() {
   this.callGetDeviceListAPI()
  }
  
  render() {
    let expStyle = null
  
     //this will be replaced by number of intstallations from API got from props
  let obj = this.state.dataArr
  console.log(obj)
  let testArr = []
  console.log(this.state.dataArr)
  let Items = Object.keys(obj).map((element, index) => {
    // console.log(obj[element])
      testArr.push(obj[element])
      // console.log(element.DeviceName)
      // return <MainNavItem clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={idx_} name={el.DeviceName} number={idx_ + 1} key={idx_}/>
   
  });

  console.log(testArr)

  // // testArr.forEach((element,index) => {
  // //   element.map((el,idx) =>{
  // //     console.log(el)
  // //   })
  // // });

// Items = testArr.forEach((element,index) => {
//       for (let index = 0; index < element.length; index++) {
//         const element_ = element[index];
//         console.log(element_)
//         let test = <MainNavItem clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={index} name={element.DeviceName} number={index + 1} key={index}/>
//         return test
//       }
//    console.log(test)
//   });

  let test = this.state.dataArr.map((element, index) => {
    return <MainNavItem clickedIdx_={this.state.clickeddx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={index} name={element.DeviceId} number={index + 1} key={index}/>
  });
  // Items = testArr.map((el,idx_) => {
  //   // console.log(el[0])

  // });

  if (this.state.dataArr.length === 0){
    alert("empty")
    Items = <MainNavItem clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={1} name="no devices found" number={0 + 1} key={1}/>
  }
  if (this.state.dataArr.length === 0){
    console.log("empty")
    test = <MainNavItem clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={1} name="no devices found" number={0 + 1} key={1}/>
  }else {
    test = this.state.dataArr.map((element, index) => {
      return <MainNavItem clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={index} name={element.DeviceId} number={index + 1} key={index}/>
    });
  }

  let SessionExpired = null
  if(this.state.sessionExpired === true){
    SessionExpired = <SilentToken/>

  }
  else {
    SessionExpired = null
  }

  let testStyle = {width:"100%"}
  


    let Loader = null
    let Overview = null
    console.log(this.state)
    if (this.state.loading) {
      // testStyle = {opacity:".2",backgroundColor: "#26374b2e"}
      Loader = <LoadingSpinner isLeft={true}/>
      Overview = null
    }else{
      // Loader = null
      // testStyle  = {width:"100%"}
     
      Loader = null
      // Overview = <MainNavItem userEmail_={this.state.userEmail} isExpand={this.state.expadnded} expandHandler_={() => this.expandHandler()} clickedIdx_={this.state.clickedIdx} getIdx={(Idx) => this.passClickedDevListIndex(Idx)} idx={"123"} name={"Overview"} number={12345} key={"1234"}/>
    }

    return (
      <>
      {/* <button onClick={() => this.catchExpiredToken()}>fewfqeoiwgfjrqeoigfjqeorigjeqrg</button> */}
      {SessionExpired}
      {Loader}
      {/* <SearchBar/> */}
     <nav className={myClass.leftNav}>
       
        <ul className={testStyle}>
          {Overview}
          {Items}
        </ul>
      </nav>

  </>
    )
  }
}

export default MainLeftNavItems

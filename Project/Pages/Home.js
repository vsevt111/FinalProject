import * as React from 'react';
import { Button, View, TextInput,StyleSheet,
  PermissionsAndroid, TouchableHighlightBase,Image,SafeAreaView,FlatList,ScrollView,
TouchableOpacity,Modal,TouchableHighlight} from 'react-native';
import { StackNavigator } from "react-navigation";
import { Container, Header, Content, Card, CardItem, Text, Body,Icon, Fab ,Picker,Root } from "native-base";
import Geolocation from 'react-native-geolocation-service';
import MapView,{Polyline, PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps';
import Sci from '../database/building/buildingSci.json';
import Agro from '../database/building/buildingAgro.json';
import Arch from '../database/building/buildingArch.json';
import Bus from '../database/building/buildingBus.json';
import Eco from '../database/building/buildingEco.json';
import Edu from '../database/building/buildingEdu.json';
import Eng from '../database/building/buildingEng.json';
import Env from '../database/building/buildingEnv.json';
import Fish from '../database/building/buildingFish.json';
import Forest from '../database/building/buildingForest.json';
import Hum from '../database/building/buildingHum.json';
import Soc from '../database/building/buildingSoc.json';
import Vet from '../database/building/buildingVet.json';
import VetTech from '../database/building/buildingVetTech.json';
import Agr from '../database/building/buildingAgr';
import All from '../database/building/buildingAll';
import AllBuilding from '../database/building/building.json';
import locPress from '../image/PressMark.png';
import Direction from 'react-native-maps-directions';
import busStop1 from '../database/busPark/busPark1.json';
import busStop2 from '../database/busPark/busPark2.json';
import busStop3 from '../database/busPark/busPark3.json';
import busStop4 from '../database/busPark/busPark4.json';
import busStop5 from '../database/busPark/busPark5.json';
import geolib,{getPreciseDistance,getDistance,convertDistance,getCenter,isPointInPolygon} from 'geolib';
import SearchInput ,{createFilter} from 'react-native-search-filter';
import busStopAll from '../database/busPark/busParkAll.json';
import symbol1 from '../image/busstopLine1.png';
import symbol2 from '../image/busstopLine2.png';
import symbol3 from '../image/busstopLine3.png';
import symbol4 from '../image/busstopLine4.png';
import symbol5 from '../image/busstopLine5.png';



async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'KUTravel App location Permission',
        message:
          'KUTravel App needs access to your location ' +
          'so you can travel at university.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true
    } else {
      console.log('location permission denied');
      return false
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class HomeScreen extends React.Component {
  componentDidMount(){
    requestLocationPermission()
    this.mapRef.setMapBoundaries({latitude:13.853065,longitude:100.577247},{latitude:13.847937,longitude:100.564641})
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
          (position) => {
            const {myLocation} = this.state
              console.log(position.coords.latitude)
              console.log(position.coords.longitude)
              this.setState({myLocation:{latitude:position.coords.latitude,
                longitude:position.coords.longitude}})
              // if(this.InUniversity({latitude:position.coords.latitude,longitude:
              // position.coords.longitude})){
              //   console.log('condition in componentdidmount 1')
              //   this.setState({myLocInUni:true})
              // }
              // else{
              //   console.log('condition in componentdidmount 2')
              //   this.setState({myLocInUni:false})
              // }
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
  }
  }

  componentWillUnmount(){
    requestLocationPermission();
  }

  componentDidUpdate(prevProp,prevState){
    const {TextOrigin,TextDestination} = this.state
      if(prevState.change){
        if(prevState.FacultyOrigin !== this.state.FacultyOrigin){
          if(this.state.FacultyOrigin === "คณะเกษตร"){
            //this.setState({FacultyValueOrigin:Agr})
            this.setState({FacultyValue:Agr})
            console.log('คณะเกษตร')
          }
          
          else if(this.state.FacultyOrigin === "คณะอุตสาหกรรมเกษตร"){
            //this.setState({FacultyValueOrigin:Agro})
            this.setState({FacultyValue:Agro})
            console.log('คณะอุตสาหกรรมเกษตร')
          }
          else if(this.state.FacultyOrigin === "รวม" ){
            //this.setState({FacultyValueOrigin:All})
            this.setState({FacultyValue:All})
            console.log('รวม')
          }
          else if(this.state.FacultyOrigin === "คณะสถาปัตยกรรมศาสตร์"){
            //this.setState({FacultyValueOrigin:Arch})
            this.setState({FacultyValue:Arch})
            console.log('คณะสถาปัตยกรรมศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะบริหารธุรกิจ"){
            //this.setState({FacultyValueOrigin:Bus})
            this.setState({FacultyValue:Bus})
            console.log('คณะบริหารธุรกิจ')
          }
          else if(this.state.FacultyOrigin === "คณะเศรษฐศาสตร์"){
            //this.setState({FacultyValueOrigin:Eco})
            this.setState({FacultyValue:Eco})
            console.log('คณะเศรษฐศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะศึกษาศาสตร์"){
            //this.setState({FacultyValueOrigin:Edu})
            this.setState({FacultyValue:Edu})
            console.log('คณะศึกษาศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะวิศวกรรมศาสตร์"){
            //this.setState({FacultyValueOrigin:Eng})
            this.setState({FacultyValue:Eng})
            console.log('คณะวิศวกรรมศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะสิ่งแวดล้อม" ){
            //this.setState({FacultyValueOrigin:Env})
            this.setState({FacultyValue:Env})
            console.log('คณะสิ่งแวดล้อม')
          }
          else if(this.state.FacultyOrigin === "คณะประมง"){
            //this.setState({FacultyValueOrigin:Fish})
            this.setState({FacultyValue:Fish})
            console.log('คณะประมง')
          }
          else if(this.state.FacultyOrigin === "คณะมนุษยศาสตร์"){
            //this.setState({FacultyValueOrigin:Hum})
            this.setState({FacultyValue:Hum})
            console.log('คณะมนุษยศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะวิทยาศาสตร์"){
            //this.setState({FacultyValueOrigin:Sci})
            this.setState({FacultyValue:Sci})
            console.log('คณะวิทยาศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะสังคมศาสตร์"){
            //this.setState({FacultyValueOrigin:Soc})
            this.setState({FacultyValue:Soc})
            console.log('คณะสังคมศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะสัตวแพทยศาสตร์"){
            //this.setState({FacultyValueOrigin:Vet})
            this.setState({FacultyValue:Vet})
            console.log('คณะสัตวแพทยศาสตร์')
          }
          else if(this.state.FacultyOrigin === "คณะเทคนิคการสัตวแพทย์"){
            //this.setState({FacultyValueOrigin:VetTech})
            this.setState({FacultyValue:VetTech})
            console.log('คณะเทคนิคการสัตวแพทย์')
          }
          else if(this.state.FacultyOrigin === "คณะวนศาสตร์"){
            //this.setState({FacultyValueOrigin:Forest})
            this.setState({FacultyValue:Forest})
            console.log('คณะวนศาสตร์')
          }
          
        }
       if(prevState.FacultyDestination !== this.state.FacultyDestination){
        if(this.state.FacultyDestination === "คณะเกษตร"){
          //this.setState({FacultyValueDestination:Agr})
          this.setState({FacultyValue:Agr})
          console.log('คณะเกษตรปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะอุตสาหกรรมเกษตร"){
          //this.setState({FacultyValueDestination:Agro})
          this.setState({FacultyValue:Agro})
          console.log('คณะอุตสาหกรรมเกษตรปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "รวม"){
          //this.setState({FacultyValueDestination:All})
          this.setState({FacultyValue:All})
          console.log('รวม')
        }
        
        else if(this.state.FacultyDestination === "คณะสถาปัตยกรรมศาสตร์"){
          //this.setState({FacultyValueDestination:Arch})
          this.setState({FacultyValue:Arch})
          console.log('คณะสถาปัตยกรรมศาสตร์ปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะบริหารธุรกิจ"){
          //this.setState({FacultyValueDestination:Bus})
          this.setState({FacultyValue:Bus})
          console.log('คณะบริหารธุรกิจปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะเศรษฐศาสตร์"){
          //this.setState({FacultyValueDestination:Eco})
          this.setState({FacultyValue:Eco})
          console.log('คณะเศรษฐศาสตร์ปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะศึกษาศาสตร์"){
          //this.setState({FacultyValueDestination:Edu})
          this.setState({FacultyValue:Edu})
          console.log('คณะศึกษาศาสตร์ปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะวิศวกรรมศาสตร์"){
          //this.setState({FacultyValueDestination:Eng})
          this.setState({FacultyValue:Eng})
          console.log('คณะวิศวกรรมศาสตร์ปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะสิ่งแวดล้อม"){
          //this.setState({FacultyValueDestination:Env})
          this.setState({FacultyValue:Env})
          console.log('คณะสิ่งแวดล้อมปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะประมง"){
          //this.setState({FacultyValueDestination:Fish})
          this.setState({FacultyValue:Fish})
          console.log('คณะประมงปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะวนศาสตร์"){
          //this.setState({FacultyValueDestination:Forest})
          this.setState({FacultyValue:Forest})
          console.log('คณะวนศาสตร์ปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะมนุษยศาสตร์"){
          //this.setState({FacultyValueDestination:Hum})
          this.setState({FacultyValue:Hum})
          console.log('คณะมนุษยศาสตร์ปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะวิทยาศาสตร์"){
          //this.setState({FacultyValueDestination:Sci})
          this.setState({FacultyValue:Sci})
          console.log('คณะวิทยาศาสตร์ปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะสังคมศาสตร์"){
          //this.setState({FacultyValueDestination:Soc})
          this.setState({FacultyValue:Soc})
          console.log('คณะสังคมศาสตร์ปลายทาง')
        }
       
        else if(this.state.FacultyDestination === "คณะสัตวแพทยศาสตร์"){
          //this.setState({FacultyValueDestination:Vet})
          this.setState({FacultyValue:Vet})
          console.log('คณะสัตวแพทยศาสตร์ปลายทาง')
        }
        
        else if(this.state.FacultyDestination === "คณะเทคนิคการสัตวแพทย์"){
          //this.setState({FacultyValueDestination:VetTech})
          this.setState({FacultyValue:VetTech})
          console.log('คณะเทคนิคการสัตวแพทย์รปลายทาง')
        }
       }
        if(prevState.line !== this.state.line){
          if(this.state.line === "สาย 1"){
            this.setState({BusStopLine:busStop1})
            this.setState({LineColor:"#0ce8f7"})
            this.setState({symbol:symbol1})
          }
          else if(this.state.line === "สาย 3"){
            this.setState({BusStopLine:busStop3})
            this.setState({symbol:symbol3})
            this.setState({LineColor:"#d91fed"})
          }
          else if(this.state.line === "สาย 5"){
            this.setState({BusStopLine:busStop5})
            this.setState({symbol:symbol5})
            this.setState({LineColor:"#f58f0a"})
          }
          else {
            this.setState({BusStopLine:null})
          }
        }
        if(prevState.TextOrigin !== this.state.TextOrigin){
          const {modalVisible,coordinate} = this.state
          AllBuilding.building.filter((ele,index)=>{
            if(ele.name === this.state.TextOrigin || this.state.TextOrigin === 'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว' ||
            this.state.TextOrigin === 'ตำแหน่งของตัวเอง'){
              this.setState({deleOri:true})
              if(this.state.TextOrigin === 'ตำแหน่งของตัวเอง'){
                if(this.InUniversity(this.state.myLocation) && this.state.TextDestination !== 'ตำแหน่งของตัวเอง'){
                  
                  this.setState({myLocInUni:true})
                }
                else{
                  this.setState({modalVisible:true})
                  this.setState({myLocInUni:false})
                }
              }
             else if(this.state.TextOrigin !== 'ตำแหน่งของตัวเอง' && this.state.TextDestination !== 'ตำแหน่งของตัวเอง'){
             
               this.setState({myLocInUni:true})
             }
            }
          })
          if(this.state.deleOri && (this.state.TextOrigin !== 'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว' && 
          this.state.TextOrigin !== 'ตำแหน่งของตัวเอง')){
           
            this.state.NameOfCoor.shift()
            this.state.coordinate.shift()
            this.setState({deleOri:false,line:'เส้นทางที่แนะนำ'})
          }
        }
        if(prevState.TextDestination !== this.state.TextDestination){
         
          AllBuilding.building.filter(ele =>{
            if(ele.name === this.state.TextDestination || this.state.TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว' ||
            this.state.TextDestination === 'ตำแหน่งของตัวเอง'){
            
              this.setState({deleDes:true})
              if(this.state.TextDestination === 'ตำแหน่งของตัวเอง'){
               
                if(this.InUniversity(this.state.myLocation && this.state.TextOrigin!== 'ตำแหน่งของตัวเอง')){
                  this.setState({myLocInUni:true})
                }
                else{
                  this.setState({modalVisible:true})
                  this.setState({myLocInUni:false})
                }
              }
              else if(this.state.TextOrigin !== 'ตำแหน่งของตัวเอง' && this.state.TextDestination !== 'ตำแหน่งของตัวเอง'){
                this.setState({myLocInUni:true})
              }
            }
          })
          if(this.state.deleDes && (this.state.TextDestination !== 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว' &&
          this.state.TextDestination !== 'ตำแหน่งของตัวเอง')){
           
            this.state.NameOfCoor.pop()
            this.state.coordinate.pop()
            this.setState({deleDes:false,line:'เส้นทางที่แนะนำ'})
          }
        }
    
      // if(this.state.requestDir1){
      //     this.setState({requestDir1:false})
      //   }
      // if(this.state.requestDir2){
      //   this.setState({requestDir2:false})
      // }
      // if(this.state.requestDir3){
      //   this.setState({requestDir3:false})
      // }
      this.setState({change:false})
      }
}
  constructor(props){
    super(props);
    this.state={
      TextOrigin:"",
      TextDestination:"",
      coordinate:[],
      FacultyOrigin:"",
      FacultyDestination:"",
      FacultyValue:All,
      change:false,
      changeOrigin:true,
      FacultyValueOrigin:All,
      FacultyValueDestination:All,
      prevTextOrigin:'',
      prevTextDestination:'',
      time:null,
      distance:null,
      distOrigin:null,
      myLocation:[],
      TextColor:'gray',
      Opacity:0.2,
      Waypoints:[],
      NameWaypoints:[],
      line:"เส้นทางที่แนะนำ",
      BusStopLine:null,
      LineColor:null,
      countOrigin:0,
      countDes:0,
      FirstFromDes:false,
      request:false,
      BusStopEqual:false,
      listItemOri:false,
      listItemDes:false,
      deleOri:false,
      deleDes:false,
      NameOfCoor:[],
      OptimalLine:null,
      InLine1:false,
      InLine3:false,
      InLine5:false,
      choiceLine:['เส้นทางที่แนะนำ'],
      symbol:null,
      filterOriLen:null,
      filterDesLen:null,
      requestDir1:true,
      requestDir2:true,
      requestDir3:true,
      modalVisible:false,
      changeInCheck :false,
      myLocInUni:true
    };
    this.Search = this.Search.bind(this);
    this.DisplayAll = this.DisplayAll.bind(this);
    this.handlePressOnMap = this.handlePressOnMap.bind(this);
    this.getBusStop = this.getBusStop.bind(this);
    this.updateTime= this.updateTime.bind(this);
    this.optimalRoute = this.optimalRoute.bind(this);
    this.InLine5 = this.InLine5.bind(this);
    this.InLine1 = this.InLine1.bind(this);
    this.InLine3 = this.InLine3.bind(this);
    this.modifyChoiceLine = this.modifyChoiceLine.bind(this);
    this.InUniversity = this.InUniversity.bind(this);
    // this.checkMyLocInUni = this.checkMyLocInUni.bind(this);
  }

  DisplayAll(){
    
    this.setState({time:null,distance:null,request:false,BusStopEqual:false,line:'เส้นทางที่แนะนำ'})
    const {TextOrigin,TextDestination,FacultyValueDestination,FacultyValueOrigin,coordinate,modalVisible,
    myLocation,myLocInUni} = this.state
    
    if(TextOrigin !== 'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว'){
      this.Search(TextOrigin,true)
    }
    if(TextDestination !== 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว'){
      this.Search(TextDestination,false)
    }
    // console.log(this.InLine5(coordinate[0]))
    // this.getBusStop()
    var latitudeDelta
    var longitudeDelta
    if(coordinate.length === 2){
    var latitude1 = coordinate[0].latitude
    var latitude2 = coordinate[1].latitude
    var longitude1 = coordinate[0].longitude
    var longitude2 = coordinate[1].longitude
    latitudeDelta = Math.max(latitude1,latitude2)-Math.min(latitude1,latitude2)+0.01
    longitudeDelta = Math.max(longitude1,longitude2)-Math.min(longitude1,longitude2)+0.01
  }
  else if(coordinate.length === 1){
    latitudeDelta =0.0122,
    longitudeDelta = 0.0021
  }
    const region = {
      ...getCenter(coordinate),
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    }
    this.mapRef.animateToRegion(region,250)
    this.modifyChoiceLine(['เส้นทางที่แนะนำ'])
  }
 
  Search(text,bool){
    const texts = text.toUpperCase()
    const {coordinate,TextOrigin,TextDestination,myLocation,FirstFromDes,NameOfCoor,
    modalVisible,myLocInUni} = this.state
    var FirstFromClickDes = false
      if(bool && text === 'ตำแหน่งของตัวเอง'){
        if(TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว'){
          FirstFromClickDes =true
        }
        if(coordinate.length === 0 ){
          NameOfCoor.push('ตำแหน่งของตัวเอง')
          coordinate.push(myLocation)
          this.setState({FirstFromDes:false})
        }
        else{
          if(coordinate.length === 1 ){
           if(FirstFromClickDes || FirstFromDes)
            {
            coordinate.splice(0,0,myLocation)
            NameOfCoor.splice(0,0,'ตำแหน่งของตัวเอง')
          }
            else if(!FirstFromDes){
             
              coordinate.fill(myLocation,0,1)
              NameOfCoor.fill('ตำแหน่งของตัวเอง',0,1)
            }
            this.setState({FirstFromDes:false})
          }
          else{
            coordinate.fill(myLocation,0,1)
            NameOfCoor.fill('ตำแหน่งของตัวเอง',0,1)
          }
        }
      }
      else if (!bool && text === 'ตำแหน่งของตัวเอง'){
    
        if(coordinate.length === 1){
          if(!FirstFromDes)
          {coordinate.push(myLocation)
          NameOfCoor.push('ตำแหน่งของตัวเอง')}
          else{
            coordinate.fill(myLocation,0,1)
            NameOfCoor.fill('ตำแหน่งของตัวเอง',0,1)
          }
         
        }
        else{
          if(coordinate.length === 0){
            coordinate.push(myLocation)
            NameOfCoor.push('ตำแหน่งของตัวเอง')
            this.setState({FirstFromDes:true})
          }
          else{
            coordinate.fill(myLocation,1,2)
            NameOfCoor.fill('ตำแหน่งของตัวเอง',1,2)
        }
         
        }
      }
    else if(text !== 'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว' ){
    AllBuilding.building.filter(item => {
      if(item.name === texts){
        if(bool){
          if(coordinate.length === 0){
            coordinate.push(item.coordinate)
            NameOfCoor.push(item.name)
          }
          else{
            const {FirstFromDes} = this.state
            if(FirstFromDes && coordinate.length === 1){
              coordinate.splice(0,0,item.coordinate)
              NameOfCoor.splice(0,0,item.name)
              this.setState({FirstFromDes:false})
            }
          
            else if(coordinate.length === 2 || (!FirstFromDes && coordinate.length === 1)){
              coordinate.fill(item.coordinate,0,1)
              NameOfCoor.fill(item.name,0,1)
            }
          }
        }
      if(!bool){
        if(coordinate.length === 1){
          if(!FirstFromDes)
          {
            coordinate.push(item.coordinate)
            NameOfCoor.push(item.name)
          }
          else{
            coordinate.fill(item.coordinate,0,1)
            NameOfCoor.fill(item.name,0,1)
          }
        }
        else if(coordinate.length === 2){
          NameOfCoor.fill(item.name,1,2)
          coordinate.fill(item.coordinate,1,2)
        }
        else if(coordinate.length === 0){
          NameOfCoor.push(item.name)
          coordinate.push(item.coordinate)
          this.setState({FirstFromDes:true})
        }
      }
      this.setState({NameOfCoor})
      this.setState({coordinate})
     
        return item
      }
    })
    
    }
  }
  getBusStop(lines=null){
    // console.log('getBusStop() method',this.state.BusStopLine)
    
    const {coordinate,Waypoints,NameWaypoints,BusStopLine,line,BusStopEqual} = this.state
    this.setState({BusStopEqual:false})
    Waypoints.splice(0,Waypoints.length)
    NameWaypoints.splice(0,NameWaypoints.length)
    
    if(coordinate.length === 2)
  {  
    var minOrigin  = 999
    var minDes = 999
    var indexOrigin = 0
    var indexDes = 0
    var getIndexDes = false
    var getIndexOri = false
    var sumDist =0
    var calculateCheckPoint = false
    var calculateIndex = false
  }
    if(coordinate.length >=1 && (BusStopLine !== null || lines !== null) ){
      BusStopLine.markers.map((item,index)=>{
        const distOrigin = getPreciseDistance(coordinate[0],item.coordinate)
        const kiloOrigin = convertDistance(distOrigin,'km')
        if(minOrigin  >= kiloOrigin){
          minOrigin =kiloOrigin
          indexOrigin = index
        }
        if(index === BusStopLine.markers.length-1){
          getIndexOri = true
        }
    })
    if(coordinate.length === 2 && getIndexOri){
      BusStopLine.markers.map((item,index)=>
      {var indexs
      const {BusStopLine} = this.state
      const distDes = getPreciseDistance(coordinate[1],item.coordinate)
      const kiloDes = convertDistance(distDes,'km')
     
      if(index === BusStopLine.markers.length-1){
        indexs = 0
      }
      else{
        indexs = index
      }
      const BusStop = BusStopLine.markers[indexs+1].coordinate
      const distBusForward = convertDistance(getPreciseDistance(coordinate[1],BusStop),'km')
      // console.log('kiloDes : '+kiloDes)
      if((minDes >= kiloDes || kiloDes <=0.3) && index !== indexOrigin && !getIndexDes){
        if(minDes !== kiloDes ){
          minDes=kiloDes
          indexDes = index
          if((kiloDes <= 0.30 && distBusForward > kiloDes && indexDes > indexOrigin) 
          || (kiloDes<=0.30 && indexDes < indexOrigin && indexOrigin >= BusStopLine.markers.length-3 && BusStopLine === busStop1)){
            getIndexDes = true
          }
          // if(BusStopLine === busStop1){
          //   console.log('test busStop1')
          // }
        }
        else{
          if(indexOrigin < index && !getIndexDes){
            indexDes=index
        
          }
        } 
      }
    })}
    // console.log('minDes : '+minDes)
    calculateIndex = true
  }
    // console.log('minimumOrigin: '+minOrigin  +' IndexOrigin: '+indexOrigin)
    // console.log('minimumDes: '+minDes+' IndexDes: '+indexDes)
    if(coordinate.length===2 && calculateIndex){
      if(indexOrigin < indexDes){
      const busStop = BusStopLine.markers.slice(indexOrigin,indexDes+1)
      busStop.map((ele,index) =>{
        NameWaypoints.push(ele.name)
        Waypoints.push(ele.coordinate)
      })
    }
   
    else if(indexOrigin > indexDes){
      const busStopFirst = BusStopLine.markers.slice(indexOrigin)
      const busStopLast = BusStopLine.markers.slice(0,indexDes+1)
      busStopFirst.map((ele,index) =>{
        NameWaypoints.push(ele.name)
        Waypoints.push(ele.coordinate)
      })
      busStopLast.map((ele,index)=>{
        NameWaypoints.push(ele.name)
        Waypoints.push(ele.coordinate)
      })
    }
    // else if(indexOrigin === indexDes){
    //   console.log('indexORigin equal to indexDes')
    //   this.setState({LineColor:'#05f709'})
    //   this.setState({BusStopEqual:true})
    // }
    calculateCheckPoint=true
   
  }
  if((line === 'เส้นทางที่แนะนำ') && calculateCheckPoint){
    
    var DistFromMyloc = convertDistance(getPreciseDistance(coordinate[0],coordinate[1]),'km')
    Waypoints.map((ele,index)=>{
      if(index>=1){
        sumDist+=convertDistance(getPreciseDistance(Waypoints[index-1],Waypoints[index]),'km')
      }
    })
    if((DistFromMyloc+0.85 < sumDist && DistFromMyloc <= 0.50)||(DistFromMyloc <= 0.25)){
      NameWaypoints.splice(0,NameWaypoints.length)
      this.setState({LineColor:'#05f709'})
      this.setState({BusStopEqual:true})
      Waypoints.splice(0,Waypoints.length)
    }
   
  }
  // console.log('Distance all busStop : '+sumDist+' distance between origin and des : '+DistFromMyloc)
  this.setState({Waypoints})
  this.setState({NameWaypoints})
  }
  
  optimalRoute(){
    const {coordinate,line,BusStopLine,BusStopEqual,
    Waypoints,choiceLine} = this.state
    var lines = null
    // var arraySum =[]
    var sum = 9999
    if(coordinate.length === 2){
      busStopAll.map((coor)=>{
        var min =999
        var max =0
        // var sumDist= 0
        // optimizeWaypoints.splice(0,optimizeWaypoints.length)
      coor.markers.map((ele,index)=>{
        const distanceFromOri = getPreciseDistance(coordinate[0],ele.coordinate)
        const convToKm = convertDistance(distanceFromOri,'km')
        const distanceFromDes = getPreciseDistance(coordinate[1],ele.coordinate)
        const convToKmDes = convertDistance(distanceFromDes,'km')
        if(min > convToKm){
          min = convToKm
        }
        if(max < convToKm){
          max=convToKmDes
        }
        // optimizeWaypoints.push(ele.coordinate)
        // if(index>=1 && optimizeWaypoints.length >=2){
        //   const busStopDist= getPreciseDistance(optimizeWaypoints[index-1],optimizeWaypoints[index])
        //   sumDist+=convertDistance(busStopDist,'km')
        // }
      })
      // arraySum.push(sumDist)
      if(sum > min+max){
        sum=min+max
      
        if(coor.line === 'สาย 1' && (this.InLine1(coordinate[0]) || this.InLine1(coordinate[1])))
        {lines=coor.line}
        else if(coor.line === 'สาย 3' && (this.InLine3(coordinate[0]) || this.InLine3(coordinate[1]))){
          lines=coor.line
        }
        else if(coor.line === 'สาย 5' && (this.InLine5(coordinate[0]) && this.InLine5(coordinate[1]))){
          lines=coor.line
        }
      }
    })
  }

  if((line === 'เส้นทางที่แนะนำ') && !BusStopEqual ){
    
    if(lines === 'สาย 1'){
      this.setState({BusStopLine:busStop1})
      this.setState({LineColor:"#0ce8f7"})
      this.setState({symbol:symbol1})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 1',0,1)
    }
    else if(lines === 'สาย 3'){
      this.setState({BusStopLine:busStop3})
      this.setState({symbol:symbol3})
      this.setState({LineColor:"#d91fed"})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 3',0,1)
    }
    else if(lines === 'สาย 5'){
      this.setState({BusStopLine:busStop5})
      this.setState({symbol:symbol5})
      this.setState({LineColor:"#f58f0a"})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 5',0,1)
    }
   
  }
  
  // console.log(BusStopEqual,lines)
  if(BusStopEqual){
    
    choiceLine.fill('เส้นทางที่แนะนำ-เดิน',0,1)
    
  }
  this.getBusStop()
  }

  handlePressOnMap(e){
    this.setState({time:null,distance:null,request:false,BusStopEqual:false,line:'เส้นทางที่แนะนำ'})
    const {TextOrigin,TextDestination,changeOrigin,coordinate,FirstFromDes,NameOfCoor,
    BusStopLine,changeInCheck,requestDir1,requestDir2,requestDir3} =this.state
  
    if(changeOrigin && this.InUniversity(e.nativeEvent.coordinate) && requestDir1
    && requestDir2 && requestDir3){
      if(coordinate.length === 1 ){
        if(!FirstFromDes){
        coordinate.shift()
        NameOfCoor.shift()
        coordinate.push(e.nativeEvent.coordinate)
        NameOfCoor.push('สถานที่ต้นทาง')
      }
      else{
        coordinate.splice(0,0,e.nativeEvent.coordinate)
        NameOfCoor.splice(0,0,'สถานที่ต้นทาง')
        this.setState({FirstFromDes:false})
      }
      }
      else if(coordinate.length === 2){
        coordinate.fill(e.nativeEvent.coordinate,0,1)
        NameOfCoor.fill('สถานที่ต้นทาง',0,1)
      }
      else if(coordinate.length === 0){
        NameOfCoor.push('สถานที่ต้นทาง')
        coordinate.push(e.nativeEvent.coordinate)
      }
      this.setState({TextOrigin:'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว'})
    }
    else if(!changeOrigin && this.InUniversity(e.nativeEvent.coordinate)&& requestDir1
    && requestDir2 && requestDir3){
      if(coordinate.length === 2){
      
        coordinate.pop()
        coordinate.push(e.nativeEvent.coordinate)
        NameOfCoor.pop()
        NameOfCoor.push('สถานที่ปลายทาง')
      }
      else if(coordinate.length === 1){
        if(!FirstFromDes){
          NameOfCoor.push('สถานที่ปลายทาง')
          coordinate.push(e.nativeEvent.coordinate)
        }
        else{
          NameOfCoor.fill('สถานที่ปลายทาง',0,1)
          coordinate.fill(e.nativeEvent.coordinate,0,1)
        }
        
      }
      else if(coordinate.length === 0){
        NameOfCoor.push('สถานที่ปลายทาง')
        coordinate.push(e.nativeEvent.coordinate)
        this.setState({FirstFromDes:true})
      }
      this.setState({TextDestination:'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว'})
    }
    
    if(BusStopLine === null){
      this.optimalRoute()
    }
    else if(BusStopLine !== null){
      this.getBusStop()
    }
    if(!this.InUniversity(e.nativeEvent.coordinate)){
      this.setState({modalVisible:true})
    }
    this.modifyChoiceLine(['เส้นทางที่แนะนำ'])

  }

  updateTime(times,distances){
    const {time,distance} =this.state
    this.setState({time:time+times,distance:distance+distances})
    
  }

  InLine5(coordinate){
    const InLine5=[
      {latitude:13.853424,longitude:100.571250},
      {latitude:13.845987,longitude:100.571336},
      {latitude:13.845733,longitude:100.573576},
      {latitude:13.851622,longitude:100.573594},
      {latitude:13.851972,longitude:100.578827},
      {latitude:13.852603,longitude:100.578935},
      {latitude:13.852743,longitude:100.579801},
      {latitude:13.852042,longitude:100.579801},
      {latitude:13.852042,longitude:100.581425},
      {latitude:13.854180,longitude:100.581281}]
    return isPointInPolygon(coordinate,InLine5)
  }
  InLine1(coordinate){
    const InLine1=[
      {latitude:13.852834,longitude:100.565124},
      {latitude:13.848968,longitude:100.563102},
      {latitude:13.846762,longitude:100.566354},
      {latitude:13.845649,longitude:100.569689},
      {latitude:13.843584,longitude:100.569106},
      {latitude:13.839894,longitude:100.575832},
      {latitude:13.843230,longitude:100.577753},
      {latitude:13.846688,longitude:100.577453},
      {latitude:13.846331,longitude:100.574964},
      {latitude:13.851459,longitude:100.575007},
      {latitude:13.851501,longitude:100.566574}
    ]
    return isPointInPolygon(coordinate,InLine1)
  }
  
  InLine3(coordinate){
    const InLine3=[
      {latitude:13.850428,longitude:100.566680},
      {latitude:13.847677,longitude:100.566752},
      {latitude:13.846955,longitude:100.568480},
      {latitude:13.846580,longitude:100.570518},
      {latitude:13.850455,longitude:100.570497}
    ]
    return !isPointInPolygon(coordinate,InLine3)
  }

  InUniversity(coordinate){
    const {TextOrigin,TextDestination,myLocation} = this.state
    
    const InUni=[
      {latitude:13.855717,longitude:100.565578},
      {latitude:13.847476,longitude:100.561143},
      {latitude:13.839457,longitude:100.575787},
      {latitude:13.852970,longitude:100.583739},
      {latitude:13.856236,longitude:100.579189},
      {latitude:13.856830,longitude:100.575404}
    ]
    // console.log(isPointInPolygon(myLocation,InUni))
    // if(isPointInPolygon(coordinate,InUni)){
    //   this.setState({myLocInUni:true})
    // }
    // else{
    //   this.setState({myLocInUni:false})
    // }
    return isPointInPolygon(coordinate,InUni)
  }

  

  modifyChoiceLine(array){
    const {coordinate} = this.state
    
    if(coordinate.length === 2){
      if(this.InLine1(coordinate[0]) || this.InLine1(coordinate[1])){
        array.push('สาย 1')
      }
      if(this.InLine3(coordinate[0]) || this.InLine3(coordinate[1])){
        array.push('สาย 3')
      }
      if(this.InLine5(coordinate[0]) && this.InLine5(coordinate[1])){
        array.push('สาย 5')
      }
      // if(!this.InUniversity(coordinate[0]) || !this.InUniversity(coordinate[1])){

      //   this.setState({modalVisible:true})
      // }
      this.setState({choiceLine:array})

    }
  }

  // onPressPolyLine(){
  //   return <Callout><Text>test</Text></Callout>
  // }

  render() {
    const KEY_TO_FILTERS = ['name']
    
    const {coordinate,time,distOrigin,distance,TextOrigin,
      TextDestination,TextColor,Opacity,Waypoints,NameWaypoints,line,LineColor,countDes,
    countOrigin,changeOrigin,BusStopLine,prevTextOrigin,prevTextDestination
  ,listItemOri,listItemDes,deleOri,deleDes,NameOfCoor,BusStopEqual,
OptimalLine,request,choiceLine,filterOriLen,filterDesLen,requestDir1,
requestDir2,requestDir3,myLocation,modalVisible} = this.state
  const filterNameOrigin= AllBuilding.building.filter(createFilter(TextOrigin,KEY_TO_FILTERS))
  const filterNameDes = AllBuilding.building.filter(createFilter(TextDestination,KEY_TO_FILTERS))
    const faculty=["รวม","คณะเกษตร","คณะบริหารธุรกิจ","คณะประมง","คณะมนุษยศาสตร์","คณะวนศาสตร์"
  ,"คณะวิทยาศาสตร์","คณะวิศวกรรมศาสตร์","คณะศึกษาศาสตร์","คณะเศรษฐศาสตร์","คณะสถาปัตยกรรมศาสตร์",
"คณะสังคมศาสตร์","คณะสัตวแพทยศาสตร์","คณะอุตสาหกรรมเกษตร","คณะเทคนิคการสัตวแพทย์","คณะสิ่งแวดล้อม"]
const Arrayline =["เส้นทางที่แนะนำ","สาย 1","สาย 3","สาย 5"]

if(!this.state.change){
  const{time,coordinate,TextOrigin,TextDestination,myLocation} = this.state
  this.setState({change:true})
  this.setState({prevTextOrigin:this.state.TextOrigin})
  this.setState({prevTextDestination:this.state.TextDestination})
  this.getBusStop()
  this.setState({request:true})
  this.optimalRoute()
  // console.log(filterNameOrigin.length,filterNameDes.length)
  if(filterNameOrigin.length >= 6  && filterNameOrigin.length !== 89){
    // console.log('condition in change 1')
    this.setState({filterOriLen:'35%'})
  }
  else if(filterNameOrigin.length < 6 ){
    // console.log('condition in change 2')
    this.setState({filterOriLen:null})
  }
  if(filterNameDes.length >= 6 && filterNameDes.length !== 89){
    // console.log('condition in change 3')
    this.setState({filterDesLen:'35%'})
  }
  else if(filterNameDes.length < 6){
    // console.log('condition in change 4')
    this.setState({filterDesLen:null})
  }
  // console.log(filterOriLen,filterDesLen)
}

else if(this.state.prevTextOrigin !== this.state.TextOrigin){
  this.setState({listItemOri:false})
  var boolDeleOrigin = false
  AllBuilding.building.filter((item)=>{
    if(item.name === this.state.TextOrigin || this.state.TextOrigin === 'ท่านได้คลิกสถานที่ต้นทางบนแผนที่แล้ว' 
    || this.state.TextOrigin === 'ตำแหน่งของตัวเอง'){
      this.setState({countOrigin:0,listItemOri:true})
      boolDeleOrigin = true
    }
  
  })

 
  if(this.state.FacultyOrigin === "คณะเกษตร"){
    this.setState({FacultyValueOrigin:Agr})
    console.log('คณะเกษตร')
  }
  else if(this.state.FacultyOrigin === "คณะอุตสาหกรรมเกษตร"){
    this.setState({FacultyValueOrigin:Agro})
   
    console.log('คณะอุตสาหกรรมเกษตร')
  }
  else if(this.state.FacultyOrigin === "รวม" ){
    this.setState({FacultyValueOrigin:All})
  
    console.log('รวม')
  }
  else if(this.state.FacultyOrigin === "คณะสถาปัตยกรรมศาสตร์"){
    this.setState({FacultyValueOrigin:Arch})
 
    console.log('คณะสถาปัตยกรรมศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะบริหารธุรกิจ"){
    this.setState({FacultyValueOrigin:Bus})
 
    console.log('คณะบริหารธุรกิจ')
  }
  else if(this.state.FacultyOrigin === "คณะเศรษฐศาสตร์"){
    this.setState({FacultyValueOrigin:Eco})
 
    console.log('คณะเศรษฐศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะศึกษาศาสตร์"){
    this.setState({FacultyValueOrigin:Edu})

    console.log('คณะศึกษาศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะวิศวกรรมศาสตร์"){
    this.setState({FacultyValueOrigin:Eng})
    
    console.log('คณะวิศวกรรมศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะสิ่งแวดล้อม" ){
    this.setState({FacultyValueOrigin:Env})
 
    console.log('คณะสิ่งแวดล้อม')
  }
  else if(this.state.FacultyOrigin === "คณะประมง"){
    this.setState({FacultyValueOrigin:Fish})
    
    console.log('คณะประมง')
  }
  else if(this.state.FacultyOrigin === "คณะมนุษยศาสตร์"){
    this.setState({FacultyValueOrigin:Hum})
   
    console.log('คณะมนุษยศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะวิทยาศาสตร์"){
    this.setState({FacultyValueOrigin:Sci})
  
    console.log('คณะวิทยาศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะสังคมศาสตร์"){
    this.setState({FacultyValueOrigin:Soc})
  
    console.log('คณะสังคมศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะสัตวแพทยศาสตร์"){
    this.setState({FacultyValueOrigin:Vet})
   
    console.log('คณะสัตวแพทยศาสตร์')
  }
  else if(this.state.FacultyOrigin === "คณะเทคนิคการสัตวแพทย์"){
    this.setState({FacultyValueOrigin:VetTech})

    console.log('คณะเทคนิคการสัตวแพทย์')
  }
  else if(this.state.FacultyOrigin === "คณะวนศาสตร์"){
    this.setState({FacultyValueOrigin:Forest})
    console.log('คณะวนศาสตร์')
  }
}
else if(this.state.prevTextDestination !== this.state.TextDestination){
  this.setState({listItemDes:false})
  var boolDeleDes = false
 AllBuilding.building.filter((item)=>{
    if(item.name === this.state.TextDestination || this.state.TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว' 
    || this.state.TextDestination === 'ตำแหน่งของตัวเอง'){
      
      this.setState({countDes:0,listItemDes:true})
      boolDeleDes = true
    }
  })

 
  if(this.state.FacultyDestination === "คณะเกษตร"){
    this.setState({FacultyValueDestination:Agr})
    console.log('คณะเกษตรปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะอุตสาหกรรมเกษตร"){
    this.setState({FacultyValueDestination:Agro})

    console.log('คณะอุตสาหกรรมเกษตรปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "รวม"){
    this.setState({FacultyValueDestination:All})
  
    console.log('รวม')
  }
  
  else if(this.state.FacultyDestination === "คณะสถาปัตยกรรมศาสตร์"){
    this.setState({FacultyValueDestination:Arch})
   
    console.log('คณะสถาปัตยกรรมศาสตร์ปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะบริหารธุรกิจ"){
    this.setState({FacultyValueDestination:Bus})
   
    console.log('คณะบริหารธุรกิจปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะเศรษฐศาสตร์"){
    this.setState({FacultyValueDestination:Eco})
 
    console.log('คณะเศรษฐศาสตร์ปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะศึกษาศาสตร์"){
    this.setState({FacultyValueDestination:Edu})
 
    console.log('คณะศึกษาศาสตร์ปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะวิศวกรรมศาสตร์"){
    this.setState({FacultyValueDestination:Eng})
  
    console.log('คณะวิศวกรรมศาสตร์ปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะสิ่งแวดล้อม"){
    this.setState({FacultyValueDestination:Env})
  
    console.log('คณะสิ่งแวดล้อมปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะประมง"){
    this.setState({FacultyValueDestination:Fish})
   
    console.log('คณะประมงปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะวนศาสตร์"){
    this.setState({FacultyValueDestination:Forest})
 
    console.log('คณะวนศาสตร์ปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะมนุษยศาสตร์"){
    this.setState({FacultyValueDestination:Hum})
  
    console.log('คณะมนุษยศาสตร์ปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะวิทยาศาสตร์"){
    this.setState({FacultyValueDestination:Sci})
   
    console.log('คณะวิทยาศาสตร์ปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะสังคมศาสตร์"){
    this.setState({FacultyValueDestination:Soc})
   
    console.log('คณะสังคมศาสตร์ปลายทาง')
  }
 
  else if(this.state.FacultyDestination === "คณะสัตวแพทยศาสตร์"){
    this.setState({FacultyValueDestination:Vet})
   
    console.log('คณะสัตวแพทยศาสตร์ปลายทาง')
  }
  
  else if(this.state.FacultyDestination === "คณะเทคนิคการสัตวแพทย์"){
    this.setState({FacultyValueDestination:VetTech})
   
    console.log('คณะเทคนิคการสัตวแพทย์รปลายทาง')
  }
}
    return (
      <View style={{ flex: 1}}>
        <View style={{position:'absolute',backgroundColor:'#ffffff',zIndex:1,width:'50%'}}>
          <Picker
            selectedValue={this.state.FacultyValue.Faculty}
            style={{height: 50,borderRadius: 150}}
            onValueChange={(itemValue) =>{
              if(this.state.changeOrigin){
              this.setState({FacultyOrigin:itemValue})
            }
              else{
                this.setState({FacultyDestination:itemValue})
              }
            }
            }>
            {faculty.map(fac =>(
              <item label={fac} value={fac} key={fac}/>
            ))}
          </Picker>
          <Picker 
            selectedValue = {this.state.changeOrigin ? this.state.TextOrigin:this.state.TextDestination}
            style ={{height:50}}
            onValueChange={(itemValue,itemIndex) =>{
              if(this.state.changeOrigin){
                this.setState({TextOrigin:itemValue})
            }
            else {
              this.setState({TextDestination:itemValue})
            }
            console.log(itemValue)
          }}>
            <item label='กรุณาเลือกสถานที่'/>
            <item label='ตำแหน่งของตัวเอง' value ='ตำแหน่งของตัวเอง'/>
            {this.state.FacultyValue.building.map((building) =>(
              <item label={building.name} value={building.name} key={building.name}/>
            ))}
        </Picker> 
        <TextInput
        onChangeText={(TextOrigin) => { 
          this.setState({TextOrigin})
        }}
        onFocus={(focus)=>{
          if(focus){
            this.setState({changeOrigin:true})
          }
          else{
            this.setState({changeOrigin:false})
          }
        }}
        value={this.state.TextOrigin}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1
        }}
        placeholder="Type Origin or click on the map"
      />
      <TextInput
        onChangeText={TextDestination => {
          this.setState({TextDestination})
        }}
        onFocus={(focus)=>
        {
          if(focus){
            this.setState({changeOrigin:false})
          }
          else{
            this.setState({changeOrigin:true})
          }
        }}
        value={this.state.TextDestination}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Type Destination or click on the map"
        // editable={TextOrigin!=="" ? true:false}
      />
      <Button 
        onPress={this.DisplayAll}
        title="ค้นหา" 
        disabled={this.state.myLocInUni ? false:true}
      />
        </View>
        <View style={{position:'absolute',backgroundColor:'#ffffff',zIndex:1,width:'50%',left:'50%'}}>
          <Picker
            selectedValue={line}
            enabled ={requestDir1 && requestDir2 && requestDir3}
            style={{height:50}}
            onValueChange={(itemValue,itemIndex)=>{  
            this.setState({line:itemValue,request:false,time:null,distance:null})
            if(itemValue === 'เส้นทางที่แนะนำ-เดิน' || itemValue==='เส้นทางที่แนะนำ-สาย 1' || itemValue === 'เส้นทางที่แนะนำ-สาย 3'|| itemValue === 'เส้นทางที่แนะนำ-สาย 5')
            {
              this.setState({line:'เส้นทางที่แนะนำ'})
            }
            if(itemValue === 'เส้นทางที่แนะนำ'){
              this.setState({BusStopLine:null})
            }
          }}>
            {choiceLine.map((ele)=>(
              <item label={ele} value={ele} key={ele}/>
            ))}
          </Picker>
        </View>
      <MapView style={{flex : 1,zIndex:-1}}
        ref = {el =>(this.mapRef=el)}
        initialRegion={{
          latitude: 13.847639,
          longitude: 100.569584,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021
        }}
        toolbarEnabled={false}
        onPress={(requestDir1 && requestDir2 && requestDir3) ? this.handlePressOnMap:null}
        showsUserLocation={true}
        minZoomLevel={15}
        >
          {this.state.coordinate.map((coor,index)=>(
            <Marker coordinate={coor} key={index} title={coordinate.length === 2 ? NameOfCoor[index]:null} ref={el =>(this.MarkRef=el)}
            >
              {/* <Callout>
                <View>
                  <Text>Test 1 2 3 4</Text>
                </View>
              </Callout> */}
            </Marker>

          ))}
          
          {Waypoints !== [] ? Waypoints.map((coor,index)=>{
            if(index===0){
              return(<Marker coordinate={coor} key={index}  title='ขึ้นที่ป้ายจอดนี้'>
                <Image source={this.state.symbol} style={{height:20,width:20}}/>
                 </Marker>)
            }
            else if(index === Waypoints.length-1){
              return(
                <Marker coordinate={coor} key={index} title='ลงที่ป้ายจอดนี้'>
              <Image source={this.state.symbol} style={{height:20,width:20}} />
               </Marker>
              )
            }
          }):null}
        {request && coordinate.length === 2 && <Direction
            origin = {coordinate[0]}
            destination = {BusStopEqual ? coordinate[1]:Waypoints[0]}
            apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
            strokeWidth={4}
            strokeColor={LineColor}
            mode={'WALKING'}
            // optimizeWaypoints={true}
            // splitWaypoints={true}
            // resetOnChange={true}
            onStart={(params) => {
              this.setState({requestDir1:false})
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
            }}
            onReady ={result =>{
            
              console.log('direction 1')
              this.updateTime(result.duration,result.distance)
              this.setState({requestDir1:true})
            }}
            onError={error=>{
              console.log(error)
            }}
            >
            </Direction>}
           {request && coordinate.length === 2 && !BusStopEqual && <Direction
            origin = {Waypoints[0]}
            destination = {Waypoints[Waypoints.length-1]}
            apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
            strokeWidth={4}
            strokeColor={LineColor}
            waypoints = {Waypoints.slice(1,Waypoints.length-1)}
         
            // mode={'WALKING'}
            // optimizeWaypoints={true}
            // splitWaypoints={true}
            // resetOnChange={true}
            onStart={(params) => {
              this.setState({requestDir2:false})
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
            }}
            onReady ={result =>{
              
              console.log('direction 2')
              this.updateTime(result.duration,result.distance)
              // this.setState({request:false})
              this.setState({requestDir2:true})
            }}
            onError={error=>{
              console.log(error)
            }}
            >
            </Direction>}
           {request && coordinate.length === 2 && !BusStopEqual && <Direction
            origin = {Waypoints[Waypoints.length - 1]}
            destination = {coordinate[1]}
            apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
            strokeWidth={4}
            strokeColor={LineColor}
            mode={'WALKING'}
            // optimizeWaypoints={true}
            // splitWaypoints={true}
            // resetOnChange={true}
            onStart={(params) => {
              this.setState({requestDir3:false})
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
            }}
            onReady ={result =>{
              console.log('direction 3')
              this.updateTime(result.duration,result.distance)
              this.setState({requestDir3:true})
            }}
            onError={error=>{
              console.log(error)
            }}
            >
            </Direction>}
        </MapView>

        <Card style={{ width: "100%"}}>
          <CardItem header bordered >
            <Text>ระยะทาง: {Number.isNaN(Number.parseFloat(distance))? 0:Number.parseFloat(distance).toFixed(2)} กิโลเมตร  ใช้เวลา: {Math.round(time)} นาที</Text>
          </CardItem>
        </Card>
          <View style={NameWaypoints.length === 0 ? {height:'0%'}:{height:'20%'}}>
            <ScrollView>
              {NameWaypoints.map((ele ,index)=>(
              <CardItem bordered>
                <Text key={index}>{index === 0 && index !== NameWaypoints.length-1 ? `ขึ้นที่ป้ายจอด : ${ele}`:null}{index!== 0 && index !== NameWaypoints.length-1 ? `ผ่านป้ายจอด : ${ele}`:null}{index === NameWaypoints.length-1 ? `ลงที่ป้ายจอด : ${ele}`:null}
                </Text>
              </CardItem>
              ))}
            </ScrollView>
          </View>
          {TextOrigin !== "" && !listItemOri && changeOrigin?
        <ScrollView style={{position:'absolute',top:140,backgroundColor:'#ffffff',zIndex:2,width:'50%',height:filterOriLen}}>
       {filterNameOrigin.map((item,index) => {
         return (
           <TouchableOpacity onPress={() => this.setState({TextOrigin:item.name})} key={index}>
             <View>
         <Text style={{padding:'3%'}}>{item.name}</Text>
             </View>
           </TouchableOpacity>
         )
       })}
       </ScrollView>
       :null}
        {TextDestination !== "" && !listItemDes && !changeOrigin?
        <ScrollView style={{position:'absolute',top:180,backgroundColor:'#ffffff',zIndex:2,width:'50%',height:filterDesLen}}>
       {filterNameDes.map((item,index) => {
         return (
           <TouchableOpacity onPress={() => this.setState({TextDestination:item.name})} key={index}>
             <View>
         <Text style={{padding:'3%'}}>{item.name}</Text>
             </View>
           </TouchableOpacity>
         )
       })}
       </ScrollView>
       :null}
      
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        // style={{position:'absolute',zIndex:1}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ตำแหน่งที่ท่านเลือกไม่ได้อยู่ในเขตมหาวิทยาลัยเกษตรศาสตร์ เขตบางเขน</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setState({modalVisible:false})
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
     
      </View>
    );
  }
}

const COLORS = [
  '#7F0000',
  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
  '#B24112',
  '#E5845C',
  '#238C23',
  '#7F0000',
];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

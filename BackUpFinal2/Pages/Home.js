import * as React from 'react';
import { Button, View, Text,TextInput,StyleSheet,
  PermissionsAndroid, TouchableHighlightBase,Image,SafeAreaView,FlatList,ScrollView,
TouchableOpacity,Modal,TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Picker} from '@react-native-community/picker'
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
import geolib,{getPreciseDistance,getDistance,convertDistance,getCenter,isPointInPolygon,
isPointWithinRadius} from 'geolib';
import SearchInput ,{createFilter} from 'react-native-search-filter';
import busStopAll from '../database/busPark/busParkAll.json';
import symbol1 from '../image/busstopLine1.png';
import symbol2 from '../image/busstopLine2.png';
import symbol3 from '../image/busstopLine3.png';
import symbol4 from '../image/busstopLine4.png';
import symbol5 from '../image/busstopLine5.png';
import Compo from './TestCompo'


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
    this.mapRef.setMapBoundaries({latitude:13.853065,longitude:100.577247},{latitude:13.843514,longitude:100.561537})
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
          (position) => {
            const {myLocation} = this.state
            var i = 0
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
   
      if(prevState.change){
        if(prevState.FacultyOrigin !== this.state.FacultyOrigin){
          if(this.state.FacultyOrigin === "คณะเกษตร"){
            //this.setState({FacultyValueOrigin:Agr})
            this.setState({FacultyValue: Agr})
        
            console.log('คณะเกษตร')
          }
          
          else if(this.state.FacultyOrigin === "คณะอุตสาหกรรมการเกษตร"){
            //this.setState({FacultyValueOrigin:Agro})
            this.setState({FacultyValue:Agro})
            console.log('คณะอุตสาหกรรมการเกษตร')
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
       
        else if(this.state.FacultyDestination === "คณะอุตสาหกรรมการเกษตร"){
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
          this.setState({Waypoints:[],NameWaypoints:[],deleOri:false})
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
          this.setState({Waypoints:[],NameWaypoints:[],deleDes:false})
          AllBuilding.building.filter(ele =>{
            if(ele.name === this.state.TextDestination || this.state.TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว' ||
            this.state.TextDestination === 'ตำแหน่งของตัวเอง'){
            
              this.setState({deleDes:true})
              if(this.state.TextDestination === 'ตำแหน่งของตัวเอง'){
               
                if(this.InUniversity(this.state.myLocation) && this.state.TextOrigin!== 'ตำแหน่งของตัวเอง'){
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
      OptimalLineDes:null,
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
      myLocInUni:true,
      calculateCheckPoint:null,
      getIndexBusStop:false,
      LineColorArray:[],
      originSect:[],
      desSect:[],
      oriDir3:[],
      passLine:[],
      requestDir4:true
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
    this.connectToLine = this.connectToLine.bind(this);
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
  if(coordinate.length>=1)
    {this.mapRef.animateToRegion(region,250)}
  
    this.modifyChoiceLine(['เส้นทางที่แนะนำ'])
    // this.Compo.TextForCompo('example')
  }
 
  Search(text,bool){
    const texts = text.toUpperCase()
    const {coordinate,TextOrigin,TextDestination,myLocation,FirstFromDes,NameOfCoor,
    modalVisible,myLocInUni} = this.state
    var FirstFromClickDes = false
    if(TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว'){
      FirstFromClickDes = true
    }
      if(bool && text === 'ตำแหน่งของตัวเอง'){
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
      if(item.name === text){
        if(bool){
          if(coordinate.length === 0){
            coordinate.push(item.coordinate)
            NameOfCoor.push(item.name)
          }
          else{
            const {FirstFromDes} = this.state
            if((FirstFromDes || FirstFromClickDes) && coordinate.length === 1){
              coordinate.splice(0,0,item.coordinate)
              NameOfCoor.splice(0,0,item.name)
              this.setState({FirstFromDes:false})
            }
          
            else if(coordinate.length === 2 || ((!FirstFromDes || !FirstFromClickDes) && coordinate.length === 1)){
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
      this.setState({getIndexBusStop:true})
        return item
      }
    })
    
    }
  }
  getBusStop(busStopLocal,origin,indexFromConnect=0){
    const {coordinate,Waypoints,NameWaypoints,BusStopLine,line,BusStopEqual,
    OptimalLine,OptimalLineDes,distLow,originSect,oriDir3,desSect} = this.state
    this.setState({getIndexBusStop:false})
    var indexOriArray = []
    var indexDesArray = []
    var minOrigin  = 999
    var minDes = 999
    var indexOrigin = 0
    var indexDes = 0
    var getIndexDes = false
    var getIndexOri = false
    var calculateCheckPoint = false
    var calculateIndex = false
    var sumDist = 0
    var NameWaypointsLocal=[]
    var WaypointsLocal=[]
    var indexOriginLocal = 0
    var indexDesLocal = 0
        if(coordinate.length >=1){
      busStopLocal.markers.map((item,index)=>{
        const distOrigin = getPreciseDistance(origin,item.coordinate)
        const kiloOrigin = convertDistance(distOrigin,'km')
        if(minOrigin  >= kiloOrigin){
          minOrigin =kiloOrigin
          // indexOrigin = index
          indexOriginLocal = index
        }
        if(index === busStopLocal.markers.length-1){
        indexOriArray.push(indexOriginLocal)
        busStopLocal.markers.map((ele,index)=>{
            if(isPointWithinRadius(ele.coordinate,busStopLocal.markers[indexOriginLocal].coordinate,285)){
              indexOriArray.push(index)
            }
          })
          getIndexOri = true
        }
    })
    // console.log(indexOriArray)
    if(coordinate.length === 2 && getIndexOri){
      
      busStopLocal.markers.map((item,index)=>
      {
      const distDes = getPreciseDistance(item.coordinate,coordinate[1])
      const kiloDes = convertDistance(distDes,'km')
      // if(index === busStopLocal.markers.length-1){
      //   indexs = 0
      // }
      // else{
      //   indexs = index
      // }
      // const BusStop = busStopLocal.markers[indexs+1].coordinate
      // const distBusForward = convertDistance(getPreciseDistance(BusStop,coordinate[1]),'km')
      // console.log('kiloDes : '+kiloDes)
      if(minDes >= kiloDes ){
        minDes=kiloDes
        // indexDes = index
        indexDesLocal = index
        // if(minDes !== kiloDes ){
        //   minDes=kiloDes
        //   indexDes = index
        //   indexDesLocal = index
        //   if((kiloDes <= 0.30 && distBusForward > kiloDes && indexDes > indexOrigin) 
        //   || (kiloDes<=0.30 && indexDes < indexOrigin && indexOrigin >= busStopLocal.markers.length-3 && busStopLocal === busStop1)){
        //     getIndexDes = true
        //   }
        // }
        // else{
        //   if(indexOrigin < index && !getIndexDes){
        //     indexDes=index
        //   }
        // } 
      // console.log('indexDesArray : '+indexDesArray)
      }
      if(index === busStopLocal.markers.length-1){
        indexDesArray.push(indexDesLocal)
        busStopLocal.markers.map((ele,indexs)=>{
          if(isPointWithinRadius(ele.coordinate,busStopLocal.markers[indexDesLocal].coordinate,300)){
            // console.log('indexs : '+indexs)
            indexDesArray.push(indexs)
          }
        })
        getIndexDes = true
      }
    })
    if(getIndexDes && getIndexOri){
      // console.log('indexOriArray : '+indexOriArray)
      // console.log('indexDesArray : '+indexDesArray)
   
      var distBusStop = 50
      var distRealTime = 0
      var getCheck = false
      var distToDes = 999
      var distToOri = 999
      // var oriToStop = 999
      var varianceDes = 0
      var varianceOri = 0
        indexOriArray.map((busStopOri,index)=>{
          if(Waypoints.length === 0){
            var distConnect = convertDistance(getPreciseDistance(busStopLocal.markers[busStopOri].coordinate,coordinate[0]),'km')
          }
          else{
            var distConnect = convertDistance(getPreciseDistance(busStopLocal.markers[busStopOri].coordinate,Waypoints[Waypoints.length-1][Waypoints[Waypoints.length-1].length-1]),'km')
          }
          if(this.InLine1(coordinate[0])|| this.InLine5(coordinate[0])){
            if(this.InSpecialArea(coordinate[0]) && this.InSpecialArea(busStopLocal.markers[busStopOri].coordinate)){
              varianceOri=0.085
            }
            else{varianceOri = 0.05}
          }
        indexDesArray.map((busStopDes)=>{
          if(this.InLine1(coordinate[1]) || this.InLine5(coordinate[1])){
            if(this.InSpecialArea(coordinate[1]) && this.InSpecialArea(busStopLocal.markers[busStopDes].coordinate)){
              varianceDes=0.085
            }
            else{varianceDes = 0.05}
          }
          if(busStopDes > busStopOri){
            distRealTime = busStopDes-busStopOri+1
          }
          else if(busStopDes < busStopOri){
            distRealTime = (busStopLocal.markers.length-busStopOri)+(busStopDes+1)
          }
          else{
            distRealTime=0
          }
          if(((distBusStop > distRealTime) && (convertDistance(getPreciseDistance(busStopLocal.markers[busStopDes].coordinate,coordinate[1]),'km') <= distToDes+varianceDes)&&
          (distConnect <= distToOri+varianceOri)) ){
          
            indexDes = busStopDes
            distToDes = convertDistance(getPreciseDistance(busStopLocal.markers[busStopDes].coordinate,coordinate[1]),'km')
            indexOrigin = busStopOri
            distToOri = distConnect
            distBusStop=distRealTime
            // oriToStop = convertDistance(getPreciseDistance(coordinate[0],busStopLocal.markers[busStopOri].coordinate),'km')
          }
        })
        // if(index === indexOriArray.length-1 ){
        //   var indexDesInLoop = indexDes
        //   if(indexDesInLoop === busStopLocal.markers.length-1){
        //     if(getPreciseDistance(busStopLocal.markers[indexDesInLoop].coordinate,coordinate[1])
        //     > getPreciseDistance(busStopLocal.markers[0].coordinate,coordinate[1])){
        //       indexDes = 0
        //     }
        //   }
        //   else{
        //     if(getPreciseDistance(busStopLocal.markers[indexDesInLoop].coordinate,coordinate[1]) 
        //     > getPreciseDistance(busStopLocal.markers[indexDesInLoop+1].coordinate,coordinate[1])){
        //       indexDes = indexDes+1
        //     }
        //   }
        // }
      })
  
    }
    // if(distRealTime === 0 ){
    //   this.setState({BusStopEqual:true,originSect:[coordinate[0]]})
    // }
    // console.log(indexDesArray) 
  }
    // console.log('minDes : '+minDes)
    calculateIndex = true
  }
    // console.log(' IndexOrigin: '+indexOrigin)
    // console.log(' IndexDes: '+indexDes)
    if(coordinate.length===2 && calculateIndex && !calculateCheckPoint){
      if(indexOrigin < indexDes){
      const busStop = busStopLocal.markers.slice(indexOrigin,indexDes+1)
      busStop.map((ele,index) =>{
      
        NameWaypointsLocal.push(ele.name)
        WaypointsLocal.push(ele.coordinate)
      })
    }
   
    else if(indexOrigin > indexDes){
  
      const busStopFirst = busStopLocal.markers.slice(indexOrigin)
      const busStopLast = busStopLocal.markers.slice(0,indexDes+1)
      busStopFirst.map((ele,index) =>{
        NameWaypointsLocal.push(ele.name)
        WaypointsLocal.push(ele.coordinate)
      })
      busStopLast.map((ele,index)=>{
        NameWaypointsLocal.push(ele.name)
        WaypointsLocal.push(ele.coordinate)
      })
    }
    // else if(indexOrigin === indexDes){
    //   console.log('indexORigin equal to indexDes')
    //   this.setState({LineColor:'#05f709'})
    //   this.setState({BusStopEqual:true})
    // }
    // console.log(WaypointsLocal)
    calculateCheckPoint=true
    this.setState({calculateCheckPoint})
  }
  
  if(calculateCheckPoint){
      var DistFromMyloc = convertDistance(getPreciseDistance(origin,coordinate[1]),'km')
      WaypointsLocal.map((ele,index)=>{
          if(index >=1 && index <= WaypointsLocal.length-2 && indexOrigin !== indexDes){
            sumDist+=convertDistance(getPreciseDistance(WaypointsLocal[index-1],ele),'km')
          }
      })
        // console.log('sumDist '+sumDist+' distance between origin and des : '+DistFromMyloc)
      if(((DistFromMyloc+0.85 < sumDist && DistFromMyloc <= 0.50)|| DistFromMyloc<=0.3 || indexOrigin === indexDes )){
   
        // this.setState({LineColor:'#05f709'})
        // if(indexFromConnect === 0){
        if(Waypoints.length === 0){this.setState({BusStopEqual:true})}
        // console.log('coordinate.length = '+coordinate.length)
        // console.log('busStopEqual === true')
        this.setState({originSect:[]})
        // console.log('originSect from getBusStop : '+originSect[indexFromConnect])
        // }
        // if(Waypoints.length > 1){
        //   originSect.pop()
        // }
     
      }
      else{
     
        Waypoints.push(WaypointsLocal)
        NameWaypoints.push(NameWaypointsLocal)
        oriDir3.push(WaypointsLocal[WaypointsLocal.length-1])
        if(indexFromConnect>0){
          desSect.push(WaypointsLocal[0])
        }
      }
    //   getMode =true
    //   console.log('sumDist '+sumDist+' distance between origin and des : '+DistFromMyloc)
    // Waypoints.push(WaypointsLocal)
    // NameWaypoints.push(NameWaypointsLocal)
}
  
  // this.setState({Waypoints})
  // this.setState({NameWaypoints})
  // this.setState({getIndexBusStop:true})
  // if(calculateCheckPoint && convertDistance(getPreciseDistance(busStopLocal.markers[indexDes].coordinate,coordinate[1]),'km') <= 0.25){
  //   this.setState({distLow:true})
  //   console.log('From GetBusStop'+distLow)
  // }
  
  }

  connectToLine(){
  
    const {OptimalLine,line,calculateCheckPoint,Waypoints,NameWaypoints,coordinate,OptimalLineDes,
    getIndexBusStop,LineColorArray,distLow,BusStopEqual,
  requestDir1,requestDir2,requestDir3,changeWaypoints,oriDir3,desSect,passLine} = this.state
 
    const colorLine = ["#05f709","#0ce8f7","#d91fed","#f58f0a"]
    // this.setState({BusStopEqual:false})
    Waypoints.splice(0,Waypoints.length)
    NameWaypoints.splice(0,NameWaypoints.length)
    LineColorArray.splice(0,LineColorArray.length)
    oriDir3.splice(0,oriDir3.length)
    desSect.splice(0,desSect.length)
    passLine.splice(0,passLine.length)
    var busStopLocal = null
    var originSect =[coordinate[0]]
    // var desSect = []
    var indexInMethod = 0
    var lineEqual = false
    var lineTravel = null
    var filterBusLine = busStopAll

    var getWaypoints = false
    var getBusStopLine = false
   
    var prevWaypointsLen = 0
    
    if((OptimalLine === 'สาย 1' && (line === 'เส้นทางที่แนะนำ' || line ==='เส้นทางที่แนะนำ-สาย 1')) || line === 'สาย 1'){
    
      busStopLocal = busStop1
      lineTravel = 'สาย 1'
      LineColorArray.push(colorLine[1])
      passLine.push('สาย 1')
    }
    else if((OptimalLine === 'สาย 3' && (line === 'เส้นทางที่แนะนำ' || line ==='เส้นทางที่แนะนำ-สาย 3')) || line === 'สาย 3' ){
      busStopLocal = busStop3
      lineTravel = 'สาย 3'
      LineColorArray.push(colorLine[2])
      passLine.push('สาย 3')
    
    }
    else if((OptimalLine === 'สาย 5' && (line === 'เส้นทางที่แนะนำ' || line ==='เส้นทางที่แนะนำ-สาย 5')) || line === 'สาย 5'){
      busStopLocal = busStop5
      lineTravel = 'สาย 5'
      LineColorArray.push(colorLine[3])
      passLine.push('สาย 5')
   
    }
    // console.log('indexInMethod outside loop : '+indexInMethod)
    if(busStopLocal !== null){
      // console.log(OptimalLine,OptimalLineDes)
      // console.log('busStopLocal !== null')
      do{
          console.log(busStopLocal.line,originSect[indexInMethod])
          console.log('indexInMethod : '+indexInMethod+' origin leng '+originSect.length)
          // console.log('coordinate[1] : '+coordinate[1])
        if(indexInMethod !== 0){
          if(lineTravel === 'สาย 1'){
          busStopLocal = busStop1
          LineColorArray.push(colorLine[1])
          passLine.push('สาย 1')
        }
        else if(lineTravel === 'สาย 3'){
          busStopLocal = busStop3
          LineColorArray.push(colorLine[2])
          passLine.push('สาย 3')
        }
        else if(lineTravel === 'สาย 5'){
          busStopLocal = busStop5
          LineColorArray.push(colorLine[3])
          passLine.push('สาย 5')
        }
        getBusStopLine = true
      }
        // if(originSect[indexInMethod] === null ){
        //   originSect=[coordinate[0]]
        // }
        this.getBusStop(busStopLocal,originSect[indexInMethod],indexInMethod)
     
        // oriDir3.push(Waypoints[indexInMethod][Waypoints[indexInMethod].length-1])

        // if(indexInMethod>=1 && Waypoints.length >=2){
        //   desSect.push(Waypoints[indexInMethod][0])
        // }
      
        // const distWayToDes =convertDistance(getPreciseDistance(Waypoints[indexInMethod][Waypoints[indexInMethod].length-1],coordinate[1]),'km')
        
        if((getBusStopLine || indexInMethod === 0)){
          if(lineTravel === OptimalLineDes || BusStopEqual || convertDistance(getPreciseDistance(originSect[indexInMethod],coordinate[1]),'km') <= 0.3){
          lineEqual = true
          
          break
        }
        else{
          // if(Waypoints.length > 0){
          //   if(convertDistance(getPreciseDistance(Waypoints[indexInMethod][Waypoints[indexInMethod].length-1],coordinate[1]),'km') <= 0.25){
          //     this.setState({BusStopEqual:true})
          //     console.log(requestDir1,requestDir2,requestDir3)
          //     break
          //   }
          // }
          var minLocal = 999
          var coordinateLocal = null
          filterBusLine = filterBusLine.filter((lines) => lineTravel !== lines.line)
          if(Waypoints[indexInMethod] !== undefined){
            filterBusLine.map((ele)=>{
            ele.markers.map((mark)=>{
              const distLineConn = convertDistance(getPreciseDistance(mark.coordinate,Waypoints[indexInMethod][Waypoints[indexInMethod].length-1]),'km')
              if(minLocal > distLineConn){
                minLocal=distLineConn
                lineTravel=ele.line
                coordinateLocal = mark.coordinate
              }
            })
          })
        }
          // console.log('inside lineequal !== linetravel')
         
          if(coordinateLocal !== null){
            originSect.push(coordinateLocal)
          }
          indexInMethod+=1
        }
        // getMode = true
      }
        
      }while((!lineEqual || !BusStopEqual) && indexInMethod < originSect.length)
  
  getWaypoints =true
  }
  if(getWaypoints)
  {
    if(passLine.length !== Waypoints.length){
      passLine.pop()
    }
    desSect.push(coordinate[1])

  }
  
  // console.log(Waypoints.length,NameWaypoints.length,originSect.length,lineTravel)
  // if((line === 'เส้นทางที่แนะนำ') && calculateCheckPoint && getWaypoints){
  //   originSect.map((origin,index)=>{
  //     var sumDist = 0
  //     var DistFromMyloc = convertDistance(getPreciseDistance(origin,coordinate[1]),'km')
  //   Waypoints[index].map((ele,indexs)=>{
    
  //       if(indexs >=1 && indexs <= Waypoints[index].length-2){
  //         sumDist+=convertDistance(getPreciseDistance(Waypoints[index][indexs-1],ele),'km')
  //       }

  //   })
  //   if((DistFromMyloc+0.85 < sumDist && DistFromMyloc <= 0.50)||(DistFromMyloc <= 0.25)){
  //     // NameWaypoints.splice(0,NameWaypoints.length)
  //     this.setState({LineColor:'#05f709'})
  //     this.setState({BusStopEqual:true})
  //     // originSect=[coordinate[0]]
  //     // oriDir3=[]
  //     // Waypoints.splice(0,Waypoints.length)
  //   }
  //   })
   
    // console.log('sumDist '+sumDist+' distance between origin and des : '+DistFromMyloc)
  // }
  this.setState({originSect,desSect})
}
  
  optimalRoute(){
    const {coordinate,line,BusStopLine,BusStopEqual,
    Waypoints,choiceLine} = this.state
    var lines = null
    var linesDes= null
    // var arraySum =[]
    var sum = 9999
    var minDes = 999
    var min =999
    if(coordinate.length === 2){
      busStopAll.map((coor)=>{
        // var min =999
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
          lines=coor.line
        }
        // if(max < convToKmDes){
        //   max=convToKmDes
         
        // }
        if(minDes>convToKmDes){
          minDes=convToKmDes
          linesDes=coor.line
        }
        // optimizeWaypoints.push(ele.coordinate)
        // if(index>=1 && optimizeWaypoints.length >=2){
        //   const busStopDist= getPreciseDistance(optimizeWaypoints[index-1],optimizeWaypoints[index])
        //   sumDist+=convertDistance(busStopDist,'km')
        // }
      })
      // arraySum.push(sumDist)

      // if(sum > min+max){
      //   sum=min+max
      
      //   if(coor.line === 'สาย 1' && (this.InLine1(coordinate[0]) || this.InLine1(coordinate[1])))
      //   {lines=coor.line}
      //   else if(coor.line === 'สาย 3' && (this.InLine3(coordinate[0]) || this.InLine3(coordinate[1]))){
      //     lines=coor.line
      //   }
      //   else if(coor.line === 'สาย 5' && (this.InLine5(coordinate[0]) || this.InLine5(coordinate[1]))){
      //     lines=coor.line
      //   }
      
      // }
    })

    this.setState({OptimalLine:lines,OptimalLineDes:linesDes})
    
  }

  if((line === 'เส้นทางที่แนะนำ') && !BusStopEqual ){
    if(lines === 'สาย 1'){
      // this.setState({BusStopLine:busStop1})
      // this.setState({LineColor:"#0ce8f7"})
      this.setState({symbol:symbol1})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 1',0,1)
    }
    else if(lines === 'สาย 3'){
      // this.setState({BusStopLine:busStop3})
      this.setState({symbol:symbol3})
      // this.setState({LineColor:"#d91fed"})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 3',0,1)
    }
    else if(lines === 'สาย 5'){
      // this.setState({BusStopLine:busStop5})
      this.setState({symbol:symbol5})
      // this.setState({LineColor:"#f58f0a"})
      choiceLine.fill('เส้นทางที่แนะนำ-สาย 5',0,1)
    }
   
  }
  
  // console.log(BusStopEqual,lines)
  if(BusStopEqual){
    choiceLine.fill('เส้นทางที่แนะนำ-เดิน',0,1)
  }
  if(coordinate.length ===2)
  {this.connectToLine()}
  }

  handlePressOnMap(e){
    this.setState({time:null,distance:null,request:false,BusStopEqual:false,line:'เส้นทางที่แนะนำ'})
    const {TextOrigin,TextDestination,changeOrigin,coordinate,FirstFromDes,NameOfCoor,
    BusStopLine,changeInCheck,requestDir1,requestDir2,requestDir3,line,requestDir4} =this.state
    var FirstFromClickDes = false
    if(changeOrigin && this.InUniversity(e.nativeEvent.coordinate) && requestDir1
    && requestDir2 && requestDir3 && requestDir4){
      if(coordinate.length === 1 ){
        if(TextDestination === 'ท่านได้คลิกสถานที่ปลายทางบนแผนที่แล้ว'){
          FirstFromClickDes = true
        }
        if(!FirstFromDes && !FirstFromClickDes){
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
    && requestDir2 && requestDir3&& requestDir4){
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
    
    if(line ==='เส้นทางที่แนะนำ'){
      this.optimalRoute()
    }
    else if(line !== 'เส้นทางที่แนะนำ'){
      this.connectToLine()
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

  InSpecialArea(coordinate){
    const InSpecialArea=[
      {latitude:13.846868,longitude:100.570247},
      {latitude:13.846439,longitude:100.572818},
      {latitude:13.844267,longitude:100.572837},
      {latitude:13.842550,longitude:100.571916},
      {latitude:13.843654,longitude:100.569760},
      {latitude:13.845099,longitude:100.570211}
    ]
    return isPointInPolygon(coordinate,InSpecialArea)
  }

  InUniversity(coordinate){
    const InUni=[
      {latitude:13.855717,longitude:100.565578},
      {latitude:13.847476,longitude:100.561143},
      {latitude:13.839457,longitude:100.575787},
      {latitude:13.852970,longitude:100.583739},
      {latitude:13.856236,longitude:100.579189},
      {latitude:13.856830,longitude:100.575404}
    ]
  
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
      if(this.InLine5(coordinate[0]) || this.InLine5(coordinate[1])){
        array.push('สาย 5')
      }
      this.setState({choiceLine:array})
    }
  }

  render() {
    const KEY_TO_FILTERS = ['name']
    const {coordinate,time,distOrigin,distance,TextOrigin,
      TextDestination,TextColor,Opacity,Waypoints,NameWaypoints,line,LineColor,countDes,
    countOrigin,changeOrigin,BusStopLine,prevTextOrigin,prevTextDestination
  ,listItemOri,listItemDes,deleOri,deleDes,NameOfCoor,BusStopEqual,
OptimalLine,request,choiceLine,filterOriLen,filterDesLen,requestDir1,
requestDir2,requestDir3,myLocation,modalVisible,FacultyValue,originSect,LineColorArray,
desSect,oriDir3,requestDir4,passLine} = this.state
 
  var filterNameOrigin= AllBuilding.building.filter(createFilter(TextOrigin,KEY_TO_FILTERS))
  var filterNameDes = AllBuilding.building.filter(createFilter(TextDestination,KEY_TO_FILTERS))
    const faculty=["รวม","คณะเกษตร","คณะบริหารธุรกิจ","คณะประมง","คณะมนุษยศาสตร์","คณะวนศาสตร์"
  ,"คณะวิทยาศาสตร์","คณะวิศวกรรมศาสตร์","คณะศึกษาศาสตร์","คณะเศรษฐศาสตร์","คณะสถาปัตยกรรมศาสตร์",
"คณะสังคมศาสตร์","คณะสัตวแพทยศาสตร์","คณะอุตสาหกรรมการเกษตร","คณะเทคนิคการสัตวแพทย์","คณะสิ่งแวดล้อม"]


if(!this.state.change){
  const{originSect,desSect,oriDir3} = this.state
  this.setState({change:true})
  this.setState({prevTextOrigin:this.state.TextOrigin})
  this.setState({prevTextDestination:this.state.TextDestination})
  // this.getBusStop()
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
  else if(this.state.FacultyOrigin === "คณะอุตสาหกรรมการเกษตร"){
    this.setState({FacultyValueOrigin:Agro})
   
    console.log('คณะอุตสาหกรรมการเกษตร')
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
 
  else if(this.state.FacultyDestination === "คณะอุตสาหกรรมการเกษตร"){
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
        style={{height: 50}}
        onValueChange={(itemValue) =>{
          if(this.state.changeOrigin){
          this.setState({FacultyOrigin:itemValue})
        }
          else{
            this.setState({FacultyDestination:itemValue})
          }
        // console.log('test picker')
        }
        }
        >
        {faculty.map(fac =>(
          <item label={fac} value={fac} key={fac}/>
        ))}
        
</Picker>

<Picker 
selectedValue = {this.state.changeOrigin ? this.state.TextOrigin:this.state.TextDestination}
style ={{height:50}}
onValueChange={(itemValue) =>{
  if(this.state.changeOrigin){
    this.setState({TextOrigin:itemValue})
}
else {
  this.setState({TextDestination:itemValue})
}

}}>
 {/* <item label='กรุณาเลือกสถานที่'/> */}
 <item label='กรุณาเลือกสถานที่' value=''/>
 <item label='ตำแหน่งของตัวเอง' value ='ตำแหน่งของตัวเอง'/>
  {this.state.FacultyValue.building.map((build) =>(
    <item label={build.name} value={build.name} key={build.name}/>  
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
        autoFocus={true}
        editable={requestDir1 && requestDir2 && requestDir3 && requestDir4 ? true:false }
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
        editable={requestDir1 && requestDir2 && requestDir3 && requestDir4 ? true:false }
      />
      <Button onPress={this.DisplayAll
      } title="ค้นหา" 
      disabled={this.state.myLocInUni ? false:true}
      />
        </View>
        <View style={{position:'absolute',backgroundColor:'#ffffff',zIndex:1,width:'50%',left:'50%'}}>
              <Picker
    selectedValue={line}
    style={{height:50}}
    enabled ={requestDir1 && requestDir2 && requestDir3}
    onValueChange={(itemValue,itemIndex)=>{
      this.setState({line:itemValue,request:false,time:null,distance:null})
      if(itemValue === 'เส้นทางที่แนะนำ-เดิน' || itemValue==='เส้นทางที่แนะนำ-สาย 1' || itemValue === 'เส้นทางที่แนะนำ-สาย 3'
      || itemValue === 'เส้นทางที่แนะนำ-สาย 5'){
        this.setState({line:'เส้นทางที่แนะนำ'})
      }
      // if(itemValue === 'เส้นทางที่แนะนำ'){
      //   this.setState({BusStopLine:null})
      // }
     
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
        onPress={(requestDir1 && requestDir2 && requestDir3 && requestDir4) ? this.handlePressOnMap:null}
        showsUserLocation={true}
        minZoomLevel={15}
        >
          {this.state.coordinate.map((coor,index)=>(
            <Marker coordinate={coor} key={index} title={coordinate.length === 2 ? NameOfCoor[index]:null} ref={el =>(this.MarkRef=el)}
            >
           
            </Marker>

          ))}
         
          {/* <Compo origin={{latitude:13.847339,longitude:100.567634}} destination={{latitude:13.846605,longitude:100.570532}}
          ref = {el =>(this.Compo=el)} texts='test to comopsitnotn'></Compo> */}
         
          {Waypoints.map((ele,index)=>{
            var sym = null
            if(this.state.passLine[index] === 'สาย 1'){
              sym = symbol1
            }
            else if(this.state.passLine[index]=== 'สาย 3'){
              sym = symbol3
            }
            else if(this.state.passLine[index]==='สาย 5'){
              sym = symbol5
            }
            return(
              <Marker coordinate={ele[0]} key={index}>
                <Image source={sym} style={{height:20,width:20}}/>
              </Marker>
            )
          })}

          {Waypoints.map((ele,index)=>{
            var sym = null
            if(this.state.passLine[index] === 'สาย 1'){
              sym = symbol1
            }
            else if(this.state.passLine[index]=== 'สาย 3'){
              sym = symbol3
            }
            else if(this.state.passLine[index]==='สาย 5'){
              sym = symbol5
            }
            return(
              <Marker coordinate={ele[ele.length-1]} key={index}>
                <Image  source={sym} style={{height:20,width:20}}/>
              </Marker>
            )
          })}

        {request && coordinate.length === 2 && BusStopEqual && <Direction
            origin = {coordinate[0]}
            destination = {coordinate[1]}
            apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
            strokeWidth={4}
            strokeColor={'#05f709'}
            mode={'WALKING'}
            // optimizeWaypoints={true}
            // splitWaypoints={true}
            // resetOnChange={true}
            onStart={(params) => {
              
              this.setState({requestDir4:false})
              console.log(`Started routing between "${params.origin}" and "${params.destination}" Direction 4`)
            }}
            onReady ={result =>{
              
              console.log('direction 4')
              this.updateTime(result.duration,result.distance)
              this.setState({requestDir4:true})
            }}
            onError={error=>{
              console.log(error)
            }}
            >
            </Direction>}

        {request && coordinate.length === 2 && !BusStopEqual && Waypoints.map((origin,index)=>{
          return (
            <Direction
            key={index}
            origin = {originSect[index]}
            destination = {Waypoints[index] === undefined  ? null:origin[0]}
            apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
            strokeWidth={4}
            strokeColor={'#05f709'}
            mode={'WALKING'}
            // optimizeWaypoints={true}
            // splitWaypoints={true}
            // resetOnChange={true}
            onStart={(params) => {
              
              this.setState({requestDir1:false})
              console.log(`Started routing between "${params.origin}" and "${params.destination}" Direction 1`)
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
            </Direction>
          )
        })}

           {request && Waypoints.length >=1 && !BusStopEqual && Waypoints.map((origin,index)=>{
             return (
              <Direction
              key={index}
              origin = {Waypoints[index] !== undefined ? Waypoints[index][0]:null}
              destination = {Waypoints[index] !== undefined ? Waypoints[index][Waypoints[index].length-1]:null}
              apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
              strokeWidth={4}
              strokeColor={LineColorArray[index]}
              waypoints = {Waypoints[index] !== undefined ? Waypoints[index].slice(1,Waypoints[index].length-1):null}
           
              // mode={'WALKING'}
              // optimizeWaypoints={true}
              // splitWaypoints={true}
              // resetOnChange={true}
              onStart={(params) => {
       
                this.setState({requestDir2:false})
                console.log(`Started routing between "${params.origin}" and "${params.destination}" Direction 2`)
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
              </Direction>
             )
           })}
            
           {request && coordinate.length === 2 && !BusStopEqual && oriDir3.map((des,index)=>{
             return(
              <Direction
              key={index}
              origin = {des}
              destination = {desSect[index]}
              apikey={'AIzaSyC7dMUMWICLlsoKMsf1c3ljrhiDdNgTl8U'}
              strokeWidth={4}
              strokeColor={'#05f709'}
              mode={'WALKING'}
              // optimizeWaypoints={true}
              // splitWaypoints={true}
              // resetOnChange={true}
              onStart={(params) => {
                this.setState({requestDir3:false})
                console.log(`Started routing between "${params.origin}" and "${params.destination}" Direction 3`)
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
              </Direction>
             )
           })}
        

        </MapView>
        
        {/* <Compo origin={{latitude:13.847339,longitude:100.567634}} destination={{latitude:13.846605,longitude:100.570532}}
          ref = {el =>(this.Compo=el)} texts='test to comopsitnotn'></Compo> */}
          {passLine.length > 0 && coordinate.length===2?<Text style={{zIndex:1,alignSelf:'center'}}>{passLine.map((line,index)=>{
            if(index === passLine.length-1){
              return (line)
            }
            else{
              return line+'----->'
            }
          })}</Text>:null}
          <Text style={{left:'20%',zIndex:1}}>ระยะทาง: {Number.isNaN(Number.parseFloat(distance))? 0:Number.parseFloat(distance).toFixed(2)} กิโลเมตร  ใช้เวลา: {Math.round(time)} นาที</Text>
          <View style={NameWaypoints.length === 0 ? {height:'0%'}:{height:'12%'}}>
            <ScrollView>
          {NameWaypoints.map((ele)=>(
            ele.map((name,index)=>{
            return(<Text key={index}>{index === 0 && index !== ele.length-1 ? `เดินไปยังป้ายจอด : ${name}`:null}
            {index!== 0 && index !== ele.length-1 ? `ผ่านป้ายจอด : ${name}`:null}
            {index === ele.length-1 ? `ลงที่ป้ายจอด : ${name}`:null}
            </Text>)
            })
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
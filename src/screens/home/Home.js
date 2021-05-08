import React,{useEffect,useRef} from 'react';
import { StyleSheet, View, Text,Dimensions,TouchableOpacity,Image,FlatList,Linking,Alert } from 'react-native';
import { Icon } from "react-native-elements";
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch,useSelector} from "react-redux";

import * as homeActions from "../../../store/actions/Home";

const DeviceWidth = Dimensions.get('window').width;

const HomeScreen=({navigation}) =>{


  const unmounted = useRef(false);

  const newDeadline = useSelector((state) => state.home.newDeadline);

  const dispatch = useDispatch();

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;
    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }
    // ie: 2014-03-24, 3:00 PM
    time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
    return time;
};

  useEffect(() =>{
    const getAllNewDeadlines = async() =>{
      await dispatch(homeActions.NewestDeadline());
      console.log(newDeadline);

    }
    getAllNewDeadlines();
    return()=>{
      unmounted.current = true
    };
  },[newDeadline.length]);

  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Khám phá ngay</Text>
        <View >
          <View style={styles.gridMainFunctions} >
            
            <View style={styles.gridItemShape} >
              <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
                navigation.navigate("Calendar");
              }}>
                  <Icon name="calendar-alt" type="font-awesome-5" color="red" size={40}/>
                  <Text style={styles.textItem}>Lịch hoạt động</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.gridItemShape}  >
              <TouchableOpacity style={styles.gridTouchable} onPress={() =>{
                navigation.navigate("Course")
              }}>
              <Icon name="graduation-cap" type="font-awesome-5" color="red" size={40} />
                  <Text style={styles.textItem}>Thông tin khóa học</Text>
              </TouchableOpacity> 
            </View>
  
            <View style={styles.gridItemShape}  >
              <TouchableOpacity style={styles.gridTouchable}>
              <Icon name="forum" type="material-community" color="red" size={40}/>
                  <Text style={styles.textItem}>Diễn đàn</Text>
              </TouchableOpacity> 
            </View> 
  
          </View>
  
          <View style={styles.gridMainFunctions}>
  
            <View style={styles.gridItemShape}  >          
              <TouchableOpacity style={styles.gridTouchable}>
              <Icon name="info-circle" type="font-awesome-5" color="red" size={40} />
                  <Text style={styles.textItem}>Thông tin trường</Text>
              </TouchableOpacity> 
            </View>
  
            <View style={styles.gridItemShape}  >
              <TouchableOpacity style={styles.gridTouchable}>
              <Icon name="pencil-alt" type="font-awesome-5" color="red" size={40} />
                  <Text style={styles.textItem}>Điểm số</Text>
              </TouchableOpacity> 
            </View>
  
            <View style={styles.gridItemShape}  >
              <TouchableOpacity style={styles.gridTouchable}>
              <Icon name="envelope-open-text" type="font-awesome-5" color="red" size={40} />
                  <Text style={styles.textItem}>Mail</Text>
              </TouchableOpacity> 
            </View>
  
          </View>
               
        </View>
          
  
        <Text style={styles.label}>Deadline gần nhất</Text>
        
        {newDeadline.length > 0 &&
          <FlatList 
          data={newDeadline}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() =>{
              Alert.alert(
                "Chuyển tiếp",
                "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
                [
                  { text: "Từ chối", 
                    style: "cancel"
                  },
                  {
                    text: "Cho phép",
                    onPress: () => Linking.openURL(item.url),
                  },
                ]
              );
              
            }}>
              <View style={styles.deadlineInfo}>
                <View style={styles.deadlineImgWrapper}>
                  <Image style={styles.deadlineImg} source={require("../../../assets/moodle-deadline.png")} />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.courseInfoText}>
                    <Text style={styles.courseName}>{item.nameCourese}</Text>
                    <Text style={styles.timeDeadline}>{convertTimestamp(item.duedate)}</Text>
                  </View>
                  <Text style={styles.contentDeadline}>{item.decription}</Text>
                </View>
              </View>
            </TouchableOpacity>)}/>
        }
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  gridMainFunctions: {
    flexDirection: 'row',
  },

  gridItemShape:{
    borderWidth: 1,
    borderColor:"#DDDDDD",
    borderRadius: 1,// Must add to change border style
    borderStyle: 'dotted',
    width: DeviceWidth/3,
    height: DeviceWidth*0.3,
  },

  label: {
    margin:10,
    fontSize:16,
    fontWeight: "bold",
  },

  gridTouchable: {
    width:"100%",
    height:"100%",
    alignItems: "center",
    justifyContent: "center"
  },

  textItem: {
    marginTop:15,
  },

  deadlineInfo:{
    flexDirection:"row",
    justifyContent: "space-between",
  },

  textSection:{
    flexDirection: "column",
    justifyContent: "center",
    width: '100%',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  courseInfoText:{
    flexDirection: "row",
    marginBottom: 10,
  },

  courseName:{
    fontSize: 13,
    fontWeight: "bold",
  },

  timeDeadline: {
    fontSize: 11,
    color:"#666",
    marginLeft:25
  },

  contentDeadline:{
    fontSize: 15,
    color: "#333333",
  },

  deadlineImgWrapper:{
    paddingTop: 10,
    paddingBottom: 10,
  },

  deadlineImg:{
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    marginLeft:5
  },

  card: {
    width: '100%',
  },
})

export default HomeScreen;
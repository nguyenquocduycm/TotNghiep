
import _ from 'lodash';
import XDate from 'xdate';
import React, {useState,useEffect,useRef} from 'react';
import {Platform, StyleSheet, View, Text, TouchableOpacity, Button,Alert,Linking} from 'react-native';
import {ExpandableCalendar, Timeline, CalendarProvider,LocaleConfig} from 'react-native-calendars';
import { Overlay } from 'react-native-elements';
import {sameDate} from './dateutils';

import { Ionicons,Entypo,SimpleLineIcons,MaterialCommunityIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';


import {useDispatch,useSelector} from 'react-redux';
import * as calendarActions from '../../../../store/actions/Calendar';


LocaleConfig.locales['vn'] = {
  monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  monthNamesShort: ['Thg 1','Thg 2','Thg 3','Thg 4','Thg 5','Thg 6','Thg 7.','Thg 8','Thg 9','Thg 10','Thg 11','Thg 12'],
  dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vn';

const CalendarScreen =()=> {

  // const EVENTS = [
  //   { 
  //     "end": "2021-05-19 18:00",
  //     "start": "2021-05-19 14:00",
  //     "summary": "",
  //     "title": "Test Again",
  //   },
  //   { 
  //     "end": "2021-05-13 23:59",
  //     "start": "2021-05-13 01:00",
  //     "summary": "[DA-04] LINK NỘP ĐỒ ÁN - YÊU CẦU 5 is due",
  //     "title": "Quản trị CSDL hiện đại - 17HTTT",
  //     "color": "#e6bcad"
  //   },
  // ];

  const getCurrenDay = ()=>{
    var today = new Date(); 
    var day= today.getDate();
    return day;
  };

  const getCurrentMonth =()=> {
    var today = new Date();
    var month = today.getMonth() + 1;
    return month; 
  };

  const getCurrentYear = () => {
    var today = new Date(); 
    var year= today.getFullYear();
    return year;
  }
  
  const getCurrentDate = () =>{
    var day= getCurrenDay();
    var year= getCurrentYear();
    let month= getCurrentMonth();
    if(month < 10 && day > 10){
      let date =year+'-'+'0'+month+'-'+day;
      return date;
    }
    else if(month < 10 && day < 10){
      let date = year+'-'+'0'+month+'-'+'0'+day;
      return date;
    }
    else if(month > 10 && day < 10){
      let date = year+'-'+month+'-'+'0'+day;
      return date;
    }
    else{
      let date =year+'-'+month+'-'+day;
      return date;
    }
  };

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        time;
    if (hh > 12) {
        h = hh ;
    } else if (hh === 12) {
        h = 12;
    } else if (hh == 0) {
        h = 0;
    }
    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + min ;
    return time;
};


  const token = useSelector((state) => state.authen.token);

  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const [currentDate,setCurrentDate] = useState(getCurrentDate());
  const [monthChanged,setMonthChanged] = useState(getCurrentMonth());
  const [yearChanged,setYearChanged] = useState(getCurrentYear());

  const [idEvent,setIdEvent]=useState('');
  const [nameEvent,setNameEvent] = useState('');
  const [startTimeEvent,setStartTimeEvent] = useState('');
  const [endTimeEvent,setEndTimeEvent] = useState('');
  const [decriptionEvent,setDecriptionEvent] = useState('');
  const [typeEvent,setTypeEvent] = useState('');
  const [typeGuest,setTypeGuest] = useState('');
  const [urlEvent,setUrlEvent] = useState('');



  const [allEvents,setEvent] = useState([]);
  const dispatch = useDispatch();
  const unmounted = useRef(false);

  const toggleOverlay = () => {
    setVisibleOverlay(!visibleOverlay);
};

  useEffect(() => {
        //console.log(token);
    const getAllActivitiesInMonth = ()=>{
      let details = {
        year: yearChanged,
        month: monthChanged,
      };

      let formBody = [];

      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`
        },
        body: formBody,
      }).then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes])=>{
          console.log(dataRes,statusCode); 

          const dataCalendar = [];
          for (const key in dataRes) {
            if(dataRes[key].TypeCalendar !== undefined){
              if(dataRes[key].ListGuest.length===0){
                dataCalendar.push({
                  id:dataRes[key]._id,
                  type:dataRes[key].TypeCalendar,
                  title:dataRes[key].Title,
                  summary:"",
                  start:convertTimestamp(dataRes[key].StartHour),
                  end:convertTimestamp(dataRes[key].EndHour),
                  url:dataRes[key].Decription.url,
                  typeGuest:"Cá nhân",
              })}
              else{
                dataCalendar.push({
                  id:dataRes[key]._id,
                  type:dataRes[key].TypeCalendar,
                  title:dataRes[key].Title,
                  summary:"",
                  start:convertTimestamp(dataRes[key].StartHour),
                  end:convertTimestamp(dataRes[key].EndHour),
                  url:dataRes[key].Decription.url,
                  typeGuest:dataRes[key].ListGuest,
              })}
            }
            else{
              dataCalendar.push({
                id:"",
                //type:dataRes[0].TypeCalendar,
                title:dataRes[key].nameCourese,
                summary:dataRes[key].decription,
                start:convertTimestamp(dataRes[key].duedate-3600),
                end:convertTimestamp(dataRes[key].duedate),
                type:"Deadline",
                color: '#99FF99',
                url:dataRes[key].url,
                typeGuest:"Cá nhân",
            })
          }
        }
          console.log(dataCalendar);
          setEvent(dataCalendar);
          dispatch(calendarActions.getCalendarOfMonth(dataRes));
      }).catch(error => console.log('error', error));
    };
    getAllActivitiesInMonth();
    return()=>{
      unmounted.current=true;
    };
  },[]);


  const onDateChanged = (date) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    console.log(date);
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };


  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} />
        </View>
      </TouchableOpacity>
    );
  };

  const getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  };


    return (
      
      <CalendarProvider
// date={ITEMS[0].title}
        date={currentDate}
        onDateChanged={(date)=>onDateChanged(date)}
        onMonthChange={(month)=>onMonthChange(month)}
        theme={{todayButtonTextColor: 'blue'}}
        showTodayButton
        disabledOpacity={0.6}
        // todayBottomMargin={16}
      >
  
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
           //hideKnob
           //initialPosition={ExpandableCalendar.positions.OPEN}
          firstDay={1}
          // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          theme={getTheme()}
          // leftArrowImageSource={require('../img/previous.png')}
          // rightArrowImageSource={require('../img/next.png')}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
        />
        <Timeline
          format24h={true}
          eventTapped={e => {
            toggleOverlay();
            setNameEvent(e.title);
            setStartTimeEvent(e.start);
            setEndTimeEvent(e.end);
            setDecriptionEvent(e.summary);
            setTypeEvent(e.type);
            setTypeGuest(e.typeGuest);
            setUrlEvent(e.url);
            
          }}
          events={allEvents.filter(event => sameDate(XDate(event.start), XDate(currentDate)))}
          // scrollToFirst={true}
          // start={0}
          // end={24}
        />


          {/* Overlay when click to view detail event */}
          <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay} >
                  <Text style={overlayStyle.headerStyle}>Chi tiết sự kiện</Text>
                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Tên</Text>
                          <Text style={overlayStyle.onTheRight}>{nameEvent}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Bắt đầu</Text>
                          <Text style={overlayStyle.onTheRight}>{startTimeEvent}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Kết thúc </Text>
                          <Text style={overlayStyle.onTheRight}>{endTimeEvent}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Mô tả</Text>
                          <Text style={overlayStyle.onTheRight}>{decriptionEvent}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Loại</Text>
                          <Text style={overlayStyle.onTheRight}>{typeEvent}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>Lịch</Text>
                          <Text style={overlayStyle.onTheRight}>{typeGuest}</Text>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                          <Text style={overlayStyle.label}>URL</Text>
                          <TouchableOpacity style={overlayStyle.onTheRight} onPress={() =>{ 
                            Alert.alert(
                              "Chuyển tiếp",
                              "Ứng dụng muốn chuyển tiếp đến trang môn học của bạn",
                              [
                                { text: "Từ chối", 
                                  style: "cancel"
                                },
                                {
                                  text: "Cho phép",
                                  onPress: () => Linking.openURL(urlEvent),
                                },
                              ]
                            );}}>
                            <Text style={{color:'blue',textDecorationLine:"underline"}}>
                             {urlEvent}
                            </Text>
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View style={[styles.card,{marginBottom:0}]} >
                      <View style={overlayStyle.row}>
                      {/* <Ionicons name="people-outline" size={23} color="red" /> */}
                        <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'red'}]}>
                            <Text style={overlayStyle.textBtnConnect}>Xóa</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style={[overlayStyle.button,{backgroundColor:'#3366FF'}]}>
                            <Text style={overlayStyle.textBtnConnect}>Cập nhật</Text>
                        </TouchableOpacity>


                      </View>
                  </View>

                  
          </Overlay>
      </CalendarProvider>   
      
      
      
    );
  }

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});

const overlayStyle = StyleSheet.create({
 
  headerStyle: {
    fontSize:20,
    marginHorizontal:120,
    fontWeight: "bold",
  },

  card: {
    width: '100%',
    backgroundColor:'red',
    borderBottomWidth:1,
    borderBottomColor: "#EEEEEE",
    marginVertical:20
  },

  row:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:10,
  },

  onTheRight: {
    position: 'absolute',
    right: 0
  },

  label: {
    fontSize:15,
    marginLeft:5,
    fontWeight: "bold",
  },

  button:{
    borderRadius:30,
    paddingVertical:15,
    paddingHorizontal: 50,
    marginVertical:30,
    marginHorizontal:15
},

textBtnConnect: {
  color: "white",
  fontSize: 15,
  textAlign: "center",
},

})

export default CalendarScreen;
import "react-native-gesture-handler";
import * as React from "react";
import {TouchableOpacity,Image,Dimensions,Text,View} from "react-native"
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons,MaterialIcons,Ionicons } from '@expo/vector-icons';
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";

import { useSelector,useDispatch } from "react-redux";
import * as calendarActions from '../../store/actions/Calendar';
// import * as msgActions from "../../store/actions/Message";

import StartupScreen from "../screens/authentications/Startup";
import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
import HomeScreen from "../screens/home/Home";
import CalendarScreen from "../screens/home/calendar/Calendar";
import NormalMessageScreen from "../screens/message/NormalMessage";
import FirstReadMessageScreen from "../screens/message/FirstReadMessage";
import FindToChatScreen from "../screens/message/FindToChat";
import ChatScreen from "../screens/message/Chat";
import {ProfileScreen} from '../screens/profile/Profile';
import NotificationScreen from '../screens/notifications/Notification';
import AllCourseInfoScreen from '../screens/home/courses/AllCourse';
import CurrentCourseInfoScreen from '../screens/home/courses/CurrentCourse';
import ChangeProfileScreen from '../screens/profile/ChangeProfile';
import ContentCourseInfoScreen from '../screens/home/courses/DetailContentCourse';
import WebCustomedScreen from '../screens/profile/TypeWebCustomed';
import ChangePasswordScreen from '../screens/authentications/ChangePassword';
import AddToCalendarScreen from '../screens/home/calendar/AddToCalendar';
import ModifyCalendarScreen from '../screens/home/calendar/ModifyCalendar';
import AddPeopleToCalendarScreen from '../screens/home/calendar/AddPeopleToCalendar';
import UniversityInfoScreen from '../screens/home/info_university/UniversityInfo';
import FacultyNewScreen from '../screens/home/info_university/FacultyNew';
import UniversityNewScreen from '../screens/home/info_university/UniversityNew';
import MoodleConnectScreen from '../screens/profile/connect_app/Moodle';
import PortalConnectScreen from '../screens/profile/connect_app/Portal';
import ClassroomConnectScreen from '../screens/profile/connect_app/Classroom';
import SlackConnectScreen from '../screens/profile/connect_app/Slack';
import TrelloConnectScreen from '../screens/profile/connect_app/Trello';

//import forum
import ForumCourseScreen from '../screens/home/forum/forum_course/ForumCourse';
import ForumOfCourseMoodleScreen from '../screens/home/forum/forum_course/ForumMoodleCourse';
import ContentForumMoodleScreen from '../screens/home/forum/forum_course/ContentForumMoodle';
import CreatePostScreen from '../screens/home/forum/CreatePost';
import ForumFacultyScreen from "../screens/home/forum/forum_faculty/ForumFaculty";
import ForumUniversityScreen from "../screens/home/forum/forum_university/ForumUniversity";
import ContentForumFacultyAndUniversityScreen from "../screens/home/forum/ContentForum";
import ForumAllCourseScreen from "../screens/home/forum/forum_course/ForumAllCourse";
import ForumCourseOfAppScreen from "../screens/home/forum/forum_course/ForumCourseOfApp";
import ListUserLikedScreen from "../screens/home/forum/ListUserLiked";


const Stack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const topTab= createMaterialTopTabNavigator();

//All Stack navigation of our app
export function AuthenStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Start up">
      <Stack.Screen
        name="Start up"
        component={StartupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function HomeStackNavigation({navigation}) { 
  const infoCourseChoose = useSelector((state) => state.course.infoCourseChoose);
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ 
            headerShown: false
          // title: "Lịch hoạt động",
          // headerBackTitle:false,
          // headerTruncatedBackTitle:false,
          // headerRight:()=>(
          //   <View style={{flexDirection:'row'}}>
          //     <TouchableOpacity >
          //       <MaterialCommunityIcons name="calendar-month-outline" size={30} color="blue" />
          //     </TouchableOpacity>
              
          //     <TouchableOpacity onPress={() =>navigation.navigate('Add Event')}>
          //       <MaterialCommunityIcons name="plus" size={30} color={"blue"} />
          //     </TouchableOpacity>
          //   </View>
           
          // ),
          // headerRightContainerStyle:{
          //   paddingRight:10
          // },
        }}
      />

      <Stack.Screen
        name="Add people to calendar"
        component={AddPeopleToCalendarScreen}
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Course"
        component={CourseInfoTopTab}
        options={{ 
          title: "Thông tin khóa học",
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
        }}
      />

      <Stack.Screen 
        name="Content Course"
        component={ContentCourseInfoScreen}
        options={({route}) =>({
          title:route.params.name,
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
        })}
      />

      <Stack.Screen
        name="Modify Event"
        component={ModifyCalendarScreen}
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Add Event"
        component={AddToCalendarScreen}
        options={{ 
          headerShown: false
        //   title: 'Sự kiện mới',
        //   headerTitleStyle: {
        //     color: 'black'
        //   },
        //   headerRight:()=>(
        //       <TouchableOpacity disabled={checkDisableAddButton()} onPress={() =>{
        //          var x= new AddToCalendarScreen();
        //          x.Test();
        //       }}>
        //         <Text style={{fontSize:17,color: checkDisableAddButton() ? 'silver' : 'blue'}}>
        //           Thêm
        //         </Text>
        //       </TouchableOpacity>
        //   ),
        //   headerLeft:()=>(
        //     <HeaderBackButton 
        //     label='Huỷ'
        //     tintColor='red'
        //     onPress={()=>{
        //       dispatch(calendarActions.getStatusOfTitle(false));
        //       dispatch(calendarActions.getStatusOfDate(true));
        //       navigation.navigate("Calendar")
        //     }}/>
        //   ),
        //   headerRightContainerStyle:{
        //     paddingRight:10
        //   },
        }}
      />

      <Stack.Screen
        name="University Info"
        component={UniversityInfoTopTab}
        options={{ 
          title: "Thông tin trường",
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
        }}
      />

      <Stack.Screen
        name="Forum"
        component={ForumTopTab}
        options={{ 
          title: "Diễn đàn",
          headerBackTitle:false,
          headerTruncatedBackTitle:false,

          headerRight:()=>(
            <TouchableOpacity style={{marginRight:5}} onPress={() =>{
              navigation.navigate('Create Post Of Forum');
            }}>
              <MaterialIcons name="library-add" size={25} color="#444444"/>
            </TouchableOpacity>
          )
        }}

      />

      <Stack.Screen
        name="Forum Of A Course"
        component={ForumACourseTopTab}
        options={{ 
          title:infoCourseChoose.nameCourse,
          headerBackTitle:false,
          headerTruncatedBackTitle:false
        }}
      />

      <Stack.Screen
        name="Content Forum Of A Moodle Course"
        component={ContentForumMoodleScreen}
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Create Post Of Forum"
        component={CreatePostScreen}
        options={{ 
          headerShown: false
        }} />

      <Stack.Screen
        name="Content Forum"
        component={ContentForumFacultyAndUniversityScreen}
        options={{ 
          headerShown: false
        }}
      />

      <Stack.Screen
        name="List User Liked"
        component={ListUserLikedScreen}
        options={{ 
          headerShown: false
        }}/>

    </Stack.Navigator>
  )
}

function MessageStackNavigation({navigation}) { 
  // const dispatch = useDispatch();
  // const roomID = useSelector((state) => state.message.roomID);
  // const socket = useSelector((state) => state.authen.socket);

  const profile =useSelector((state) => state.profile.profile);

  return(
    <Stack.Navigator initialRouteName="Message">
      <Stack.Screen
        name="Message"
        component={MessageTopTab}
        options={{ 
          title: "Tin nhắn",
          headerTitleAlign: 'center',
          headerTintColor:"#FFFFFF",
          // headerStyle:{
          //   backgroundColor:"#33CCFF"
          // },
          headerTitleStyle: {
              color: 'black'
          },
          headerRight:()=>(
            <TouchableOpacity onPress={() =>{ navigation.navigate('Find to Chat')}}>
              <MaterialCommunityIcons name="plus" size={30} color={"blue"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          },
          headerLeft:()=>(
            
            <Image style={{width:27,height:27,borderRadius:25}} source={{uri:profile[0].AnhSV === "" || profile[0].AnhSV === null ? `https://ui-avatars.com/api/?background=random&color=fff&name=${profile[0].HoTen}`: profile[0].AnhSV}}/>
          ),

          headerLeftContainerStyle:{
            paddingLeft: 10,
          }
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) =>({
          title:route.params.name,
          headerTitleAlign: 'center',
          headerShown:false
          // headerLeft:()=>(
          //   <TouchableOpacity onPress={() =>{ 
          //     //console.log(roomID);
          //     socket.emit('Return-Chat',roomID);
          //     dispatch(msgActions.StoreRoomChat(''));
          //     navigation.goBack('Message');}}>
          //       <Entypo name="chevron-left" size={28} color="blue" />
          //   </TouchableOpacity>
          // ),
        })}
      />

      <Stack.Screen
        name="Find to Chat"
        component={FindToChatScreen}
        options={{ 
          headerShown: false
        }}
      />

    </Stack.Navigator>
  )
}

function ProfileStackNavigation({navigation}) { 
  return(
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          //headerShown: false
          title: "Tài khoản của tôi",
          headerTitleAlign: 'center',
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          headerRight:()=>(
            <TouchableOpacity onPress={() => navigation.navigate("Change Profile")}>
              <MaterialCommunityIcons name="account-edit" size={22} color={"#FFFFFF"} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle:{
            paddingRight:10
          },
          headerLeft:()=>{
            return null;
          }
        }}
      />

      <Stack.Screen
        name="Change Profile"
        component={ChangeProfileScreen}
        options={{ 
          title: "Thay đổi thông tin",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
          // headerRight:()=>(
          //   <TouchableOpacity>
          //     <MaterialCommunityIcons name="check-bold" size={23} color={"#FFFFFF"} />
          //   </TouchableOpacity>
          // ),
          // headerRightContainerStyle:{
          //   paddingRight:10
          // }
        }}
      />

      <Stack.Screen
        name="Connect application"
        component={ConnectApplicationTopTab}
        options={{ 
          title: "Kết nối ứng dụng",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
        }}
      />

      <Stack.Screen
        name="Web Customed"
        component={WebCustomedScreen}
        options={{ 
          // title: "Ứng dụng đã được kết nối",
          // headerTitleAlign: 'center',
          // headerBackTitle:false,
          // headerTruncatedBackTitle:false,
          // headerTintColor:"#FFFFFF",
          // headerStyle:{
          //   backgroundColor:"#33CCFF"
          // },

          headerShown:false,
          
        }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePasswordScreen}
        options={{ 
          title: "Thay đổi mật khẩu",
          headerTitleAlign: 'center',
          headerBackTitle:false,
          headerTruncatedBackTitle:false,
          headerTintColor:"#FFFFFF",
          headerStyle:{
            backgroundColor:"#33CCFF"
          },
        }}
      />
    </Stack.Navigator>
  )
}

//Bottom tab 
function MyBottomTabs() {
  const visibleBotTab = useSelector((state) => state.home.visibleBotTab);
  const notiNotRead = useSelector((state) => state.home.notiNotRead);
  const msgNotRead = useSelector((state) => state.home.messNotRead);

  return (
    <bottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#6666FF',
      }}

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } 
          else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-sharp' : 'notifications-outline';
          }
          else if (route.name === 'Message') {
            iconName = focused ? 'chatbubble-ellipses-sharp' : 'chatbubble-ellipses-outline';
          }
          else if(route.name === 'Profile'){
            iconName = focused ? 'person-sharp' : 'person-outline';
          
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <bottomTab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Trang chủ',
          tabBarVisible: getTabBarVisibility(route) && visibleBotTab,
          //tabBarVisible: false,

        })}
      />
      <bottomTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarBadge: notiNotRead > 0 ? notiNotRead :null,
        }}
      />

      <bottomTab.Screen
        name="Message"
        component={MessageStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Tin nhắn',
          tabBarVisible: getTabBarVisibility(route),
          tabBarBadge: msgNotRead >0 ? msgNotRead :null,
        })}
      />
 
      <bottomTab.Screen
        name="Profile"
        component={ProfileStackNavigation}
        options={({route})=>({
          tabBarLabel: 'Tài khoản',
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
    </bottomTab.Navigator>
  );
}

const getTabBarVisibility = (route) => {

  const routeName = getFocusedRouteNameFromRoute(route) ;

  const arrHideBotTab=["Calendar","Chat","Course","Change Profile",
  "Connect application","Content Course","Web Customed","Change Password",
  "Add Event","Modify Event","Find to Chat","University Info",
  "Add people to calendar","Forum","Forum Of A Moodle Course","Content Forum",
  "Create Post Of Forum","Content Forum Of A Moodle Course","Forum Of A Course",
  "List User Liked"];

  console.log(routeName);

  for (var i = 0; i < arrHideBotTab.length; i++) {
    if (routeName === arrHideBotTab[i]) {
      return false;
    }
  }
  return true;
};

function BottomTabNavigator() {
  return (
      <MyBottomTabs />
  );
}

//Top tab of course screen
function CourseInfoTopTab(){
  return (
    <topTab.Navigator initialRouteName="Learning">
      <topTab.Screen 
        name="Current Course" 
        component={CurrentCourseInfoScreen} 
        options={{
          tabBarLabel:'Học kì gần nhất'
        }}/>
      <topTab.Screen 
        name="All Course" 
        component={AllCourseInfoScreen}
        options={{
          tabBarLabel:'Tất cả môn học'
        }}
        />
    </topTab.Navigator>
  )
}

//Top tab of university info screen
function UniversityInfoTopTab(){
  return (
    <topTab.Navigator initialRouteName="University New" 
    tabBarOptions={{
      activeTintColor: 'blue',
      labelStyle: { fontSize: 11 },
      }}>
  
      <topTab.Screen 
        name="University New" 
        component={UniversityNewScreen}
        options={{
          tabBarLabel:'Tin tức trường'
        }}
        />

      <topTab.Screen 
        name="Faculty New" 
        component={FacultyNewScreen}
        options={{
          tabBarLabel:'Tin tức khoa'
        }}
        />

      <topTab.Screen 
        name="University Info" 
        component={UniversityInfoScreen} 
        options={{
          tabBarLabel:'Thông tin'
        }}
        />
    </topTab.Navigator>
  )
}

//Top tab of connect application screen 
function ConnectApplicationTopTab(){
  return (
    <topTab.Navigator initialRouteName="Moodle" 
    tabBarOptions={{
      scrollEnabled:true,
  
      activeTintColor: 'green',
      inactiveTintColor:'#CCCCCC',
      indicatorStyle:{
        backgroundColor: 'green',
      },
      tabStyle: {
          width:110,
      },
      labelStyle: { 
        fontSize: 15,
        textTransform:'none'
      },
      }}>
  
      <topTab.Screen 
        name="Moodle" 
        component={MoodleConnectScreen} 
        options={{
          tabBarLabel:'Moodle'
        }}/>

      <topTab.Screen 
        name="Portal" 
        component={PortalConnectScreen}
        options={{
          tabBarLabel:'Portal'
        }}
        />

      <topTab.Screen 
        name="Classroom" 
        component={ClassroomConnectScreen}
        options={{
          tabBarLabel:'Classroom'
        }}
        />

      <topTab.Screen 
        name="Slack" 
        component={SlackConnectScreen}
        options={{
          tabBarLabel:'Slack'
        }}
        />  

      <topTab.Screen 
        name="Trello" 
        component={TrelloConnectScreen}
        options={{
          tabBarLabel:'Trello'
        }}
        />  
    </topTab.Navigator>
  )
}

//Top tab of message screen 
function MessageTopTab(){
  return (
    <topTab.Navigator initialRouteName="Normal Message" 
    tabBarOptions={{
      activeTintColor: 'green',
      inactiveTintColor:'#CCCCCC',
      indicatorStyle:{
        backgroundColor: 'green',
      },

      labelStyle: { fontSize: 10 },
      }}>
  
      <topTab.Screen 
        name="Normal Message" 
        component={NormalMessageScreen} 
        options={{
          tabBarLabel:'Chat'
        }}/>

      <topTab.Screen 
        name="First Read Message" 
        component={FirstReadMessageScreen}
        options={{
          tabBarLabel:'Tin nhắn chờ'
        }}
        />

     
    </topTab.Navigator>
  )
};

//Top tab of forum screen 
function ForumTopTab(){
  const DeviceWidth = Dimensions.get('window').width;
  return (
    <topTab.Navigator initialRouteName="Forum Total Course" 
    tabBarOptions={{
      scrollEnabled:true,
      activeTintColor: 'green',
      inactiveTintColor:'#CCCCCC',
      tabStyle:{
        width:'auto',
      },
      indicatorStyle:{
        backgroundColor: 'green',
      },

      }}>

      <topTab.Screen 
        name="Forum Total Course" 
        component={ForumAllCourseScreen} 
        options={{
          tabBarLabel: ({focused}) => (
            <Text style = {{textAlign: 'center',fontSize: 12, color: focused? 'green' : 'silver',width:90}}>
              Tất cả khoá học
            </Text>
          )
        }}/>
  
      <topTab.Screen 
        name="Forum Course" 
        style={{color: 'white'}}
        component={ForumCourseScreen} 
        options={{
          tabBarLabel: ({focused}) => (
            <Text style = {{textAlign: 'center',fontSize: 12, color: focused? 'green' : 'silver',width:(DeviceWidth-90)/4}}>
              Môn học
            </Text>
          )
        }}/>

      <topTab.Screen 
        name="Forum Faculty" 
        component={ForumFacultyScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style = {{textAlign: 'center',fontSize: 12, color: focused? 'green' : 'silver',width:(DeviceWidth-90)/4}}>
              Khoa
            </Text>
          )
        }}/>

      <topTab.Screen 
        name="Forum University" 
        component={ForumUniversityScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style = {{textAlign: 'center',fontSize: 12, color: focused? 'green' : 'silver',width:(DeviceWidth-90)/4}}>
              Trường
            </Text>
          )
        }}/>
     
    </topTab.Navigator>
  )
}

//Top tab of forum course 
function ForumACourseTopTab(){
  return (
    <topTab.Navigator initialRouteName="Forum Of A Course By App" 
    tabBarOptions={{
      activeTintColor: 'green',
      inactiveTintColor:'#CCCCCC',
      indicatorStyle:{
        backgroundColor: 'green',
      },

      labelStyle: { fontSize: 10 },
      }}>

      <topTab.Screen 
        name="Forum Of A Course By App" 
        component={ForumCourseOfAppScreen}
        options={{
          tabBarLabel:'Ứng dụng'
        }}
        />
  
      <topTab.Screen 
        name="Forum Of A Moodle Course" 
        component={ForumOfCourseMoodleScreen} 
        options={{
          tabBarLabel:'Trang môn học'
        }}/>

    </topTab.Navigator>
  )
};







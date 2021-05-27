import React,{useState} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,TextInput } from 'react-native';
import{SafeAreaView} from 'react-native-safe-area-context';

import{useSelector} from 'react-redux';

import { Ionicons } from '@expo/vector-icons';


const AddPeopleToCalendarScreen = ({navigation}) => {

    const [nameUser,setNameUser] =useState('');
    const [data,setData] = useState([]);

    const token = useSelector((state) => state.authen.token);


    const getInfoFromUsername =(name) => {
        let details = {
            username:name
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
      
          fetch("https://hcmusemu.herokuapp.com/profile/findname", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody,
          }).then((response) => {
              const statusCode = response.status;
              const dataRes = response.json();
              return Promise.all([statusCode, dataRes]);
          }).then(([statusCode, dataRes])=>{
                console.log(dataRes);
                setDataOfAllPeolple(dataRes);
          }).catch(error => console.log('error', error));
    };


    const renderItem = ({ item }) => (
        <View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("Chat", {
                token:token,
                email: item.Email,
                name:item.HoTen
              });
            }}
          >
            


            <RoundedImage />
            {/* <View style={styles.courseInfo}>
              <View style={styles.textSection}>
                <Text style={styles.courseName}>{item.name}</Text>
    
               
              </View>
            </View> */}
            <View>
                <Text style={styles.name}>{item.HoTen}</Text>
                <Text style={styles.name}>{item.TenKhoa}</Text>
                <Text style={styles.nameUniversity}>{item.TenTruongDH}</Text>
            </View>
            

          </TouchableOpacity>
        </View>
      );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() =>{ navigation.navigate('Message')}}>
            <Ionicons name="chevron-back" size={38} color="blue" />
            </TouchableOpacity>
 
            <View style={styles.input}>
                <Ionicons name="search-outline" size={18} color="#888888" />
                <TextInput keyboardType="default" placeholder="Tìm kiếm" style={{width: '100%'}}
                onChangeText={(name)=>{
                    console.log(name);
                    if(name.trim().length!==0) {
                        getInfoFromUsername(name);
                    }
                    else{
                        setData([]);
                    }
                }}>                
                </TextInput>    
            </View>
        </View>

        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item,index) => index.toString()}/>


      </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:.2,
    },

    input:{
        flexDirection:'row',
        width:'88%',
        backgroundColor:"#cccc",
        borderRadius:10,
        padding:10,
    },

    card: {
        paddingHorizontal:10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#cccccc",
        flexDirection: "row",

    },
    name:{
        marginTop:10,
        marginHorizontal:20
    },
    nameUniversity:{
        fontSize:12,
        marginHorizontal:20
    }

});

export default AddPeopleToCalendarScreen;

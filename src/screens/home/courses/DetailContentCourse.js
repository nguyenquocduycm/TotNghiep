import React, { useEffect,useState } from "react";
import { View, TouchableOpacity, StyleSheet,Text,FlatList,Linking,Alert } from "react-native";
import { useSelector } from "react-redux";

const ContentCourseInfoScreen = ({route}) => {
  const idCourse  = route.params.idCourse;
  const token = useSelector((state) => state.authen.token);
  const [data,setData] = useState([]);

  const tmp =[];


  useEffect(() => {
    const getDetailCourse = () => {

      const idCourse=route.params.idCourse;
      let details = {
        IDCourses: idCourse,
      };

      let formBody = [];

      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log(formBody);

      fetch("https://hcmusemu.herokuapp.com/coursescontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `bearer ${token}`,
        },
        body: formBody,
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log(json);
          for (const key in json.listAssign) {
            tmp.push(
              {
              id: json.listAssign[key]._id,
              url:json.listAssign[key].url,
              name:json.listAssign[key].name,
              startDate:json.listAssign[key].startDate,
            });
          }
          console.log(tmp);
          setData(tmp);
        })
        .catch((err) => console.log(err, "error"));
    };
    getDetailCourse();
  }, []);

  const renderItem = ({ item }) => (
    <View>
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
        <Text style={styles.deadlineName}>{item.name}</Text>
      </TouchableOpacity>
    </View> 
    
  );

  const renderEmpty = () => (
    <View>
      <Text style={styles.emptyInfo}>Nội dung không tìm thấy</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ASSIGNMENT</Text>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={renderEmpty}/>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    margin:10,
    fontSize:16,
    fontWeight: "bold",
  },


  card: {
    width: '100%',
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor: "#cccccc",
  },

  deadlineName:{
    marginLeft: 40,
    marginVertical:20,
    fontSize:15
  },

  emptyInfo: {
    marginLeft:50,
    fontSize:18
  }

});

export default ContentCourseInfoScreen;

import React,{useState,useEffect,useRef} from "react";
import { StyleSheet, Text, View , FlatList,TouchableOpacity,Linking,Image,TouchableWithoutFeedback} from "react-native";
import { Entypo,FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Error500Screen from "../../error/500";
import Error503Screen from "../../error/503";


const UniversityNewScreen = ({navigation}) =>{
    const token = useSelector((state) => state.authen.token);
    const [dataUniNew,setDataUniNew] = useState([]);
    const [statusCode,setStatusCode] = useState(200);
    const [isLoadingUniScreen,setLoadingUniScreen]=useState(false);
    const [visibleBlur, setVisibleBlur] = useState(false);

    const [titleOverlay,setTitleOverlay] = useState('');
    const [urlOverlay,setUrlOverlay] = useState('');

    const unmounted = useRef(false);

    useEffect(() => {
        getUniversityNew();
        return()=>{
            unmounted.current = true
        };
    },[]);

    //call api
    const getUniversityNew = () =>{
        setLoadingUniScreen(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://hcmusemu.herokuapp.com/info/newsuniversity",requestOptions)
        .then((responseNewUni) => {
            const statusCodeNewUni = responseNewUni.status;
            const dataResNewUni = responseNewUni.json();
            return Promise.all([statusCodeNewUni, dataResNewUni]);
        }).then(([statusCodeNewUni, dataResNewUni]) => {
            console.log(statusCodeNewUni, dataResNewUni);
            if(statusCodeNewUni === 200){
                const tmpNew =[];
                for (const key in dataResNewUni) {
                    tmpNew.push(
                    {
                        title: dataResNewUni[key].Title,
                        link:dataResNewUni[key].Link,
                        date:dataResNewUni[key].Date,
                    });
                };
                setDataUniNew(tmpNew);
            }

            else if (statusCodeNewUni === 500){
                setStatusCode(statusCodeNewUni);
            }
            else if (statusCodeNewUni === 503){
                setStatusCode(statusCodeNewUni);
            }
            else{
                setStatusCode(statusCodeNewUni);
            }
            
            setLoadingUniScreen(false);
        })
        .catch((err) => console.log(err, "error"));
    };

    const renderItemForUniNew = ({item})=>(
        <TouchableOpacity style={styles.card}
            onPress={() => {Linking.openURL("https://www.hcmus.edu.vn/"+item.link)}}
            onLongPress={() => { 
                setTitleOverlay(item.title);
                setUrlOverlay("https://www.hcmus.edu.vn/"+item.link);
                setVisibleBlur(true);
            }}>

            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Entypo style={styles.onTheRight} name="chevron-thin-right" size={20} color="blue" />
            </View>
            
            <View tyle={[styles.info,{marginBottom:20}]}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
                
        </TouchableOpacity>
    );

    const loadingSkeletonForUniNewScreen = () => {
        return(
            <SkeletonPlaceholder>
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>
                
                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View >
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>

                <View style={skeletonLoading.card}>
                    <View style={skeletonLoading.info}/>
                    <View style={[skeletonLoading.info,skeletonLoading.secondLine]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.onTheRightArrow]}/>
                    <View style={[skeletonLoading.info,skeletonLoading.date]}/>
                </View>
            </SkeletonPlaceholder>
        )
    };

    return(
        <View style={styles.container}>
            {isLoadingUniScreen && loadingSkeletonForUniNewScreen()} 
            {statusCode === 500 && !isLoadingUniScreen && Error500Screen()}
            {statusCode === 503 && !isLoadingUniScreen && Error503Screen()}

            
            <FlatList
                data={dataUniNew}
                renderItem={renderItemForUniNew}
                keyExtractor={(item,index) => index.toString()}
            /> 

            {/* <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay} overlayStyle={{borderRadius:15}}>
                <View style={overlayStyle.card}>
                    <Text style={overlayStyle.title}>{titleOverlay}</Text>        
                </View>
            </Overlay> */}

            
            {visibleBlur &&<TouchableWithoutFeedback onPress={() =>{
                setVisibleBlur(false);
            }}>

                <BlurView intensity={98} style={[StyleSheet.absoluteFill, styles.nonBlurredContent,blurStyle.container]}>
                    <TouchableOpacity style={blurStyle.card} 
                        onPress={() =>{
                            Linking.openURL(urlOverlay);
                        }}
                    >
                        <Text style={blurStyle.title}>{titleOverlay}</Text>        
                    </TouchableOpacity>

                    <TouchableOpacity style={blurStyle.card}
                        onPress={() =>{
                            navigation.navigate("Add Event");
                        }}>
                            
                        <View style={{flexDirection:'row'}}>
                            <FontAwesome name="calendar" size={20} color="#777777" />     
                            <Text style={{marginLeft : 30, marginTop :2}}>Tạo lịch cho sự kiện này</Text>    
                            <Entypo style={blurStyle.onTheRight} name="chevron-thin-right" size={18} color="#999999" />
                        </View>
                            
                    </TouchableOpacity>
                </BlurView>
            </TouchableWithoutFeedback>}

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderBottomWidth:1,
        borderBottomColor: "#cccccc",
        paddingBottom:5,
    },

    onTheRight: {
        position: 'absolute',
        right: 5
    },

    title: {
        fontWeight:'bold',
        marginRight:30,
        marginLeft:15
    },

    info: {
        justifyContent: 'center',
        marginVertical:10
    },

    date: {
        marginRight:30,
        marginLeft:15,
        fontSize:12
    }
});

const skeletonLoading = StyleSheet.create({

    info: {
        marginVertical:10,
        marginLeft:15,
        width:'87%',
        height:20
    },

    secondLine:{
        width:'70%',
        marginTop:0
    },

    onTheRightArrow: {
        width:'6%',
        alignSelf: 'flex-end',
        marginTop:-45,
        marginRight:5
    },

    date: { 
        width:'20%',
        height:14
    },

});

const blurStyle = StyleSheet.create({
    container: {
        justifyContent:'center',
        paddingHorizontal:10
    },

    card: {
        width: '100%',
        backgroundColor:'white',
        borderRadius:15,
        paddingVertical:15,
        paddingHorizontal:10,
        marginBottom:10
    },

    title: {
        fontWeight:'bold',
    },

    onTheRight: {
        position: 'absolute',
        right: 5
    },

});

export default UniversityNewScreen;
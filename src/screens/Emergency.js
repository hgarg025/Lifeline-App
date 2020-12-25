import React, { useEffect, useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { StyleSheet, Text, View,Image } from "react-native";
import { API_KEY } from "../../API";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SMS from "expo-sms";
import * as Location from "expo-location";
import colors from '../styles/colors';

const Emergency = (props) => {
    const [currLat,setLat] = useState(0);
    const [currLng,setLng] = useState(0);
    const [datas, setDatas] = useState([]);
    const [data0, setData0] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const getResult = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude);
            setLng(location.coords.longitude);
            const hospitalObject = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=500&type=hospital&accuracy=high&sensor=true&key=${API_KEY}`
            );
            const hospitals = await hospitalObject.json();
            // console.log("\n\n\nHello 1")
            // console.log(hospitals.results[7].types)
            const arr = [];
            for (let index = 0; index < hospitals.results.length; index++) {
                const element = hospitals.results[index].geometry.location;
                arr.push(element);
            }
            setDatas(arr);
            setData0(hospitals.results[0].geometry.location);
            setData1(hospitals.results[10].geometry.location);
            setData2(hospitals.results[1].geometry.location);
            setData3(hospitals.results[9].geometry.location);
            setData4(hospitals.results[8].geometry.location);
            // setData0({
            //     lat: 29.9739549,
            //     lng: 76.8425455,
            // });
            // setData1({
            //     lat: 29.9711783,
            //     lng: 76.8442121,
            // });
            // setData2({
            //     lat: 29.9725732,
            //     lng: 76.8431573,
            // });
            // setData3({
            //     lat: 29.9713731,
            //     lng: 76.84288839999999,
            // });
            // setData4({
            //     lat: 29.971388,
            //     lng: 76.843222,
            // });
            // console.log(x)
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    };

    useEffect(() => {
        getResult();
    }, []);

    function compare(a, b) {
        // console.log(a.lat)
        if (a.dist < b.dist) {
            return -1;
        }
        if (a.lat > b.lat) {
            return 1;
        }
        return 0;
    }

    const closestHospitals = [];

    function findNearset(datas) {
        for (let i = 0; i < datas.length; i++) {
            const temp = {};
            const x = datas[i].lat;
            const y = datas[i].lng;
            const dist = (currLat - x) ** 2 + (currLng - y) ** 2;
            temp["dist"] = dist;
            temp["lat"] = x;
            temp["lng"] = y;
            closestHospitals.push(temp);
        }
    }

    const data = [data0, data1, data2, data3, data4];
    // data.sort(compare)
    findNearset(datas);
    closestHospitals.sort(compare);
    // console.log(closestHospitals[0].lat)
    const hsp = [
        {
            name: "1",
            latitude: parseFloat(JSON.stringify(data[0].lat)),
            longitude: parseFloat(JSON.stringify(data[0].lng)),
        },
        {
            name: "2",
            latitude: parseFloat(JSON.stringify(data[2].lat)),
            longitude: parseFloat(JSON.stringify(data[2].lng)),
        },
        {
            name: "3",
            latitude: parseFloat(JSON.stringify(data[1].lat)),
            longitude: parseFloat(JSON.stringify(data[1].lng)),
        },
        {
            name: "4",
            latitude: parseFloat(JSON.stringify(data[4].lat)),
            longitude: parseFloat(JSON.stringify(data[4].lng)),
        },
        {
            name: "5",
            latitude: parseFloat(JSON.stringify(data[3].lat)),
            longitude: parseFloat(JSON.stringify(data[3].lng)),
        },
    ];
    // console.log(hsp)

    const state = {
        coordinates1: [
            { name: "1", latitude: data0.lat, longitude: data0.lng },
            { name: "3", latitude: data2.lat, longitude: data2.lng },
            { name: "2", latitude: data1.lat, longitude: data1.lng },
            { name: "5", latitude: data4.lat, longitude: data4.lng },
            { name: "4", latitude: data3.lat, longitude: data3.lng },
        ],
    };

    const [mobileNumber, setMobileNumber] = useState("8433038948");
    var bodySMS1 = "Help needed for me at "+currLat.toString()+" , "+currLng.toString()+" .";
    var bodySMS2 = "Help needed for some other person at "+currLat.toString()+" , "+currLng.toString()+" .";
    const initiateSMS1 = () => {
        SMS.sendSMSAsync([mobileNumber], bodySMS1);
    };
    const initiateSMS2 = () => {
        SMS.sendSMSAsync([mobileNumber], bodySMS2);
    };
   if(datas.length === 0)
   return (
       <View style={styles.bgc}>
           <View style={styles.view1}>
           <Text style={styles.text1}>Fetching Nearest Hospitals.....</Text>
       </View>
       <Image
                    source={require('../img/car1.png')}
                    style={styles.logo}    
                />
       </View>
   )
    return (
        <View>
            <View>
                <MapView
                    region={{
                        latitude: currLat,
                        longitude: currLng,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0021,
                    }}
                    style={styles.mapStyle}
                >
                    <Polygon coordinates={hsp} />
                    <Marker
                        coordinate={{ latitude: currLat, longitude: currLng }}
                        title="you"
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.stringify(data0.lat)),
                            longitude: parseFloat(JSON.stringify(data0.lng)),
                        }}
                        title="Help Center"
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.stringify(data1.lat)),
                            longitude: parseFloat(JSON.stringify(data1.lng)),
                        }}
                        title="Help Center"
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.stringify(data2.lat)),
                            longitude: parseFloat(JSON.stringify(data2.lng)),
                        }}
                        title="Help Center"
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.stringify(data3.lat)),
                            longitude: parseFloat(JSON.stringify(data3.lng)),
                        }}
                        title="Help Center"
                    />
                    <Marker
                        coordinate={{
                            latitude: parseFloat(JSON.stringify(data4.lat)),
                            longitude: parseFloat(JSON.stringify(data4.lng)),
                        }}
                        title="Help Center"
                    />
                </MapView>
                <View style={styles.textWrapper}>
                <TouchableOpacity
                        style={styles.textWrapperEmer}
                        onPress={() => props.navigation.navigate("HELP")}
                    >
                        <Text style={styles.textEmer}>Emergency Contacts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.textWrapperSms1}
                        onPress={initiateSMS1}
                    >
                        <Text style={styles.textEmer}>Send SMS for YOU</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.textWrapperSms2}
                        onPress={initiateSMS2}
                    >
                        <Text style={styles.textEmer}>Send SMS for OTHER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 20,
        marginLeft : 95
    },
    bgc:{
        flex: 1,
        display: 'flex',
        backgroundColor: colors.green01,
    },
    view1: {
        margin: 60
      },
    text1: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.white
      },
    text: {
        fontSize: 40,
        fontWeight: "bold",
        // marginTop: 60,
    },
    textEmer: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        margin: 10,
        textAlign: 'center',
    },
    textWrapper: {
        position: "absolute",
        width: "100%",
        alignItems: "stretch"
    },
    mapStyle: {
        width: "100%",
        height: "100%",
    },
    textWrapperButtons: {
        alignItems: "center" ,
        flex: 1,
        //flexDirection: "row",
    },
    textWrapperEmer: {
        backgroundColor: "rgba(235, 113, 82, 1)",
        width: "100%",
    },
    textWrapperSms1: {
        backgroundColor: "rgba(18, 190, 224, 1)",
        width: "100%",
    },
    textWrapperSms2: {
        backgroundColor: '#5D5EF5',
        width: "100%",
    },
});

export default Emergency;
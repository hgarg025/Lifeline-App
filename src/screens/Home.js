import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        elementType: "labels",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#bdbdbd",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#329c47",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1b1b1b",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#2c2c2c",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8a8a8a",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#373737",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#3c3c3c",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#4e4e4e",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#2db9fa",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3d3d3d",
            },
        ],
    },
];
export default class Home extends Component {
    state = {
        mapRegion: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        locationResult: null,
        location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    };

    componentDidMount() {
        this._getLocationAsync();
    }

    // _handleMapRegionChange = mapRegion => {
    //   this.setState({ mapRegion });
    // };

    _getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
            this.setState({
                locationResult: "Permission to access location was denied",
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);
        this.setState({ locationResult: JSON.stringify(location), location });
    };

    render() {
        return (
            <View>
                <View>
                    <MapView
                        // style={{ alignSelf: 'stretch', height: '100%' }}
                        style={styles.mapStyle}
                        region={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // onRegionChange={this._handleMapRegionChange}
                        // customMapStyle={mapStyle}
                    >
                        <Marker
                            coordinate={this.state.location.coords}
                            title="Safe Driving"
                            description="You are here"
                        >
                            <Image
                                source={require("../img/marker.jpg")}
                                style={{ height: 50, width: 50 }}
                            />
                        </Marker>
                    </MapView>
                    <View style={styles.textWrapper}>
                        <Text style={styles.text}>You Are Safe!!!</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.textWrapperEmer}
                        onPress={() =>
                            this.props.navigation.navigate("EMERGENCY")
                        }
                    >
                        <Text style={styles.textEmer}>Emergency</Text>
                    </TouchableOpacity>
                </View>

                {/* <Text style={{zIndex: 5044}}>
                Location: {this.state.locationResult}
            </Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: "bold",
        // marginTop: 60,
    },
    textEmer: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
    },
    textWrapper: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        //borderRadius: 50,
    },
    textWrapperEmer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "rgba(222, 55, 55, 1)",
        height: "7%",
    },
    mapStyle: {
        width: "100%",
        height: "93%",
    },
});
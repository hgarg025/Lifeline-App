import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from '../containers/Home';
import Fog from "../screens/Fog";
import Help from "../screens/Help";
import Metrics from "../screens/Metrics";
import Emergency from "../screens/Emergency";
import colors from "../styles/colors";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();
const tintColor = colors.green01;
function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                tabStyle: { margin: 6 },
                activeTintColor: colors.green01,
            }}
        >
            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" size={22} color={tintColor} />
                    ),
                }}
            />
            <Tab.Screen
                name="FOG"
                component={Fog}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="cloud" size={22} color={tintColor} />
                    ),
                }}
            />
            <Tab.Screen
                name="HELP"
                component={Help}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="phone" size={22} color={tintColor} />
                    ),
                }}
            />
            <Tab.Screen
                name="METRICS"
                component={Metrics}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="line-chart" size={22} color={tintColor} />
                    ),
                }}
            />
            <Tab.Screen
                name="EMERGENCY"
                component={Emergency}
                options={{
                    tabBarIcon: ({ tintColor }) => (
                        <Icon name="medkit" size={22} color={tintColor} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const LoggedInTabNavigator = () => {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabWrapper: {
        marginBottom: 5,
        fontWeight: "700",
    },
});

export default LoggedInTabNavigator;

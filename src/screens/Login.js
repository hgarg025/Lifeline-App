import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import colors from "../styles/colors";
import InputField from "../components/form/InputField";
import NextArrowButton from "../components/buttons/NextArrowButton";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import NavBarButton from "../components/buttons/NavBarButtons";
import AsyncStorage from "@react-native-community/async-storage";

const Login = (props) => {
    const [formValid, setFormValid] = useState(true);
    const [validEmail, setValidEmail] = useState(false);
    const [email, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);

    const sendCred = async (props) => {
        console.log(email, password);
        fetch("http://192.168.43.57:3000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                // console.log(data)
                try {
                    await AsyncStorage.setItem("token", data.token);
                    props.navigation.replace("LoggedInTabNavigator");
                } catch (e) {
                    setLoadingVisible(false);
                    setFormValid(false);
                    console.log("Some error ", e);
                }
            });
    };

    handleNextButton = () => {
        setLoadingVisible(true);

        setTimeout(() => {
            // sendCred(props);
            if (email == "hgarg@gmail.com" && password == "harshit") {
                props.navigation.replace("LoggedInTabNavigator");
            } else {
                setLoadingVisible(false);
                setFormValid(false);
            }
        }, 2000);
    };

    handleCloseNotification = () => {
        setFormValid(true);
    };

    handleEmailChange = (email) => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailAddress(email);
        if (!validEmail) {
            if (emailCheckRegex.test(email)) {
                setValidEmail(true);
            }
        } else {
            if (!emailCheckRegex.test(email)) {
                setValidEmail(false);
            }
        }
    };

    handlePasswordChange = (password) => {
        setPassword(password);
        if (!validPassword) {
            if (password.length > 4) {
                setValidPassword(true);
            }
        } else if (password.length <= 4) {
            setValidPassword(false);
        }
    };

    toggleNextButtonState = () => {
        if (validEmail && validPassword) {
            return false;
        }
        return true;
    };

    const showNotification = formValid ? false : true;
    const background = formValid ? colors.green01 : colors.darkOrange;

    return (
        <KeyboardAvoidingView
            style={[{ backgroundColor: background }, styles.wrapper]}
            behavior=""
        >
            <View style={styles.scrollViewWrapper}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.loginHeader}>Log In</Text>
                    <InputField
                        labelText="EMAIL ADDRESS"
                        labelTextSize={14}
                        labelColor={colors.white}
                        textColor={colors.white}
                        bottomBorderColor={colors.white}
                        inputType="email"
                        customStyle={{ marginBottom: 30 }}
                        onChangeText={handleEmailChange}
                        showCheckmark={validEmail}
                        autoFocus={true}
                    />
                    <InputField
                        labelText="PASSWORD"
                        labelTextSize={14}
                        labelColor={colors.white}
                        textColor={colors.white}
                        bottomBorderColor={colors.white}
                        inputType="password"
                        customStyle={{ marginBottom: 30 }}
                        onChangeText={handlePasswordChange}
                        showCheckmark={validPassword}
                    />
                </ScrollView>
                <View style={styles.nextButton}>
                    <NextArrowButton
                        handleNextButton={handleNextButton}
                        disabled={toggleNextButtonState()}
                    />
                </View>
                <View style={styles.notificationWrapper}>
                    <Notification
                        showNotification={showNotification}
                        handleCloseNotification={handleCloseNotification}
                        type="Error"
                        firstLine="Those credentials don't look right."
                        secondLine="Please try again."
                    />
                </View>
            </View>
            <Loader animationType="fade" modalVisible={loadingVisible} />
        </KeyboardAvoidingView>
    );
};

Login["navigationOptions"] = (props) => ({
    headerRight: () => (
        <NavBarButton
            handleButtonPress={() =>
                props.navigation.navigate("ForgotPassword")
            }
            location="right"
            color={colors.white}
            text="Forgot Password?"
        />
    ),
    headerTintColor: colors.white,
});

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flex: 1,
        paddingTop: 40,
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1,
    },
    loginHeader: {
        fontSize: 30,
        color: colors.white,
        fontWeight: "300",
        marginBottom: 40,
    },
    notificationWrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
});

export default Login;

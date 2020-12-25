import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from "react-native";
import { withNavigation } from "react-navigation";
import colors from "../styles/colors";
import PhoneCall from "./PhoneCall";

const Help = ({ navigation }) => {
    const [mobileNumber1, setMobileNumber1] = useState("9953902119");
    const [mobileNumber2, setMobileNumber2] = useState("");
    const [mobileNumber3, setMobileNumber3] = useState("");
    const [name1, setname1] = useState("Harshit Garg");
    const [name2, setname2] = useState("");
    const [name3, setname3] = useState("");
    const [Number1, setNumber1] = useState("9953902119");
    const [Number2, setNumber2] = useState("");
    const [Number3, setNumber3] = useState("");
    return (
        <ScrollView>
            <View style={{ marginBottom: 20, marginRight: 10, marginLeft: 10 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.components}>
                            <Text style={styles.title}>
                                Emergency Contact 1
                            </Text>
                            <TouchableOpacity>
                                <PhoneCall contactNo={Number1} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setname1(text)}
                            value={name1}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setMobileNumber1(text)}
                            value={mobileNumber1}
                        />
                        
                    </View>
                    <View style={styles.container}>
                        <View style={styles.components}>
                            <Text style={styles.title}>
                                Emergency Contact 2
                            </Text>
                            <TouchableOpacity>
                                <PhoneCall contactNo={Number2} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setname2(text)}
                            value={name2}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setMobileNumber2(text)}
                            value={mobileNumber2}
                        />
                        <Button
                            title="Save"
                            onPress={() => setNumber2(mobileNumber2)}
                        />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.components}>
                            <Text style={styles.title}>
                                Emergency Contact 3
                            </Text>
                            <TouchableOpacity>
                                <PhoneCall contactNo={Number3} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setname3(text)}
                            value={name3}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 0.4,
                                paddingLeft: 10,
                            }}
                            onChangeText={(text) => setMobileNumber3(text)}
                            value={mobileNumber3}
                        />
                        <Button
                            title="Save"
                            onPress={() => setNumber3(mobileNumber3)}
                        />
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    marginTop: 30,
                    marginHorizontal: 30,
                    marginBottom: 30,
                }}
            ></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        marginTop: 50,
    },
    wrapper2: {
        display: "flex",
        flexDirection: "row",
    },
    text1: {
        // marginTop: 10,
        marginLeft: 10,
        fontSize: 22,
        fontWeight: "bold",
    },
    text2: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "500",
    },
    button: {
        marginHorizontal: 50,
        marginTop: 30,
        backgroundColor: colors.green01,
        color: colors.green01,
    },
    components: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "#f4511e",
        borderWidth: 3,
        padding: 10,
        marginBottom: 10,
    },
    container: {
        margin: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
});

export default withNavigation(Help);
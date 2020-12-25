import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
import NextArrowButton from '../components/buttons/NextArrowButton';
import { transparentHeaderStyle } from '../styles/navigation';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

export default class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => ({
        // headerRight: () => <NavBarButton handleButtonPress={() => navigation.navigate('ForgotPassword')} location='right' color={colors.white} text="Forgot Password?"/>,
        // headerStyle: [{backgroundColor: 'transparent'}],
        headerTintColor: colors.white
    })
    constructor(props){
        super(props)
        this.state = {
            formValid: true,
            loadingVisible: false,
            validEmail: false,
            emailAddress: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }
    handleEmailChange(email) {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            emailAddress: email,
        })
        if(!this.state.validEmail){
            if(emailCheckRegex.test(email)){
                this.setState({validEmail: true})
            }
        } else {
            if(!emailCheckRegex.test(email)){
                this.setState({validEmail: false})
            } 
        }
    }
    handleCloseNotification() {
        this.setState({
            formValid: true
        })
    }
    goToNextStep() {
        this.setState({loadingVisible: true});
        setTimeout(() => {
            if(this.state.emailAddress === 'wrong@gmail.com'){
                // alert('Success')
                this.setState({formValid: false, loadingVisible: false})
            } else {
                this.setState({formValid: true, loadingVisible: false})
            }
        }, 2000);
    }
    render() {
        const {loadingVisible, validEmail, formValid} = this.state;
        const background = formValid ? colors.green01 : colors.darkOrange;
        const showNotification = formValid ? false : true;
        return (
            <KeyboardAvoidingView style={[{backgroundColor: background},styles.wrapper]} behavior="">
                <View style={styles.scrollViewWrapper}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.forgotPasswordHeading}>Forgot your Password?</Text>
                        <Text style={styles.forgotPasswordSubheading}>Enter your email to reset the password</Text>
                        <InputField
                            customStyle={{marginBottom: 30}}
                            textColor={colors.white}
                            labelText="Email Address"
                            labelTextSize={14}
                            labelColor={colors.white}
                            bottomBorderColor={colors.white}
                            inputType="email"
                            onChangeText={this.handleEmailChange}
                            showCheckmark={validEmail}
                            autoFocus={true}
                        />
                    </ScrollView>
                    <NextArrowButton
                        handleNextButton={this.goToNextStep}
                        disabled={!validEmail}
                    />
                    <View style={styles.notificationWrapper}>
                        <Notification
                            showNotification={showNotification}
                            handleCloseNotification={this.handleCloseNotification}
                            type="Error"
                            firstLine="No account exists"
                            secondLine="."
                        />
                    </View>
                </View>
                <Loader
                    animationType="fade"
                    modalVisible={loadingVisible}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        paddingTop: 40,
    },
    // form: {
    //     marginTop: 90,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    //     flex: 1,
    // },
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
    forgotPasswordHeading: {
        fontSize: 28,
        color: colors.white,
        fontWeight: '300',
    },
    forgotPasswordSubheading: {
        fontSize: 15,
        color: colors.white,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 60,
    },
    notificationWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
})
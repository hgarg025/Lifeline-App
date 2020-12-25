import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../components/buttons/RoundedButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { transparentHeaderStyle } from '../styles/navigation';
import NavBarButton from '../components/buttons/NavBarButtons';

const LoggedOut = (props) => {
    
    onFacebookPress = () => {
        alert('Facebook button')
    }

    onCreateAccountPress = () => {
        props.navigation.navigate('Signup')
    }

    onMoreOptionsPress = () => {
        alert('More options')
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.welcomeWrapper}>
                <Image
                    source={require('../img/car1.png')}
                    style={styles.logo}    
                />
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.lifeline}>LIFELINE</Text>
                <RoundedButton
                    text="Create Account"
                    textColor={colors.white}
                    handleOnPress={onCreateAccountPress}
                />
                <View style={styles.termAndConditions}>
                    <Text style={styles.termsText}>By Creating an Account or Logging In</Text>
                    <Text style={styles.termsText}>You agree to LifeLine's </Text>
                    <TouchableHighlight style={styles.linkButton}>
                        <Text style={styles.termsText}>Terms of service</Text>
                    </TouchableHighlight>
                    <Text style={styles.termsText}>, </Text>
                    <TouchableHighlight style={styles.linkButton}>
                        <Text style={styles.termsText}>Payments Terms of service</Text>
                    </TouchableHighlight>
                    <Text style={styles.termsText}>, </Text>
                    <TouchableHighlight style={styles.linkButton}>
                        <Text style={styles.termsText}>Privacy Policy</Text>
                    </TouchableHighlight>
                    <Text style={styles.termsText}>,</Text>
                    <TouchableHighlight style={styles.linkButton}>
                        <Text style={styles.termsText}>Nondiscrimination Policy</Text>
                    </TouchableHighlight>
                    <Text style={styles.termsText}>.</Text>
                </View>
            </View>
        </View>
    )    
}

LoggedOut['navigationOptions'] = (props) => ({
    headerRight: () => <NavBarButton handleButtonPress={() => props.navigation.navigate('Login')} location='right' color={colors.white} text="Log In"/>,
    headerStyle: transparentHeaderStyle,
    headerTintColor: colors.white,
})

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.green01,
    },
    welcomeWrapper: {
        flex: 1,
        display: 'flex',
        marginTop: 50,
        padding: 30,
    },
    welcomeText: {
        fontSize: 50,
        color: colors.white,
        fontWeight: '900',
        marginLeft: 15
    },
    facebookButtonIcon: {
        color: colors.green01,
        position: 'relative',
        left: 20,
        zIndex: 8
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginBottom: 20,
        marginLeft : 95
    },
    moreOptionsButton: {
        marginTop: 10,
        width: 125
    },
    moreOptionsButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    termAndConditions: {
        textAlign: 'justify',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 70,
        marginLeft: 28
    },
    termsText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    linkButton: {
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    lifeline:
    {
        fontSize: 65,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 30,
        marginLeft: 15
    }
});

export default LoggedOut
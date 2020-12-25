import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

export default class InputField extends Component {
    constructor(props){
        super(props);
        this.state = {
            secureInput: props.inputType === 'text' || props.inputType === 'email' ? false : true,
            scaleCkeckmarkValue: new Animated.Value(0),
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
        // this.scaleCheckmark = this.scaleCheckmark.bind(this)
    }
    scaleCheckmark(value) {
        // const { positionValue } = this.state;
        Animated.timing(
            this.state.scaleCkeckmarkValue,
            {
                toValue: value,
                duration: 400,
                easing: Easing.easeOutBack,
                useNativeDriver: false,
            }
        ).start();
    }
    toggleShowPassword() {
        this.setState({
            secureInput: !this.state.secureInput,
        })
    }
    render() {
        const {labelText, labelTextSize, labelColor, textColor, bottomBorderColor, inputType, customStyle, onChangeText, showCheckmark, autoFocus, autoCapitalize} = this.props;
        const {secureInput, scaleCkeckmarkValue} = this.state;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor = textColor || colors.white;
        const borderBottom = bottomBorderColor || 'transparent';
        // change the keyboard if input field is email
        const keyboardType = inputType === 'email' ? 'email-address' : 'default';

        const iconScale = scaleCkeckmarkValue.interpolate({
            inputRange: [0,0.5,1],
            outputRange: [0,1.6,1],
        })
        const scaleValue = showCheckmark ? 1 : 0;
        this.scaleCheckmark(scaleValue);
        return (
            <View style={[customStyle, styles.wrapper]}>
                <Text style={[{color, fontSize},styles.label]}>{labelText}</Text>
                {inputType === 'password' ? (
                    <TouchableOpacity style={styles.showButton} onPress={this.toggleShowPassword}>
                        <Text style={styles.showButtonText}>{secureInput ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                ) : (
                    null
                )}
                <Animated.View style={[{transform: [{scale: iconScale}]},styles.checkmarkWrapper]}>
                    <Icon
                        name="check"
                        color={colors.white}
                        size={20}
                    />
                </Animated.View>
                <TextInput
                    style={[{color: inputColor, borderBottomColor: borderBottom},styles.inputField]}
                    secureTextEntry={secureInput}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                />
            </View>
        )
    }
}

InputField.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
    bottomBorderColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    showCheckmark: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    autoCapitalize: PropTypes.bool,
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
    },
    label: {
        fontWeight: '700',
        marginBottom: 20,
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    showButton: {
        position: 'absolute',
        right: 0,
    },
    showButtonText: {
        color: colors.white,
        fontWeight: '700',
    },
    checkmarkWrapper: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
})
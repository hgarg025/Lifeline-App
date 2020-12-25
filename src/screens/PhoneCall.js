import React, { Component } from "react";
import {Linking,Platform,TouchableOpacity,Text} from "react-native";
import PropTypes from 'prop-types';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PhoneCall extends Component {

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    render(){
        const { contactNo } = this.props;
        return(
            <TouchableOpacity
                style={{
                    // position: 'relative',
                    // height: 30,
                    // width: 100,
                    backgroundColor: colors.green01,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 10,
                    paddingRight: 10
                }}
                onPress={()=>{this.dialCall(contactNo)}}
            >
                <Icon name="phone" style={{ color: colors.white,fontSize: 25}}/>
            </TouchableOpacity>
        )
    }

}

PhoneCall.propTypes = {
    contactNo: PropTypes.number,
};
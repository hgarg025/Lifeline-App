import React, {Component} from 'react'
import {ScrollView,Text, StyleSheet, View} from 'react-native'
import {LineChart } from "react-native-chart-kit";

export default class Metrics extends Component {
    render() {
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
 
        return (
            <ScrollView style={styles.container} >
              <View style={styles.fit}>
              <Text style={styles.text}>You are fit to drive....</Text>
              </View>   
  <Text>Drowsiness Level</Text>
  <LineChart
    data={{
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={350} // from react-native
    height={220}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      
    }}
  />
  <Text>Accident Probability</Text>
  <LineChart
    data={{ 
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={350} // from react-native
    height={220}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8
    }}
  />
  </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        marginTop: 10
    },
    text:{
      fontSize: 40,
    color: '#000',
    fontWeight: "bold",
    textAlign: 'center',
    },
    fit:{
      margin: 15
    }
});
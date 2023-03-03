import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({message}) => {
  return (
    <View style={styles.LoaderContainer}>
      <ActivityIndicator size={70} color="pink" />
      <Text style={{ textAlign: 'center', marginTop: 10 }}>{message}</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  LoaderContainer:{
    height:'100%',
    justifyContent:'center'
  }
})
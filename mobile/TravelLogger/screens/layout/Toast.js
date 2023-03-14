import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pinkTextColor } from './constants'
import { toast } from '../../redux/slices/UtilsSlices/ToastReducer'

const Toast = () => {
    const { message } = useSelector(state => state.ToastReducer)
    const dispatch = useDispatch()
    return (
        <>
            {
               message &&
                <View style={styles.toastCotainer}>
                    <Text style={styles.toastMessage}>{message}</Text>
                    <TouchableOpacity
                    onPress={()=>{
                        dispatch(toast())
                    }}
                    ><Text style={styles.toastMessageX}>X</Text></TouchableOpacity>
                </View>
            }
        </>
    )
}

export default Toast

const styles = StyleSheet.create({
    toastCotainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: pinkTextColor,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    toastMessage: {
        color: 'white'
    },
    toastMessageX: {
        color: 'white',
        marginRight:25
    }
})
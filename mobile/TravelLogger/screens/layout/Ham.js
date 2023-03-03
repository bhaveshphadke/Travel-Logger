import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcon } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { pinkTextColor } from './constants';
const Ham = ({ navigation }) => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const fetchuser = useSelector(state => state.FetchUserReducer)
    // const HamToggle = async () => {

    //     setShow(!show)

    // }
    const click = async (page) => {
        // setShow(!show)
        dispatch(FetchUser())
        navigation.navigate(page)
    }
    return (
        <View style={styles.Container}>
                <View style={styles.Icons}>
                    {fetchuser && !fetchuser.success && <TouchableOpacity onPress={() => {
                        click('Login')
                    }}><AntDesign name="login" size={24} color="#ff6580" style={styles.Icon} /></TouchableOpacity>}

                    {fetchuser && !fetchuser.success && <TouchableOpacity onPress={() => {
                        click('Signup')
                    }}><AntDesign name="adduser" size={24} color="#ff6580" style={styles.Icon} /></TouchableOpacity>}


                    {fetchuser && fetchuser.success && <TouchableOpacity onPress={() => {
                        click('me')
                    }}><AntDesign name="profile" size={24} color="#ff6580" style={styles.Icon} /></TouchableOpacity>}

                    {fetchuser && fetchuser.success && <TouchableOpacity onPress={async () => {
                        await AsyncStorage.removeItem('token')
                        dispatch(FetchUser())
                        navigation.navigate('Home')

                    }}><AntDesign name="logout" size={24} color="#ff6580" style={styles.Icon} /></TouchableOpacity>}

                    {fetchuser && fetchuser.success && fetchuser.user && fetchuser.user.isAdmin && <TouchableOpacity onPress={async () => {
                        dispatch(FetchUser())
                        navigation.navigate('Users')

                    }}>
                        <FontAwesome name="users" size={24} color="#ff6580" style={styles.Icon} />
                    </TouchableOpacity>}
                </View>
        </View>
    )
}

export default Ham

const styles = StyleSheet.create({
    Container: {
        height: '7%',
        position: 'absolute',
        width: '100%',
        zIndex:1,
        bottom: 0,
        // backgroundColor:'red'
        borderTopColor:'pink',
        borderWidth:1,
        backgroundColor:'white'


    },
    Icon: {
        marginHorizontal: 10,
        marginVertical: 10,
        // backgroundColor:'yellow'
    },
    Icons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    }
})
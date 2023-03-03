import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice'
import Loader from '../layout/Loader'
import { ForgetPassword } from '../../redux/slices/UserSlices/ForgetPasswordSlice'
import { pinkTextColor } from '../layout/constants'
const ForgetPasswordScreen = () => {
    const [username, setUsername] = useState("")
    const { message, success, loading } = useSelector(state => state.ForgetPasswordReducer)
    const fetchuser = useSelector(state => state.FetchUserReducer)
    const dispatch = useDispatch()
    const onSubmit = async () => {
        const res = await dispatch(ForgetPassword({ username }))
        dispatch(FetchUser())

        // if (res && res.payload.success) {
        //     navigation.navigate('Home')
        // }
        Alert.alert(res.payload.message)

    }
    useEffect(() => {
        if (fetchuser && fetchuser.success) {
            navigation.navigate('Home')
        }
    }, [fetchuser])
    return (
        <View>
            {
                loading ?
                    <Loader message={message} />
                    :
                    <View style={styles.ForgetPasswordContainer}>
                        <View style={styles.Heading}>
                            <Text style={styles.HeaadingText}>
                                ForgetPassword
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                style={styles.UserInput}
                                placeholder="Username"
                            />
                        </View>

                        <View style={styles.ForgetPasswordButtonView}>
                            <TouchableOpacity
                                style={styles.ForgetPasswordButton}
                                onPress={onSubmit}
                            >
                                <Text style={{ textAlign: 'center' }}>ForgetPassword</Text>
                            </TouchableOpacity>
                           
                        </View >
                    </View>


            }
        </View>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    ForgetPasswordContainer: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100
    },
    Heading: {
        textAlign: 'center'
    },
    HeaadingText: {
        fontSize: 35,
        textAlign: 'center',
        color:`${pinkTextColor}`
    },
    UserInput: {
        borderWidth: 1,
        borderColor: '#ffc0cb',
        marginTop: 20,
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 2
    },
    ForgetPasswordButtonView: {

    },
    ForgetPasswordButton: {
        marginTop: 20,
        backgroundColor: '#ffc0cb',
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})
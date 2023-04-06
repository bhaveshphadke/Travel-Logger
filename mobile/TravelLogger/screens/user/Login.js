import { ActivityIndicator, Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../redux/slices/UserSlices/LoginSlice'
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice'
import Loader from '../layout/Loader'
import { pinkTextColor } from '../layout/constants'
import { toast } from '../../redux/slices/UtilsSlices/ToastReducer'
const Login = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { message, success, loading } = useSelector(state => state.LoginReducer)
    const fetchuser = useSelector(state => state.FetchUserReducer)
    const dispatch = useDispatch()
    const onSubmit = async () => {
        const res = await dispatch(LoginUser({ username, password }))
        dispatch(FetchUser())
        dispatch(toast(res.payload.message))
    }
    return (

        <View>
            {
                loading ?
                    <Loader message={message} />
                    :
                    <KeyboardAvoidingView style={styles.LoginContainer}>
                        <View style={styles.Heading}>
                            <Text style={styles.HeaadingText}>
                                Login
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
                        <View>
                            <TextInput
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                style={styles.UserInput}
                                placeholder="Password"
                            />
                        </View>
                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity
                                style={styles.LoginButton}
                                onPress={onSubmit}
                            >
                                <Text style={{ textAlign: 'center' }}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Forget Password')
                            }}><Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 10 }}>forget password?</Text></TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView >
            }
        </View >

    )
}

export default Login

const styles = StyleSheet.create({
    LoginContainer: {
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
        color: `${pinkTextColor}`
    },
    UserInput: {
        borderBottomWidth: 1,
        borderColor: '#ffc0cb',
        marginTop: 20,
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 2
    },
    LoginButtonView: {

    },
    LoginButton: {
        marginTop: 20,
        backgroundColor: '#ffc0cb',
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})
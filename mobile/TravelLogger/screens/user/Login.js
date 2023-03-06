import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../redux/slices/UserSlices/LoginSlice'
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice'
import Loader from '../layout/Loader'
import { pinkTextColor } from '../layout/constants'
const Login = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { message, success, loading } = useSelector(state => state.LoginReducer)
    const fetchuser = useSelector(state => state.FetchUserReducer)
    const dispatch = useDispatch()
    const onSubmit = async () => {
        const res = await dispatch(LoginUser({ username, password }))
        dispatch(FetchUser())
        if (res && res.payload.success) {
            navigation.navigate('Home')
        }
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
                    <View style={styles.LoginContainer}>
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
                                navigation.navigate('ForgetPassword')
                            }}><Text style={{ color: 'blue', textDecorationLine: 'underline', marginTop: 10 }}>forget password?</Text></TouchableOpacity>
                        </View>

                    </View >
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
    LoginButtonView: {

    },
    LoginButton: {
        marginTop: 20,
        backgroundColor: '#ffc0cb',
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})
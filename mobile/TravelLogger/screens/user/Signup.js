import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice'
import { SignupUser } from '../../redux/slices/UserSlices/SignupSlice'
import Loader from '../layout/Loader'
import { pinkTextColor } from '../layout/constants'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const Signup = ({ navigation }) => {
    const [avatar, setAvatar] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { message, success,
        loading } = useSelector(state => state.SignupUserReducer)
    const fetchuser = useSelector(state => state.FetchUserReducer)
    const dispatch = useDispatch()
    const onSubmit = async () => {
        const res = await dispatch(SignupUser({ username, email, password,avatar }))
        dispatch(FetchUser())

        if (res && res.payload.success) {
            navigation.navigate('Home')
        }
        Alert.alert(res.payload.message)

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
            setAvatar(`data:image/png;base64,${base64}`)
        }
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
                    <View style={styles.SignupContainer}>
                        <View style={styles.Heading}>
                            <Text style={styles.HeaadingText}>
                                Signup
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
                                value={email}
                                onChangeText={setEmail}
                                style={styles.UserInput}
                                placeholder="Email"
                            />
                        </View>
                        <View>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                style={styles.UserInput}
                                placeholder="Password"
                            />
                        </View>
                        <View>
                            <Button
                                title='click me'
                                onPress={pickImage}
                            />
                        </View>

                        <View style={styles.SignupButtonView}>
                            <TouchableOpacity
                                style={styles.SignupButton}
                                onPress={onSubmit}
                            >
                                <Text style={{ textAlign: 'center' }}>Signup</Text>
                            </TouchableOpacity>

                        </View >
                        {
                            avatar &&
                            // <Text></Text>
                           <ScrollView>
                             <View>
                                <Image
                                    style={styles.avatar}
                                    source={{uri:avatar} }
                                />
                                <Text>{avatar}</Text>
                            </View>
                           </ScrollView>
                        }
                    </View>


            }
        </View>
    )
}

export default Signup


const styles = StyleSheet.create({
    SignupContainer: {
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
    SignupButtonView: {

    },
    SignupButton: {
        marginTop: 20,
        backgroundColor: '#ffc0cb',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    avatar: {
        width: 100,
        height: 100
    }
})
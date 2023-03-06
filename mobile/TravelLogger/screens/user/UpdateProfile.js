import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pinkTextColor } from '../layout/constants'
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUsername } from '../../redux/slices/UserSlices/ChangeUsernameSlice';
import { ChangePassword } from '../../redux/slices/UserSlices/ChangePasswordSlice';
import Loader from '../layout/Loader'
const UpdateProfile = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { user } = useSelector(state => state.FetchUserReducer)
  const userReducer = useSelector(state => state.ChangeUsernameReducer)
  const passwordReducer = useSelector(state => state.ChangePasswordReducer)
  const disptach = useDispatch()
  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [])
  return (
    <View style={styles.Container}>
      {
        user &&
        <View>
          <View>
            <Text style={styles.head}>Update Profile</Text>
          </View>
          <View style={styles.inputView}>
            <View style={styles.eachInputView}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Change Username"
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => {
                  disptach(ChangeUsername({ username, oldUsername: user.username }))
                }}
              >
                {
                  userReducer && !userReducer.loading ?
                    <Entypo name="save" size={30} color={pinkTextColor} />
                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>
            </View>
            {userReducer && userReducer.message && <Text>{userReducer.message}</Text>}
            <View style={styles.eachInputView}>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholder="Change Password"
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => {
                  disptach(ChangePassword({ password }))
                }}
              >
                {
                  passwordReducer && !passwordReducer.loading ?

                    <Entypo name="save" size={30} color={pinkTextColor} />

                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>

            </View>
            {
              passwordReducer && passwordReducer.message && <Text>{passwordReducer.message}</Text>
            }
          </View>
        </View>
      }
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  Container: {
    marginTop: 70
  },
  head: {
    textAlign: 'center',
    fontSize: 18,
    color: pinkTextColor
  },
  inputView: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eachInputView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputField: {
    width: '70%',
    borderWidth: 1,
    borderColor: pinkTextColor,
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 5
  },
})
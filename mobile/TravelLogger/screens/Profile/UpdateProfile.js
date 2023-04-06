import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pinkTextColor } from '../layout/constants'
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUsername } from '../../redux/slices/UserSlices/ChangeUsernameSlice';
import { ChangePassword } from '../../redux/slices/UserSlices/ChangePasswordSlice';
import Loader from '../layout/Loader'
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice';
import { toast } from '../../redux/slices/UtilsSlices/ToastReducer';
import Toast from '../layout/Toast';
import { ChangeBio } from '../../redux/slices/ProfileSlices/ChangeBio';
const UpdateProfile = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const { user } = useSelector(state => state.FetchUserReducer)
  const userReducer = useSelector(state => state.ChangeUsernameReducer)
  const passwordReducer = useSelector(state => state.ChangePasswordReducer)
  const disptach = useDispatch()
  useEffect(() => {
    if (user) {
      setUsername(user.username)
      if (user.bio && user.bio.description) {
        setDescription(user.bio.description)
      }
      if (user.bio && user.bio.link) {
        setLink(user.bio.link)
      }
    }
    disptach(toast())
  }, [])

  const ChangeUserNameFunc = async () => {
    const response = await disptach(ChangeUsername({ username, oldUsername: user.username }))
    disptach(toast(response.payload.message))
    disptach(FetchUser())
  }
  const ChangePasswordFunc = async () => {
    const response = await disptach(ChangePassword({ password }))
    disptach(toast(response.payload.message))

    disptach(FetchUser())
  }

  const ChangeBioFunc = async (description, link) => {
    const response = await disptach(ChangeBio({description, link}))
    disptach(toast(response.payload.message))
    disptach(FetchUser())
  }
  return (
    <View style={styles.Container}>
      <Toast />
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
                onPress={ChangeUserNameFunc}
              >
                {
                  userReducer && !userReducer.loading ?
                    <Entypo name="save" size={30} color={pinkTextColor} />
                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>
            </View>




            <View style={styles.eachInputView}>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholder="Change Password"
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={ChangePasswordFunc}
              >
                {
                  passwordReducer && !passwordReducer.loading ?

                    <Entypo name="save" size={30} color={pinkTextColor} />

                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>
            </View>







            <View style={styles.eachInputView}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Change Bio Description"
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => { ChangeBioFunc(description, undefined) }}
              >
                {
                  passwordReducer && !passwordReducer.loading ?

                    <Entypo name="save" size={30} color={pinkTextColor} />

                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>

            </View>




            <View style={styles.eachInputView}>
              <TextInput
                value={link}
                onChangeText={setLink}
                placeholder="Change Link"
                style={styles.inputField}
              />
              <TouchableOpacity
                onPress={() => { ChangeBioFunc(undefined, link) }}
              >
                {
                  passwordReducer && !passwordReducer.loading ?

                    <Entypo name="save" size={30} color={pinkTextColor} />

                    :
                    <ActivityIndicator size={30} color={pinkTextColor} />
                }
              </TouchableOpacity>
            </View>



          </View>
        </View>
      }
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  Container: {
    paddingTop: 70
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
    borderBottomWidth: 1,
    borderColor: pinkTextColor,
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 5
  },
})
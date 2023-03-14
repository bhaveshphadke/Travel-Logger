import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { pinkTextColor } from '../layout/constants'
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice';
import Loader from '../layout/Loader';
// import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user, loading, success } = useSelector(state => state.FetchUserReducer)
    return (
        <ScrollView>

            {
                loading ? <Loader />
                    :
                    <View>
                        {
                            user &&
                            <View>

                                <View style={styles.Container}>
                                    <View style={styles.subContainer}>
                                        <View style={styles.details}>
                                            <View style={styles.imageView}>
                                                <Image
                                                    style={styles.profileImage}
                                                    source={{ uri: user.avatar && user.avatar[0].secure_url }}
                                                />
                                                <Text style={styles.username}>username</Text>
                                            </View>

                                            <View style={styles.followDetails}>
                                                <View style={styles.followDetail}>
                                                    <Text style={styles.followText}>Post</Text>
                                                    <Text style={styles.Count}>{user.posts.length}</Text>
                                                </View>
                                                <View style={styles.followDetail}>
                                                    <Text style={styles.followText}>Following</Text>
                                                    <Text style={styles.Count}>{user.following.user.length}</Text>
                                                </View>
                                                <View style={styles.followDetail}>
                                                    <Text style={styles.followText}>Followers</Text>
                                                    <Text style={styles.Count}>{user.followers.user.length}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.bio}>
                                            {
                                                user.bio &&

                                                <>
                                                    {
                                                        user.bio.description
                                                        &&
                                                        <Text style={styles.bioText}>{user.bio.description}</Text>
                                                    }
                                                    {
                                                        user.bio.link
                                                        &&
                                                        <TouchableOpacity onPress={() => {
                                                            Linking.openURL(user.bio.link);
                                                        }}><Text style={styles.link}>{user.bio.link}</Text></TouchableOpacity>
                                                    }
                                                </>
                                            }
                                            <View style={styles.buttonContainer}>

                                                <View>

                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            await dispatch(FetchUser())
                                                            navigation.navigate('Update Profile')
                                                        }}
                                                    >
                                                        <Text style={styles.buttons}>Update Profile</Text>
                                                    </TouchableOpacity>

                                                </View>
                                                <View>

                                                    {user && success && <TouchableOpacity onPress={async () => {
                                                        await AsyncStorage.removeItem('token')
                                                        dispatch(FetchUser())
                                                        navigation.navigate('Home')

                                                    }}><AntDesign name="logout" size={24} color="#ff6580" style={styles.Icon} /></TouchableOpacity>}
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={styles.sub2Container}>
                                        <View style={styles.iconContainer}>
                                            <AntDesign style={styles.icon} name="profile" size={40} color={pinkTextColor} />
                                        </View>
                                        <View style={styles.imageContainer}>
                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* <Ham navigation={navigation} /> */}

                            </View>
                        }
                    </View>

            }
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    Container: {
        marginTop: 10
    },
    subContainer: {

        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginHorizontal: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageView: {

    },
    profileImage: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 100
    },
    username: {
        fontSize: 20,
        color: pinkTextColor
    },

    followDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    followDetail: {
        marginHorizontal: 10
    },
    followText: {
        color: pinkTextColor
    },
    bio: {

    },
    bioText: {
        fontSize: 12
    },
    buttonContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 8,
        fontSize: 14,
        borderRadius: 5,
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        textAlign: 'center',
        borderBottomColor: pinkTextColor,
        borderBottomWidth: 2.5

    },
    sub2Container: {
        marginTop: 10
    },
    eachImageContainer: {
        width: '33%',
        margin: 0

    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 2,
        marginTop: 10
    },
    postImage: {
        width: '100%',
        height: 100,
    },
    Icon: {
        marginHorizontal: 10,
        marginVertical: 10,
        // backgroundColor:'yellow'
    },
    Count: {
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'underline',
        color: 'blue'
    }
})
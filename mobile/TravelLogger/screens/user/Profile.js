import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { pinkTextColor } from '../layout/constants'
import Ham from '../layout/Ham';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice';
import Loader from '../layout/Loader';
const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.FetchUserReducer)
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
                                                    <Text>12</Text>
                                                </View>
                                                <View style={styles.followDetail}>
                                                    <Text style={styles.followText}>Following</Text>
                                                    <Text>343</Text>
                                                </View>
                                                <View style={styles.followDetail}>
                                                    <Text style={styles.followText}>Followers</Text>
                                                    <Text>432</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.bio}>
                                            <Text style={styles.bioText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi perferendis labore, sed vel non a consequuntur amet odit, fugit, tempora blanditiis totam sequi itaque ipsum qui aliquam alias omnis! Quas sint eligendi dolores accusamus!</Text>
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        await dispatch(FetchUser())
                                                        navigation.navigate('UpdateProfile')
                                                    }}
                                                >
                                                    <Text style={styles.buttons}>Update Profile</Text>
                                                </TouchableOpacity>
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

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                            <View style={styles.eachImageContainer}>
                                                <Image
                                                    style={styles.postImage}
                                                    source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" }}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                </View>
                                <Ham navigation={navigation} />

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
    bio: {},
    bioText: {
        fontSize: 12
    },
    buttonContainer: {
        marginTop: 10
    },
    buttons: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 8,
        width: '33%',
        fontSize: 14,
        borderRadius: 5
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
    }
})
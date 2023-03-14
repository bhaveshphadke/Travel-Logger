import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './layout/Home'
import Profile from './Profile/Profile'
import UpdateProfile from './Profile/UpdateProfile'
import Users from './Admin/Users'
import { useDispatch, useSelector } from 'react-redux'
import Login from './user/Login'
import Signup from './user/Signup'
import { FetchUser } from '../redux/slices/UserSlices/FetchUserSlice'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Toast from './layout/Toast'
const Tabs = () => {
    const Tab = createBottomTabNavigator()
    const { user, loading, success } = useSelector(state => state.FetchUserReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchUser())
    }, [dispatch])
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let color;


                    if (route.name === 'Home') {
                        iconName = "home"
                        color = focused ? "tomato" : "grey"

                    }
                    else if (route.name === 'Users') {
                        iconName = 'users'
                        color = focused ? "tomato" : "grey"
                        return <FontAwesome name="users" size={24} color={color} />
                    }
                    else if (route.name === 'Profile') {
                        iconName = 'profile'
                        color = focused ? "tomato" : "grey"
                    }
                    else if (route.name === 'Login') {
                        iconName = 'login'
                        color = focused ? "tomato" : "grey"
                    }
                    else if (route.name === 'Signup') {
                        iconName = 'adduser'
                        color = focused ? "tomato" : "grey"
                    }
                    return <AntDesign name={iconName} size={24} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray'



            })

            }
        >
    

            {
                user &&
                <>
                    <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
                    <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                    {
                        user.isAdmin &&
                        <Tab.Screen name='Users' component={Users} options={{ headerShown: false }} />
                    }
                </>
            }
            {
                !user &&
                <>
                    <Tab.Screen name='Login' component={Login} options={{ headerShown: false }} />
                    <Tab.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
                </>
            }
        </Tab.Navigator>
    )
}

export default Tabs
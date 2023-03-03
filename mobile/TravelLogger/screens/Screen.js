
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Users from './Admin/Users';
import Ham from './layout/Ham';
import Home from './layout/Home';
import ForgetPasswordScreen from './user/ForgetPasswordScreen';
import Login from './user/Login';
import Profile from './user/Profile';
import Signup from './user/Signup';
import UpdateProfile from './user/UpdateProfile';
export default function Screen({navigation}) {
    const Stack = createNativeStackNavigator()
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
                <Stack.Screen name='me' component={Profile} />
                <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
                <Stack.Screen name='Users' component={Users} />
            </Stack.Navigator>

        </NavigationContainer>

    );
}
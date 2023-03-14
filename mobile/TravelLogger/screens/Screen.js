
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPasswordScreen from './user/ForgetPasswordScreen';
import UpdateProfile from './Profile/UpdateProfile';
import Tabs from './Tabs';
import Toast from './layout/Toast';
export default function Screen() {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Travel'}>
                <Stack.Screen name='Travel' component={Tabs} />
                <Stack.Screen name='Update Profile' component={UpdateProfile} />
                <Stack.Screen name='Forget Password' component={ForgetPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
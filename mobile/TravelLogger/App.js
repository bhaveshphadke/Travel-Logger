import { ScrollView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import store from './redux/store'
import Screen from './screens/Screen'
export default function App() {
  return (
    <Provider store={store}>
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <Screen />
      {/* </ScrollView> */}
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

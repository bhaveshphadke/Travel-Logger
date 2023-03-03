import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ham from './Ham';
import { useDispatch } from 'react-redux';
import { FetchUser } from '../../redux/slices/UserSlices/FetchUserSlice';
import Loader from './Loader';
const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchUser())
    },[])
    return (
        <View style={{
            height: '100%'
        }}>

            <ScrollView>
            <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, veniam perspiciatis quaerat porro soluta corporis ipsam debitis doloremque dolores doloribus? Voluptatem tempore incidunt dolores nisi eum fugiat velit sapiente harum.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis aliquam quos autem. Eos voluptatem blanditiis in, magnam nesciunt, nisi excepturi accusamus nam ex exercitationem dolor incidunt odit quae asperiores adipisci at! Commodi nam distinctio nostrum tempora numquam vel vitae labore fugit nihil facere, rerum dolorum maxime, quasi molestias enim obcaecati. Pariatur atque non, fuga placeat facere debitis doloremque sequi numquam autem eum deleniti rem dolores labore dolore dignissimos distinctio magni facilis cumque itaque nemo recusandae adipisci. Libero sed cumque, in ipsam at nam eligendi dignissimos quaerat! Rem veritatis quasi enim tempora quis aliquam non optio ipsum deleniti nihil sapiente debitis, voluptas neque culpa, consequuntur, voluptate quia pariatur iste est saepe quidem ratione cumque vero. Fuga vitae, inventore magnam voluptatum perferendis blanditiis soluta accusamus eum ex at consequatur nisi, vel similique laboriosam excepturi! Odit nisi, quas tenetur, nobis asperiores in aperiam dicta quis aut, inventore quos distinctio? In, nemo rerum! Similique, obcaecati repudiandae cumque tempore non doloremque earum id iste laboriosam quas officiis repellendus quae adipisci ratione voluptates impedit! Quam excepturi commodi neque ad amet? Inventore perferendis dolore dicta, vel iste asperiores minima ullam similique, amet, placeat nostrum veritatis corrupti tempore? Distinctio nesciunt quas ab libero, excepturi quo adipisci iusto quam.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis aliquam quos autem. Eos voluptatem blanditiis in, magnam nesciunt, nisi excepturi accusamus nam ex exercitationem dolor incidunt odit quae asperiores adipisci at! Commodi nam distinctio nostrum tempora numquam vel vitae labore fugit nihil facere, rerum dolorum maxime, quasi molestias enim obcaecati. Pariatur atque non, fuga placeat facere debitis doloremque sequi numquam autem eum deleniti rem dolores labore dolore dignissimos distinctio magni facilis cumque itaque nemo recusandae adipisci. Libero sed cumque, in ipsam at nam eligendi dignissimos quaerat! Rem veritatis quasi enim tempora quis aliquam non optio ipsum deleniti nihil sapiente debitis, voluptas neque culpa, consequuntur, voluptate quia pariatur iste est saepe quidem ratione cumque vero. Fuga vitae, inventore magnam voluptatum perferendis blanditiis soluta accusamus eum ex at consequatur nisi, vel similique laboriosam excepturi! Odit nisi, quas tenetur, nobis asperiores in aperiam dicta quis aut, inventore quos distinctio? In, nemo rerum! Similique, obcaecati repudiandae cumque tempore non doloremque earum id iste laboriosam quas officiis repellendus quae adipisci ratione voluptates impedit! Quam excepturi commodi neque ad amet? Inventore perferendis dolore dicta, vel iste asperiores minima ullam similique, amet, placeat nostrum veritatis corrupti tempore? Distinctio nesciunt quas ab libero, excepturi quo adipisci iusto quam.
            </Text>
            </ScrollView>
            <Ham navigation={navigation} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    LoginButton: {
        marginTop: 20,
        backgroundColor: '#ffa0b0',
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})
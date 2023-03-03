import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllusersAdmin } from '../../redux/slices/AdminSlices/FetchAllusersAdminSlice'
import { DataTable } from 'react-native-paper'
import { SimpleLineIcons } from '@expo/vector-icons';
import Loader from '../layout/Loader'
const Users = () => {
    const dispatch = useDispatch()
    const { users,loading,success } = useSelector(state => state.FetchAlluserAdminReducer)
    const a = useSelector(state => state.FetchAlluserAdminReducer)
    useEffect(() => {
        dispatch(FetchAllusersAdmin())
    }, [dispatch])
    return (
        <View>
            {
                loading?
                <Loader/>:
                <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Username</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>isAdmin</DataTable.Title>
                </DataTable.Header>
                {
                   success && users && users.map((item) => {
                        return (
                            <View key={item._id}>
                                <DataTable.Row>
                                    <DataTable.Cell>{item.username}</DataTable.Cell>
                                    <DataTable.Cell>{item.email}</DataTable.Cell>
                                    <DataTable.Cell>{item.isAdmin ? <SimpleLineIcons name="star" size={12} color="green" />
                                    : ""}</DataTable.Cell>
                                </DataTable.Row>
                            </View>
                        )
                    })
                }
            </DataTable>
            }
        </View>
    )
}

export default Users

const styles = StyleSheet.create({})
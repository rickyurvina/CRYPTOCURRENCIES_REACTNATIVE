import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View>
            <Text style={styles.header}>Cryptocurrencies</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    }
})
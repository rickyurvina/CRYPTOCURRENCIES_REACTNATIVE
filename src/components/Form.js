import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Form = (
    {
        coin,
        crypto,
        setCoin,
        setCrypto,
        setGetApi
    }) => {
 
    const [cryptoList, setCryptoList] = useState([])

    useEffect(() => {
        const getQuote = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const res = await axios.get(url)
            setCryptoList(res.data.Data)
        }
        getQuote()

    }, [])

    const getCoin = coin => {
        setCoin(coin)
    }

    const getCrypto = crypto => {
        setCrypto(crypto)
    }

    const quotePrice = () => {
        if(coin.trim() === '' || crypto.trim() === ''){
            showAlert()
            return
        }
        setGetApi(true)
    }

    const showAlert = () => {
        Alert.alert(
            "Error...",
            "Both fields are required",
            [{ text: "OK" }]
        )
    }


    return (
        <View>
            <Text style={styles.label}>Coin</Text>
            <Picker
                selectedValue={coin}
                onValueChange={coin => getCoin(coin)}
                itemStyle={{ height: 120, backgroundColor: '#FFF' }}
            >
                <Picker.Item label="- Select -" value="" />
                <Picker.Item label="USD Dollar" value="USD" />
                <Picker.Item label="Mexican" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra" value="GBP" />
                <Picker.Item label="Chilean Peso" value="CLP" />
            </Picker>
            <Text style={styles.label}>Crypto</Text>

            <Picker
                selectedValue={crypto}
                onValueChange={crypto => getCrypto(crypto)}
                itemStyle={{ height: 120, backgroundColor: '#FFF' }}
            >
                <Picker.Item label="- Select -" value="" />
                {cryptoList.map(crypto => (
                    <Picker.Item key={crypto.CoinInfo.Id} label={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight
                style={styles.btnQuote}
                onPress={() => quotePrice()}
            >
                <Text style={styles.txtQuote}>Quote</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnQuote: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        borderRadius: 20,
    },
    txtQuote: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center',
    }
})
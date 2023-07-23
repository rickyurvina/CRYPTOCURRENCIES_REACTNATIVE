
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Header from './src/components/Header';
import Form from './src/components/Form';
import axios from 'axios';
import Quote from './src/components/Quote';

function App(): JSX.Element {
  const [coin, setCoin] = useState('')
  const [crypto, setCrypto] = useState('')
  const [getApi, setGetApi] = useState(false)
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const quoteCrypto = async () => {
      if (getApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto},ETH&tsyms=${coin}`
        const res = await axios.get(url)
        setLoading(true)

        setTimeout(() => {
          setResult(res.data.DISPLAY[crypto][coin])
          setGetApi(false)
          setLoading(false)
        }, 3000)
      }
    }
    quoteCrypto()

  }, [getApi])

  const component = loading ? <ActivityIndicator size="large" color="#5E49E2" /> : <Quote result={result} />

  return (
    <SafeAreaView >
      <ScrollView>
        <Header />
        <View>
          <Image
            style={styles.image}
            source={require('./src/assets/img/cryptomonedas.png')}
          />
        </View>
        <View style={styles.content}>
          <Form
            coin={coin}
            crypto={crypto}
            setCoin={setCoin}
            setCrypto={setCrypto}
            setGetApi={setGetApi}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          {component}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  content: {
    marginHorizontal: '2.5%'
  }

});

export default App;

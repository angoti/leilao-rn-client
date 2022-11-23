import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const LogIn = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const Buffer = require('buffer').Buffer;
    let encodedAuth = new Buffer('teste-a:123456').toString('base64');
    fetch('http://Ryzen7:8080/token', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + encodedAuth,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.text())
      .then(result => {
        setLoading(false);
        storeUserSession(result);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }, []);

  async function storeUserSession(token) {
    try {
      await EncryptedStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Autenticando ...</Text>
      ) : (
        <View style={styles.layout}>
          <Text style={styles.textTitle}>
            Usuário autenticado e token salvo
          </Text>
        </View>
      )}
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  layout: { flex: 1 },
  textTitle: { fontSize: 18, color: 'green', textAlign: 'center' },
  textData: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'left',
  },
});

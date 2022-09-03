import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';


console.log(db['the'].chunks);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#9c8210'}
            centerComponent={{
              text: 'Macaquinho fofinho',
              style: { color: '#fff', fontSize: 20 },
            }}
          />
          <Image
            style={styles.imageIcon}
            source={{
              uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />
          <TextInput
            onChangeText={(text) => this.setState({ text: text })}
            value={this.state.text}
            style={styles.inputBox}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              var word = this.state.text.toLowerCase().trim();
              db[word] ? (
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones })
              ):
              Alert.alert("A palavra não existe em nosso banco de dados")
              }}>
            <Text style={styles.buttonText}>IR</Text>
          </TouchableOpacity>
          <Text style={styles.displayText}>{this.state.displayText}</Text>
          <View>
            {this.state.chunks.map((item) => {
              return (
                <TouchableOpacity style={styles.chunkButton}>
                  <Text style={styles.displayText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
            <View>
              {this.state.chunks.map((item, index) => {
                return (
                  <PhonicSoundButton
                    wordChunk={this.state.chunks[index]}
                    soundChunk={this.state.phonicSounds[index]}
                    buttonIndex={index}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 25,
    marginLeft: '30%',
  },
  buttonText: {
    textAlign: 'center',
    width: '50%',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red',
  },
});

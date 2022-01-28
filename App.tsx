import * as React from 'react';
import { View, StyleSheet, Button, Picker, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = React.useState('Mateus')
  const [voice, setVoice] = React.useState<Speech.Voice | undefined>()
  const [voices, setVoices] = React.useState<Speech.Voice[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      const availableVoices = await Speech.getAvailableVoicesAsync()
      setVoices(availableVoices)
      setVoice(availableVoices[0])
      setLoading(false)
    })()
  }, [])

  const speak = () => {
    Speech.speak(text, { language: voice?.language, voice: voice?.identifier });
  };

  return !loading
    ? (
      <View style={styles.container}>
        <Text>Language:</Text>
        <Picker
          style={styles.input}
          selectedValue={voice?.identifier}
          onValueChange={value => setVoice(voices.find(v => v.identifier == value))}
        >
          {voices.map(v =>
            <Picker.Item label={v.name} value={v.identifier} />
          )}
        </Picker>

        <Text>Something to say:</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={value => setText(value)}
        />

        <Button
          title="Press to hear"
          onPress={speak}
        />
      </View>
    )
    : <>Carregando...</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

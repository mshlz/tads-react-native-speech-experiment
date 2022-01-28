import * as React from 'react';
import { View, StyleSheet, Button, Picker, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = React.useState('Mateus')
  const [language, setLanguage] = React.useState<string | undefined>()
  const [voices, setVoices] = React.useState<Speech.Voice[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      const availableVoices = await Speech.getAvailableVoicesAsync()
      setVoices(availableVoices)
      setLanguage(availableVoices[0].language)
      setLoading(false)
    })()
  }, [])


  const speak = () => {
    Speech.speak(text, { language });
  };

  return !loading
    ? (
      <View style={styles.container}>
        <Text>Language:</Text>
        <Picker
          style={styles.input}
          selectedValue={language}
          onValueChange={value => setLanguage(value)}
        >
          {voices.map(lang =>
            <Picker.Item label={lang.name} value={lang.language} />
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

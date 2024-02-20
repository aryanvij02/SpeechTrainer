import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function App() {
  const [userInput, setUserInput] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  async function handlePress() {
    try {
      const response = await fetch('http://192.168.68.114:5001/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // console.log(await response.text()); // Log raw response text

      const data = await response.json();
      setApiResponse(data.generated_text); // Assuming 'generated_text' is the key in the JSON response
    } catch (error) {
      console.error('Error:', error);
      setApiResponse('Error making API call');
    }
  }

  return (
    <View style={styles.container}>
      <Text>Typing: {userInput}</Text>
      
      <TextInput 
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type a message"
        />
      <Text>Response: {apiResponse}</Text>
      <Button title="Send" onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
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

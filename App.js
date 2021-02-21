import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [value, onChangeText] = React.useState('write in me');
  const [prediction, onChangePrediction] = React.useState('future prediction...');
  return (
    <View style={styles.container}>
      <Text>Enter in Text to have it Summarized (Only 6000 characters can be sent at a time)!</Text>
      
      <TextInput maxLength={6000} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={value} onChangeText={text => onChangeText(text)}
      onSubmitEditing={() => {
        onChangePrediction("loading...")
          var url = "https://ipczl1r729.execute-api.us-east-1.amazonaws.com/summarizer";

          var xhr = new XMLHttpRequest();
          xhr.open("POST", url);

          xhr.setRequestHeader("Content-Type", "application/json");


          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log("Succes returned:")
                console.log(xhr.responseText);
                onChangePrediction(xhr.responseText);
              } else {
                 console.log("Error", xhr.statusText);
                 onChangePrediction("ERROR: Text doesn't have enough words");
              }

            }};
          
          var cleanedText = value.replace(/\n/g,' ');
          cleanedText = cleanedText.replace(/\"/g, ' ');
          cleanedText = cleanedText.replace(/\'/g, ' ');
          cleanedText = cleanedText.replace(/\{/g, ' ');
          cleanedText = cleanedText.replace(/\}/g, ' ');
          cleanedText = cleanedText.replace(/\(/g, ' ');
          cleanedText = cleanedText.replace(/\)/g, ' ');

          var data = '{"text": "'+cleanedText+'"}';
          xhr.send(data);
      }}
      >
      </TextInput>

      <Button title={"Press me to summarize inputted text"} style={{width: 400, height: 500}}onPress={
        () => {
          onChangePrediction("loading...")
          var url = "https://9ex6ute2e1.execute-api.us-east-1.amazonaws.com/summarizer";

          var xhr = new XMLHttpRequest();
          xhr.open("POST", url);

          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                onChangePrediction(xhr.responseText);
            }};

          var data = '{"text": "'+value+'"}';
          xhr.send(data);
                  }
      }></Button>

      <Text>{prediction}</Text>

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

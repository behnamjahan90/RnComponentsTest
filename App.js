import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {useFonts} from 'expo-font';
//import AppLoading from 'expo-app-loading';//it is deprecated
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';


import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`),
  )
  .catch(console.warn)

export default function App() {

  const [userNumber,setUserNumber]=useState();
  const [gameIsOver,setGameIsOver]=useState(true);
  const [guessRounds,setGuessRounds]=useState(0);
  
  const [fontsLoaded]=useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

    // Watch for fonts to be loaded, then hide the splash screen
    useEffect(() => {
      async function hideSplashScreen() {
        await SplashScreen.hideAsync()
      }
      if (fontsLoaded) {
        hideSplashScreen()
      }
    }, [fontsLoaded])
    // Initally return null instead of <AppLoading />
    if (!fontsLoaded) {
      return null
    }

  // if(!fontsLoaded) {
  //   return <AppLoading />
  // }

  function pickNumberHnadler (pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameScreen() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHnadler}/>;

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameScreen} />
  }

 
  return (
    <>
    <StatusBar  style='light'/>
      <LinearGradient 
        colors={[Colors.primary700,Colors.accent500]}
        style={styles.roorScreen}
      >
        <ImageBackground 
          source={require('./assets/Images/background.png')}
          resizeMode="cover"
          style={styles.roorScreen}
          imageStyle={styles.backGroundImage}
        >
          <SafeAreaView style={styles.roorScreen}>
            {screen}
          </SafeAreaView>
          
        </ImageBackground>
        
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  roorScreen:{
    flex: 1
  },
  backGroundImage:{
    opacity: 0.15
  }
});

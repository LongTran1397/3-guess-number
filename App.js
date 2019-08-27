import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

// What we wanted to do here is already the way the instructor used,
// in the master branch. 
// Of course he used `Font.loadAsync` to load the fonts,
// and I think is the only way to load fonts from expo.

export default function App() {
	const [ userNumber, setUserNumber ] = useState();
	const [ guessRounds, setGuessRounds ] = useState(0);
	const [ dataLoaded, setDataLoaded ] = useState(false);

	useEffect(() => {
		(async () => {
		  await Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
		  });
		  setDataLoaded(true);
		})()
	  }, []);
	

	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};

	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};

	let content
	if (dataLoaded) {
		content = <StartGameScreen onStartGame={startGameHandler} />;
	}

	if (userNumber && guessRounds <= 0 && dataLoaded) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
	} else if (guessRounds > 0 && dataLoaded) {
		content = (
			<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess a number " />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});

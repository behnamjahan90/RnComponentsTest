import { useState,useEffect } from 'react';
import {View
    , StyleSheet
    , Alert
    , FlatList
    , useWindowDimensions
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  let minBoundray = 1;
  let maxBoundary = 100;

function GameScreen({userNumber,onGameOver}) {
    //the main reason for using hard Code numbers is that 
    //useRffect hook run after called initialGuess method and
    //min and max Boundary will be initiated by useEffect hook
    //fot this mean without hard coding the number we do not have
    //real min and max numbers
    
    const initialGuess= generateRandomBetween(1,100,userNumber);
    const [currentGuess,setCurrentGuess]= useState(initialGuess);
    const [guessRound,setGuessRound]= useState([initialGuess]);

    const {width,height} = useWindowDimensions();
    
    const guessRoundsListLength= guessRound.length;

    useEffect(()=>{
        if(currentGuess==userNumber){
            onGameOver(guessRound.length);
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(()=> {
        minBoundray=1;
        maxBoundary=100;
    },[]);
    
    function nextGuessHandler(direction) {
        if((direction === 'lower' && currentGuess < userNumber)
            || direction === 'greater' && currentGuess > userNumber)
        {
            Alert.alert('Dont lie!',
            'You know that this is wrong...',[{text: 'Sorry', style: 'cancel'}]);
            return;
        }
        if(direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundray = currentGuess + 1;
        }
        const newRndNumber=generateRandomBetween(minBoundray,maxBoundary,currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRound(preaviousRound=> [newRndNumber,...preaviousRound]);
    }

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name='md-remove' size={24} color='white'/>
                    </PrimaryButton>
                  </View>
                  <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                    </PrimaryButton>
                  </View>
                </View>
            </Card>
        </>
    );

    if( width > 500 ) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                            <Ionicons name='md-remove' size={24} color='white'/>
                        </PrimaryButton>
                    </View>
                    <NumberContainer style={{marginBottom: 0}}>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                    </PrimaryButton>
                  </View>
                </View>
            </>
        );
    }
    
    return (
        <View style={styles.screen}>
           <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/*{guessRound.map(guessNum=> <Text key={guessNum}>{guessNum}</Text>)}*/}
                <FlatList 
                    alwaysBounceVertical={false} 
                    data={guessRound}
                    renderItem={(itemData)=>{
                        return (
                            <GuessLogItem roundNumber={guessRoundsListLength -itemData.index} guess={itemData.item}/>
                        );
                    }}
                    keyExtractor={(item)=> item}
                />
            </View>
        </View>
    );
}


export default GameScreen;

const styles= StyleSheet.create({
    buttonsContainerWide:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    screen:{
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    },
    instructionText:{
        marginBottom: 12
    },
    listContainer:{
        flex:1,
        padding:  16,
       }
});
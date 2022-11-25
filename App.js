import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const joinImage = require('./images/JoinImage.png');
const checkIconImage = require('./images/CheckIcon.png');
const joinedImage = require('./images/Joined.png');

const App = () => {
  // First animation for opacity 0 for join button
  const fadeAnim = useRef(new Animated.Value(1)).current;
  // animation for joining icon opacity set 1
  const fadeOut = useRef(new Animated.Value(0)).current;
  // animation for joined text opacity set 1 and fadeOut set as 0 to show animation transition
  const fadeInWithJoined = useRef(new Animated.Value(0)).current;

  // State to prevent multiple api call when user click button multiple times
  const [disable, setDisable] = useState(false);

  // Method for manage join button
  const onJoinButtonPressed = () => {
    setDisable(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    onJoiningStarted(); // Do API called just before Animation start
  };

  // Method to manage animation for API call running
  const onJoiningStarted = () => {
    Animated.timing(fadeOut, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setTimeout(onJoinedSuccess, 1000)); // timeout is for API call waiting time
  };

  // after API successfully done show Joined text in the UI
  const onJoinedSuccess = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeInWithJoined, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  // TODO: only testing purpose
  // Method to reset animation and state on for testing
  const onReset = () => {
    setDisable(false);
    fadeAnim.setValue(1);
    fadeInWithJoined.setValue(0);
    fadeOut.setValue(0);
  };

  // create small component for reusability
  const JoinButton = props => {
    return (
      <TouchableWithoutFeedback
        style={{flex: 1}}
        disabled={disable}
        onPress={onJoinButtonPressed}>
        <View style={styles.linearGradient}>{props.children}</View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <JoinButton>
          <Animated.Image
            resizeMode="contain"
            source={joinImage}
            style={[
              styles.positionAbsolute,
              styles.imageContainer,
              {opacity: fadeAnim},
            ]}
          />

          <Animated.Image
            resizeMode="contain"
            source={checkIconImage}
            style={[
              styles.positionAbsolute,
              styles.imageContainer,
              {opacity: fadeOut},
            ]}
          />

          <Animated.Image
            resizeMode="contain"
            source={joinedImage}
            style={[
              styles.positionAbsolute,
              styles.joinedTextImage,
              {
                opacity: fadeInWithJoined,
              },
            ]}
          />
        </JoinButton>
      </View>
      <TouchableWithoutFeedback onPress={onReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    width: 200,
    height: 250,
    paddingHorizontal: 5,
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  joinedTextImage: {
    height: '100%',
    width: '70%',
    left: 25,
  },
  resetText: {color: 'black', fontSize: 32},
});

export default App;

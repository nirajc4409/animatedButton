import React, {useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const CheckIcon = require('./images/RightCheck.png');

const App = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeOut = useRef(new Animated.Value(0)).current;
  const fadeInWithJoined = useRef(new Animated.Value(0)).current;

  const [disable, setDisable] = useState(false);
  const [hideJoinText, setHideJoinText] = useState(false);

  const onJoinButtonPressed = () => {
    setDisable(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
    onJoiningStarted(); // Start the API call when button join pressed
  };

  const onJoiningStarted = () => {
    Animated.timing(fadeOut, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setTimeout(onJoinedSuccess, 1000)); // API call time onJoinedSuccess called after Api called successfully
  };

  const onJoinedSuccess = () => {
    setHideJoinText(true);
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

  const onReset = () => {
    setDisable(false);
    fadeAnim.setValue(1);
    fadeOut.setValue(0);
    setHideJoinText(false);
  };

  const JoinButton = props => {
    return (
      <TouchableWithoutFeedback
        style={{flex: 1}}
        disabled={disable}
        onPress={onJoinButtonPressed}>
        <LinearGradient
          start={{x: 0.6, y: 0.8}}
          end={{x: 1, y: 0.1}}
          colors={['#f7358c', '#a34fd7', '#7d63f1']}
          style={styles.linearGradient}>
          {props.children}
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {!hideJoinText && (
          <JoinButton>
            <Animated.Text style={[styles.buttonText, {opacity: fadeAnim}]}>
              {'Join'}
            </Animated.Text>
            <Animated.Image
              source={CheckIcon}
              resizeMode="contain"
              style={[styles.checkIcon, {opacity: fadeOut}]}
            />
          </JoinButton>
        )}
        {hideJoinText && (
          <Animated.Text
            style={[
              styles.animatedText,
              {
                opacity: fadeInWithJoined,
              },
            ]}>
            {'Joined'}
          </Animated.Text>
        )}
      </View>
      <TouchableWithoutFeedback onPress={onReset}>
        <Text style={styles.resetText}>reset</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 0,
    minHeight: 50,
    maxHeight: 70,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedText: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  linearGradient: {
    padding: 0,
    width: 82,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  checkIcon: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    height: '100%',
    width: '40%',
  },
  buttonText: {
    fontSize: 24,
    position: 'absolute',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    fontWeight: 'bold',
    margin: 10,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  resetText: {color: 'black', fontSize: 32},
});

export default App;

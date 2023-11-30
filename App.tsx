import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ControlButtonProps extends TouchableOpacityProps {
  iconName: string;
  style?: TouchableOpacityProps['style'];
}

const ControlButton = ({ onPress, style, iconName }: ControlButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.controlButton, style]}>
    <Icon name={iconName} size={30} color="#000" />
  </TouchableOpacity>
);

interface MusicPlayerHeaderProps {
  title: string;
  subtitle: string;
}

const MusicPlayerHeader = ({ title, subtitle }: MusicPlayerHeaderProps) => (
  <View style={styles.headerContainer}>
    <Text style={styles.textMain}>{title}</Text>
    <Text style={styles.textSub}>{subtitle}</Text>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxMain}>
        <MusicPlayerHeader title="Music Player" subtitle="Music Player" />
        <View style={styles.boxSecondary}>
          <Image
            source={{
              uri: 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/M44WMP5ZQVJAPAFNXI4J3THTOA.jpg',
            }}
            style={styles.img}
          />
          <View style={styles.controls}>
            <ControlButton iconName="skip-previous" onPress={() => {}} />
            <ControlButton iconName="play-arrow" onPress={() => {}} />
            <ControlButton iconName="pause" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe8f8',
  },
  boxMain: {
    width: '15%',
    height: '20%',
    backgroundColor: '#fffafa',
    borderRadius: 15,
    position: 'relative',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'flex-start',
    paddingLeft: 60,
  },
  textMain: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSub: {
    fontSize: 12,
    color: '#a9a9a9',
  },
  boxSecondary: {
    position: 'absolute',
    width: '120%',
    height: '60%',
    backgroundColor: '#fffafa',
    borderRadius: 15,
    shadowColor: '#818181',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    bottom: 0,
  },
  img: {
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
    top: -50,
    left: 20,
    width: '35%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: '60%',
    right: 0,
    top: '30%',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#cecece0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

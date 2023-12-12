import React, { useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Disc from '../Disc';
import Slider from '@react-native-community/slider';

interface ControlButtonProps {
  onPress: () => void;
  style?: any;
  iconName: string;
}

const ControlButton = memo(
  ({ onPress, style, iconName }: ControlButtonProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.controlButton, style]}>
      <Icon name={iconName} size={40} color="rgba(184, 184, 184, 1)" />
    </TouchableOpacity>
  )
);

interface MusicPlayerHeaderProps {
  title: string;
  subtitle: string;
  selectable: boolean;
}

const MusicPlayerHeader = memo(
  ({ title, subtitle, selectable }: MusicPlayerHeaderProps) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const totalDuration = 300;

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textMain} selectable={selectable}>
          {title}
        </Text>
        <Text style={styles.textSub} selectable={selectable}>
          {subtitle}
        </Text>
        <Slider
          style={{ width: 253, height: 40 }}
          minimumValue={0}
          maximumValue={totalDuration}
          value={currentPosition}
          onValueChange={setCurrentPosition}
          minimumTrackTintColor="#FFAA2B"
          maximumTrackTintColor="#D8D8D8"
          thumbTintColor="#FFAA2B"
        />
      </View>
    );
  }
);

const PlayerComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  return (
    <View style={styles.boxMain}>
      <MusicPlayerHeader
        title="Music Player"
        subtitle="Music Player"
        selectable={false}
      />
      <View style={styles.boxSecondary}>
        <Disc
          url="https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/M44WMP5ZQVJAPAFNXI4J3THTOA.jpg"
          style={styles.img}
          height={100}
          width={100}
          playing={isPlaying}
        />
        <View style={styles.controls}>
          <ControlButton iconName="skip-previous" onPress={() => {}} />
          <ControlButton
            iconName={isPlaying ? 'pause' : 'play-arrow'}
            onPress={togglePlay}
          />
          <ControlButton iconName="skip-next" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxMain: {
    width: 412,
    height: 142,
    backgroundColor: 'rgba(255, 255, 255, 0.70);',
    borderRadius: 15,
    position: 'relative',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'flex-start',
    paddingLeft: 60,
    paddingTop: 20,
  },
  textMain: {
    color: '#575757',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  textSub: {
    color: '#898989',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  boxSecondary: {
    width: 448,
    height: 120,
    backgroundColor: '#fffafa',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 5,
    bottom: 0,
  },
  img: {
    position: 'absolute',
    top: -50,
    left: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerComponent;

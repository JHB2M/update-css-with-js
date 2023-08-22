import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  runOnJS
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const Changer = ({
  title,
  value,
  setValue,
}: {
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const translateX = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value + 1, 0), 190);
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: adjustedTranslateX.value}],
    };
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (event, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
      runOnJS(Finished)()
    },
    onFinish: () => {
      
    },
  });
  function Finished (){
    if(translateX.value>0)setValue(translateX.value)
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <GestureHandlerRootView>
        <Animated.View>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <Animated.View style={[styles.roll, rStyle]} />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </GestureHandlerRootView>
    </View>
  );
};

export default Changer;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0.7,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  },
  picker: {
    width: 200,
    height: 3,
    backgroundColor: 'white',
  },
  pickerContainer: {
    height: 20,
    width:200,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  roll: {
    height: 25,
    width: 25,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    left: 0,
    bottom: -10,
  },
});

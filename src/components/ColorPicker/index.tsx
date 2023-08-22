import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const ColorPicker = ({
  colors,
  start,
  end,
  style,
  onColorChanged,
}: {
  colors: any;
  start: any;
  end: any;
  style: any;
  onColorChanged:(color:string)=>void
}) => {
  const translateX = useSharedValue(0);

  const adjustedTranslateX =useDerivedValue(()=>{
    return Math.min(Math.max(translateX.value,0),350)
  })
  
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: adjustedTranslateX.value}],
    };
  });
  const rInternalPickerStyle =useAnimatedStyle(()=>{
    const backgroundColor =interpolateColor(translateX.value,[
      (1/9)*350,
      (2/9)*350,
      (3/9)*350,
      (4/9)*350,
      (5/9)*350,
      (6/9)*350,
      (7/9)*350,
      (8/9)*350,
      (9/9)*350,
    ],colors)
      onColorChanged?.(backgroundColor)
    return{
      backgroundColor:backgroundColor
    }
  })
  const panGestureEvent  =useAnimatedGestureHandler<PanGestureHandlerGestureEvent, {x: number}>({
    
      onStart: (event, context) => {
         context.x = translateX.value;
      },
      onActive: (event, context) => {
          translateX.value = event.translationX + context.x
         
      },
      onFinish: () => {},
    });


  return (
    <>
      <GestureHandlerRootView >
       

        <PanGestureHandler onGestureEvent={panGestureEvent} >
           <Animated.View >

          <LinearGradient

            colors={colors}
            style={style}
            start={start}
            end={end}
            />
            <Animated.View style={[styles.picker,rStyle]}  >
              <Animated.View style ={[styles.innerPicker,rInternalPickerStyle]}/>
            </Animated.View>
            </Animated.View>
          </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  picker: {
    width: 40,
    height: 40,
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: 'white',
    top: 18,
    left: 15,
    justifyContent: 'center',
    alignItems:'center'
  },
  innerPicker:{
    backgroundColor:'red',width:24,height:24,borderRadius:15,
  }
});

import * as React from 'react';
import {Text, View, StyleSheet, Image,ImageBackground} from 'react-native';
import {Changer, ColorPicker} from './src/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];


const App = () => {
  const [spacing,setSpacing] = React.useState(0)
  const [blur,sertBlur] = React.useState(0)
  const pickedColor = useSharedValue(COLORS[0]);

  
  React.useEffect(()=>{
    console.log('Spacing  : ',spacing,'Blue : ',blur)
    
  },[spacing,blur])


  const onColorChanged = React.useCallback((color: string) => {
    'worklet';
    pickedColor.value = color;
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });
  const rStyleText = useAnimatedStyle(() => {
    return {
      color: pickedColor.value,
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Update CSS Variables with{' '} 
          <Animated.Text style={[styles.jsText, rStyleText]}>JS</Animated.Text>
        </Text>
      </View>
        <Animated.View style ={[styles.imageContainer,rStyle]}> 
        
      <ImageBackground
        style={[styles.image,{width:412-spacing,height:300-spacing}]}
        source={{
          uri: 'https://img.freepik.com/free-photo/modern-skyscrapers-illuminate-night-city-vanishing-into-dark-generative-ai_188544-11259.jpg?w=2000',
        }}
        blurRadius={blur/2}
        />
        </Animated.View>
       
      <ColorPicker
        colors={COLORS}
        style={styles.colorPicker}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        onColorChanged={onColorChanged}
      />
      <View style={styles.changesContainer}>
      <Changer title='Spacing :' value={spacing} setValue={setSpacing}/>
      <Changer title='Blur :' value={blur} setValue={sertBlur}/>

      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#433e63',
  },
  imageContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:412,height:300,
    backgroundColor:'red',
  },
  image: {
    width: 412,
    height: 300,
    
  },
  titleContainer: {
    padding: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  colorPicker: {
    width: '90%',
    height: 35,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  jsText: {
    color: 'red',
  },
  changesContainer: {
    padding:30,
  },
});

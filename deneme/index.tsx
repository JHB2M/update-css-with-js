import { View, Text, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle,useAnimatedGestureHandler, useSharedValue,withSpring} from 'react-native-reanimated'
import { PanGestureHandler ,PanGestureHandlerGestureEvent,GestureHandlerRootView} from 'react-native-gesture-handler'

type ContextInterface ={
    translateX:number,
    translateY:number
}

export default function GestureableButton() {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX:translateX.value},{translateY :translateY.value}]
        }
    })

    const panGestureEvent  =useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ContextInterface>({
        onStart: (event,context) => {
            context.translateX  =translateX.value
            context.translateY  =translateY.value
        },
        onActive: (event,context) => {
            translateX.value  =event.translationX+context.translateX
            translateY.value  =event.translationY+context.translateY
            console.log('translateX : ',translateX.value , 'translationY : ',translateY.value)
        },
        onEnd: (event) => {
            const distance = Math.sqrt(translateX.value**2+translateY.value**2)

            if(distance<200){

                translateY.value =withSpring(0)
                translateX.value =withSpring(0)
            }
        }
    })

    return (
        <GestureHandlerRootView >
            
                <View style ={styles.circle}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>

            <Animated.View style={[styles.container, rStyle]} />
            </PanGestureHandler>
                </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,  
        backgroundColor: 'rgba(0,0,256,0.5)',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20
    },
    circle:{
        alignSelf:'center',
        justifyContent: 'center',
        height:400,
        borderRadius:200,
        width:400,
        borderWidth:4,
        borderColor:'rgba(0,0,256,0.5)',

    }
})

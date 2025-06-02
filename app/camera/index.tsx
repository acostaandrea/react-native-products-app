import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useCameraStore } from '@/presentation/store/useCameraStore';

export default function CameraScreen() {
    const {addSelectedImage} = useCameraStore();
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const cameraRef = useRef<CameraView>(null);

    const onRequestPermissions = async () => {
        try {
            const {status: cameraStatus} = await requestCameraPermission();
            const {status: mediaLibraryStatus} = await requestMediaLibraryPermission();
            if(cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted'){
                Alert.alert('Necesitamos tus permisos para usar la camara y la galería');
                return;
            }
        } catch (error) {
            Alert.alert('Algo salio mal');
        }
    }

    if (!cameraPermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{ ...styles.container, marginHorizontal: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.message}>Necesitamos tu permiso para usar la camara y la galería</Text>
                <TouchableOpacity onPress={onRequestPermissions}>
                    <ThemedText type='subtitle'>Solicitar permiso</ThemedText>
                </TouchableOpacity>
            </View>
        );
    }

    const onShutterPress = async () => {
        if (!cameraRef.current) return;
        const picture = await cameraRef.current.takePictureAsync({            
            quality: 0.7,   
        })
        console.log(picture);
        if (!picture?.uri) return;
        setSelectedImage(picture.uri);
        //TODO: save picture to gallery
    }

    const onReturnCancelPress = () => {
        //todo: limpiar estado
        router.dismiss();
    }

    const onConfirmPress = async () => {
        if(!selectedImage) return;
        try {
            await MediaLibrary.createAssetAsync(selectedImage);
            addSelectedImage(selectedImage);
            router.dismiss();
        } catch (error) {
            Alert.alert('Algo salio mal');
        }
    }
    const onRetakeImagePress = () => {
        setSelectedImage(undefined);
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if(selectedImage){
        return(
            <View style={styles.container }>
                
                    <Image source={{uri: selectedImage}} style={styles.camera}/>
                    <ConfirmButton onPress={onConfirmPress} />
                    <RetakeImageButton onPress={onRetakeImagePress} />
                    <ReturnCancelButton onPress={onReturnCancelPress} />           
                    
                                   
            
        </View>
        )
    }

    return (
        <View style={styles.container }>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                
                    <ShutterButton onPress={onShutterPress} />
                    <FlipCameraButton onPress={toggleCameraFacing} />
                    <GaleryButton />
                    <ReturnCancelButton onPress={onReturnCancelPress} />
                                   
            </CameraView>
        </View>
    );
}

//custom componentes
const ShutterButton = ({onPress}: {onPress: () => void}) => {
    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({},'primary');
    return (
        <TouchableOpacity style={[styles.shutterButton,{
            position: 'absolute',
            bottom: 32,
            left: dimensions.width / 2 - 32,
            borderColor: primaryColor,
        } ]} onPress={onPress}>            
        </TouchableOpacity>
    )
}
const ConfirmButton = ({onPress}: {onPress: () => void}) => {
    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({},'primary');
    return (
        <TouchableOpacity style={[styles.shutterButton,{
            position: 'absolute',
            bottom: 32,
            left: dimensions.width / 2 - 32,
            borderColor: primaryColor,
        } ]} onPress={onPress}>
            <Ionicons name='checkmark-outline' size={30} color={primaryColor} />
        </TouchableOpacity>
    )
}

const FlipCameraButton = ({onPress}: {onPress: () => void}) => {    
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='camera-reverse-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}
const GaleryButton = () => {    
    return (
        <TouchableOpacity style={styles.galleryButton} >
            <Ionicons name='images-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}
const ReturnCancelButton = ({onPress}: {onPress: () => void}) => {    
    return (
        <TouchableOpacity style={styles.returnCancelButton} onPress={onPress}>
            <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}
const RetakeImageButton = ({onPress}: {onPress: () => void}) => {    
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='close-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flipCameraButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

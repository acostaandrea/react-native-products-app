import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { TextInput } from "react-native-gesture-handler";
import ThemedTextInput from "../../../presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroudColor = useThemeColor({}, 'background')
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40, backgroundColor:backgroudColor }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre completo"            
            autoCapitalize="words"
            icon="person-outline"
          />
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>
        <View style={{marginVertical:10}}/>
        {/* Boton */}
        <ThemedButton icon="arrow-forward-outline">Crear</ThemedButton>
        <View style={{marginVertical:10}}/>
        {/* Enlace */}
        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
          <ThemedText>¿Ya tienes cuenta?</ThemedText>          
          <ThemedLink href='/auth/login' style={{marginHorizontal:5}}>Ingresar</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

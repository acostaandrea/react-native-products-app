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

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>
        <View style={{ marginTop: 20 }}>
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
        <ThemedButton icon="arrow-forward-outline">Ingresar</ThemedButton>
        <View style={{marginVertical:10}}/>
        {/* Enlace */}
        <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
          <ThemedText>¿No tienes cuenta?</ThemedText>          
          <ThemedLink href='/auth/register' style={{marginHorizontal:5}}>Crear cuenta</ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

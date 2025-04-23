import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { TextInput } from "react-native-gesture-handler";
import ThemedTextInput from "../../../presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { router } from "expo-router";

const LoginScreen = () => {
  const {login} = useAuthStore()
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background')
  const [isPosting, setIsPosting] = useState(false)

  const [form,  setform] = useState({
    email: "",
    password: "",
  })

  const onLogin = async () => {
    const {email, password} = form;
    console.log(email, password)
    if(email === "" || password === "") {
      Alert.alert("Error","Por favor ingrese su correo y contraseña")
      return
    }
    setIsPosting(true)
    const wasSuccessful = await login(email, password);
    setIsPosting(false)
    if(wasSuccessful) {
      router.replace('/')
      return;
    }
    Alert.alert("Error", "Usuario o contraseña incorrectos", )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40,
        backgroundColor:backgroundColor
       }}>
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
            value={form.email}
            onChangeText={(text) => setform({...form, email: text})}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(text) => setform({...form, password: text})}
          />
        </View>
        <View style={{marginVertical:10}}/>
        {/* Boton */}
        <ThemedButton onPress={onLogin} disabled={isPosting} 
        icon="arrow-forward-outline"
        >Ingresar</ThemedButton>
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

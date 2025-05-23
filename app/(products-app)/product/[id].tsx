import { View, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ProductImages from "@/presentation/products/components/ProductImages";
import ThemeButtonGroup from "@/presentation/theme/components/ThemeButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";

const ProductScreen = () => {
  const navigation = useNavigation();
  const {id} = useLocalSearchParams();
  const {productQuery} = useProduct(`${id}`);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={24} color="black" />
      ),
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
          {productQuery.data?.title}
        </ThemedText>
      ),
    });
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} color="black" />
      </View>
    );
  }
  if (!productQuery.data) {
    return (
     <Redirect href="/" />
    );
  }
  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={product.images}/>
        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />
          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemedTextInput
            placeholder="Descripcion"
            style={{ marginVertical: 5 }}
            multiline
            numberOfLines={5}
          />
        </ThemedView>
        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>
        <ThemedView style={{ marginHorizontal: 10 }}>
          <ThemeButtonGroup
            options={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
            selectedOptions={product.sizes}
            onSelect={(option) => {
              console.log(option);
            }}
           />
          <ThemeButtonGroup
            options={['kid', 'men', 'women', 'unisex']}
            selectedOptions={[product.gender]}
            onSelect={(option) => {
              console.log(option);
            }}
           />
        </ThemedView>
        <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
          <ThemedButton icon='save-outline'  onPress={() =>console.log('Guardar')}>Guardar</ThemedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;

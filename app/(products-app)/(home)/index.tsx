import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import ProductList from "@/presentation/products/components/ProductList";
import { router } from "expo-router";
import { FAB } from "@/presentation/theme/components/FAB";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
      <FAB iconName="add-outline" onPress={() => router.push("/(products-app)/product/new")} />
    </View>
  );
};

export default HomeScreen;

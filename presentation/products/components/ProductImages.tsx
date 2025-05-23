import { View, Text, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  return (
    <>
      {images.length === 0 ? (
        <View>
          <Image
            source={require("@/assets/images/no-product-image.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: 300,
                height: 300,
                marginHorizontal: 10,
                borderRadius: 5,
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default ProductImages;

import React, { useState } from 'react'
import { FlatList } from 'react-native';
import { Product } from '@/core/products/interfaces/product.interface'
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native-gesture-handler';

interface Props{
    products: Product[];
    loadNextPage: () => void;
}

const ProductList = ({products, loadNextPage}:Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryCLient = useQueryClient()

  const onPullToRefresh = async() => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 200));
    queryCLient.invalidateQueries({
      queryKey: ['products', 'infinite'],
    })
    setIsRefreshing(false)
  }
  return (
    <FlatList 
    data={products} 
    numColumns={2} 
    keyExtractor={(item)=> item.id}
    renderItem={({item}) => <ProductCard product={item}/>}
    onEndReached={loadNextPage}
    onEndReachedThreshold={0.8}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onPullToRefresh}        
    />
    }
    />
  )
}

export default ProductList
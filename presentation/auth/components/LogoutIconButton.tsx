import { View, Text,  } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useAuthStore } from '../store/useAuthStore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const LogoutIconButton = () => {
    const primaryColor = useThemeColor({}, 'primary')
    const {logout} = useAuthStore()
  return (
    <TouchableOpacity
    onPress={logout}
      style={{
        marginRight: 10,        
      }}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  )
}

export default LogoutIconButton
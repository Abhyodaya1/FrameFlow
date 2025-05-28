import { View, Text } from 'react-native'
import React from 'react'

const Infobox = ({title,subtitle,containerStyle,titlestyles}) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold ${titlestyles}`}>{title}</Text>
      <Text className={"text-gray-100 text-sm text-center font-pregular "}>{subtitle}</Text>
    </View>
  )
}

export default Infobox
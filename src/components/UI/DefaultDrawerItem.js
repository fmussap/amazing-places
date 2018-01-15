import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const DefaultDrawerItem = ({ iconName, onPress, subject }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemDesc}>
      <MaterialIcons name={iconName} style={styles.icon} />
      <Text style={styles.textItem}>{subject}</Text>
    </View>
    <View style={styles.itemRight}>
      <MaterialIcons name='chevron-right' style={styles.icon} />
    </View>
  </TouchableOpacity>
)

DefaultDrawerItem.defaultProps = {
  iconName: 'star',
  onPress: () => null,
  subject: 'New item'
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 35,
    color: 'white'
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 10,
    paddingTop: 20
  },
  itemDesc: {
    alignItems: 'center',
    flex: 6,
    flexDirection: 'row'
  },
  itemRight: {
    flex: 1
  },
  textItem: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 20
  }
})

export default DefaultDrawerItem

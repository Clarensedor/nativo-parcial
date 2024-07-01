import React, {ReactNode} from 'react';
import {StyleSheet, View, Pressable, Dimensions, Platform} from 'react-native';

interface Props {
  children?: ReactNode;
  id?: number;
  onPressHandler: (id: number) => void;
}

const Card = ({children, id, onPressHandler}: Props) => {
  return (
    <Pressable
      onPress={() => {
        onPressHandler(id as number);
      }}>
      <View style={styles.container}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === 'ios' ? 'wheat' : 'coral',
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    width: Dimensions.get('window').width <= 375 ? 200 : 350,
    padding: 8,
    marginBottom: Dimensions.get('window').width <= 375 ? 8 : 24,
    alignItems: Dimensions.get('window').width <= 375 ? 'flex-start' : 'center',
  },
});

export default Card;

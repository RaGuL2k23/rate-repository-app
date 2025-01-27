import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Menu, PaperProvider } from 'react-native-paper';
import Text from '../components/Text';

const MyComponent = ({ changeOrderBy, changeOrderDirection }) => {
  const [visible, setVisible] = useState(false);
  const [margin, setMargin] = useState(0);
  const [selectedOption, setSelectedOption] = useState(''); // State to keep track of the selected option

  const openMenu = () => {
    setVisible(true);
    setMargin(200);
  };

  const closeMenu = () => {
    setVisible(false);
    setMargin(0);
  };

  const handleSelection = (option, direction = null) => {
    let optionLabel = '';
    if (option === 'RATING_AVERAGE') {
      optionLabel = direction === 'DESC' ? 'HIGHEST RATING' : 'LOWEST RATING';
    } else if (option === 'CREATED_AT') {
      optionLabel = 'Latest Repos';
    }

    setSelectedOption(optionLabel);
    changeOrderBy(option);
    if (direction) {
      changeOrderDirection(direction);
    }
    closeMenu();
  };

  return (
    <PaperProvider>
      <View style={{...styles.container, marginBottom: margin}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable style={styles.pressable} onPress={openMenu}>
              <Text style={styles.text} fontSize="subheading">
                sort by {selectedOption}
              </Text>
            </Pressable>
          }
        >
          <Menu.Item
            onPress={() => handleSelection('RATING_AVERAGE', 'DESC')}
            title="HIGHEST RATING"
          />
          <Menu.Item
            onPress={() => handleSelection('RATING_AVERAGE', 'ASC')}
            title="LOWEST RATING"
          />
          <Menu.Item
            onPress={() => handleSelection('CREATED_AT', 'DESC')}
            title="Latest Repos"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'none',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pressable: {
    flex: 1,
  },
  text: {
    padding: 10,
    backgroundColor: 'purple',
    color: 'white',
    textAlign: 'center',
  },
});

export default MyComponent;
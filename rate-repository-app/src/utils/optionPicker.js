import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Menu, PaperProvider } from 'react-native-paper';
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
    setSelectedOption(option+' '+direction);
    changeOrderBy(option);
    if (direction) {
      changeOrderDirection(direction);
    }
    closeMenu();
  };

  return (
    <PaperProvider>
      <View
        style={{
          marginBottom: margin,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Pressable  onPress={openMenu}><Text  style={{backgroundColor:'purple',color:'white'}} fontSize={"heading"}>Sort By: {selectedOption}</Text></Pressable>}
        >
          <Menu.Item
            onPress={() => handleSelection('RATING_AVERAGE',"DESC")}
            title="HIGHEST RATING"
          />
          <Menu.Item
            onPress={() => handleSelection('RATING_AVERAGE', 'ASC')}
            title="LOWEST RATING"
          />
          <Menu.Item
            onPress={() => handleSelection('CREATED_AT','DESC')}
            title="DATE"
          />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default MyComponent;

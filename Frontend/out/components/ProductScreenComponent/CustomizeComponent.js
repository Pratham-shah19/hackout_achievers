import {View, Text} from 'react-native';
import React, {useState} from 'react';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {CheckBox, Icon} from 'react-native-elements';

const CustomizeComponent = ({customize}) => {
  const [checkBoxState, setCheckBoxState] = useState(false);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 300}}>
          <CheckBox
            containerStyle={{backgroundColor: '#ffffff', borderColor: 'white'}}
            title={customize.title}
            checked={checkBoxState}
            checkedColor={'#a041f0'}
            onPress={() => setCheckBoxState(!checkBoxState)}
            textStyle={{fontWeight: '400', color: 'black', fontSize: 16}}
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontWeight: '400',
              color: 'black',
              fontSize: 16,
              marginRight: 20,
            }}>
            {'\u20B9'} {customize.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomizeComponent;

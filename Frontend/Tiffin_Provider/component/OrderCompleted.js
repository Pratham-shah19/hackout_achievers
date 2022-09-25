// import {View, Text, Image} from 'react-native';
// import React from 'react';

// const OrderStatusComponent = ({order}) => {
//   return (
//     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//       <Image
//         source={{
//           uri: order.Dish.productImage,
//         }}
//         style={{width: 150, height: 150, borderRadius: 10}}
//       />
//       <Text
//         style={{
//           fontFamily: 'Fredoka-Regular',
//           fontSize: 15,
//           color: 'black',
//         }}>
//         {order.Dish.productName} x {order.quantity}
//       </Text>
//     </View>
//   );
// };

// export default OrderStatusComponent;

import {View, Text, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {DataStore} from 'aws-amplify';
import {User} from '../src/models';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {S3Image} from 'aws-amplify-react-native';

// const order = OrderData[0];
const OrderStatusComponent = ({order}) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    DataStore.query(User, order.userID).then(setUser);
  }, []);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        margin: 5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        height: 110,
        marginVertical: 10,
      }}>
      <View
        style={{
          flex: 3,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        {/* <Image
          source={{
            uri: order.Restaurant.restaurantImage,
          }}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        /> */}
        <S3Image
          imgKey={order.Restaurant.restaurantImage}
          style={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>

      <View style={{flex: 6, paddingVertical: 4, paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            marginVertical: 2,
            fontFamily: 'Fredoka-Medium',
          }}>
          Order Details:
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: 'grey',
            fontFamily: 'Fredoka-Regular',
            color: 'black',
          }}>
          {user?.name}
        </Text>
        <Text
          style={{fontSize: 12, color: 'grey', fontFamily: 'Fredoka-Regular'}}>
          {user?.address}
        </Text>
        <Text
          style={{fontSize: 13, color: 'black', fontFamily: 'Fredoka-Regular'}}>
          {order.Restaurant.restaurantName}
        </Text>
        <Text
          style={{fontSize: 12, color: 'grey', fontFamily: 'Fredoka-Regular'}}>
          {order.Restaurant.address}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: 'white',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <Ionicons name="fast-food" size={35} color={'grey'} />
      </View>
    </Pressable>
  );
};

export default OrderStatusComponent;

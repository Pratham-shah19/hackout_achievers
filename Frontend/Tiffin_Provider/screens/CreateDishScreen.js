import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DataStore} from 'aws-amplify';
import {Dish} from '../src/models';
import {useRoute, useNavigation} from '@react-navigation/native';
import DishScreenItemComponent from '../component/DishScreenItemComponent';
import {useAuthContext} from '../src/Contexts/AuthContext';

const CreateDishScreen = () => {
  const {dbRestaurant} = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const [dish, setDishes] = useState([]);

  const fetchDishes = async () => {
    const dish = await DataStore.query(Dish, dish =>
      dish.restaurantID('eq', dbRestaurant.id),
    );
    setDishes(dish);
  };
  const today = new Date();
  const greeting = () => {
    if (today.getHours() < 12 && today.getHours() > 6) {
      return 'Good Morning';
    } else if (today.getHours() > 12 && today.getHours() < 16) {
      return 'Good Afternoon!';
    } else if (today.getHours() > 16 && today.getHours() < 23) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  };

  useEffect(() => {
    fetchDishes();
    const subscription = DataStore.observe(Dish).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        fetchDishes();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'Fredoka-Regular',
          }}>
          {dbRestaurant?.restaurantName}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontFamily: 'Fredoka-Medium',
            marginTop: 6,
          }}>
          {greeting()}
        </Text>
      </View>
      <View style={styles.searchSection}>
        <Ionicons
          style={{marginHorizontal: 5}}
          name="ios-search"
          size={20}
          color="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Search dishes"
          placeholderTextColor={'grey'}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{alignContent: 'center', padding: 15, marginTop: 10}}>
        <Image
          source={{
            uri: 'https://pizzawings.co.in/wp-content/uploads/2020/12/Classic-Veg.jpg',
          }}
          style={{height: 220, borderRadius: 15}}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderRadius: 10,
          marginHorizontal: 8,
          backgroundColor: '#f7442d',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CreateNewDishScreen')}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Fredoka-Medium',
            marginVertical: 10,
            fontSize: 17,
          }}>
          Create New Dish
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Fredoka-Regular',
          // marginVertical: 10,
          fontSize: 17,
          alignSelf: 'center',
          marginTop: 15,
        }}>
        Your current Dishes
      </Text>
      <View style={{padding: 0, backgroundColor: 'white'}}>
        <FlatList
          data={dish}
          renderItem={({item}) => {
            return <DishScreenItemComponent dish={item} />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 14,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  input: {
    borderRadius: 10,
    color: 'black',
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    marginVertical: 0,
    // backgroundColor: '#fff',
    // color: '#424242',
  },
});

export default CreateDishScreen;

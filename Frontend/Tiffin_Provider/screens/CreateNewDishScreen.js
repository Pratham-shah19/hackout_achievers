import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataStore} from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Dish} from '../src/models';
import {useAuthContext} from '../src/Contexts/AuthContext';
import Entypo from 'react-native-vector-icons/Entypo';

const CreateNewDishScreen = () => {
  const {dbRestaurant, id} = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute();
  const [dishes, setDishes] = useState([]);
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('0');
  const [productNoOfRating, setProductNoOfRating] = useState('0');
  const [productRating, setProductRating] = useState('0');
  // https://theharekrishnamovement.files.wordpress.com/2011/09/prasadam.jpg

  const onSave = async () => {
    if (dbRestaurant) {
      await createDish();
    }
    navigation.goBack();
  };

  const createDish = async () => {
    try {
      const newDish = await DataStore.save(
        new Dish({
          productName,
          productImage,
          productCategory,
          productDescription,
          productPrice: parseInt(productPrice),
          productNoOfRating: parseInt(productNoOfRating),
          productRating: parseFloat(productRating),
          restaurantID: id,
        }),
      );
      setDishes([...dishes, newDish]);
    } catch (err) {
      Alert.alert('Error');
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
          marginTop: 15,
        }}>
        <TouchableOpacity
          style={{
            marginRight: 30,
            width: 35,
            height: 35,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          // disabled={isButtonDisabled()}
          onPress={onBack}>
          <Entypo name="chevron-left" size={28} color={'black'} />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="food-fork-drink"
          size={25}
          color={'#f7442d'}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: 'Fredoka-Regular',
            marginHorizontal: 10,
          }}>
          Create New Dishes
        </Text>
      </View>
      <View style={{marginTop: 20, padding: 10}}>
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Product Name*
        </Text>
        <TextInput
          value={productName}
          onChangeText={setProductName}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product Image*
        </Text>
        <TextInput
          value={productImage}
          onChangeText={setProductImage}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product Category*
        </Text>
        <TextInput
          value={productCategory}
          onChangeText={setProductCategory}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product Description*
        </Text>
        <TextInput
          value={productDescription}
          onChangeText={setProductDescription}
          style={styles.textinput}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product Price*
        </Text>
        <TextInput
          value={productPrice}
          onChangeText={setProductPrice}
          style={styles.textinput}
          keyboardType={'numeric'}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product No Of Rating*
        </Text>
        <TextInput
          value={productNoOfRating}
          onChangeText={setProductNoOfRating}
          style={styles.textinput}
          keyboardType={'numeric'}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-Regular',
            color: '#878787',
            marginTop: 5,
          }}>
          Product Rating*
        </Text>
        <TextInput
          value={productRating}
          onChangeText={setProductRating}
          style={styles.textinput}
          keyboardType={'numeric'}
        />
      </View>
      <Pressable style={{marginTop: 20, marginBottom: 20}} onPress={onSave}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f7442d',
            paddingVertical: 15,
            borderRadius: 7,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontFamily: 'Fredoka-Medium',
              marginHorizontal: 130,
            }}>
            Save Dish
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textinput: {
    height: 50,
    backgroundColor: '#f7f5f5',
    marginVertical: 8,
    fontSize: 15,
    paddingHorizontal: 13,
    borderRadius: 6,
    fontFamily: 'Fredoka-Regular',
    marginHorizontal: 10,
    color: 'grey',
  },
});

export default CreateNewDishScreen;

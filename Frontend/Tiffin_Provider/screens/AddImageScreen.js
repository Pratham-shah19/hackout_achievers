import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {Restaurant} from '../src/models';
import {DataStore} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';

const AddImageScreen = () => {
  const route = useRoute();
  const {dbRestaurant, setDbRestaurant} = useAuthContext();
  const navigation = useNavigation();
  const [Image1, setImage1] = useState(dbRestaurant?.image1 || '');
  const [Image2, setImage2] = useState(dbRestaurant?.image2 || '');
  const [Image3, setImage3] = useState(dbRestaurant?.image3 || '');
  const [Image4, setImage4] = useState(dbRestaurant?.image4 || '');
  const [Image5, setImage5] = useState(dbRestaurant?.image5 || '');
  const [Image6, setImage6] = useState(dbRestaurant?.image6 || '');
  const [Image7, setImage7] = useState(dbRestaurant?.image7 || '');
  const [Image8, setImage8] = useState(dbRestaurant?.image8 || '');

  const onSave = async () => {
    if (dbRestaurant) {
      await uploadPhotos();
    }
    navigation.goBack();
  };

  const uploadPhotos = async () => {
    const restaurant = await DataStore.save(
      Restaurant.copyOf(dbRestaurant, updated => {
        updated.image1 = Image1;
        updated.image2 = Image2;
        updated.image3 = Image3;
        updated.image4 = Image4;
        updated.image5 = Image5;
        updated.image6 = Image6;
        updated.image7 = Image7;
        updated.image8 = Image8;
      }),
    );
    setDbRestaurant(restaurant);
  };

  return (
    <ScrollView style={{padding: 10, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color={'black'} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Feather
            name="image"
            size={21}
            color={'black'}
            style={{marginLeft: 7}}
          />
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              color: 'black',
              fontSize: 17,
              marginHorizontal: 5,
              // alignSelf: 'center',
              // textAlign: 'center',
            }}>
            Add Some Amazing Photos!!
          </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 1*
        </Text>
        <TextInput
          value={Image1}
          onChangeText={setImage1}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 2*
        </Text>
        <TextInput
          value={Image2}
          onChangeText={setImage2}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 3*
        </Text>
        <TextInput
          value={Image3}
          onChangeText={setImage3}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 4*
        </Text>
        <TextInput
          value={Image4}
          onChangeText={setImage4}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 5*
        </Text>
        <TextInput
          value={Image5}
          onChangeText={setImage5}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 6*
        </Text>
        <TextInput
          value={Image6}
          onChangeText={setImage6}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 7*
        </Text>
        <TextInput
          value={Image7}
          onChangeText={setImage7}
          style={styles.textinput}
        />
        <Text style={{fontFamily: 'Fredoka-Regular', color: '#878787'}}>
          Image 8*
        </Text>
        <TextInput
          value={Image8}
          onChangeText={setImage8}
          style={styles.textinput}
        />
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
                fontSize: 17,
                fontFamily: 'Fredoka-Medium',
                marginHorizontal: 110,
              }}>
              Save Images
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    height: 50,
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    fontSize: 15,
    paddingHorizontal: 13,
    marginHorizontal: 10,
    borderRadius: 6,
    fontFamily: 'Fredoka-Regular',
  },
});

export default AddImageScreen;

import {View, Text, Pressable, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import {Restaurant, Favourites} from '../src/models';
import {useAuthContext} from '../src/Contexts/AuthContext';
import {S3Image} from 'aws-amplify-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import FavouriteScreenComponent from '../components/FavouriteScreenComponents/FavouriteScreenComponent';

const FavouriteScreen = () => {
  const {id} = useAuthContext();
  const [fc, setFc] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Favourites, favourite => favourite.userID('eq', id)).then(
      setFc,
    );
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{marginTop: 15, marginBottom: 15}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Fredoka-Regular',
            fontSize: 19,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          Your Favourites😋
        </Text>
      </View>
      <FlatList
        data={fc}
        renderItem={({item}) => <FavouriteScreenComponent favourite={item} />}
      />
    </View>
  );
};

export default FavouriteScreen;

import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Text,
} from 'react-native';
import AntDesigen from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import {Feather, Entypo} from '@expo/vector-icons';

import React from 'react';

const Like = () => {
  const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setCLicked}) => {
    return (
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <AntDesigen name="arrowleft" size={25} style={{marginLeft: 1}} />
          <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>
            Ho
          </Text>
        </View>
        <View style={styles.view2}></View>
        {/* <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Search dishes, restaurant"
          underlineColorAndroid="transparent"
        />
      </View> */}
        <View style={styles.container}>
          <View
            style={
              clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
            }>
            {/* search Icon */}
            {/* <Feather
              name="search"
              size={20}
              color="black"
              style={{marginLeft: 1}}
            /> */}
            <AntDesigen
              name="left"
              size={25}
              style={{marginTop: 10, marginLeft: 1}}
            />

            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchPhrase}
              onChangeText={setSearchPhrase}
              onFocus={() => {
                setCLicked(true);
              }}
            />
            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              // <Entypo
              //   name="cross"
              //   size={20}
              //   color="black"
              //   style={{padding: 1}}
              //   onPress={() => {
              //     setSearchPhrase('');
              //   }}
              // />
              <AntDesigen
                name="left"
                size={25}
                style={{marginTop: 10, marginLeft: 1}}
              />
            )}
          </View>
          {/* cancel button, depending on whether the search bar is clicked or not */}
          {clicked && (
            <View>
              <Button
                title="Cancel"
                onPress={() => {
                  Keyboard.dismiss();
                  setCLicked(false);
                }}></Button>
            </View>
          )}
        </View>
      </View>
    );
  };
};
const styles = StyleSheet.create({
  view2: {
    backgroundColor: 'lightgray',
    height: 2,
    marginTop: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 14,
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
  searchIcon: {
    padding: 7,
  },
  // input: {
  //   flex: 1,
  //   fontSize: 20,
  //   paddingLeft: 0,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  //   color: '#424242',
  // },
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});

export default Like;

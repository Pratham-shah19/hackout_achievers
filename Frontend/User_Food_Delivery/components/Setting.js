import {View, Text, StyleSheet} from 'react-native';
import AntDesigen from 'react-native-vector-icons/AntDesign';
import React from 'react';

const Setting = () => {
  return (
    <View>
      <View>
        <AntDesigen
          name="left"
          size={25}
          style={{marginTop: 10, marginLeft: 1}}
        />
      </View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>Settings</Text>
        <Text style={styles.secondfont}>version</Text>
      </View>
      <View style={styles.view2}></View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>Add a place</Text>
        <Text style={styles.secondfont}>in case we'are missing somethings</Text>
      </View>
      <View style={styles.view2}></View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>places you have added</Text>
        <Text style={styles.secondfont}>see all places you added</Text>
      </View>
      <View style={styles.view2}></View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>Edit profile</Text>
        <Text style={styles.secondfont}>
          change name ,description and profile00
        </Text>
      </View>
      <View style={styles.view2}></View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>Notification ser=ttings</Text>
        <Text style={styles.secondfont}>definr what name ,de</Text>
      </View>
      <View style={styles.view2}></View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>Account Setting</Text>
        <Text style={styles.secondfont}>
          change your mail or delete your Account
        </Text>
        <View style={styles.view2}></View>
      </View>
      <View style={styles.view1}>
        <Text style={styles.maintext1}>App permision</Text>
        <Text style={styles.secondfont}>open your phine Settings</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  view1: {
    height: 60,
    marginTop: 10,
  },
  maintext1: {
    fontFamily: 'Fredoka-SemiBold',
    fontSize: 20,
    marginLeft: 12,
    color: '#0f0f0f',
  },
  secondfont: {
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Fredoka-Regular',
  },
  view2: {
    backgroundColor: 'lightgray',
    height: 2,
  },
});

export default Setting;

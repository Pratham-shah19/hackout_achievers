import {View, Text, StyleSheet} from 'react-native';
import AntDesigen from 'react-native-vector-icons/AntDesign';
import React from 'react';

const Like = () => {
  return (
    <View>
      <View style={{marginTop: 10}}>
        <AntDesigen
          name="arrowleft"
          size={25}
          style={{marginLeft: 1, color: 'black'}}
        />
        <Text
          style={{
            fontFamily: 'Fredoka-SemiBold',
            fontSize: 28,
            marginLeft: 10,
            color: 'black',
            marginTop: 10,
          }}>
          About
        </Text>
      </View>

      <View style={styles.view2}></View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          height: 50,
        }}>
        <Text style={styles.text}>Terms of service</Text>
        <AntDesigen name="right" size={25} style={{marginLeft: 210}} />
      </View>
      <View style={styles.view2}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          height: 50,
        }}>
        <Text style={styles.text}>App version</Text>
      </View>
      <View style={styles.view2}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          height: 50,
        }}>
        <Text style={styles.text}>Oper=n source librab=ries</Text>
        <AntDesigen name="right" size={25} style={{marginLeft: 140}} />
      </View>
      <View style={styles.view2}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          height: 50,
        }}>
        <Text style={styles.text}>Licences and registration</Text>
        <AntDesigen name="right" size={25} style={{marginLeft: 140}} />
      </View>
      <View style={styles.view2}></View>

      {/* <View style={styles.view2}></View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  view2: {
    backgroundColor: 'lightgray',
    height: 2,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
    colour: 'black',
    fontFamily: 'Fredoka-Regular',
  },
});
export default Like;

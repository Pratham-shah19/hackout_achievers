// import * as React from 'react';
// import {TextInput, SafeAreaView, StyleSheet, FlatList} from 'react-native';
// import SearchScreenComponent from '../components/SearchScreenComponent';
// import {Text, View} from '../components/Themed';
// import {RootTabScreenProps} from '../types';

// export default function SearchScreen({
//   navigation,
// }: RootTabScreenProps<'SearchScreen'>) {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.textInputStyle}
//           // onChangeText={(text) => searchFilterFunction(text)}
//           // value={search}
//           underlineColorAndroid="transparent"
//           placeholder="Search Here"
//         />
//         {/* <FlatList
//           data={filteredDataSource}
//           keyExtractor={(item, index) => index.toString()}
//           ItemSeparatorComponent={ItemSeparatorView}
//           renderItem={ItemView}
//         /> */}
//       </View>
//       <View>
//         <SearchScreenComponet />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     margin: 10,
//     marginVertical: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   textInputStyle: {
//     height: 40,
//     borderWidth: 1,
//     paddingLeft: 20,
//     margin: 5,
//     borderColor: '#8f58c7',
//     backgroundColor: '#FFFFFF',
//   },
// });

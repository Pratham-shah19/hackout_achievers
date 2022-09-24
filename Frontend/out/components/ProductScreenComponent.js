import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ProductScreenComponent = ({dish}) => {
  const navigation = useNavigation();
  const DEFAULT_IMAGE =
    'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Waagmi_Soni/Gralic_Crust_Veggie_Pizza.jpg';
  return (
    <Pressable
      style={{
        height: 160,
        padding: 13,
        flexDirection: 'row',
        backgroundColor: 'white',
      }}
      onPress={() => navigation.navigate('Dish', {id: dish.id})}>
      <View style={{flex: 3}}>
        <View>
          <Image
            style={{height: 13, width: 13, borderRadius: 2}}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/768px-Indian-vegetarian-mark.svg.png',
            }}
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Fredoka-Regular',
              marginTop: 7,
              color: 'black',
            }}>
            {dish.productName}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 11,
              color: 'gray',
              marginTop: 7,
              fontFamily: 'Fredoka-Regular',
            }}>
            {dish.productCategory}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: '#fcfcf2',
            borderColor: '#fce651',
            padding: 1,
            borderRadius: 4,
            alignItems: 'center',
            width: 90,
            marginTop: 7,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {[0, 0, 0, 0, 0].map((el, i) => (
              <FontAwesome
                style={{margin: 0.5}}
                name={i < Math.floor(dish.productRating) ? 'star' : 'star-o'}
                size={11}
                color={'#fabe1b'}
              />
            ))}
            <Text
              style={{
                fontSize: 11,
                color: '#696965',
                fontWeight: 'bold',
                marginHorizontal: 3,
              }}>
              {dish.productNoOfRating}
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', marginTop: 7}}>
          <Text style={{fontSize: 13, fontWeight: '500', color: 'black'}}>
            {'\u20B9'}
            <Text style={{fontSize: 13, color: 'black'}}>
              {dish.productPrice}
            </Text>
          </Text>
        </View>
        <View style={{marginTop: 7}}>
          <Text
            style={{
              fontSize: 12,
              color: '#4f4f4d',
              fontFamily: 'Fredoka-Regular',
            }}>
            {dish.productDescription}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, marginTop: 5, marginRight: 10}}>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
        <TouchableOpacity>
          <Image
            style={{height: 95, width: 95, borderRadius: 10}}
            source={{
              uri: dish.productImage,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: 32,
            width: 85,
            position: 'absolute',
            top: '63%',
            left: '6%',
            backgroundColor: '#fcf7ff',
            borderColor: '#be8ee6',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 9,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            // onPress={() => setModalVisible(true)}>
          >
            <Text style={{color: '#a041f0', fontFamily: 'Fredoka-Medium'}}>
              ADD
            </Text>
            <Text
              style={{
                color: '#a041f0',
                fontWeight: '500',
                position: 'absolute',
                top: '-32%',
                fontSize: 12,
                left: '50%',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: '90%', left: '15%'}}>
          <Text
            style={{
              fontSize: 11,
              color: '#848385',
              fontFamily: 'Fredoka-Regular',
            }}>
            customizable
          </Text>
        </View>
      </View>
      {/* <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          flex: 1,
          height: 400,
          marginTop: 0,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            height: '25%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 36,
              width: 36,
              backgroundColor: 'white',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: 18,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons
              name="md-close"
              size={24}
              style={{alignSelf: 'center'}}
              color={'#a26bdb'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.3)', height: 290}}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg',
              }}
              style={{
                height: '100%',
                width: '100%',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}
            />
          </View>

          <View style={{backgroundColor: 'white'}}>
            <View
              style={{
                marginTop: 20,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 23,
                    fontFamily: 'Fredoka-Medium',
                    alignSelf: 'center',
                  }}>
                  Thin Crust 😋
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 18,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo name="stopwatch" size={25} color={'blue'} />
                <Text
                  style={{marginHorizontal: 7, color: 'black', fontSize: 16}}>
                  50 mins
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="star" size={25} color={'yellow'} />
                <Text
                  style={{marginHorizontal: 7, color: 'black', fontSize: 16}}>
                  4.8
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo name="leaf" size={25} color={'green'} />
                <Text
                  style={{
                    marginHorizontal: 7,
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Fredoka-Regular',
                  }}>
                  Pure Veg.
                </Text>
              </View>
            </View>
            <View style={{margin: 15, marginTop: 20}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  lineHeight: 20,
                  fontFamily: 'Fredoka-Regular',
                }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
                porro illo iusto sed nulla! Tempore aperiam cumque
              </Text>
            </View>
            <View style={{marginHorizontal: 10, marginTop: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Fredoka-Medium',
                }}>
                Customize
              </Text>
            </View>
            <CustomizeComponent title="Extra Cheese" id="id" price={45} />
            <CustomizeComponent title="Extra Toppings" id="id" price={55} />
            <CustomizeComponent title="Extra Cheese" id="id" price={40} />
            <CustomizeComponent title="Extra Cheese" id="id" price={45} />
          </View>
        </ScrollView>
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: 20,
            justifyContent: 'space-around',
            backgroundColor: 'white',
            marginBottom: 3,
          }}>
          <View
            style={{
              flex: 2,
              marginHorizontal: 10,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}>
            <TouchableOpacity style={{margin: 10}} onPress={onMinus}>
              <Text style={{color: 'black', fontSize: 20}}>-</Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#a26bdb',
                  fontSize: 23,
                  fontWeight: 'bold',
                }}>
                {quantity}
              </Text>
            </View>
            <TouchableOpacity style={{margin: 10}} onPress={onPlus}>
              <Text style={{color: 'black', fontSize: 20}}>+</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 3,
              marginHorizontal: 10,
              width: screenWidth / 2.5,
              backgroundColor: '#a26bdb',
              borderRadius: 25,
              padding: 10,
              paddingHorizontal: 28,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '500', fontSize: 19}}>
              Add Item - {'\u20B9'}
            </Text>
          </View>
        </View>
      </View>
    </Modal> */}
    </Pressable>
  );
};

export default ProductScreenComponent;

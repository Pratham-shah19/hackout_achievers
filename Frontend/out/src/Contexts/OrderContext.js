import {View, Text} from 'react-native';
import React, {useContext, createContext, useState, useEffect} from 'react';
import {DataStore, API, graphqlOperation} from 'aws-amplify';
import {Order, OrderDetail, Basket, BasketDish, OrderDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useBasketContext} from './BasketContext';
import {createOrderIntent} from '../models/schema';

const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const {basket, restaurant, totalPrice, basketDishes} = useBasketContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, o => o.userID('eq', dbUser.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Restaurant: restaurant,
        total: totalPrice,
        status: 'NEW',
      }),
    );

    await Promise.all(
      basketDishes.map(basketDish =>
        DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          }),
        ),
      ),
    );

    await DataStore.delete(basket);
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  const getOrder = async id => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, od =>
      od.orderID('eq', id),
    );
    return {...order, dishes: orderDishes};
  };

  return (
    <OrderContext.Provider value={{createOrder, orders, getOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);

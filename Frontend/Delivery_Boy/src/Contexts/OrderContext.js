import React, {createContext, useState, useEffect, useContext} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {Courier, Order, User, OrderDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useRoute} from '@react-navigation/native';

const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
  const {dbCourier} = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState();
  //   const route = useRoute();
  //   const id = route.params?.id;
  const fetchOrder = async id => {
    if (!id) {
      return;
    }
    const fetchedOrder = await DataStore.query(Order, id);
    setOrder(fetchedOrder);
    DataStore.query(User, fetchedOrder.userID).then(setUser);
    DataStore.query(OrderDish, od => od.orderID('eq', fetchedOrder.id)).then(
      setDishes,
    );
  };

  useEffect(() => {
    if (!order) {
      return;
    }
    const subscription = DataStore.observe(Order, order.id).subscribe(
      ({opType, element}) => {
        if (opType === 'UPDATE') {
          fetchOrder(element.id);
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [order?.id]);
  const acceptOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, updated => {
        updated.status = 'ACCEPTED';
        updated.Courier = dbCourier;
      }),
    );
    setOrder(updatedOrder);
  };
  const pickUpOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, updated => {
        updated.status = 'PICKED_UP';
      }),
    );
    setOrder(updatedOrder);
  };
  const completeOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, updated => {
        updated.status = 'COMPLETED';
      }),
    );
    setOrder(updatedOrder);
  };
  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        order,
        user,
        dishes,
        fetchOrder,
        pickUpOrder,
        completeOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);

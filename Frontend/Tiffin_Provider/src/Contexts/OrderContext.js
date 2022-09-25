import React, {createContext, useState, useEffect, useContext} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {Courier, Order, User, OrderDish, Restaurant} from '../models';
import {useAuthContext} from './AuthContext';

const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
  const {dbRestaurant} = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState();

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

  const cookOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, updated => {
        updated.status = 'COOKING';
        // updated.Courier = dbCourier;
      }),
    );
    setOrder(updatedOrder);
    console.log(order);
  };
  const readyForPickUpOrder = async () => {
    const updatedOrder = await DataStore.save(
      Order.copyOf(order, updated => {
        updated.status = 'READY_FOR_PICKUP';
      }),
    );
    setOrder(updatedOrder);
  };
  return (
    <OrderContext.Provider
      value={{
        cookOrder,
        order,
        user,
        dishes,
        fetchOrder,
        readyForPickUpOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);

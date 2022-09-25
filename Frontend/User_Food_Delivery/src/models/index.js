// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Mode = {
  "YES": "YES",
  "NO": "NO"
};

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED"
};

const { Favourites, Restaurant, Dish, Basket, BasketDish, Coupons, Courier, OrderDish, Order, User } = initSchema(schema);

export {
  Favourites,
  Restaurant,
  Dish,
  Basket,
  BasketDish,
  Coupons,
  Courier,
  OrderDish,
  Order,
  User,
  Mode,
  TransportationModes,
  OrderStatus
};
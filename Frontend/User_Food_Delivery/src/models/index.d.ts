import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Mode {
  YES = "YES",
  NO = "NO"
}

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NEW = "NEW",
  COOKING = "COOKING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}



type FavouritesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BasketMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BasketDishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CouponsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourierMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderDishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Favourites {
  readonly id: string;
  readonly Restaurant?: Restaurant | null;
  readonly userID: string;
  readonly yesOrno?: Mode | keyof typeof Mode | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly favouritesRestaurantId?: string | null;
  constructor(init: ModelInit<Favourites, FavouritesMetaData>);
  static copyOf(source: Favourites, mutator: (draft: MutableModel<Favourites, FavouritesMetaData>) => MutableModel<Favourites, FavouritesMetaData> | void): Favourites;
}

export declare class Restaurant {
  readonly id: string;
  readonly restaurantName: string;
  readonly restaurantImage?: string | null;
  readonly deliveryFee: number;
  readonly timeToDeliver: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly Dishes?: (Dish | null)[] | null;
  readonly category: string;
  readonly city: string;
  readonly area: string;
  readonly Baskets?: (Basket | null)[] | null;
  readonly sub?: string | null;
  readonly image1?: string | null;
  readonly image2?: string | null;
  readonly image3?: string | null;
  readonly image4?: string | null;
  readonly image5?: string | null;
  readonly image6?: string | null;
  readonly image7?: string | null;
  readonly image8?: string | null;
  readonly Coupons?: (Coupons | null)[] | null;
  readonly noOfRating?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class Dish {
  readonly id: string;
  readonly productName: string;
  readonly productImage: string;
  readonly productCategory: string;
  readonly productDescription: string;
  readonly productPrice: number;
  readonly productNoOfRating?: number | null;
  readonly productRating?: number | null;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Dish, DishMetaData>);
  static copyOf(source: Dish, mutator: (draft: MutableModel<Dish, DishMetaData>) => MutableModel<Dish, DishMetaData> | void): Dish;
}

export declare class Basket {
  readonly id: string;
  readonly BasketDishes?: (BasketDish | null)[] | null;
  readonly userID: string;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Basket, BasketMetaData>);
  static copyOf(source: Basket, mutator: (draft: MutableModel<Basket, BasketMetaData>) => MutableModel<Basket, BasketMetaData> | void): Basket;
}

export declare class BasketDish {
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketDishDishId?: string | null;
  constructor(init: ModelInit<BasketDish, BasketDishMetaData>);
  static copyOf(source: BasketDish, mutator: (draft: MutableModel<BasketDish, BasketDishMetaData>) => MutableModel<BasketDish, BasketDishMetaData> | void): BasketDish;
}

export declare class Coupons {
  readonly id: string;
  readonly uptoPrice?: number | null;
  readonly offerPercentage?: number | null;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Coupons, CouponsMetaData>);
  static copyOf(source: Coupons, mutator: (draft: MutableModel<Coupons, CouponsMetaData>) => MutableModel<Coupons, CouponsMetaData> | void): Coupons;
}

export declare class Courier {
  readonly id: string;
  readonly name: string;
  readonly sub?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly transportationMode: TransportationModes | keyof typeof TransportationModes;
  readonly pincode?: number | null;
  readonly address?: string | null;
  readonly flat_no?: number | null;
  readonly state?: string | null;
  readonly city?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Courier, CourierMetaData>);
  static copyOf(source: Courier, mutator: (draft: MutableModel<Courier, CourierMetaData>) => MutableModel<Courier, CourierMetaData> | void): Courier;
}

export declare class OrderDish {
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDishDishId?: string | null;
  constructor(init: ModelInit<OrderDish, OrderDishMetaData>);
  static copyOf(source: OrderDish, mutator: (draft: MutableModel<OrderDish, OrderDishMetaData>) => MutableModel<OrderDish, OrderDishMetaData> | void): OrderDish;
}

export declare class Order {
  readonly id: string;
  readonly userID: string;
  readonly Restaurant?: Restaurant | null;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderDishes?: (OrderDish | null)[] | null;
  readonly Courier?: Courier | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderRestaurantId?: string | null;
  readonly orderCourierId?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly Orders?: (Order | null)[] | null;
  readonly sub: string;
  readonly Baskets?: (Basket | null)[] | null;
  readonly flat_no?: number | null;
  readonly city: string;
  readonly pincode: number;
  readonly state: string;
  readonly Favourites?: (Favourites | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import {Restaurant} from '../models';
import {DataStore, Auth} from 'aws-amplify';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbRestaurant, setDbRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [rid, setRid] = useState(null);
  const sub = authUser?.attributes?.sub;
  const id = dbRestaurant?.id;
  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Restaurant, restaurant => restaurant.sub('eq', sub)).then(
      restaurants => {
        setDbRestaurant(restaurants[0]);
        setLoading(false);
      },
    );
  }, [sub]);

  useEffect(() => {
    if (!dbRestaurant) {
      return;
    }
    const subscription = DataStore.observe(
      Restaurant,
      dbRestaurant.id,
    ).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        setDbRestaurant(msg.element);
      }
    });

    return () => subscription.unsubscribe();
  }, [dbRestaurant]);

  return (
    <AuthContext.Provider
      value={{authUser, dbRestaurant, sub, setDbRestaurant, loading, id}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

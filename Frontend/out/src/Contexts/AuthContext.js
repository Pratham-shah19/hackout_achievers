import React, {createContext, useState, useEffect, useContext} from 'react';
import {Auth, DataStore} from 'aws-amplify';
import {User} from '../models';
import {useRoute} from '@react-navigation/native';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const sub = authUser?.attributes?.sub;
  const id = dbUser?.id;
  useEffect(() => {
    Auth.currentAuthenticatedUser({bypassCache: true}).then(setAuthUser);
  }, []);

  useEffect(() => {
    DataStore.query(User, user => user.sub('eq', sub)).then(users => {
      setDbUser(users[0]);
    });
  }, [sub]);

  return (
    <AuthContext.Provider
      value={{authUser, dbUser, sub, setDbUser, loading, id}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);

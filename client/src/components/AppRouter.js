import React, { useContext, useEffect } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import ErrorPage from './ErroePageComponents/ErrorPage';
import { BASKET_ROUTE, ORDER_ROUTE } from '../utils/consts';
function AppRouter() {
    const {user} = useContext(Context)
    const location = useLocation()
    useEffect(() => {
        switch(location.pathname) {
          case BASKET_ROUTE: 
          user.setIsLoading(true)
          break;
          case ORDER_ROUTE:
            user.setIsLoading(true)
            break;
          default: user.setIsLoading(false);
        }
      }, [location.pathname])
    return (
        <Routes>
            {(user._user.role === 'ADMIN' || user._user.role === 'ADMIN_EDIT' || user._user.role === 'OPERATOR' || user._user.role === 'CASHIER' || user._user.role === 'COURIER')  && adminRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element} exact/>
            )} 
            {user._isAuth && authRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element} exact/>
            )} 
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element} exact/>
            )}
            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    );
  }

export default observer(AppRouter);


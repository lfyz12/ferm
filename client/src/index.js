import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import AssortmentStore from './store/AssortmentStore';
import BasketProductStore from './store/BasketProductStore';
import BasketStore from './store/BasketStore';
import ComplitedOrdersStore from './store/ComplitedOrdersStore';
import ComplitedOrderProductsStore from './store/ComplitedOrderProductsStore';
import FeedbackStore from './store/FeedbackStore';
import OrderStore from './store/OrderStore';
import OrderProductsStore from './store/OrderProductsStore';
import UseStore from './store/AdminStore';
import AdminOrderStore from './store/AdminOrderStore'

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext()

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    product: new ProductStore(), 
    assortment: new AssortmentStore(),
    basket: new BasketStore(),
    basketProduct: new BasketProductStore(),
    complitedOrders: new ComplitedOrdersStore(),
    complitedOrderProducts: new ComplitedOrderProductsStore(),
    feedback: new FeedbackStore(),
    order: new OrderStore(),
    orderProducts: new OrderProductsStore(),
    use: new UseStore(),
    adminOrders: new AdminOrderStore(),
  }}>
    <App />
  </Context.Provider>
);



import React, { useState, useEffect, useContext } from 'react';
import './historyOrder.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import ComplitedOrderItem from './ComplitedOrderItem';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { STORE_ROUTE } from '../../utils/consts';
import ComplitedOrdersService from '../../service/ComplitedOrdersService';

function HistoryOrder() {
  // const { complitedOrders } = useContext(Context)
  const { user } = useContext(Context)
  const [complitedOrdersDinamic, setComplitedOrdersDinamic] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const [fetching, setFetching] = useState(true)

  // async function fetchComplitedOrders() {
  //    await complitedOrders.getAllComplitedOrdersByUserId(user._user.id, limit, page)
  //    setComplitedOrdersDinamic(complitedOrders._complitedOrders ? complitedOrders._complitedOrders : [])
  // }

  useEffect(() => {
    if (fetching) {
      ComplitedOrdersService.getAllComplitedOrdersByUserId(user._user.id, limit, page).then(response => {
          setComplitedOrdersDinamic([...complitedOrdersDinamic, ...response.data.rows])
          setPage(prevState => prevState + 1)
          setTotalCount(response.data.count)
        })
        .finally(() => setFetching(false))
    }
  }, [user._user.id, limit, page, fetching])

  useEffect(() => {
    
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
      && complitedOrdersDinamic.length <= totalCount) {
      setFetching(true)
    }
  }

  return (
    <Container className='page_body'>
      {complitedOrdersDinamic.length === 0?
        <Container className='d-flex justify-content-center align-items-center history-empty'>
          <div className='history-empty-text'>Ваша история заказов пока не написана 🗒</div>
          <div className='history-empty-content'>
            <NavLink className='btn-returnToStore text-white text-decoration-none' to={STORE_ROUTE}>К отделам</NavLink>
          </div>
        </Container>
        :
        <Container className="complitedOrders">
          {complitedOrdersDinamic.map(complitedOrder =>
            <ComplitedOrderItem key={complitedOrder.id} user={user} complitedOrder={complitedOrder} />
          )}
        </Container>
      }
    </Container>
  );
}

export default observer(HistoryOrder);
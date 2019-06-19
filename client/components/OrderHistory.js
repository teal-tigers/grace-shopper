import React from 'react'
import SingleOrder from './SingleOrder'

const OrderHistory = props => {
  const orders = props.orders || []

  return (
    <div>
      {orders.map(order => {
        return order.status === 'complete' ? (
          <div key={order.id}>
            <SingleOrder order={order} key={order.id} />
          </div>
        ) : null
      })}
    </div>
  )
}

export default OrderHistory

import React from 'react'
import SingleOrder from './SingleOrder'

const OrderHistory = props => {
  const orders = props.orders || []

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="text-center">
            <h2>Order History</h2>
          </div>

          <div>
            {orders.map(order => {
              return order.status === 'complete' ? (
                <div key={order.id}>
                  <SingleOrder order={order} key={order.id} />
                  <br />
                  <br />
                </div>
              ) : null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory

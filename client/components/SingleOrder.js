/* eslint-disable react/jsx-key */
/* eslint-disable complexity */
import React from 'react'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

const SingleOrder = props => {
  const {order} = props

  return (
    <React.Fragment>
      <h2>Order History</h2>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Order #{order.id}</th>
            <th>Items Ordered</th>
            <th>Item Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map(product => (
            <tr key={product.id}>
              <td>
                <Image src={product.imageUrl} style={{width: '5rem'}} />
              </td>
              <td>
                <p>{product.name}</p>
                <p>Size: {product.size}</p>
              </td>
              <td>
                <p>{`$${product.price}`}</p>
              </td>
              <td>{product.order_products.quantity}</td>
              <td>
                $ {(product.order_products.quantity * product.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>Shipping Status:</td>
            <td colSpan="2">
              <strong>{order.status}</strong>{' '}
            </td>
            <td />
            <td>
              {!order.promo ? (
                <p>
                  <strong>Total:</strong> ${order.total}
                </p>
              ) : null}
            </td>
          </tr>
        </tfoot>
      </Table>
    </React.Fragment>
  )
}

export default SingleOrder

/* eslint-disable react/jsx-key */
/* eslint-disable complexity */
import React from 'react'

const SingleOrder = props => {
  const {order} = props

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h3>Order #{order.id}</h3>
          <table id="single-order" className="table table-hover">
            <thead>
              <tr>
                <th>Items Ordered</th>
                <th>Item Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            {order.products.map(product => (
              <tbody>
                <tr>
                  <td data-th="Product">
                    <div className="row ">
                      <div className="col-sm-4 hidden-xs">
                        <img
                          src={product.imageUrl}
                          width="75px"
                          height="75px"
                        />
                      </div>
                      <div className="col-sm-8">
                        <h5>{product.name}</h5>
                        <h6>Size: {product.size}</h6>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">$ {product.price}</td>
                  <td data-th="Quantity">{product.order_products.quantity}</td>
                  <td data-th="Subtotal">
                    ${' '}
                    {(product.order_products.quantity * product.price).toFixed(
                      2
                    )}
                  </td>
                </tr>
              </tbody>
            ))}

            <tfoot>
              <tr>
                <td data-th="Product">
                  <strong>Shipping Status: {order.status}</strong>
                </td>
                <td colSpan="2" className="hidden-xs" />
                {!order.promo ? (
                  <td className="hidden-xs text-center">
                    <strong>Total $ {order.total}</strong>
                  </td>
                ) : null}
              </tr>
              {order.promo ? (
                <tr>
                  <td data-th="Product">
                    <strong>Promo Applied: 50% off!</strong>
                  </td>
                  <td colSpan="2" className="hidden-xs" />
                  <td className="hidden-xs text-center">
                    <strong>Total $ {order.total}</strong>
                  </td>
                </tr>
              ) : null}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SingleOrder

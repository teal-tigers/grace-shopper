/* eslint-disable react/jsx-key */
/* eslint-disable complexity */
import React from 'react'

const SingleOrder = props => {
  const {order} = props

  return (
    <div>
      <h3>Order #{order.id}</h3>
      <div className="table table-condensed border">
        <table id="single-order" className="table table-condensed">
          <thead>
            <tr>
              <th style={{width: '69%'}}>Items Ordered</th>
              <th style={{width: '12%'}}>Item Price</th>
              <th style={{width: '7%'}}>Quantity</th>
              <th style={{width: '12%'}}>Subtotal</th>
            </tr>
          </thead>

          {order.products.map(product => (
            <tbody>
              <tr>
                <td data-th="Product">
                  <div className="row ">
                    <div className="col-sm-4 hidden-xs">
                      <img src={product.imageUrl} width="75px" height="75px" />
                    </div>
                    <div className="col-sm-8">
                      <h4>{product.name}</h4>
                      <h5>Size: {product.size}</h5>
                    </div>
                  </div>
                </td>
                <td data-th="Price">$ {product.price}</td>
                <td data-th="Quantity">{product.order_products.quantity}</td>
                <td data-th="Subtotal">
                  $ {product.order_products.quantity * product.price}
                </td>
              </tr>
            </tbody>
          ))}
          <tfoot>
            <tr className="visible-xs">
              <td className="text-center" />
            </tr>
            <tr>
              <td data-th="Product">
                <strong>Shipping Status: {order.status}</strong>
              </td>
              <td colSpan="2" className="hidden-xs" />
              <td className="hidden-xs text-center">
                <strong>Total $ {order.total}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default SingleOrder

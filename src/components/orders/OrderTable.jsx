import { API_BASE_URL } from "../../utility/constants";
import {
  formatDate,
  getOrderStatusColor,
} from "../../utility/generalUtility.js";

/*
Equivelet code:
function MenuItemTable(props) {
  const menuItems = props.menuItems;
  const isLoading = props.isLoading;
  const error = props.error;
Usage:
  <MenuItemTable
  menuItems={data}
  isLoading={loading}
  error={error}
/>
}*/
function OrderTable({ orders, isLoading, error, onEdit }) {
  // console.log("orders at ordersTable:", orders);
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading Orders...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-danger">
        <h5>Error Loading Orders</h5>
        <p>An error occurred while loading menu items.</p>
      </div>
    );
  }
  if (orders.length === 0) {
    // if no items
    return (
      <div className="text-center py-5">
        <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 text-muted">No Menu Items</h4>
        <p className="text-muted">Start by adding your first menu item.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderHeaderId}>
                <td className="fw-semibold">#{order.orderHeaderId}</td>
                <td>
                  <small className="text-muted">
                    {formatDate(order.orderDate)}
                  </small>
                </td>
                <td>
                  <div className="small">
                    <div className="fw-semibold">{order.pickUpName}</div>

                    <div>
                      {order.pickUpEmail} | {order.pickUpPhoneNumber}
                    </div>
                  </div>
                </td>
                <td>
                  <strong>{order.totalItem}</strong>
                </td>
                <td>${parseFloat(order.orderTotal || 0).toFixed(2)}</td>
                <td>
                  <span
                    className={`btn btn-sm disabled btn-${getOrderStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => onEdit(order)}
                      className="btn btn-sm btn-outline-success"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderTable;

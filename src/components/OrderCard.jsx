import React from "react";

const OrderCard = ({ order }) => {
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD", // Adjust for INR or USD
    }).format(amount);
  };

  // Calculate total for ordered items
  const calculateTotal = () => {
    return order.orderedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get the status badge
  const statusBadge =
    order.status === "COMPLETED"
      ? "order-card-badge-success"
      : "order-card-badge-failed";

  return (
    <div className="order-card p-4 mb-6 bg-pale-lavender rounded shadow-md">
      {/* Transaction Status Badge */}

      <div className="order-header flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <h4 className="font-bold text-lg">
            {order.payerName} ({order.transactionId})
          </h4>
          <div className={`badge ${statusBadge}`}>{order.status}</div>
        </div>

        <span className="text-sm text-gray-500">
          {new Date(order.transactionTime).toLocaleString()}
        </span>
      </div>

      {/* Product Details */}
      <div className="ordered-items">
        {order.orderedItems.map((item) => (
          <div
            key={item._id}
            className="product-item flex justify-between items-center mb-2"
          >
            <div className="flex items-center">
              <img
                src={item.productId.imageUrl}
                alt={item.productId.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="ml-2">{item.productId.name}</span>
            </div>
            <span>
              {item.quantity} x {formatCurrency(item.price)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="total-amount flex justify-between items-center mb-4">
        <span className="font-semibold">Total Amount</span>
        <span>{formatCurrency(calculateTotal())}</span>
      </div>

      {/* Transaction Amount */}
      <div className="transaction-amount flex justify-between items-center font-bold">
        <span>Transaction Amount</span>
        <span>{formatCurrency(order.transactionAmount)}</span>
      </div>
    </div>
  );
};

export default OrderCard;

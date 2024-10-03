export default function OrderDetails({ order }) {
  return (
    <div className="bg-white shadow-md rounded p-6 mb-4">
    <h1 className="text-2xl font-bold mb-6">Order Details</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OrderDetailItem 
        label="Order Number" 
        value={order.name} 
      />
      <OrderDetailItem 
        label="Email" 
        value={order.email} 
      />
      <OrderDetailItem 
        label="Date" 
        value={new Date(order.createdAt).toLocaleDateString()} 
      />
      <OrderDetailItem 
        label="Order Total" 
        value={`${order.totalPrice} ${order.currencyCode}`} 
      />
    </div>
    </div>
  )
}

export function OrderDetailItem({ label, value, fullWidth = false }) {
  return (
    <div className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-lg">{value}</span>
    </div>
  );
}
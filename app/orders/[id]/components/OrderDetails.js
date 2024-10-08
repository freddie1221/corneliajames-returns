import { DetailItem } from "@/app/components/Elements";

export default function OrderDetails({ order }) {
  return (
    <div className="bg-gray-100 shadow-md rounded p-6 mb-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem label="Order Number" value={order.name} />
        <DetailItem label="Email" value={order.email} />
        <DetailItem label="Date" value={new Date(order.createdAt).toLocaleDateString()} />
        <DetailItem label="Order Total" value={`${order.totalPrice} ${order.currencyCode}`} />
      </div>
    </div>
  )
}

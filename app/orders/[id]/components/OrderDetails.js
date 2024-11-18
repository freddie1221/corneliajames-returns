import { DetailItem } from "@/app/components/Elements";

export default function OrderDetails({ order }) {
  return (
    <>
      <h1 className="heading-secondary">Order Details</h1>
        <div className="shadow-md rounded p-6 mb-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="Order Number" value={order.name} />
          <DetailItem label="Email" value={order.email} />
          <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleDateString()} />
          <DetailItem label="Order Total" value={`${order.totalPrice} ${order.currencyCode}`} />
        </div>
      </div>
    </>
  )
}

import { DetailItem } from "@/app/components/Elements";

export default function OrderDetails({ order }) {
  return (
    <>
      <h1 className="heading-secondary">Order Details</h1>
      <div className="shadow-md rounded-lg p-6 mb-4 bg-white flex md:flex-row flex-col gap-4">
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <DetailItem label="Order Number" value={order.name} />
          <DetailItem label="Order Date" value={new Date(order.createdAt).toLocaleDateString()} />
          <DetailItem label="Order Total" value={`${order.currencyCode} ${order.totalPrice}`} />
          <DetailItem label="Customer Name" value={order.fullName} />
          <DetailItem label="Customer Email" value={order.email} />
          <DetailItem label="Customer Phone" value={order.address.phone} />
        </div>
        <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
          <DetailItem label="Address Line 1" value={order.address.address1} />
          <DetailItem label="Address Line 2" value={order.address.address2} />
          <DetailItem label="City" value={order.address.city} />
          <DetailItem label="Province" value={order.address.province} />
          <DetailItem label="Country" value={order.address.country} />
          <DetailItem label="Zip" value={order.address.zip} />
        </div>
      </div>
    </>
  )
}

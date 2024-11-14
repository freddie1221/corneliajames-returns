import { getOrder } from '@/app/utils/api/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';

export default async function OrderPage({ params }) {
  const { id } = params;
  const order = await getOrder(id);

  return (
    <div className="container">
        <OrderDetails order={order} />
        {order.returns.length > 0 && <ExistingReturns returns={order.returns} />}
        <ReturnForm orderId={order.id} />
    </div>
  );
}

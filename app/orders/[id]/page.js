import { getOrder } from '@/app/utils/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';


export default async function OrderPage({ params }) {
  const { id } = params;

  const order = await getOrder(id);


  return (
    <div className="container">
        <OrderDetails order={order} />
        <ExistingReturns returns={order.returns} />
        <ReturnForm orderId={order.id} />
    </div>
  );
}

// <ReturnForm order={order} />



// 
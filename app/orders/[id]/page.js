import { getOrder } from '@/app/utils/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';
import { Message } from '@/app/components/Elements';


export default async function OrderPage({ params }) {
  const { id } = params;

  const response = await getOrder(id);
  const order = await response.json();

  // if (error) { return <Message type="error" text={error} />;}


  return (
    <div className="container">
        <OrderDetails order={order} />
        <ExistingReturns orderId={order.id} />
        <ReturnForm orderId={order.id} />
    </div>
  );
}

// <ReturnForm order={order} />




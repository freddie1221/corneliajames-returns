import { getOrder } from '@/app/utils/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';
import Message from '@/app/components/Message';
import { simplifyOrder } from '@/app/utils/simplifyOrder';

export default async function OrderPage({ params }) {
  const { id } = params;
  const { data: rawOrder, error } = await getOrder(id);

  console.log(rawOrder);
  console.log(error);

  if (error) { return <Message type="error" text={error} />;}

  const order = simplifyOrder(rawOrder);

  return (
    <div className="container">
      
        <OrderDetails order={order} />
        <ExistingReturns returns={order.returns} />
        <ReturnForm order={order} />
      
    </div>
  );
}

// <ReturnForm order={order} />




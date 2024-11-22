import { getOrder } from '@/app/utils/api/getOrder';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';
import OrderDetails from './components/OrderDetails';
import { Message } from '@/app/components/Elements';

export default async function OrderPage({ params }) {
  const { id } = params;

  try {
    const order = await getOrder(id);
    return (
      <div className="container flex flex-col space-y-6">  
        <OrderDetails order={order} />
        {order.returns.length > 0 && <ExistingReturns returns={order.returns} />}
        <ReturnForm order={order} /> 
      </div>
    );
  } catch (error) {
    return (
      <Message text={error.message || 'An unexpected error occurred.'} />
    );
  }
}
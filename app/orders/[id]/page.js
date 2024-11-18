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
      <div className="container">
        <OrderDetails order={order} />
        
        {order.returns.length > 0 && 
          <div className="flex flex-col gap-4 items-center bg-white shadow-md rounded-lg p-5 mb-4">
            <ExistingReturns returns={order.returns} />
          </div>
        }
        
        <ReturnForm order={order} />
      </div>
    );
  } catch (error) {
    return (
      <Message text={error.message || 'An unexpected error occurred.'} />
    );
  }
}
import { makeGraphQLRequest } from './makeGraphQLRequest';
import createDeliveryMutation from '@/app/graphql/mutations/createDeliveryMutation';

export default async function createDelivery(deliveryData) {
  
  try {
    const variables = {
      labelInput: {
        fileUrl: deliveryData.label_url
      }, 
      notifyCustomer: true,
      reverseDeliveryLineItems: deliveryData.lineItems, 
      reverseFulfillmentOrderId: deliveryData.fulfillmentOrderId, 
      trackingInput: {
        number: deliveryData.tracking_code,
        url: deliveryData.public_url
      } 
    };
    
    const data = await makeGraphQLRequest(createDeliveryMutation, variables)

    if (data.reverseDeliveryCreateWithShipping.reverseDelivery) {
      return data.reverseDeliveryCreateWithShipping.reverseDelivery;
    } else {
      console.error("Failed to create delivery:", data.reverseDeliveryCreateWithShipping.userErrors);
      throw new Error("Failed to create delivery");
    }
    
  } catch (error) {
    console.error("Error creating delivery:", error);
    throw error;
  }
}

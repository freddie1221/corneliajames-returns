

export default async function createStoreCredit(returnData, storeCreditAmount){

  const customerId = returnData.customer.id
  const amount = storeCreditAmount
  const currency = returnData.currency
  const firstName = returnData.customer.firstName
  const email = returnData.customer.email


  const storeCreditWebhook = "https://hook.eu1.make.com/l7upwyysgh8ptl1htat0krtb65wmxu5e"

  
  
  await fetch(storeCreditWebhook)

}


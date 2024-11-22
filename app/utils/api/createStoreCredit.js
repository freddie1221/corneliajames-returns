

export default async function createStoreCredit(storeCreditInput){

  const webhookUrl = "https://hook.eu1.make.com/l7upwyysgh8ptl1htat0krtb65wmxu5e?"
  
  await fetch(
    `${webhookUrl}
    customerId=${storeCreditInput.customerId}&
    amount=${storeCreditInput.amount}&
    currency=${storeCreditInput.currency}&
    firstName=${storeCreditInput.firstName}&
    email=${storeCreditInput.email}`
  )

}


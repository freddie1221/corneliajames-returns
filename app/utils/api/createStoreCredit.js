

export default async function createStoreCredit(storeCreditInput){

  //console.log("storeCreditInput: ", storeCreditInput)

  const payloadString = "https://hook.eu1.make.com/l7upwyysgh8ptl1htat0krtb65wmxu5e?" +
    "customerId=" + storeCreditInput.customerId + "&" +
    "amount=" + storeCreditInput.amount + "&" +
    "currency=" + storeCreditInput.currency + "&" +
    "firstName=" + storeCreditInput.firstName + "&" +
    "email=" + storeCreditInput.email
  
  await fetch(payloadString)
}


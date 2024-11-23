export default function exclusions(orderTags) {
  let noReturn = false
  let alteration = false

  if(orderTags.includes('no_return')) noReturn = true
  if(orderTags.includes('alteration')) alteration = true

  return { noReturn, alteration }
}
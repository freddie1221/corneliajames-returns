import { combinePdfs } from '../lib/pdf-utils'
import { createStagedUpload } from '../lib/shopify-api'

export async function processReturnLabel(documentUrls) {
  try {
    // Combine PDFs
    const combinedPdfBuffer = await combinePdfs(documentUrls)

    // Upload to Shopify
    const shopifyFileUrl = await createStagedUpload(
      'combined-return-label.pdf', 
      combinedPdfBuffer
    )

    return shopifyFileUrl
  } catch (error) {
    console.error('Error processing return label:', error)
    throw error
  }
}
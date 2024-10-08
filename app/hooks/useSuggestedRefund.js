import { useState, useEffect } from 'react'


export default function useSuggestedRefund(id, returnLineItems) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id || !returnLineItems) {
      setLoading(false)
      setData(null)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/shopify/returns/${id}/refunds`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ returnLineItems })
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        setData(result.records[0].fields)

      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, returnLineItems])

  return { data, loading, error }
}
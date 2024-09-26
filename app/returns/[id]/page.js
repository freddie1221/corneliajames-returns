import { notFound } from 'next/navigation';

async function getReturn(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/returns/${id}`, {
    next: { revalidate: 60 }, // Optional: Cache the response for 60 seconds
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch return data');
  }

  return res.json();
}

export default async function Return({ params }) {
  const { id } = params;

  try {
    const returnData = await getReturn(id);
    return (
      <div>
        <h1>Return Details</h1>
        <p>Return ID: {returnData.id}</p>
        {/* Add more return details as needed */}
      </div>
    );
  } catch (error) {
    console.error('Error loading return details:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>There was an issue loading the return details. Please try again later.</p>
      </div>
    );
  }
}

import { NextResponse } from 'next/server';

export default async function getLabel(payload) {

  const shipment = {
    parcel: {
      length: 8,
      width: 5,
      height: 5,
      weight: 5,
    },
    "options": {
      incoterm: "DDP",
      one_page: true,
      label_format: "PNG",
      suppress_etd: true,
      saturday_delivery: null,
      commercial_invoice_format: "PNG",
      commercial_invoice_signature: "IMAGE_2",
      commercial_invoice_letterhead: "IMAGE_1",
    },
    service: "ExpressWorldwideNonDoc",
    is_return: true,
    from_address: {
      "name": null,
      "company": "Cornelia James",
      "street1": "Hall Court Farm",
      "street2": "Firle Lane",
      "city": "Ripe",
      "state": "East Sussex",
      "zip": "BN8 6AY",
      "country": "GB",
      "phone": "01273 920761",
      "email": null,
      "mode": "test",
    },
    to_address: {
      "name": null,
      "company": "EasyPost",
      "street1": "417 MONTGOMERY ST",
      "street2": "FLOOR 5",
      "city": "SAN FRANCISCO",
      "state": "CA",
      "zip": "94104",
      "country": "US",
      "phone": "4151234567",
      "email": null,
      "mode": "test",
    },
    customs_info: {
      eel_pfc: "NOEEI 30.37(a)",
      contents_type: "returned_goods",
      customs_items: [
        {
          value: "3.0",
          weight: 11.64,
          quantity: 1,
          description: "Returned gloves",
          origin_country: "GB",
          hs_tariff_number: "621600",
        },
      ],
      customs_signer: "Zach Bailet",
      customs_certify: true,
      restriction_type: "none",
      contents_explanation: "Goods being returned to manufacturer",
    },

    tax_identifiers: [
      {
        entity: "SENDER",
        tax_id: "GB190169949000",
        tax_id_type: "EORI",
        issuing_country: "GB",
      },
    ],
    carrier_accounts: ["ca_11c715d0cf9c4d15ab55c845e3f03508"],
  }
  
  
  const response = await fetch('https://api.easypost.com/v2/shipments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${process.env.EASYPOST_API_KEY}:`).toString('base64')}`,
    },
    body: JSON.stringify({shipment: shipment}),
  });

  const data = await response.json();
  
  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  return NextResponse.json(data);    
}
  


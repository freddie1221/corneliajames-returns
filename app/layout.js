import './globals.css'

export const metadata = {
  title: 'Returns Portal',
  description: 'Ecommerce returns portal for customers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
}
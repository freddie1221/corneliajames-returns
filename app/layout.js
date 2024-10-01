import './globals.css'

export const metadata = {
  title: 'Returns Portal',
  description: 'Ecommerce returns portal for customers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="color-primary">
        <main className="min-h-screen text-gray-800 font-avenir max-w-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
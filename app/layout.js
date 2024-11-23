import './globals.css'
import Header from './components/Header'
import MixpanelInitializer from './utils/analytics/mixpanel'

export const metadata = {
  title: "Cornelia James | Returns & Store Credit",
  description: "Our returns and store credit portal",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 p-4 md:p-10">
        <Header />
        <main className="min-h-screen text-gray-800 font-avenir max-w-2xl mx-auto ">
          {children}
        </main>
        <MixpanelInitializer />
      </body>
    </html>
  )
}
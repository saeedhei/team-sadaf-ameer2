import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased overflow-x-hidden">
        {/* Mobile par column, desktop par row */}
        <div className="min-h-screen flex flex-col md:flex-row">
          
          {/* Sidebar Component */}
          <Sidebar />

          {/* Right Content Column (Navbar + Page Content) */}
          <main className="flex-1 flex flex-col min-w-0 bg-white">
            
            {/* Sticky Top Navbar */}
            <Navbar />

            {/* Page Content with White Background */}
            <div className="flex-1 overflow-y-auto bg-white">
              {children}
            </div>

          </main>

        </div>
      </body>
    </html>
  );
}
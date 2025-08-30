import "./globals.css"

export const metadata = {
  title: "Risk Calculator",
  description: "A simple risk calculator with hazard and risk matrix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

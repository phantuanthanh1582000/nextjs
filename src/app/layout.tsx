import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header>Đây là Header</header>
        <main>{children}</main>
        <footer>Đây là Footer</footer>
      </body>
    </html>
  );
}

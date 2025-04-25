
export function Footer() {
  return (
    <footer className="bg-card py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right text-muted-foreground text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لوحة التحكم القانونية
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">الدعم الفني</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

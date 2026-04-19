import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] text-center mt-12">
      <p className="text-[var(--color-text-sub)] text-sm">
        &copy; {new Date().getFullYear()} A. Scholar. All rights reserved.
      </p>
      <div className="mt-4">
        <Link to="/admin" className="text-xs text-[var(--color-text-sub)] hover:text-[var(--color-accent)] transition-colors">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}

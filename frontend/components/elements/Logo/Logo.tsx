'use client';
import styles from './Logo.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      style={{ pointerEvents: pathname === '/' ? 'none' : 'all' }}
      className={styles.Logo}
    >
      Art Design
    </Link>
  );
}

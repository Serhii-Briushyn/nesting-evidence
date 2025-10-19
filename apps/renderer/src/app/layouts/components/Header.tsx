import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

import styles from "./Header.module.css";

type Props = { extra?: string };

export const Header = ({ extra }: Props) => {
  const { pathname } = useLocation();
  const isLaser = pathname === "/";

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <header>
      <div className={styles.container}>
        <span className={styles.logo}>NMH s.r.o</span>
        <nav className={styles.nav}>
          <NavLink to="/" end className={linkClass}>
            Laser
          </NavLink>

          <NavLink to="/archive" className={linkClass}>
            Archív
          </NavLink>
        </nav>
        {isLaser && (
          <span className={styles.nesting}>Nesting {extra || "-"}</span>
        )}
      </div>
    </header>
  );
};

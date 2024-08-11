import { usePathname } from "next/navigation";
import styles from "home/styles/Navbar.module.css";
import { useContext } from "react";
import { AppContext } from "home/context/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Create Project",
    href: "/createProject",
  },
];

const NoNavBarPAges = ["/login", "/signup"];

export const Navbar = () => {
  const path = usePathname();
  const router = useRouter();
  const { clearContext } = useContext(AppContext);

  return (
    <>
      {!NoNavBarPAges.includes(path) && (
        <div className={styles.navWrapper}>
          <div className={styles.navContainer}>
            <button
              className={styles.logoWrapper}
              onClick={() => {
                router.push("/");
              }}
            >
              <img
                src="/images/LogoFull.svg"
                alt="Samosas IT"
                className={styles.logo}
              />
            </button>
            <div className={styles.middleLinks}>
              {links.map((link) => {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={
                      path === link.href
                        ? styles.activeLink
                        : styles.inactiveLink
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <button
              className={styles.activeLink}
              onClick={() => {
                clearContext();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

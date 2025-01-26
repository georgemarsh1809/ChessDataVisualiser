import React from "react";
import styles from "./Layout.module.css";
import { Outlet, NavLink } from "react-router";

export const Layout = () => {
  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          <nav className={styles.navContainer}>
            <i className="fa-regular fa-chess-queen"></i>
            <NavLink to="/">
              <button className={styles.dashboardTabButton}>
                <p>Dashboard</p>
              </button>
            </NavLink>
            <NavLink to="/data">
              <button className={styles.dataTabButton}>
                <p>Data</p>
              </button>
            </NavLink>
          </nav>
          <div className={styles.rightHeader}>
            <button className={styles.importButton}>Import</button>
            <button className={styles.settingsButton}>
              <i
                className={`${styles.settingsButtonIcon} fa-solid fa-gear`}
              ></i>
            </button>
            <button className={styles.profileButton}>GM</button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

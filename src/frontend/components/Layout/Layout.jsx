import React from "react";
import styles from "./Layout.module.css";
import { Outlet, NavLink } from "react-router";
import { useStore } from "../../store";

export const Layout = () => {

  const { tab, setTab } = useStore()

  return (
    <>
      <header>
        <div className={styles.headerContainer}>
          <nav className={styles.navContainer}>
            <i className="fa-regular fa-chess-queen"></i>
            <NavLink to="/" onClick={() => {
              setTab("dashboard")
            }}>
              <button className={`${styles.dashboardTabButton} ${tab === "dashboard" ? styles.selectedTab : ""} `} >
                <p>Dashboard</p>
              </button>
            </NavLink>
            <NavLink to="/data" onClick={() => {
              setTab("data")
            }}>
              <button className={`${styles.dataTabButton} ${tab === "data" ? styles.selectedTab : ""} `}>
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

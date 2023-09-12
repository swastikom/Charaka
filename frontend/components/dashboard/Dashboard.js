import React from "react";
import styles from "@/styles/page.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

function Dashboard() {
    const { status } = useSession();
  return (
    <div className={styles.page}>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}

export default Dashboard;

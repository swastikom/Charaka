'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import styles from '@/styles/base.module.css'

// ...

const dashboard = () => {
  const { data: session } = useSession();

  // Redirect to the login page if the user is not authenticated
  if (!session) {
     redirect("/Login");
  }

  // Render your dashboard content here
  return (
    <div className={styles.base}>
      <Dashboard />
    </div>
  );
};

export default dashboard;

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// ...

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to the login page if the user is not authenticated
  if (!session) {
    router.push("/Login");
    return null;
  }

  // Render your dashboard content here
  return <div>This is Dashboard</div>;
};

export default Dashboard;

import { useUser } from "@/context/UserContext";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const pathname = usePathname();
  const unprotected = ["/", "/login", "/register"];

  useEffect(() => {
    if (!user && !unprotected.includes(pathname)) router.replace("/");
  }, [user, pathname]);
  return <>{children}</>;
}

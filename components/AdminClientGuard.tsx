"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

export default function AdminClientGuard({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      // 1. Read email from localStorage
      const email = localStorage.getItem("email");
      if (!email) {
        router.replace("/");
        return;
      }

      try {
        // 2. Fetch user by email
        const res = await fetch(`http://localhost:3001/api/users/email/${email}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();

        // 3. If not admin, kick them out
        if (data.role !== "admin") {
          router.replace("/");
        }
      } catch (err) {
        console.error("Admin guard fetch error", err);
        router.replace("/");
      }
    };

    checkAdmin();
  }, [router]);

  // While the check is in flight you could render a loader,
  // but here we just assume children will show momentarily.
  return <>{children}</>;
}

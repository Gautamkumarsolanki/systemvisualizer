import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useCheckOrCreateUser() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      checkOrCreateUser(session.user);
    }
  }, [session]);

  async function checkOrCreateUser(user: { email?: string | null; name?: string | null; image?: string | null }) {
    console.log(user);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/check-or-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setUser(data.user);
      return data.user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, error };
}
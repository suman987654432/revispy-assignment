import { redirect } from "next/navigation";
import { getServerAuthToken } from "@/lib/utils/server-cookies";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getServerAuthToken();

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
import AdminClientGuard from "@/components/AdminClientGuard";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <AdminClientGuard>
  {children}
  </AdminClientGuard>
  </>;
}

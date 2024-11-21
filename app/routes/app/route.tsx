import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex grow flex-col dark:bg-muted/10">
        <Outlet />
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrackView() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    // Fire-and-forget; ignore errors and admin path.
    if (pathname.startsWith("/admin")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
  return null;
}

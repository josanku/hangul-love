"use client";

import Reactions from "./Reactions";
import Comments from "./Comments";

export default function Community({ title }: { title?: string }) {
  return (
    <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
      <Reactions title={title} />
      <Comments />
    </div>
  );
}

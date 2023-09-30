"use client";

import { useTransition } from "react";
import { follow, unfollow } from "./actions";

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  const [isPending, startTransition] = useTransition();

  if (!isFollowing) {
    return (
      <button onClick={() => startTransition(() => follow(targetUserId))}>
        {"Follow"}
      </button>
    );
  }

  if (isFollowing) {
    return (
      <button onClick={() => startTransition(() => unfollow(targetUserId))}>
        {"Unfollow"}
      </button>
    );
  }
}

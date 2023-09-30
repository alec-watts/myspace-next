"use client";

import { useTransition } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { follow, unfollow } from "./actions";

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  // Optomistic Implementation
  const [optomisticFollowing, toggleOptomisticFollow] = useOptimistic(
    {
      isFollowing,
      sending: false,
    },
    (state, newIsFollowing) => ({
      ...state,
      isFollowing: !!newIsFollowing,
      sending: true,
    })
  );

  return (
    <>
      <button
        onClick={async () => {
          toggleOptomisticFollow(!optomisticFollowing.isFollowing);
          if (!isFollowing) {
            follow(targetUserId);
          } else {
            unfollow(targetUserId);
          }
        }}
      >
        {optomisticFollowing.isFollowing ? "Unfollow" : "Follow"}
      </button>
      <br />
      {"Actual Status: "}
      {isFollowing ? "Unfollow" : "Follow"}
      <br />
      {optomisticFollowing.sending ? "Sending..." : ""}
    </>
  );

  // // Transition Implementation
  // const [isPending, startTransition] = useTransition();

  // if (!isFollowing) {
  //   return (
  //     <>
  //       <button onClick={() => startTransition(() => follow(targetUserId))}>
  //         {"Follow"}
  //       </button>
  //     </>
  //   );
  // }

  // if (isFollowing) {
  //   return (
  //     <button onClick={() => startTransition(() => unfollow(targetUserId))}>
  //       {"Unfollow"}
  //     </button>
  //   );
  // }
}

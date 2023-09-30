"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function follow(targetUserId: string) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const currentUserId = await prisma.user
    .findUnique({
      where: { email: currentUserEmail },
    })
    .then((user) => user?.id!);

  await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  revalidatePath("/users/cln53e42d0000ml1gyepinmn3");
}

export async function unfollow(targetUserId: string) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const currentUserId = await prisma.user
    .findUnique({
      where: { email: currentUserEmail },
    })
    .then((user) => user?.id!);

  await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });

  revalidatePath("/users/cln53e42d0000ml1gyepinmn3");
}

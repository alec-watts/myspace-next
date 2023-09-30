import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import { ProfileForm } from "./ProfileForm";
import { SignOutButton } from "@/components/buttons";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  // Get current user
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  console.log(user);

  const updateProfile = async (formData: FormData) => {
    "use server";

    // Mutate data
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email || "";

    const data = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      age: Number(formData.get("age")),
      image: formData.get("image") as string,
    };

    await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      data,
    });

    // Revalidate
    revalidatePath("/dashboard");
  };

  const updateProfileExit = async (formData: FormData) => {
    "use server";

    // Mutate data
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email || "";

    const data = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      age: Number(formData.get("age")),
      image: formData.get("image") as string,
    };

    await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      data,
    });

    // Revalidate
    // revalidatePath("/dashboard");
    redirect("/");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <SignOutButton />

      <h2>Edit Your Profile</h2>
      <form action={updateProfile}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={user?.name ?? ""} />
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ""}
        ></textarea>
        <label htmlFor="age">Age</label>
        <input type="text" name="age" defaultValue={user?.age ?? 0} />
        <label htmlFor="image">Profile Image URL</label>
        <input type="text" name="image" defaultValue={user?.image ?? ""} />

        <button type="submit">Save and Continue</button>
        <button formAction={updateProfileExit}>Save and Exit</button>
      </form>
      {/* <ProfileForm user={user} /> */}
    </>
  );
}

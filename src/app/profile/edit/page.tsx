import { redirect } from "next/navigation";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#f3c58f] bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-semibold text-[#7a3d16]">
          Edit Profile
        </h1>

        <p className="mt-1 text-sm text-[#7a2e0e]">
          Update your personal information
        </p>

        <EditProfileForm user={user} />
      </div>
    </div>
  );
};

export default EditProfilePage;
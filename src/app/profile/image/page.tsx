"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfileImagePage = () => {
  const router = useRouter();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image.trim()) {
      toast.error("Enter an image URL");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update image");
      }

      toast.success("Profile image updated");

      router.push("/profile");
      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf2] p-4">
      <div className="mx-auto max-w-xl rounded-4xl border border-[#f3c58f] bg-white p-6 shadow-lg">

        <h1 className="text-3xl font-semibold text-[#7a3d16]">
          Profile Image
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <input
            type="url"
            placeholder="https://example.com/profile.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-xl border border-[#f3c58f] px-4 py-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#7a2e0e] px-5 py-3 font-semibold text-white"
          >
            {loading ? "Saving..." : "Save Image"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ProfileImagePage;
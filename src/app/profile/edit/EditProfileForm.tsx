"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "../actions";
import { RiImageUploadLine } from "react-icons/ri";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
};

const EditProfileForm = ({ user }: Props) => {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [file, setFile] = useState<File>();
  const [isPending, startTransition] = useTransition();

  const handleChangeImg = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(selectedFile);
    setImage(previewUrl);
  };

  const upload = async () => {
    if (!file) {
      return image;
    }

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const resData = await res.json();

    return resData.url;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        let imageUrl = image;

        // Upload new image if user selected one
        if (file) {
          imageUrl = await upload();
        }

        await updateProfile({
          name,
          image: imageUrl,
        });

        alert("Profile updated successfully");

        setFile(undefined);
      } catch (error) {
        console.error(error);
        alert("Failed to update profile");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5"
    >
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
          Email
        </label>

        <input
          type="email"
          value={user.email || ""}
          disabled
          className="w-full rounded-2xl border border-[#f3c58f] bg-gray-100 px-4 py-3 text-gray-500"
        />
      </div>

      {/* Profile Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
          Profile Image
        </label>

        <div className="rounded-3xl border border-[#f0d3ae] bg-[#fffaf2] p-4">
          <label
            htmlFor="profile-file"
            className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[#f0d3ae] bg-white/80 px-4 py-6 text-center transition hover:border-[#f97316] hover:bg-[#fff6e8]"
          >
            <RiImageUploadLine className="text-3xl text-[#f97316] transition group-hover:text-[#ea580c]" />

            <p className="text-sm font-medium text-[#4a2d1c]">
              Upload profile picture
            </p>

            {file ? (
              <p className="text-xs text-[#7a3d16]/80">
                {file.name}
              </p>
            ) : (
              <p className="text-xs text-[#7a3d16]/80">
                PNG or JPG
              </p>
            )}
          </label>

          <input
            id="profile-file"
            type="file"
            accept="image/*"
            onChange={handleChangeImg}
            className="hidden"
          />

          {/* Preview */}
          {image && (
            <div className="mt-5 flex justify-center">
              <img
                src={image}
                alt="Profile preview"
                className="h-28 w-28 rounded-full border-4 border-[#f3c58f] object-cover shadow-md"
              />
            </div>
          )}

          {/* Remove */}
          {file && (
            <button
              type="button"
              onClick={() => {
                setFile(undefined);
                setImage(user.image || "");
              }}
              className="mt-4 w-full rounded-full bg-[#f97316] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
            >
              Remove new image
            </button>
          )}
        </div>
      </div>

      {/* Save */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[#7a2e0e] px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;
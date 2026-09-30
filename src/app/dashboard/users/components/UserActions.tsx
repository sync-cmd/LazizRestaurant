'use client';

import { useState, useTransition } from 'react';
import { deleteUser, updateUser } from '../actions';

type UserActionsProps = {
  id: string;
  name: string | null;
  email: string | null;
  isAdmin: boolean;
};

const UserActions = ({
  id,
  name,
  email,
  isAdmin,
}: UserActionsProps) => {
  const [editing, setEditing] = useState(false);
  const [userName, setUserName] = useState(name ?? '');
  const [userEmail, setUserEmail] = useState(email ?? '');
  const [admin, setAdmin] = useState(isAdmin);

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateUser(
          id,
          userName,
          userEmail,
          admin
        );

        setEditing(false);
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : 'Failed to update user'
        );
      }
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name || email || 'this user'}?`
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteUser(id);
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : 'Failed to delete user'
        );
      }
    });
  };

  if (editing) {
    return (
      <div className="flex min-w-70 flex-col gap-2">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Name"
          className="rounded-lg border border-[#f3c58f] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f7c3a1]"
        />

        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border border-[#f3c58f] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#f7c3a1]"
        />

        <label className="flex items-center gap-2 text-sm text-[#4a2d1c]">
          <input
            type="checkbox"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
          />
          Admin
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="rounded-full bg-[#7a2e0e] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={() => setEditing(false)}
            disabled={isPending}
            className="rounded-full border border-[#f3c58f] px-4 py-2 text-sm text-[#7a2e0e]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => setEditing(true)}
        disabled={isPending}
        className="rounded-full bg-[#f7c3a1] px-4 py-2 text-sm font-semibold text-[#4a2d1c]"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default UserActions;
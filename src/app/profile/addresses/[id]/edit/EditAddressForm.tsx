"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updateAddress,
  deleteAddress,
} from "../../../actions";

type Address = {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

type Props = {
  address: Address;
};

const EditAddressForm = ({ address }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: address.name,
    phone: address.phone,
    addressLine: address.addressLine,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    isDefault: address.isDefault,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateAddress(address.id, form);

        router.push("/profile/addresses");
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to update address");
      }
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteAddress(address.id);

        router.push("/profile/addresses");
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to delete address");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#f3c58f] bg-white p-6 shadow-sm"
    >
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Address Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Address
          </label>

          <input
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            City
          </label>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        {/* State + Postal */}
        <div className="grid gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
              State
            </label>

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
              Postal Code
            </label>

            <input
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
            />
          </div>

        </div>

        {/* Default */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
            className="h-4 w-4 accent-[#7a2e0e]"
          />

          <span className="text-sm text-[#7a2e0e]">
            Set as default address
          </span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-full bg-[#7a2e0e] px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-full bg-red-100 px-5 py-3 font-semibold text-red-700 disabled:opacity-50"
          >
            Delete
          </button>

        </div>

      </div>
    </form>
  );
};

export default EditAddressForm;
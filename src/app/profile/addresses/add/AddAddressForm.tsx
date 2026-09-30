"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addAddress } from "../../actions";

const AddAddressForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone" || name === "postalCode") {
      const numbersOnly = value.replace(/\D/g, "");

      setForm((previous) => ({
        ...previous,
        [name]: numbersOnly,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!/^\d{6}$/.test(form.postalCode)) {
      alert("Postal code must contain exactly 6 digits.");
      return;
    }

    startTransition(async () => {
      try {
        await addAddress(form);
        router.push("/profile/addresses");
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to add address");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-[#f3c58f] bg-white p-6 shadow-sm">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Address Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Home"
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Phone
          </label>
          <input
            type="tel"
            inputMode="numeric"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            maxLength={10}
            pattern="[0-9]{10}"
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            Address
          </label>
          <input
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="123 Main Street"
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
            City
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Mumbai"
            required
            className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
              State
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Maharashtra"
              required
              className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#7a2e0e]">
              Postal Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="400001"
              maxLength={6}
              pattern="[0-9]{6}"
              required
              className="w-full rounded-2xl border border-[#f3c58f] px-4 py-3 outline-none focus:ring-2 focus:ring-[#f7c3a1]"
            />
          </div>
        </div>

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

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#7a2e0e] px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
};

export default AddAddressForm;
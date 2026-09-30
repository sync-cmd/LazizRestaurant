"use client"

import { useState } from "react"
import {
  createOffer,
  updateOffer,
  deleteOffer,
} from "../actions"

type Offer = {
  id: string
  badge: string
  title: string
  description: string
  buttonText: string
  image: string
  endDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

type OfferFormProps = {
  offer?: Offer
}

const formatDateTime = (date?: Date) => {
  if (!date) return ""

  const d = new Date(date)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const OfferForm = ({ offer }: OfferFormProps) => {
  const [editing, setEditing] = useState(false)

  const isEditing = Boolean(offer)

  const action = isEditing
    ? updateOffer
    : createOffer

  // Existing offer card
  if (offer && !editing) {
    return (
      <div className="rounded-3xl border border-[#f3c58f] bg-white p-5 shadow-[0_8px_30px_rgba(122,46,14,0.07)] sm:p-6">

        <div className="flex flex-col gap-5">

          {/* Image */}
          {offer.image && (
            <div className="h-48 overflow-hidden rounded-2xl bg-[#fff8ed]">
              <img
                src={offer.image}
                alt={offer.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#c4510b]">
                  {offer.badge}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    offer.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {offer.isActive ? "Active" : "Inactive"}
                </span>

              </div>

              <h2 className="mt-3 text-xl font-bold text-[#7a3d16]">
                {offer.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#795548]">
                {offer.description}
              </p>
            </div>

          </div>

          {/* Details */}
          <div className="grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl bg-[#fff8ed] p-4">
              <p className="text-xs uppercase tracking-wide text-[#a16c4d]">
                Button
              </p>

              <p className="mt-1 font-semibold text-[#7a3d16]">
                {offer.buttonText}
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff8ed] p-4">
              <p className="text-xs uppercase tracking-wide text-[#a16c4d]">
                Ends
              </p>

              <p className="mt-1 font-semibold text-[#7a3d16]">
                {new Date(offer.endDate).toLocaleString()}
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 border-t border-[#f3c58f] pt-5">

            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-full border border-[#d8a15d] px-5 py-2 text-sm font-semibold text-[#7a3d16] transition hover:bg-[#fff3e2]"
            >
              Edit
            </button>

            <form action={deleteOffer}>
              <input
                type="hidden"
                name="id"
                value={offer.id}
              />

              <button
                type="submit"
                className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            </form>

          </div>

        </div>
      </div>
    )
  }

  // Create / Edit form
  return (
    <form
      action={async (formData) => {
        await action(formData)
        setEditing(false)
      }}
      className="rounded-3xl border border-[#f3c58f] bg-white p-5 shadow-[0_8px_30px_rgba(122,46,14,0.07)] sm:p-7"
    >

      {offer && (
        <input
          type="hidden"
          name="id"
          value={offer.id}
        />
      )}

      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#c66a2b]">
          {isEditing ? "Edit promotion" : "New promotion"}
        </p>

        <h2 className="mt-1 text-2xl font-bold text-[#7a3d16]">
          {isEditing ? "Edit Offer" : "Create Offer"}
        </h2>

        <p className="mt-1 text-sm text-[#8a6049]">
          Manage the offer displayed on your homepage.
        </p>
      </div>

      <div className="grid gap-5">

        {/* Badge */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Badge
          </label>

          <input
            name="badge"
            required
            defaultValue={offer?.badge || "Limited Time"}
            placeholder="Limited Time"
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Offer Title
          </label>

          <input
            name="title"
            required
            defaultValue={offer?.title || ""}
            placeholder="Delicious Burger & French Fry"
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Description
          </label>

          <textarea
            name="description"
            required
            rows={4}
            defaultValue={offer?.description || ""}
            placeholder="Enjoy a warm, crispy combo made for your cravings and shared moments."
            className="w-full resize-none rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 leading-6 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>

        {/* Button text */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Button Text
          </label>

          <input
            name="buttonText"
            required
            defaultValue={offer?.buttonText || "Order Now"}
            placeholder="Order Now"
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>

        {/* Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Food Image
          </label>

          <input
            name="image"
            required
            defaultValue={offer?.image || "/offerFood.png"}
            placeholder="/offerFood.png"
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />

          <p className="mt-2 text-xs text-[#9a7057]">
            Example: /offerFood.png
          </p>
        </div>

        {/* End date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
            Offer Ending Date & Time
          </label>

          <input
            type="datetime-local"
            name="endDate"
            required
            defaultValue={formatDateTime(offer?.endDate)}
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
          />

          <p className="mt-2 text-xs text-[#9a7057]">
            The homepage countdown will use this date.
          </p>
        </div>

        {/* Active */}
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-[#fff8ed] p-4">

          <input
            type="checkbox"
            name="isActive"
            defaultChecked={offer?.isActive ?? true}
            className="h-5 w-5 accent-[#f97316]"
          />

          <div>
            <p className="font-semibold text-[#7a3d16]">
              Active Offer
            </p>

            <p className="text-sm text-[#8a6049]">
              Display this offer on the homepage.
            </p>
          </div>

        </label>

      </div>

      {/* Buttons */}
      <div className="mt-7 flex flex-wrap justify-end gap-3">

        {offer && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-[#d8a15d] px-6 py-3 text-sm font-semibold text-[#7a3d16] transition hover:bg-[#fff3e2]"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="rounded-full bg-[#f97316] px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-[#ea580c] hover:shadow-xl"
        >
          {isEditing ? "Update Offer" : "Create Offer"}
        </button>

      </div>
    </form>
  )
}

export default OfferForm
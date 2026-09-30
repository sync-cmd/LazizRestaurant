"use client"

import { useState } from "react"
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions"

type Category = {
  id: string
  title: string
  desc: string
  img: string
  slug: string
}

type MenuManagerProps = {
  categories: Category[]
}

const MenuManager = ({ categories }: MenuManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="space-y-8">

      {/* Add Category */}
      <form
        action={createCategory}
        className="rounded-3xl border border-[#f3c58f] bg-white p-5 shadow-[0_12px_40px_rgba(122,46,14,0.08)] sm:p-7"
      >
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c66a2b]">
            Menu
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#7a3d16]">
            Add Category
          </h2>

          <p className="mt-2 text-sm text-[#8a6049]">
            Add a new category to your restaurant menu.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
              Category Name
            </label>

            <input
              name="title"
              required
              placeholder="Burgers"
              className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
              Slug
            </label>

            <input
              name="slug"
              required
              placeholder="burgers"
              className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
            />

            <p className="mt-1 text-xs text-[#9a7057]">
              Use lowercase letters and hyphens.
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
              Description
            </label>

            <textarea
              name="desc"
              required
              rows={3}
              placeholder="Juicy burgers made with fresh ingredients..."
              className="w-full resize-none rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#6b3519]">
              Image URL / Path
            </label>

            <input
              name="img"
              required
              placeholder="/burgers.jpg"
              className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
            />

            <p className="mt-1 text-xs text-[#9a7057]">
              Example: /burgers.jpg
            </p>
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-[#f97316] px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-[#ea580c]"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Existing Categories */}
      <section>

        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#7a3d16]">
            Categories
          </h2>

          <p className="mt-1 text-sm text-[#8a6049]">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d8a15d] bg-white p-12 text-center">
            <div className="text-4xl">🍽️</div>

            <h3 className="mt-4 text-xl font-bold text-[#7a3d16]">
              No categories yet
            </h3>

            <p className="mt-2 text-sm text-[#8a6049]">
              Create your first category above.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                editing={editingId === category.id}
                onEdit={() => setEditingId(category.id)}
                onCancel={() => setEditingId(null)}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  )
}

type CategoryCardProps = {
  category: Category
  editing: boolean
  onEdit: () => void
  onCancel: () => void
}

const CategoryCard = ({
  category,
  editing,
  onEdit,
  onCancel,
}: CategoryCardProps) => {
  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateCategory(formData)
          onCancel()
        }}
        className="overflow-hidden rounded-3xl border border-[#f3c58f] bg-white shadow-[0_10px_35px_rgba(122,46,14,0.08)]"
      >
        <input
          type="hidden"
          name="id"
          value={category.id}
        />

        <div className="space-y-4 p-5">

          <h3 className="text-xl font-bold text-[#7a3d16]">
            Edit Category
          </h3>

          <input
            name="title"
            required
            defaultValue={category.title}
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#f97316]"
          />

          <input
            name="slug"
            required
            defaultValue={category.slug}
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#f97316]"
          />

          <textarea
            name="desc"
            required
            rows={4}
            defaultValue={category.desc}
            className="w-full resize-none rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#f97316]"
          />

          <input
            name="img"
            required
            defaultValue={category.img}
            className="w-full rounded-xl border border-[#e4c39d] bg-[#fffaf2] px-4 py-3 outline-none focus:border-[#f97316]"
          />

          <div className="flex gap-2 pt-2">

            <button
              type="submit"
              className="flex-1 rounded-full bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ea580c]"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-[#d8a15d] px-4 py-2.5 text-sm font-semibold text-[#7a3d16] hover:bg-[#fff3e2]"
            >
              Cancel
            </button>

          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#f3c58f] bg-white shadow-[0_10px_35px_rgba(122,46,14,0.08)]">

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#fff8ed]">
        <img
          src={category.img}
          alt={category.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4">
          <span className="rounded-full bg-[#fff8ed] px-3 py-1 text-xs font-bold uppercase text-[#7a3d16]">
            {category.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-xl font-bold text-[#6b3519]">
          {category.title}
        </h3>

        <p className="mt-1 text-xs font-medium text-[#b26b38]">
          /menu/{category.slug}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#795548]">
          {category.desc}
        </p>

        <div className="mt-5 flex gap-2 border-t border-[#ead2b3] pt-4">

          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-full border border-[#d8a15d] px-4 py-2 text-sm font-semibold text-[#7a3d16] transition hover:bg-[#fff3e2]"
          >
            Edit
          </button>

          <form
            action={deleteCategory}
            className="flex-1"
          >
            <input
              type="hidden"
              name="id"
              value={category.id}
            />

            <button
              type="submit"
              className="w-full rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default MenuManager
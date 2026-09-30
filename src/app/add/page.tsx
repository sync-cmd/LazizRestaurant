"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiImageUploadLine } from "react-icons/ri";
import { toast } from "react-toastify";

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
};

type Option = {
    title: string;
    additionalPrice: number;
    id?: string;
};

const AddPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        desc: "",
        price: 0,
        catSlug: "",
    });

    const [option, setOption] = useState({
        title: "",
        additionalPrice: 0,
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [file, setFile] = useState<File>();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/");
        }

        if (status === "authenticated" && !session?.user?.isAdmin) {
            router.replace("/");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (
        status === "unauthenticated" ||
        (status === "authenticated" && !session?.user?.isAdmin)
    ) {
        return null;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]:
                    e.target.name === "price"
                        ? Number(e.target.value)
                        : e.target.value,
            };
        });
    };

    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
            return {
                ...prev,
                [e.target.name]:
                    e.target.name === "additionalPrice"
                        ? Number(e.target.value)
                        : e.target.value,
            };
        });
    };

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];

        setFile(item);
    };

    const upload = async () => {
        if (!file) {
            return "";
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let imageUrl = "";

            if (file) {
                imageUrl = await upload();
            }

            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...inputs,
                    img: imageUrl,
                    options,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create product");
            }

            const data = await res.json();

            toast.success("Product added successfully");
            setInputs({ title: "", desc: "", price: 0, catSlug: "" });
            setOption({ title: "", additionalPrice: 0 });
            setOptions([]);
            setFile(undefined);

            router.push(`/product/${data.id}`);
        } catch (err) {
            toast.error("Failed to add product");
            console.log(err);
        }
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <section className="rounded-4xl border border-[#f3c58f] bg-white/90 p-8 shadow-[0_24px_80px_rgba(122,46,14,0.16)] backdrop-blur-sm">
                <div className="mb-8 flex flex-col gap-4 text-[#4a2d1c]">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Add New Product
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#7a3d16]/80 sm:text-base">
                            Create a new menu item with details, category, and
                            optional pricing variants.
                        </p>
                    </div>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-[#4a2d1c]">
                            <span className="font-medium">Title</span>

                            <input
                                className="w-full rounded-3xl border border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] mt-3 outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                                type="text"
                                placeholder="Enter product name"
                                name="title"
                                onChange={handleChange}
                            />
                        </label>

                        <label className="space-y-2 text-sm text-[#4a2d1c]">
                            <span className="font-medium">Description</span>

                            <textarea
                                rows={3}
                                className="w-full mt-3 rounded-3xl border border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                                placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
                                name="desc"
                                onChange={handleChange}
                            />
                        </label>
                    </div>



                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                        <label className="space-y-2 text-sm text-[#4a2d1c]">
                            <span className="font-medium">Category</span>

                            <input
                                type="text"
                                placeholder="pizzas"
                                name="catSlug"
                                onChange={handleChange}
                                className="w-full rounded-3xl border mt-3 border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                            />
                        </label>
                        </div>
                        
                       <div>
                        <label className="space-y-2 text-sm text-[#4a2d1c]">
                                    <span className="font-medium">Base Price</span>

                                    <input
                                        type="number"
                                        placeholder="29"
                                        name="price"
                                        onChange={handleChange}
                                        className="w-full rounded-3xl border mt-3 border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                                    />
                                </label>
                                </div>         


                        <div className="space-y-2 text-sm text-[#4a2d1c]">
                            <span className="font-medium">Options</span>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    type="text"
                                    placeholder="e.g: small,medium,large."
                                    name="title"
                                    onChange={changeOption}
                                    className="w-full rounded-3xl border mt-3 border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                                />
                                

                                <input
                                    type="number"
                                    placeholder="Additional Price"
                                    name="additionalPrice"
                                    onChange={changeOption}
                                    className="w-full rounded-3xl border mt-3 border-[#f0d3ae] bg-[#fffaf2] px-4 py-3 text-sm text-[#4a2d1c] outline-none transition focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/20"
                                />
                                
                            </div>

                            
                            
                            <button
                                type="button"
                                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
                                onClick={() =>
                                    setOptions((prev) => {
                                        const title = option.title?.toString().trim();

                                        if (!title) return prev; // don't add empty

                                        // prevent duplicate titles
                                        if (prev.some((o) => o.title === title)) return prev;

                                        return [...prev, { ...option, id: Date.now().toString() }];
                                    })
                                }
                            >
                                Add Option
                            </button>
                            
                        </div>

                        <div className="mt-4">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <h4 className="text-sm font-medium text-[#4a2d1c]">Preview Options</h4>

                            </div>
                            <div className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
                                <div className="space-y-2">
                                    <div className="mt-3 space-y-2">
                                        {options.length === 0 && (
                                            <p className="text-sm text-[#7a3d16]/80">No options added yet.</p>
                                        )}

                                        {options.map((opt, idx) => (
                                            <div
                                                key={opt.id ?? `${opt.title}-${idx}`}
                                                onClick={() =>
                                                    setOptions((prev) => prev.filter((_, i) => i !== idx))
                                                }
                                                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#f0d3ae] bg-white p-3 text-sm text-[#4a2d1c] hover:shadow-sm"
                                            >
                                                <span className="font-medium">{opt.title}</span>
                                                <span className="text-[#7a2e0e]">+ ₹{opt.additionalPrice}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm font-medium text-[#4a2d1c]">Image upload</span>
                            <div className="rounded-3xl border mt-3  border-[#f0d3ae] bg-[#fffaf2] p-4 text-sm text-[#4a2d1c] shadow-sm">
                                <label
                                    htmlFor="file"
                                    className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[#f0d3ae] bg-white/80 px-4 py-4 text-center transition hover:border-[#f97316] hover:bg-[#fff6e8]"
                                >
                                    <RiImageUploadLine className="text-2xl  text-[#f97316] transition group-hover:text-[#ea580c]" />
                                    <p className="text-sm font-medium">Upload image</p>
                                    {file ? (
                                        <p className="text-xs text-[#7a3d16]/80">{file.name}</p>
                                    ) : (
                                        <p className="text-xs text-[#7a3d16]/80">PNG or JPG</p>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImg}
                                    id="file"
                                    className="hidden"
                                />
                                {file && (
                                    <button
                                        type="button"
                                        onClick={() => setFile(undefined)}
                                        className="mt-3 w-full rounded-full bg-[#f97316] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
                                    >
                                        Remove image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-full bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
                    >
                        Save Product
                    </button>
                </form>
            </section>
        </main>
    );
};

export default AddPage;
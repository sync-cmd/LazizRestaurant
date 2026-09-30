import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const uploadData = new FormData();
    uploadData.append("file", file as Blob);
    uploadData.append("upload_preset", "restaurant");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/chx43olr/image/upload",
      {
        method: "POST",
        body: uploadData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: "Cloudinary upload failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
};

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
    const { email, name, image } = await req.json();
    if (!email) {
        return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    console.log(email, name, image);
    const client = await clientPromise;
    const users = client.db("systemvisuliazer").collection("users");

    let user = await users.findOne({ email: email.toLowerCase() });
    if (!user) {

        const newUser = await users.insertOne({
            email: email.toLowerCase(),
            name: name || "",
            image: image || "",
            createdAt: new Date(),
        });
        user = await users.findOne({ _id: newUser.insertedId });
    }

    return NextResponse.json({ user: { email, name, image } });
}
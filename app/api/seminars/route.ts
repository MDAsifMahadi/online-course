// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// import seminarsData from "@/data/seminars.json";
// export const GET = async () => {
//     try {
//         const seminars = seminarsData;
//         return NextResponse.json({ seminars });
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

// export const POST = async (req: NextRequest) => {
//     try {
//         const body = await req.json();
//         const seminars = body;
//         console.log("From Server:", seminars);
//         return NextResponse.json({ seminars });
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
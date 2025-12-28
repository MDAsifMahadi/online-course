// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//     try {
//         const seminars = await prisma.enrollment.create({
//             data: {
//                 name: "Test Seminar",
//                 phone: "1234567890",
//                 email: "test@prisma.io",
//                 course: "Test Course",
//             }
//         })
//         console.log(seminars);
//         return NextResponse.json({ success: true, seminars });
//     } catch (error) {
//         console.error("Error fetching seminars:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to fetch seminars" },
//             { status: 500 }
//         );
//     }
// }

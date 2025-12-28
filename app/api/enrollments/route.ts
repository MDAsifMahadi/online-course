// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // GET: Fetch all enrollments
// export async function GET() {
//     try {
//         const enrollments = await prisma.enrollment.findMany({
//             orderBy: { createdAt: 'desc' },
//         });

//         // return NextResponse.json({ success: true, enrollments });
//     } catch (error) {
//         console.error("Error fetching enrollments:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to fetch enrollments" },
//             { status: 500 }
//         );
//     }
// }

// // DELETE: Delete enrollment
// export async function DELETE(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get('id');

//         if (!id) {
//             return NextResponse.json(
//                 { success: false, error: "Enrollment ID is required" },
//                 { status: 400 }
//             );
//         }

//         await prisma.enrollment.delete({
//             where: { id: parseInt(id) },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Enrollment deleted successfully",
//         });
//     } catch (error) {
//         console.error("Error deleting enrollment:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to delete enrollment" },
//             { status: 500 }
//         );
//     }
// }

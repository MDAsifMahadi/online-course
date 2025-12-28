// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // GET: Fetch all results
// export async function GET() {
//     try {
//         const results = await prisma.result.findMany({
//             orderBy: { createdAt: 'desc' },
//         });

//         return NextResponse.json({ success: true, results });
//     } catch (error) {
//         console.error("Error fetching results:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to fetch results" },
//             { status: 500 }
//         );
//     }
// }

// // POST: Create new result
// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { name, roll, result, certificateUrl } = body;

//         // Validation
//         if (!name || !roll || !result || !certificateUrl) {
//             return NextResponse.json(
//                 { success: false, error: "All fields are required" },
//                 { status: 400 }
//             );
//         }

//         // Check if roll number already exists
//         const existingResult = await prisma.result.findUnique({
//             where: { roll },
//         });

//         if (existingResult) {
//             return NextResponse.json(
//                 { success: false, error: "Roll number already exists" },
//                 { status: 400 }
//             );
//         }

//         // Create new result
//         const newResult = await prisma.result.create({
//             data: {
//                 name,
//                 roll,
//                 result,
//                 certificateUrl,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Result added successfully",
//             result: newResult,
//         });
//     } catch (error) {
//         console.error("Error creating result:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to create result" },
//             { status: 500 }
//         );
//     }
// }

// // PUT: Update existing result
// export async function PUT(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { id, name, roll, result, certificateUrl } = body;

//         // Validation
//         if (!id || !name || !roll || !result || !certificateUrl) {
//             return NextResponse.json(
//                 { success: false, error: "All fields are required" },
//                 { status: 400 }
//             );
//         }

//         // Check if roll number is taken by another result
//         const existingResult = await prisma.result.findUnique({
//             where: { roll },
//         });

//         if (existingResult && existingResult.id !== id) {
//             return NextResponse.json(
//                 { success: false, error: "Roll number already exists" },
//                 { status: 400 }
//             );
//         }

//         // Update result
//         const updatedResult = await prisma.result.update({
//             where: { id },
//             data: {
//                 name,
//                 roll,
//                 result,
//                 certificateUrl,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Result updated successfully",
//             result: updatedResult,
//         });
//     } catch (error) {
//         console.error("Error updating result:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to update result" },
//             { status: 500 }
//         );
//     }
// }

// // DELETE: Delete result
// export async function DELETE(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get('id');

//         if (!id) {
//             return NextResponse.json(
//                 { success: false, error: "Result ID is required" },
//                 { status: 400 }
//             );
//         }

//         await prisma.result.delete({
//             where: { id: parseInt(id) },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Result deleted successfully",
//         });
//     } catch (error) {
//         console.error("Error deleting result:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to delete result" },
//             { status: 500 }
//         );
//     }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// // PUT: Update admin credentials
// export async function PUT(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { currentUsername, currentPassword, newUsername, newPassword } = body;

//         // Validation
//         if (!currentUsername || !currentPassword || !newUsername || !newPassword) {
//             return NextResponse.json(
//                 { success: false, error: "All fields are required" },
//                 { status: 400 }
//             );
//         }

//         // Find user by current username
//         const user = await prisma.user.findUnique({
//             where: { username: currentUsername },
//         });

//         if (!user) {
//             return NextResponse.json(
//                 { success: false, error: "Invalid current credentials" },
//                 { status: 401 }
//             );
//         }

//         // Verify current password
//         const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

//         if (!isPasswordValid) {
//             return NextResponse.json(
//                 { success: false, error: "Invalid current credentials" },
//                 { status: 401 }
//             );
//         }

//         // Check if new username is already taken by another user
//         if (newUsername !== currentUsername) {
//             const existingUser = await prisma.user.findUnique({
//                 where: { username: newUsername },
//             });

//             if (existingUser) {
//                 return NextResponse.json(
//                     { success: false, error: "Username already exists" },
//                     { status: 400 }
//                 );
//             }
//         }

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update user credentials
//         await prisma.user.update({
//             where: { id: user.id },
//             data: {
//                 username: newUsername,
//                 password: hashedPassword,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Credentials updated successfully",
//         });
//     } catch (error) {
//         console.error("Error updating credentials:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to update credentials" },
//             { status: 500 }
//         );
//     }
// }

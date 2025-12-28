import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { ContactMessage } from "@/app/modle/schema";

// GET: Fetch all contact messages
export async function GET() {
    try {
        await connectDB();
        const messages = await ContactMessage.find({
            orderBy: { createdAt: 'desc' },
        });
        console.log(messages);
        return NextResponse.json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}

// POST: Create new message
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { name, email, message } = await request.json();

        const newMessage = await ContactMessage.create({
            name,
            email,
            message,
        });
        // await newMessage.save();
        return NextResponse.json({ success: true, message: newMessage });
    } catch (error) {
        console.error("Error creating message:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create message" },
            { status: 500 }
        );
    }
}

// // DELETE: Delete message
// export async function DELETE(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get('id');

//         if (!id) {
//             return NextResponse.json(
//                 { success: false, error: "Message ID is required" },
//                 { status: 400 }
//             );
//         }

//         await prisma.contactMessage.delete({
//             where: { id: parseInt(id) },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Message deleted successfully",
//         });
//     } catch (error) {
//         console.error("Error deleting message:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to delete message" },
//             { status: 500 }
//         );
//     }
// }

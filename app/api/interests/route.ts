import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { verifyToken } from '@/lib/jwt';
import UserInterests from '@/database/user-interests.model';
import Category from '@/database/category.model';
import { cookies } from 'next/headers';

// Get user interests
export async function GET() {
    try {
        await connectToDatabase();
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = verifyToken(token.value);

        // Parse the user data if it's a string
        let userId = decoded.data;
        if (typeof userId === 'string') {
            try {
                const userData = JSON.parse(userId);
                userId = userData.userId || userData._id;
            } catch {
                userId = decoded.data;
            }
        }

        const userInterests = await UserInterests.findOne({ userId });

        if (!userInterests?.interests) {
            return NextResponse.json({
                interests: []
            });
        }

        // Get the actual categories using the ObjectIds
        const categories = await Category.find({
            _id: { $in: userInterests.interests }
        }).select('id name');

        // Extract category IDs
        const interestIds = categories.map(category => category.id);

        return NextResponse.json({
            interests: interestIds
        });
    } catch (error) {
        console.error('Failed to fetch user interests:', error);
        return NextResponse.json(
            { message: 'Failed to fetch interests' },
            { status: 500 }
        );
    }
}

// Save user interests
export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { interests } = body;

        if (!Array.isArray(interests)) {
            return NextResponse.json({ message: 'Interests must be an array' }, { status: 400 });
        }

        const decoded = verifyToken(token.value);

        // Parse the user data if it's a string
        let userId = decoded.data;
        if (typeof userId === 'string') {
            try {
                const userData = JSON.parse(userId);
                userId = userData.userId ?? userData._id;
            } catch {
                // If parsing fails, assume it's already the userId
                userId = decoded.data;
            }
        }

        // Convert category IDs to ObjectIds and validate they exist
        const categoryObjectIds = [];
        for (const categoryId of interests) {
            const category = await Category.findOne({ id: categoryId });
            if (category) {
                categoryObjectIds.push(category._id);
            } else {
                console.warn(`Category not found: ${categoryId}`);
            }
        }

        await UserInterests.findOneAndUpdate(
            { userId },
            { interests: categoryObjectIds },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            message: 'Interests saved successfully',
            savedCount: categoryObjectIds.length
        });
    } catch (error) {
        console.error('Failed to save user interests:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Failed to save interests' },
            { status: 500 }
        );
    }
}

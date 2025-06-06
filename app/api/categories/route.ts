import { NextResponse } from 'next/server';
import Category from '@/database/category.model';
import { connectToDatabase } from '@/lib/mongoose';
import { seedCategories } from '@/lib/seed-categories';

export async function GET() {
    try {
        await connectToDatabase();

        // Check if categories exist
        const categoryCount = await Category.countDocuments();

        // If no categories exist, seed them
        if (categoryCount === 0) {
            await seedCategories();
        }

        const categories = await Category.find({}).select('_id id name description').sort({ name: 1 });

        return NextResponse.json({
            categories: categories.map(cat => ({
                id: cat.id,
                label: cat.name,
                description: cat.description,
                _id: cat._id.toString() // Include ObjectId for reference
            }))
        });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return NextResponse.json(
            { message: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

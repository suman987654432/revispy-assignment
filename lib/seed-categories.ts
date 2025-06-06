import { faker } from '@faker-js/faker';
import Category from '@/database/category.model';
import { connectToDatabase } from './mongoose';

export async function seedCategories() {
    await connectToDatabase();

    // Clear existing categories
    await Category.deleteMany({});

    const categories = [];

    for (let i = 1; i <= 100; i++) {
        categories.push({
            id: `category-${i}`,
            name: faker.commerce.department(),
            description: faker.commerce.productDescription()
        });
    }

    await Category.insertMany(categories);
    console.log('100 categories seeded successfully');
}

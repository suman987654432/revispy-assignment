import { faker } from '@faker-js/faker';
import Category from '@/database/category.model';
import { connectToDatabase } from './mongoose';

export async function seedCategories() {
  await connectToDatabase();

  await Category.deleteMany({});

  const categories = [];

  for (let i = 1; i <= 100; i++) {
    const adjective = faker.commerce.productAdjective();
    const material = faker.commerce.productMaterial();
    const product = faker.commerce.product();
    const name = `${adjective} ${material} ${product}`;

    categories.push({
      id: `category-${i}`,
      name,
      description: faker.commerce.productDescription(),
    });
  }

  await Category.insertMany(categories);
  console.log('✅ 100 unique categories seeded successfully (efficient)');
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categorySeeds = [
  {
    name: 'Electronics',
    banner: 'https://picsum.photos/id/1011/1200/600',
  },
  {
    name: 'Fashion',
    banner: 'https://picsum.photos/id/1012/1200/600',
  },
  {
    name: 'Home & Kitchen',
    banner: 'https://picsum.photos/id/1013/1200/600',
  },
  {
    name: 'Beauty',
    banner: 'https://picsum.photos/id/1014/1200/600',
  },
  {
    name: 'Sports & Outdoors',
    banner: 'https://picsum.photos/id/1015/1200/600',
  },
  {
    name: 'Books',
    banner: 'https://picsum.photos/id/1016/1200/600',
  },
];

const imagePool = [
  'https://picsum.photos/id/1025/1200/1200',
  'https://picsum.photos/id/1031/1200/1200',
  'https://picsum.photos/id/1035/1200/1200',
  'https://picsum.photos/id/1040/1200/1200',
  'https://picsum.photos/id/1050/1200/1200',
  'https://picsum.photos/id/1057/1200/1200',
  'https://picsum.photos/id/1062/1200/1200',
  'https://picsum.photos/id/1069/1200/1200',
  'https://picsum.photos/id/1074/1200/1200',
  'https://picsum.photos/id/1084/1200/1200',
  'https://picsum.photos/id/1080/1200/1200',
  'https://picsum.photos/id/109/1200/1200',
  'https://picsum.photos/id/110/1200/1200',
  'https://picsum.photos/id/111/1200/1200',
  'https://picsum.photos/id/112/1200/1200',
  'https://picsum.photos/id/113/1200/1200',
  'https://picsum.photos/id/114/1200/1200',
  'https://picsum.photos/id/115/1200/1200',
  'https://picsum.photos/id/116/1200/1200',
  'https://picsum.photos/id/117/1200/1200',
];

const baseProducts = [
  {
    name: 'Wireless Earbuds',
    category: 'Electronics',
    description: 'Compact Bluetooth earbuds with clear sound and a snug fit.',
    minPrice: 35,
    maxPrice: 129,
  },
  {
    name: 'Smartwatch',
    category: 'Electronics',
    description: 'Fitness-focused smartwatch with heart-rate and sleep tracking.',
    minPrice: 89,
    maxPrice: 249,
  },
  {
    name: 'Portable Speaker',
    category: 'Electronics',
    description: 'Water-resistant speaker with punchy bass for outdoor use.',
    minPrice: 45,
    maxPrice: 159,
  },
  {
    name: 'Casual Sneakers',
    category: 'Fashion',
    description: 'Everyday sneakers with breathable mesh and cushioned soles.',
    minPrice: 40,
    maxPrice: 120,
  },
  {
    name: 'Denim Jacket',
    category: 'Fashion',
    description: 'Classic denim jacket with a relaxed fit and soft lining.',
    minPrice: 55,
    maxPrice: 140,
  },
  {
    name: 'Cotton T-Shirt',
    category: 'Fashion',
    description: 'Soft cotton tee with durable stitching and minimal branding.',
    minPrice: 12,
    maxPrice: 35,
  },
  {
    name: 'Non-Stick Cookware Set',
    category: 'Home & Kitchen',
    description: 'Scratch-resistant cookware set for daily cooking.',
    minPrice: 65,
    maxPrice: 210,
  },
  {
    name: 'Electric Kettle',
    category: 'Home & Kitchen',
    description: 'Fast-boil electric kettle with auto shut-off safety.',
    minPrice: 25,
    maxPrice: 80,
  },
  {
    name: 'Memory Foam Pillow',
    category: 'Home & Kitchen',
    description: 'Ergonomic pillow for better neck support and comfort.',
    minPrice: 25,
    maxPrice: 75,
  },
  {
    name: 'Hydrating Face Serum',
    category: 'Beauty',
    description: 'Lightweight serum for daily hydration and glow.',
    minPrice: 18,
    maxPrice: 60,
  },
  {
    name: 'Matte Lipstick Set',
    category: 'Beauty',
    description: 'Long-wear matte lipstick in versatile shades.',
    minPrice: 15,
    maxPrice: 45,
  },
  {
    name: 'Hair Dryer',
    category: 'Beauty',
    description: 'Quick-dry hair dryer with heat protection settings.',
    minPrice: 35,
    maxPrice: 120,
  },
  {
    name: 'Yoga Mat',
    category: 'Sports & Outdoors',
    description: 'Non-slip yoga mat with easy-carry strap.',
    minPrice: 20,
    maxPrice: 65,
  },
  {
    name: 'Running Shoes',
    category: 'Sports & Outdoors',
    description: 'Lightweight running shoes for daily training.',
    minPrice: 60,
    maxPrice: 180,
  },
  {
    name: 'Insulated Water Bottle',
    category: 'Sports & Outdoors',
    description: 'Stainless steel bottle that keeps drinks cold or hot.',
    minPrice: 18,
    maxPrice: 55,
  },
  {
    name: 'Productivity Planner',
    category: 'Books',
    description: 'Weekly planner to organize goals and daily tasks.',
    minPrice: 10,
    maxPrice: 28,
  },
  {
    name: 'Cooking Basics Handbook',
    category: 'Books',
    description: 'Beginner-friendly guide to everyday cooking.',
    minPrice: 12,
    maxPrice: 32,
  },
  {
    name: 'Mindful Living Guide',
    category: 'Books',
    description: 'Practical guide to building mindful habits.',
    minPrice: 9,
    maxPrice: 26,
  },
];

const variants = [
  'Classic',
  'Premium',
  'Everyday',
  'Compact',
  'Pro',
  'Signature',
  'Limited',
  'Essentials',
  'Studio',
  'Traveler',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(min: number, max: number) {
  const value = Math.random() * (max - min) + min;
  return Math.round(value * 100) / 100;
}

function pickImages() {
  const count = randomInt(2, 3);
  const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function ensureCategories() {
  const existing = await prisma.category.findMany({
    where: {
      name: {
        in: categorySeeds.map((category) => category.name),
      },
    },
  });

  const existingNames = new Set(existing.map((category) => category.name));

  for (const category of categorySeeds) {
    if (!existingNames.has(category.name)) {
      await prisma.category.create({
        data: category,
      });
    }
  }

  return prisma.category.findMany({
    where: {
      name: {
        in: categorySeeds.map((category) => category.name),
      },
    },
  });
}

async function main() {
  const categories = await ensureCategories();
  const categoryByName = new Map(
    categories.map((category) => [category.name, category.id]),
  );

  const runId = Date.now().toString(36);
  const products = Array.from({ length: 100 }, (_, index) => {
    const base = baseProducts[index % baseProducts.length];
    const variant = variants[index % variants.length];
    const title = `${variant} ${base.name}`;
    const price = randomPrice(base.minPrice, base.maxPrice);
    const discount = Math.random() < 0.4 ? randomPrice(2, price * 0.3) : 0;
    const stock = randomInt(8, 180);
    const slug = slugify(`${title}-${runId}-${index + 1}`);
    const sku = `SKU-${runId}-${String(index + 1).padStart(4, '0')}`;

    return {
      title,
      slug,
      description: base.description,
      categoryId: categoryByName.get(base.category) ?? null,
      price,
      discount: Math.round(discount * 100) / 100,
      stock,
      sku,
      images: pickImages(),
      isActive: true,
    };
  });

  await prisma.product.createMany({
    data: products,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

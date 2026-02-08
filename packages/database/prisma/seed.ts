import { prisma } from '../src';

async function main() {
  console.log('Seeding database...');
  
  // Create a sample organization
  const org = await prisma.organization.create({
    data: {
      name: 'Demo Studio',
      slug: 'demo-studio',
    },
  });
  
  console.log(`Created organization: ${org.name}`);
  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

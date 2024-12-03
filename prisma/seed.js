// to run: npx ts-node prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Sites
  const site1 = await prisma.site.create({
    data: {
      language: "en",
      title: "Site Title",
      subtitle: "Site SubTitle",
    },
  });

  //Seed Pages
  const page1 = await prisma.page.create({
    data: {
      object: "Page 1",
      language: "en",
      name: "Page 1",
      pageContent: ["Tab 1 Content"],
    },
  });

  const page2 = await prisma.page.create({
    data: {
      object: "Page 2",
      language: "en",
      name: "Page 2",
      pageContent: ["Tab 2 Content1", "Tab 2 Content2", "Tab 2 Content3"],
    },
  });

  const page3 = await prisma.page.create({
    data: {
      object: "Page 3",
      language: "en",
      name: "Page 3",
      pageContent: ["Tab 3 Content"],
    },
  });

  // Seed Messages
  const message1 = await prisma.message.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      telegram: "@johndoe",
      message: "Hello, I have a question about your services.",
    },
  });

  console.log({ site1, page1, page2, page3, message1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

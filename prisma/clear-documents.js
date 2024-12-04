import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Deleting all records in each model manually
    await prisma.site.deleteMany(); // For the "Page" model, change this to your models
    console.log("Site collection cleared");

    await prisma.page.deleteMany(); // For the "Page" model, change this to your models
    console.log("Page collection cleared");

    await prisma.message.deleteMany(); // For the "Page" model, change this to your models
    console.log("Message collection cleared");

    // Repeat for other models if necessary
    // await prisma.otherModel.deleteMany();

    console.log("Database cleared");
  } catch (err) {
    console.error("Error clearing database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();

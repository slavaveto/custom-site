// to run: npm run create-documents

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------------------------ENG-------------------
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
      object: "page-1",
      language: "en",
      name: "Page 1",
      pageContent: ["Tab 1 Content"],
      pageTabs: [],
    },
  });

  const page2 = await prisma.page.create({
    data: {
      object: "page-2",
      language: "en",
      name: "Page 2",
      pageContent: ["Tab 2 Content1", "Tab 2 Content2", "Tab 2 Content3"],
      pageTabs: [
        { object: "tab-1", name: "Tab 1", content: "Tab 1 Content" },
        { object: "tab-2", name: "Tab 2", content: "Tab 2 Content" },
        { object: "tab-3", name: "Tab 3", content: "Tab 3 Content" },
      ],
    },
  });

  const page3 = await prisma.page.create({
    data: {
      object: "page-3",
      language: "en",
      name: "Page 3",
      pageContent: ["Tab 3 Content"],
      pageTabs: [],
    },
  });

  //--------------------------DE-------------------
  const site1_de = await prisma.site.create({
    data: {
      language: "de",
      title: "Website Titel",
      subtitle: "Website Untertitel",
    },
  });

  // Seed Pages
  const page1_de = await prisma.page.create({
    data: {
      object: "page-1",
      language: "de",
      name: "Seite 1",
      pageContent: ["Tab 1 Inhalt"],
      pageTabs: [],
    },
  });

  const page2_de = await prisma.page.create({
    data: {
      object: "page-2",
      language: "de",
      name: "Seite 2",
      pageContent: ["Tab 2 Inhalt1", "Tab 2 Inhalt2", "Tab 2 Inhalt3"],
      pageTabs: [
        { object: "tab-1", name: "Tab 1", content: "Tab 1 Inhalt" },
        { object: "tab-2", name: "Tab 2", content: "Tab 2 Inhalt" },
        { object: "tab-3", name: "Tab 3", content: "Tab 3 Inhalt" },
      ],
    },
  });

  const page3_de = await prisma.page.create({
    data: {
      object: "page-3",
      language: "de",
      name: "Seite 3",
      pageContent: ["Tab 3 Inhalt"],
      pageTabs: [],
    },
  });

  // ---------------------------SL-------------------
  const site1_sl = await prisma.site.create({
    data: {
      language: "sl",
      title: "Naslov spletne strani",
      subtitle: "Podnaslov spletne strani",
    },
  });

  // Seed Pages
  const page1_sl = await prisma.page.create({
    data: {
      object: "page-1",
      language: "sl",
      name: "Stran 1",
      pageContent: ["Vsebina zavihka 1"],
      pageTabs: [],
    },
  });

  const page2_sl = await prisma.page.create({
    data: {
      object: "page-2",
      language: "sl",
      name: "Stran 2",
      pageContent: [
        "Vsebina zavihka 2.1",
        "Vsebina zavihka 2.2",
        "Vsebina zavihka 2.3",
      ],
      pageTabs: [
        { object: "tab-1", name: "Zavihek 1", content: "Vsebina zavihka 1" },
        { object: "tab-2", name: "Zavihek 2", content: "Vsebina zavihka 2" },
        { object: "tab-3", name: "Zavihek 3", content: "Vsebina zavihka 3" },
      ],
    },
  });

  const page3_sl = await prisma.page.create({
    data: {
      object: "page-3",
      language: "sl",
      name: "Stran 3",
      pageContent: ["Vsebina zavihka 3"],
      pageTabs: [],
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

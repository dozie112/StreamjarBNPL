// prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const items = [
    { name: "Wireless Headphones", description: "Noise-cancelling over-ear headphones", price: 12900, currency: "GBP", image: "/img/headphones.png", stock: 25 },
    { name: "USB-C Microphone",    description: "Plug-and-play condenser mic",         price:  8900, currency: "GBP", image: "/img/mic.png",        stock: 12 },
    { name: "Creator Sticker Pack",description: "Matte vinyl stickers",                 price:   500, currency: "GBP", image: "/img/stickers.png",   stock:100 },
  ];
  for (const data of items) {
    await prisma.product.upsert({
      where: { name: data.name },
      update: data,
      create: data,
    });
  }
  console.log("✅ Seeded products");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});

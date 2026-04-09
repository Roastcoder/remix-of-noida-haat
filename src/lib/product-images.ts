import catPottery from "@/assets/cat-pottery.jpg";
import catJewelry from "@/assets/cat-jewelry.jpg";
import catTextiles from "@/assets/cat-textiles.jpg";
import catWoodcraft from "@/assets/cat-woodcraft.jpg";
import catArt from "@/assets/cat-art.jpg";
import catHomedecor from "@/assets/cat-homedecor.jpg";
import catGifts from "@/assets/cat-gifts.jpg";

const productImageMap: Record<string, string> = {
  "Clay Diyas": catPottery,
  "Flower Pots": catPottery,
  "Decorative Vases": catPottery,
  "Kulhad Tea Cups": catPottery,
  "Clay Water Pot (Matka)": catPottery,
  "Incense Holders": catPottery,
  "Wooden Earrings": catJewelry,
  "Beaded Necklaces": catJewelry,
  "Oxidised Jewelry Set": catJewelry,
  "Handmade Bracelets": catJewelry,
  "Anklets": catJewelry,
  "Tribal Jewelry": catJewelry,
  "Resin Jewelry": catJewelry,
  "Handloom Sarees": catTextiles,
  "Khadi Kurtas": catTextiles,
  "Dupattas": catTextiles,
  "Shawls": catTextiles,
  "Scarves": catTextiles,
  "Block Print Fabrics": catTextiles,
  "Cushion Covers": catTextiles,
  "Wooden Jewelry Box": catWoodcraft,
  "Wooden Toys": catWoodcraft,
  "Key Holders": catWoodcraft,
  "Wall Art Frames": catWoodcraft,
  "Pooja Items": catWoodcraft,
  "Madhubani Paintings": catArt,
  "Warli Art": catArt,
  "Canvas Paintings": catArt,
  "Handmade Sketches": catArt,
  "Rural Landscape Art": catArt,
  "Wall Hangings": catHomedecor,
  "Lanterns": catHomedecor,
  "Dream Catchers": catHomedecor,
  "Macrame Decor": catHomedecor,
  "Table Decor Items": catHomedecor,
  "Handmade Gift Boxes": catGifts,
  "Festival Hampers": catGifts,
  "Customized Gifts": catGifts,
  "Eco-Friendly Gifts": catGifts,
  "Corporate Gift Items": catGifts,
};

export function getProductFallbackImage(productName: string): string {
  return productImageMap[productName] || catPottery;
}

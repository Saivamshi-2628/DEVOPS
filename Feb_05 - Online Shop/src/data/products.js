// Single source of truth for products — used by Products list and ProductDetail (useParams)

export const products = [
  {
    id: "1",
    name: "Pro Laptop",
    tagline: "Power. Simplified.",
    price: 129999,
    description: "High-performance laptop with stunning display and all-day battery. Built for creators and professionals.",
    specs: ["M3 Pro chip", "18-hour battery", "Liquid Retina XDR display", "Up to 36GB memory"],
    gradient: "linear-gradient(135deg, #1d1d1f 0%, #424245 100%)",
    icon: "💻",
  },
  {
    id: "2",
    name: "Ultra Phone",
    tagline: "Beyond smart.",
    price: 89999,
    description: "Latest smartphone with pro camera system, super-fast chip, and the most durable design yet.",
    specs: ["A17 Pro chip", "48MP Main camera", "Titanium design", "All-day battery"],
    gradient: "linear-gradient(135deg, #2c2c2e 0%, #636366 100%)",
    icon: "📱",
  },
  {
    id: "3",
    name: "Air Sound",
    tagline: "Sound. Reimagined.",
    price: 24999,
    description: "Noise cancelling over-ear headphones with spatial audio and seamless device switching.",
    specs: ["Active Noise Cancellation", "Spatial Audio", "30-hour battery", "Premium comfort"],
    gradient: "linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)",
    icon: "🎧",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === String(id)) || null;
}

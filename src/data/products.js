export const CATEGORIES = ['All', 'Hoodies', 'Jackets', 'Tees', 'Accessories'];

// Verified Unsplash fashion photo IDs — no food/bakery leakage
const IMG = {
  // Hoodies
  hoodie1:  'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=750&fit=crop&q=80',
  hoodie2:  'https://images.unsplash.com/photo-1620799140408-edb6952e9174?w=600&h=750&fit=crop&q=80',
  hoodie3:  'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=750&fit=crop&q=80',
  hoodie4:  'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&h=750&fit=crop&q=80',
  hoodie5:  'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?w=600&h=750&fit=crop&q=80',
  hoodie6:  'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=600&h=750&fit=crop&q=80',
  // Jackets
  jacket1:  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop&q=80',
  jacket2:  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=80',
  jacket3:  'https://images.unsplash.com/photo-1605909697965-f7804040e459?w=600&h=750&fit=crop&q=80',
  jacket4:  'https://images.unsplash.com/photo-1594938298603-c8148c4b4957?w=600&h=750&fit=crop&q=80',
  jacket5:  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop&q=80',
  jacket6:  'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&h=750&fit=crop&q=80',
  // Tees
  tee1:     'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop&q=80',
  tee2:     'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&q=80',
  tee3:     'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=750&fit=crop&q=80',
  tee4:     'https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=600&h=750&fit=crop&q=80',
  tee5:     'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop&q=80',
  tee6:     'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=750&fit=crop&q=80',
  // Accessories
  acc1:     'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop&q=80',
  acc2:     'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&h=750&fit=crop&q=80',
  acc3:     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80',
  acc4:     'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&q=80',
  acc5:     'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=750&fit=crop&q=80',
  acc6:     'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=750&fit=crop&q=80',
};

const products = [
  // ── HOODIES ────────────────────────────────────────────────
  {
    id: 'VV-001', name: 'Maison Heavyweight Hoodie', category: 'Hoodies', price: 185, originalPrice: 230,
    description: 'Crafted from 380gsm brushed French terry cotton. A defining silhouette of the VÉLO archive — relaxed, weighty, effortless. Garment-dyed and stone-washed for a lived-in hand.',
    colors: [{ name:'Charcoal', hex:'#3d3d3d' },{ name:'Stone', hex:'#b5a89a' },{ name:'Off White', hex:'#f0ebe3', light:true }],
    sizes: ['S','M','L','XL'], stock: { S:8, M:14, L:12, XL:6 }, image: IMG.hoodie1,
    featured: true, newArrival: false, rating: 4.8, reviews: 124, badge: 'Bestseller',
  },
  {
    id: 'VV-002', name: 'Archive Washed Hoodie', category: 'Hoodies', price: 195, originalPrice: null,
    description: 'Stone-washed to perfection. Each piece tells its own story through unique fading patterns and a lived-in, premium texture. Oversized drop-shoulder cut.',
    colors: [{ name:'Stone', hex:'#b5a89a' },{ name:'Cream', hex:'#f5efe8', light:true }],
    sizes: ['S','M','L','XL'], stock: { S:5, M:10, L:8, XL:3 }, image: IMG.hoodie2,
    featured: false, newArrival: true, rating: 4.7, reviews: 89, badge: 'New',
  },
  {
    id: 'VV-003', name: 'Atelier Zip Hoodie', category: 'Hoodies', price: 220, originalPrice: null,
    description: 'Full-grain YKK zipper meets premium 400gsm cotton. The pinnacle of the VÉLO hoodie collection — structured silhouette with a clean, modern edge.',
    colors: [{ name:'Wine Red', hex:'#9a0002' },{ name:'Black', hex:'#1a1a1a' },{ name:'Charcoal', hex:'#3d3d3d' }],
    sizes: ['S','M','L','XL'], stock: { S:6, M:12, L:10, XL:4 }, image: IMG.hoodie3,
    featured: true, newArrival: false, rating: 4.9, reviews: 67, badge: null,
  },
  {
    id: 'VV-004', name: 'Luxe Terry Hoodie', category: 'Hoodies', price: 175, originalPrice: 215,
    description: 'Soft loopback terry in a relaxed boxy cut. Minimal branding, maximum comfort. The everyday essential from the VÉLO archive.',
    colors: [{ name:'Off White', hex:'#f0ebe3', light:true },{ name:'Stone', hex:'#b5a89a' }],
    sizes: ['S','M','L','XL'], stock: { S:10, M:18, L:15, XL:7 }, image: IMG.hoodie4,
    featured: false, newArrival: false, rating: 4.6, reviews: 203, badge: 'Sale',
  },
  {
    id: 'VV-004B', name: 'Oversized Pullover Hoodie', category: 'Hoodies', price: 165, originalPrice: null,
    description: 'Ultra-oversized silhouette in heavy 360gsm fleece. Drop shoulders, kangaroo pocket, ribbed hem. The essential winter anchor.',
    colors: [{ name:'Navy', hex:'#1c2b4a' },{ name:'Black', hex:'#1a1a1a' },{ name:'Stone', hex:'#b5a89a' }],
    sizes: ['S','M','L','XL'], stock: { S:9, M:16, L:13, XL:5 }, image: IMG.hoodie5,
    featured: false, newArrival: true, rating: 4.7, reviews: 45, badge: 'New',
  },
  {
    id: 'VV-004C', name: 'Vintage Fleece Hoodie', category: 'Hoodies', price: 155, originalPrice: 190,
    description: 'Distressed vintage fleece with VÉLO wordmark embroidery. Raw hem, split kangaroo pocket. Deliberately worn — effortlessly premium.',
    colors: [{ name:'Burgundy', hex:'#6b1f2a' },{ name:'Charcoal', hex:'#3d3d3d' }],
    sizes: ['S','M','L','XL'], stock: { S:7, M:12, L:9, XL:3 }, image: IMG.hoodie6,
    featured: false, newArrival: false, rating: 4.5, reviews: 78, badge: 'Sale',
  },

  // ── JACKETS ─────────────────────────────────────────────────
  {
    id: 'VV-005', name: 'Boulevard Tailored Jacket', category: 'Jackets', price: 345, originalPrice: null,
    description: 'Structured Italian wool-blend with clean notch lapels and a streamlined silhouette. The definitive VÉLO outerwear statement.',
    colors: [{ name:'Black', hex:'#1a1a1a' },{ name:'Charcoal', hex:'#3d3d3d' }],
    sizes: ['S','M','L','XL'], stock: { S:4, M:8, L:6, XL:2 }, image: IMG.jacket1,
    featured: true, newArrival: false, rating: 4.9, reviews: 45, badge: 'Premium',
  },
  {
    id: 'VV-006', name: 'Rue de Rivoli Jacket', category: 'Jackets', price: 320, originalPrice: null,
    description: 'Camel-toned structured jacket with refined notch lapels. Elevated Parisian styling meets urban sensibility.',
    colors: [{ name:'Tan', hex:'#c4a882' },{ name:'Stone', hex:'#b5a89a' }],
    sizes: ['S','M','L','XL'], stock: { S:3, M:6, L:5, XL:2 }, image: IMG.jacket2,
    featured: false, newArrival: true, rating: 4.8, reviews: 32, badge: 'New',
  },
  {
    id: 'VV-007', name: 'Studio Overshirt', category: 'Jackets', price: 265, originalPrice: 295,
    description: 'Relaxed overshirt in heavyweight cotton canvas. Versatile enough for the studio, streets, or weekend escapes. Tonal stitching throughout.',
    colors: [{ name:'Olive', hex:'#6b7c45' },{ name:'Stone', hex:'#b5a89a' },{ name:'Navy', hex:'#1c2b4a' }],
    sizes: ['S','M','L','XL'], stock: { S:7, M:14, L:11, XL:5 }, image: IMG.jacket3,
    featured: false, newArrival: false, rating: 4.7, reviews: 78, badge: 'Sale',
  },
  {
    id: 'VV-008', name: 'Vintage Coach Jacket', category: 'Jackets', price: 285, originalPrice: null,
    description: 'Nylon coach jacket with embroidered VÉLO wordmark. An archive-inspired silhouette, reimagined for the modern wardrobe. Ribbed cuffs and hem.',
    colors: [{ name:'Navy', hex:'#1c2b4a' },{ name:'Black', hex:'#1a1a1a' },{ name:'Wine Red', hex:'#9a0002' }],
    sizes: ['S','M','L','XL'], stock: { S:5, M:10, L:8, XL:4 }, image: IMG.jacket4,
    featured: false, newArrival: false, rating: 4.8, reviews: 56, badge: null,
  },
  {
    id: 'VV-008B', name: 'Moto Leather Jacket', category: 'Jackets', price: 480, originalPrice: null,
    description: 'Full-grain Italian lamb leather with asymmetric zipper and quilted shoulder panels. A VÉLO icon — aged to perfection with every wear.',
    colors: [{ name:'Black', hex:'#1a1a1a' },{ name:'Cognac', hex:'#9e6b3a' }],
    sizes: ['S','M','L','XL'], stock: { S:2, M:5, L:4, XL:1 }, image: IMG.jacket5,
    featured: true, newArrival: false, rating: 5.0, reviews: 28, badge: 'Premium',
  },
  {
    id: 'VV-008C', name: 'Boxy Wool Overcoat', category: 'Jackets', price: 420, originalPrice: 520,
    description: 'Double-faced virgin wool overcoat in a relaxed boxy cut. Clean minimal lines, hidden button placket, interior pocket.',
    colors: [{ name:'Camel', hex:'#c4a882' },{ name:'Black', hex:'#1a1a1a' },{ name:'Charcoal', hex:'#3d3d3d' }],
    sizes: ['S','M','L','XL'], stock: { S:3, M:6, L:5, XL:2 }, image: IMG.jacket6,
    featured: false, newArrival: true, rating: 4.9, reviews: 19, badge: 'New',
  },

  // ── TEES ────────────────────────────────────────────────────
  {
    id: 'VV-009', name: 'Minimal Statement Tee', category: 'Tees', price: 95, originalPrice: null,
    description: 'Heavyweight 240gsm white tee with tonal VÉLO embroidery. The foundation of any premium wardrobe. Boxy cut, pre-shrunk.',
    colors: [{ name:'White', hex:'#ffffff', light:true },{ name:'Off White', hex:'#f0ebe3', light:true }],
    sizes: ['S','M','L','XL'], stock: { S:20, M:30, L:25, XL:15 }, image: IMG.tee1,
    featured: false, newArrival: false, rating: 4.7, reviews: 312, badge: 'Bestseller',
  },
  {
    id: 'VV-010', name: 'Editorial Graphic Tee', category: 'Tees', price: 110, originalPrice: null,
    description: 'Screen-printed with a limited-edition VÉLO archive graphic. 220gsm organic cotton in a relaxed drop-shoulder cut. Each print numbered.',
    colors: [{ name:'Black', hex:'#1a1a1a' },{ name:'Cream', hex:'#f5efe8', light:true }],
    sizes: ['S','M','L','XL'], stock: { S:12, M:20, L:16, XL:8 }, image: IMG.tee2,
    featured: true, newArrival: true, rating: 4.8, reviews: 145, badge: 'New',
  },
  {
    id: 'VV-011', name: 'Retro Club Tee', category: 'Tees', price: 85, originalPrice: 105,
    description: 'Vintage-wash 220gsm tee with faded VÉLO typography across the chest. Relaxed fit, premium feel. Slightly cropped.',
    colors: [{ name:'Burgundy', hex:'#6b1f2a' },{ name:'Charcoal', hex:'#3d3d3d' }],
    sizes: ['S','M','L','XL'], stock: { S:15, M:22, L:18, XL:10 }, image: IMG.tee3,
    featured: false, newArrival: false, rating: 4.6, reviews: 198, badge: 'Sale',
  },
  {
    id: 'VV-012', name: 'VÉLO Archive Tee', category: 'Tees', price: 90, originalPrice: null,
    description: 'An ode to the VÉLO archives. Tone-on-tone logo printed on luxurious 250gsm pima cotton. Subtle, elevated, timeless.',
    colors: [{ name:'Cream', hex:'#f5efe8', light:true },{ name:'Stone', hex:'#b5a89a' }],
    sizes: ['S','M','L','XL'], stock: { S:18, M:25, L:20, XL:12 }, image: IMG.tee4,
    featured: false, newArrival: false, rating: 4.7, reviews: 89, badge: null,
  },
  {
    id: 'VV-012B', name: 'Heritage Pocket Tee', category: 'Tees', price: 75, originalPrice: null,
    description: 'Classic chest-pocket tee in 200gsm combed cotton. A wardrobe staple elevated with a minimalist VÉLO label. Washed for softness.',
    colors: [{ name:'White', hex:'#ffffff', light:true },{ name:'Navy', hex:'#1c2b4a' },{ name:'Olive', hex:'#6b7c45' }],
    sizes: ['S','M','L','XL'], stock: { S:22, M:35, L:28, XL:18 }, image: IMG.tee5,
    featured: false, newArrival: false, rating: 4.5, reviews: 267, badge: 'Bestseller',
  },
  {
    id: 'VV-012C', name: 'Longline Premium Tee', category: 'Tees', price: 105, originalPrice: 125,
    description: 'Extended-length 260gsm tee with side splits. The modern proportions of street luxe — wearable alone or layered under outerwear.',
    colors: [{ name:'Black', hex:'#1a1a1a' },{ name:'Stone', hex:'#b5a89a' },{ name:'Wine Red', hex:'#9a0002' }],
    sizes: ['S','M','L','XL'], stock: { S:11, M:18, L:14, XL:8 }, image: IMG.tee6,
    featured: false, newArrival: true, rating: 4.8, reviews: 52, badge: 'New',
  },

  // ── ACCESSORIES ─────────────────────────────────────────────
  {
    id: 'VV-013', name: 'Monaco Retro Sunglasses', category: 'Accessories', price: 155, originalPrice: null,
    description: 'Handcrafted acetate frames with polarized lenses. Inspired by the golden age of motorsport and Mediterranean cool. Case included.',
    colors: [{ name:'Tortoise', hex:'#7b4e24' },{ name:'Black', hex:'#1a1a1a' }],
    sizes: ['One Size'], stock: { 'One Size':20 }, image: IMG.acc1,
    featured: false, newArrival: false, rating: 4.9, reviews: 67, badge: 'Premium',
  },
  {
    id: 'VV-014', name: 'Club Racer Sunglasses', category: 'Accessories', price: 125, originalPrice: 150,
    description: 'Sleek lightweight acetate with mirrored polarized lenses. Clean lines for the urban explorer. UV400 protection.',
    colors: [{ name:'Black', hex:'#1a1a1a' }],
    sizes: ['One Size'], stock: { 'One Size':15 }, image: IMG.acc2,
    featured: false, newArrival: true, rating: 4.7, reviews: 43, badge: 'Sale',
  },
  {
    id: 'VV-015', name: 'Bastille Slim Wallet', category: 'Accessories', price: 185, originalPrice: null,
    description: 'Full-grain Italian vegetable-tanned leather. Develops a rich patina with use. Holds 6 cards + cash. Embossed VÉLO monogram.',
    colors: [{ name:'Black', hex:'#1a1a1a' },{ name:'Cognac', hex:'#9e6b3a' }],
    sizes: ['One Size'], stock: { 'One Size':12 }, image: IMG.acc3,
    featured: false, newArrival: false, rating: 4.8, reviews: 78, badge: 'Premium',
  },
  {
    id: 'VV-016', name: 'Marais Card Holder', category: 'Accessories', price: 95, originalPrice: null,
    description: 'Minimalist card holder in smooth full-grain calf leather. Three card slots, one slip pocket. An everyday luxury essential.',
    colors: [{ name:'Cognac', hex:'#9e6b3a' },{ name:'Black', hex:'#1a1a1a' },{ name:'Tan', hex:'#c4a882' }],
    sizes: ['One Size'], stock: { 'One Size':25 }, image: IMG.acc4,
    featured: false, newArrival: false, rating: 4.7, reviews: 112, badge: null,
  },
  {
    id: 'VV-016B', name: 'Canvas Tote Bag', category: 'Accessories', price: 115, originalPrice: null,
    description: 'Heavy-duty waxed canvas tote with leather handles and brass hardware. VÉLO wordmark embossed on interior leather patch. Fits a 15" laptop.',
    colors: [{ name:'Olive', hex:'#6b7c45' },{ name:'Black', hex:'#1a1a1a' }],
    sizes: ['One Size'], stock: { 'One Size':18 }, image: IMG.acc5,
    featured: false, newArrival: true, rating: 4.8, reviews: 34, badge: 'New',
  },
  {
    id: 'VV-016C', name: 'Cologne No. 5 — VÉLO', category: 'Accessories', price: 145, originalPrice: null,
    description: 'An olfactory signature: bergamot, vetiver, cedarwood, and a musky dry-down. 50ml eau de toilette. Designed for the discerning urbanite.',
    colors: [{ name:'Amber', hex:'#c4a882' }],
    sizes: ['One Size'], stock: { 'One Size':10 }, image: IMG.acc6,
    featured: true, newArrival: false, rating: 4.9, reviews: 41, badge: 'Premium',
  },
];

export default products;

export interface FlowerRecommendation {
  id: string;
  name: string;
  imageUrl: string;
  meaning: string;
  whyThisFlower: string;
  tags: string[];
  priceDisplay?: string;
}

// Status + Situation → top recommended flower IDs (priority boost)
// Format: "Status::Situation" -> flower id
const PRIORITY_MAP: Record<string, string> = {
  // Partner
  "Partner/GF/BF::Anniversary":           "classic-rose",
  "Partner/GF/BF::First Date":            "lacy-lily",
  "Partner/GF/BF::Minta Maaf":            "single-tulip",
  "Partner/GF/BF::Surprise Tanpa Alasan": "blue-roses",
  "Partner/GF/BF::Pengen aja":            "lilac-lily-single",
  // Bestie
  "Bestie/Sahabat::Ulang Tahun":          "bunny-tiger-lily",
  "Bestie/Sahabat::Wisuda":               "themed",
  "Bestie/Sahabat::Surprise Tanpa Alasan":"cookies-flower",
  "Bestie/Sahabat::Pengen aja":           "lego-roses",
  // Orang Tua
  "Orang Tua::Ulang Tahun":               "lacy-lily",
  "Orang Tua::Cepat Sembuh":              "single-tulip",
  "Orang Tua::Pengen aja":                "classic-rose",
  // Guru/Dosen
  "Guru/Dosen::Wisuda":                   "custom-flower-makeup",
  "Guru/Dosen::Pengen aja":               "lilac-lily-single",
  // Diri Sendiri
  "Diri Sendiri::Anniversary":            "lacy-lily",
  "Diri Sendiri::Pengen aja":             "custom-skincare",
  "Diri Sendiri::Ulang Tahun":            "custom-makeup-skincare",
  // HTS
  "HTS::First Date":                      "lacy-lily",
  "HTS::Pengen aja":                      "lilac-lily-single",
  "HTS::Surprise Tanpa Alasan":           "blue-roses",
  "HTS::Anniversary":                     "classic-rose",
  // Istri/Suami
  "Istri/Suami::Anniversary":             "classic-rose",
  "Istri/Suami::Pengen aja":              "lacy-lily",
  "Istri/Suami::Ulang Tahun":             "bunny-tiger-lily",
  "Istri/Suami::Surprise Tanpa Alasan":   "blue-roses",
};

export const FLOWER_DATA: FlowerRecommendation[] = [
  {
    id: "blue-roses",
    name: "Blue Roses Bouquet",
    imageUrl: "/bluerosesbouquet.jpg",
    meaning: "Misteri, keunikan, dan kemustahilan yang menjadi nyata.",
    whyThisFlower: "Kesan yang Unik/Berkesan, cocok untuk vibe Midnight Blue dan Sea Salt.",
    tags: [
      "Midnight Blue", "Ash Grey", "R&B", "Jazz", "Sea Salt", "Above 200k", "Unik/Berkesan",
      "Partner/GF/BF", "Surprise Tanpa Alasan",
    ],
    priceDisplay: "300k",
  },
  {
    id: "bunny-tiger-lily",
    name: "Bunny Tiger Lily Bouquet",
    imageUrl: "/bunnytigerlilybouquet.jpg",
    meaning: "Keberanian, kekayaan, dan pesona yang menggemaskan.",
    whyThisFlower: "Sangat Lucu/Gemas, cocok buat momen ceria dan penuh semangat.",
    tags: [
      "Mustard Yellow", "Terracotta", "Pop", "Indie", "Matcha", "Above 200k", "Lucu/Gemas",
      "Bestie/Sahabat", "Ulang Tahun",
    ],
    priceDisplay: "250k",
  },
  {
    id: "classic-rose",
    name: "Classic Rose Bouquet",
    imageUrl: "/classicrosebouquet.jpg",
    meaning: "Simbol romansa abadi dan kemewahan.",
    whyThisFlower: "Pilihan paling Elegan/Mewah untuk momen yang benar-benar tak terlupakan.",
    tags: [
      "Charcoal Black", "Midnight Blue", "Classic", "Jazz", "Woody", "Floral", "100k-200k", "Elegan/Mewah",
      "Partner/GF/BF", "Orang Tua", "Anniversary",
    ],
    priceDisplay: "120k",
  },
  {
    id: "cookies-flower",
    name: "Cookies and Flower Basket",
    imageUrl: "/cookiesandflowerbasket.jpg",
    meaning: "Kehangatan, persahabatan, dan rasa manis dalam hidup.",
    whyThisFlower: "Kesan Lucu/Gemas dan sangat fungsional, siapa yang tidak suka cookies?",
    tags: [
      "Earthy Brown", "Sand Beige", "Indie", "Pop", "Coffee", "Under 100k", "Lucu/Gemas",
      "Bestie/Sahabat", "Surprise Tanpa Alasan",
    ],
    priceDisplay: "75k",
  },
  {
    id: "custom-flower-makeup",
    name: "Custom Flower Language Bouquet",
    imageUrl: "/customflowerlanguagebouquet.jpg",
    meaning: "Pesan tersembunyi yang disesuaikan khusus untuknya.",
    whyThisFlower: "Sangat Unik/Berkesan karena dirangkai khusus dengan BUNDLE makeup favoritnya.",
    tags: [
      "Ash Grey", "Sage Green", "Hip-hop", "R&B", "Vanilla", "Under 100k", "Unik/Berkesan",
      "Guru/Dosen", "Wisuda",
    ],
    priceDisplay: "70k",
  },
  {
    id: "custom-makeup-skincare",
    name: "Custom Makeup (BUNDLE)",
    imageUrl: "/custommakeupbouquet.jpg",
    meaning: "Perhatian dan perawatan tulus untuk kesehariannya.",
    whyThisFlower: "Kesan Unik/Berkesan, sangat personal dan menunjukkan betapa kamu peduli padanya.",
    tags: [
      "Sand Beige", "Charcoal Black", "R&B", "Pop", "White Musk", "100k-200k", "Unik/Berkesan",
      "Diri Sendiri", "Istri/Suami", "Ulang Tahun",
    ],
    priceDisplay: "150k (exclude makeup)",
  },
  {
    id: "custom-skincare",
    name: "Custom Skincare Bouquet",
    imageUrl: "/customskincarebouquet.jpg",
    meaning: "Simbol perlindungan, kelembutan, dan cinta diri.",
    whyThisFlower: "Simpel/Tulus, hadiah yang pasti terpakai dan sangat bermanfaat.",
    tags: [
      "Sage Green", "Earthy Brown", "Rap", "Indie", "Citrus", "100k-200k", "Simpel/Tulus",
      "Diri Sendiri", "Pengen aja",
    ],
    priceDisplay: "150k (exclude skincare)",
  },
  {
    id: "lacy-lily",
    name: "Lacy Lily Bouquet",
    imageUrl: "/lacylilybouquet.jpg",
    meaning: "Keanggunan yang suci dan ketulusan hati.",
    whyThisFlower: "Sangat Elegan/Mewah, dibalut renda yang membuatnya tampil premium.",
    tags: [
      "Terracotta", "Forest Green", "Jazz", "Classic", "Sandalwood", "Floral", "Under 100k", "Elegan/Mewah",
      "Partner/GF/BF", "First Date", "Orang Tua", "Anniversary", "Diri Sendiri", "HTS", "Istri/Suami",
    ],
    priceDisplay: "90k",
  },
  {
    id: "lego-roses",
    name: "Lego Roses Bouquet",
    imageUrl: "/legorosesbouquet.jpg",
    meaning: "Cinta yang dibangun perlahan dan bertahan selamanya.",
    whyThisFlower: "Kesan Lucu/Gemas dan awet sepanjang masa karena terbuat dari balok-balok kokoh.",
    tags: [
      "Forest Green", "Mustard Yellow", "Hipdut", "Rock", "Citrus", "100k-200k", "Lucu/Gemas",
      "Bestie/Sahabat", "Pengen aja",
    ],
    priceDisplay: "170k",
  },
  {
    id: "lilac-lily-single",
    name: "Lilac Lily Single Bouquet",
    imageUrl: "/lilaclilysinglebouquet.jpg",
    meaning: "Pesona anggun, kemurnian, dan ketenangan jiwa.",
    whyThisFlower: "Sangat Simpel/Tulus, menunjukkan bahwa hal sederhana bisa sangat bermakna.",
    tags: [
      "Ash Grey", "Sage Green", "Pop", "Indie", "Vanilla", "Floral", "Under 100k", "Simpel/Tulus",
      "Partner/GF/BF", "Guru/Dosen", "HTS", "Pengen aja",
    ],
    priceDisplay: "25k",
  },
  {
    id: "single-tulip",
    name: "Single Tulip Bouquet",
    imageUrl: "/singletulipbouquet.jpg",
    meaning: "Pengakuan cinta yang murni dan tulus.",
    whyThisFlower: "Sangat Simpel/Tulus, tanpa basa-basi untuk menyampaikan rasa sayangmu.",
    tags: [
      "Sage Green", "Earthy Brown", "Indie", "Classic", "Matcha", "Floral", "Under 100k", "Simpel/Tulus",
      "Partner/GF/BF", "Minta Maaf", "Cepat Sembuh", "Orang Tua",
    ],
    priceDisplay: "20k",
  },
  {
    id: "themed",
    name: "Themed Bouquet",
    imageUrl: "/themedbouquet.jpg",
    meaning: "Perayaan karakter dan keunikan personal.",
    whyThisFlower: "Kesan Unik/Berkesan, karena disesuaikan sepenuhnya dengan tema kesukaannya.",
    tags: [
      "Mustard Yellow", "Charcoal Black", "Rock", "Rap", "Sandalwood", "Under 100k", "Unik/Berkesan",
      "Bestie/Sahabat", "Wisuda",
    ],
    priceDisplay: "20k",
  },
];

export function getFlowerRecommendation(
  answers: Record<string, string>
): FlowerRecommendation | null {
  const status = answers["status"] ?? "";
  const situation = answers["situation"] ?? "";
  const budget = answers["budget"];

  let availableFlowers = FLOWER_DATA;
  if (budget) {
    const filtered = FLOWER_DATA.filter((flower) => flower.tags.includes(budget));
    if (filtered.length > 0) {
      availableFlowers = filtered;
    }
  }

  // 1. Check priority map first (Status + Situation combo)
  const priorityKey = `${status}::${situation}`;
  const priorityId = PRIORITY_MAP[priorityKey];
  if (priorityId) {
    // Only use priority if it matches the budget constraint
    const priority = availableFlowers.find((f) => f.id === priorityId);
    if (priority) return priority;
  }

  // 2. Fallback: tag scoring across all available answers
  const answerValues = Object.values(answers);
  let bestMatch: FlowerRecommendation | null = null;
  let highestScore = -1;

  for (const flower of availableFlowers) {
    let score = 0;
    for (const val of answerValues) {
      if (flower.tags.includes(val)) score++;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = flower;
    }
  }

  return bestMatch ?? availableFlowers[0];
}

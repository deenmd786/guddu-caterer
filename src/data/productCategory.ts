const productCategory = [
  {
    id: 1,
    label: "Starters",
    value: "starters",
    subcategories: [
      { id: 1, label: "Samosa", value: "samosa" },
      { id: 2, label: "Spring Roll", value: "spring-roll" },
      { id: 3, label: "Kebab", value: "kebab" },
      { id: 4, label: "Tikka", value: "tikka" },
      { id: 5, label: "Vada", value: "vada" },
      { id: 6, label: "Pakoda/Fritters", value: "pakoda" },
      { id: 7, label: "Cutlets", value: "cutlets" },
      { id: 8, label: "Mini Bites", value: "mini-bites" },
      { id: 9, label: "Gravy Items", value: "gravy-items" },
    ],
  },
  {
    "id": 2,
    "label": "Salads",
    "value": "salads",
    "subcategories": [
      { "id": 1, "label": "Fresh Green & Vegetable Salads", "value": "fresh-green-vegetable-salads" },
      { "id": 2, "label": "Fruit-Based Salads", "value": "fruit-based-salads" },
      { "id": 3, "label": "Legume & Grain Salads", "value": "legume-grain-salads" },
      { "id": 4, "label": "Yogurt-Based (Raitas)", "value": "yogurt-based-salads" },
      { "id": 5, "label": "Mixed & Fusion Salads", "value": "mixed-fusion-salads" },
      { "id": 6, "label": "Chatney (ketchup)", "value": "chatney" },
    ]
  },
  {
    id: 3,
    label: "Main Course",
    value: "main-course",
    subcategories: [
      { id: 1, label: "Paneer-Based Dishes", value: "paneer-based-dishes" },
      { id: 2, label: "Mixed Vegetable Dishes", value: "mixed-vegetable-dishes" },
      { id: 3, label: "Legume-Based Curries & Dals", value: "legume-based-curries-dals" },
      { id: 4, label: "Potato-Based Dishes", value: "potato-based-dishes" },
      { id: 5, label: "Seasonal Vegetables", value: "okra-bhindi" },
      { id: 6, label: "Yogurt & Gravy Specials", value: "yogurt-gravy-specials" },
      { id: 7, label: "Breads and Rice", value: "breads-and-rice" },
    ],
  },
  {
    id: 4,
    label: "Live Food Stations",
    value: "live-food-stations",
    subcategories: [
      { id: 1, label: "Dosa Stations", value: "dosa-stations" },
      { id: 2, label: "Pav Stations", value: "pav-stations" },
      { id: 3, label: "Chaat Stations", value: "chaat-stations" },
      { id: 4, label: "Fruit Chaat Stations", value: "fruit-chaat-stations" },
      { id: 5, label: "Chinese Noodles Stations", value: "chinese-noodles-stations" },
    ],
  },
  {
  id: 5,
  label: "Desserts",
  value: "desserts",
  subcategories: [
    { id: 1, label: "Indian Sweets", value: "indian-sweets" },
    { id: 2, label: "Frozen Desserts", value: "frozen-desserts" },
    { id: 3, label: "Halwas & Kheer", value: "halwas-puddings" },
  ]
},
{
  id: 6,
  label: "Beverages",
  value: "beverages",
  subcategories: [
    { id: 1, label: "Soft Drinks", value: "soft-drinks" },
    { id: 2, label: "Mocktails", value: "mocktails" },
    { id: 3, label: "Tea & Coffee", value: "tea-coffee" },
  ],
}

];



const regions = [
  { id: 1, label: "North India", value: "north-india" },
  { id: 2, label: "Pan India", value: "pan-india" },
  { id: 3, label: "South India", value: "south-india" },
  { id: 4, label: "West India", value: "west-india" },
  { id: 5, label: "East India", value: "east-india" },
  { id: 6, label: "Central India", value: "central-india" },
  { id: 7, label: "Indo-Chinese Fusion", value: "indo-chinese-fusion" },
  { id: 8, label: "Gujarat", value: "gujarat" },
  { id: 9, label: "Maharashtra", value: "maharashtra" },
  { id: 10, label: "Punjab", value: "punjab" },
  { id: 10, label: "Rajasthan", value: "rajasthan" },
];


const cookingMethods = [
  { id: 1, label: "Grilled", value: "grilled" },
  { id: 2, label: "Fried", value: "fried" },
  { id: 3, label: "Tandoor", value: "tandoor" },
  { id: 4, label: "Steamed", value: "steamed" },
  { id: 5, label: "Roasted", value: "roasted" },
  { id: 6, label: "Boiled", value: "boiled" },
  { id: 7, label: "Sauté", value: "saute" },
  { id: 8, label: "Raw", value: "raw" },
  { id: 9, label: "Blanched", value: "blanched" },
  { id: 10, label: "Frozen", value: "Frozen" },
  { id: 11, label: "Chilled", value: "chilled" }, 
  { id: 11, label: "Blended", value: "blended" }, 
];




export { productCategory, regions, cookingMethods };
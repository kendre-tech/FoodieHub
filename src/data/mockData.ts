import { FoodItem, Category, Restaurant, Coupon, SiteSettings, DeliveryPartner, Order } from '../types';

export const LATUR_DELIVERY_AREAS = [
  'Shivaji Chowk',
  'Gandhi Chowk',
  'Ausa Road',
  'Barshi Road',
  'Nanded Road',
  'MIDC',
  'Moti Nagar',
  'Sawe Wadi',
] as const;

export const DEFAULT_LATUR_LOCATION = {
  city: 'Latur',
  state: 'Maharashtra',
  country: 'India',
  pincode: '413512',
  defaultArea: 'Shivaji Chowk',
  formatted: 'Shivaji Chowk, Latur, Maharashtra, India (413512)',
  lat: 18.4088,
  lng: 76.5604,
};

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'HoodiHub',
  creatorName: 'Dhanashri Kendre',
  tagline: 'Craving delicious food in Latur? Fresh, hot & lightning fast across Latur city!',
  contactPhone: '+91 98201 45890',
  contactEmail: 'contact@hoodihub.com',
  address: 'Shivaji Chowk, Latur, Maharashtra 413512, India',
  deliveryCharge: 50,
  freeDeliveryThreshold: 499,
  taxPercentage: 5,
  currencySymbol: '₹',
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'Cheesy, stone-baked pizzas with gourmet toppings and authentic crusts.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    itemCount: 8,
  },
  {
    id: 'burgers',
    name: 'Burgers',
    description: 'Juicy patties, melted cheese, crisp lettuce, and toasted brioche buns.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    itemCount: 7,
  },
  {
    id: 'chinese',
    name: 'Chinese',
    description: 'Steaming momos, wok-tossed noodles, spicy gravies, and crunchy rolls.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80',
    itemCount: 8,
  },
  {
    id: 'indian-food',
    name: 'Indian Food',
    description: 'Aromatic gravies, rich paneer specials, royal biryanis, and comforting thalis.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80',
    itemCount: 9,
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    description: 'Toasted gourmet sandwiches layered with cheese, fresh veggies, and spicy chutneys.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
    itemCount: 5,
  },
  {
    id: 'pasta',
    name: 'Pasta',
    description: 'Al dente pasta tossed in rich Alfredo, tangy marinara, and creamy blush sauces.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    itemCount: 5,
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Golden fries, crispy cheese balls, buttery garlic bread, and savory bites.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80',
    itemCount: 6,
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Thick creamy milkshakes, cold coffee, iced teas, and refreshing mocktails.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    itemCount: 7,
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Decadent chocolate brownies, molten lava cake, creamy ice creams, and pastries.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    itemCount: 7,
  },
];

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  // Pizza (1 - 8)
  {
    id: 'food-1',
    number: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    ratingCount: 342,
    description: 'Classic stone-baked hand-stretched crust topped with rich San Marzano tomato sauce, fresh mozzarella cheese, aromatic basil leaves, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '20-25 mins',
    calories: '650 kcal',
    tags: ['Best Seller', 'Classic', 'Cheese'],
    reviews: [
      { id: 'r1', userName: 'Aarav Sharma', rating: 5, date: '2 days ago', comment: 'Perfect crispy crust and high quality mozzarella. Arrived steaming hot!' },
      { id: 'r2', userName: 'Pooja Hegde', rating: 4.5, date: '1 week ago', comment: 'Authentic Italian taste in Hoodi. Definitely ordering again.' }
    ]
  },
  {
    id: 'food-2',
    number: 2,
    name: 'Farmhouse Pizza',
    category: 'Pizza',
    price: 299,
    originalPrice: 359,
    rating: 4.7,
    ratingCount: 289,
    description: 'Loaded with farm-fresh bell peppers, sweet corn kernels, tender sliced mushrooms, juicy diced tomatoes, and premium mozzarella on a golden crust.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '22-26 mins',
    calories: '710 kcal',
    tags: ['Fresh Veggies', 'Chef Special'],
    reviews: [
      { id: 'r3', userName: 'Vikram Mehta', rating: 5, date: '3 days ago', comment: 'Crunchy veggies and the cheese pull was unbelievable!' }
    ]
  },
  {
    id: 'food-3',
    number: 3,
    name: 'Cheese Burst Pizza',
    category: 'Pizza',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    ratingCount: 512,
    description: 'Double layer crust filled with molten creamy liquid cheese, topped with golden cheddar, mozzarella, and herb seasoning.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '25-30 mins',
    calories: '890 kcal',
    tags: ['Cheese Burst', 'Indulgent'],
    reviews: [
      { id: 'r4', userName: 'Sneha Patel', rating: 5, date: 'Yesterday', comment: 'The cheese explosion in every bite is pure heaven.' }
    ]
  },
  {
    id: 'food-4',
    number: 4,
    name: 'Paneer Tikka Pizza',
    category: 'Pizza',
    price: 329,
    originalPrice: 389,
    rating: 4.8,
    ratingCount: 410,
    description: 'Tandoori spiced paneer cubes, roasted bell peppers, red onions, and coriander with spicy makhani drizzle on baked mozzarella.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '22-28 mins',
    calories: '780 kcal',
    tags: ['Desi Twist', 'Spicy Paneer'],
    reviews: [
      { id: 'r5', userName: 'Rohit Verma', rating: 5, date: '4 days ago', comment: 'Best fusion pizza in Mahadevapura Hoodi area.' }
    ]
  },
  {
    id: 'food-5',
    number: 5,
    name: 'Mexican Pizza',
    category: 'Pizza',
    price: 319,
    originalPrice: 379,
    rating: 4.6,
    ratingCount: 198,
    description: 'Zesty Mexican salsa sauce, pickled jalapenos, sweet corn, black beans, red paprika, and Mexican cheese blend.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '20-25 mins',
    calories: '730 kcal',
    tags: ['Zesty', 'Jalapeno'],
    reviews: [
      { id: 'r6', userName: 'Karan Joshi', rating: 4, date: '5 days ago', comment: 'Spicy and tangy, loved the jalapeno kick.' }
    ]
  },
  {
    id: 'food-6',
    number: 6,
    name: 'Veg Supreme Pizza',
    category: 'Pizza',
    price: 339,
    originalPrice: 399,
    rating: 4.7,
    ratingCount: 245,
    description: 'The ultimate garden pizza: black olives, crisp capsicum, golden corn, baby corn, mushrooms, and double cheese.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '22-26 mins',
    calories: '750 kcal',
    tags: ['Loaded', 'Supreme'],
    reviews: [
      { id: 'r7', userName: 'Ananya Roy', rating: 5, date: '1 week ago', comment: 'Rich topping quantity, really good crust.' }
    ]
  },
  {
    id: 'food-7',
    number: 7,
    name: 'Peri Peri Pizza',
    category: 'Pizza',
    price: 319,
    originalPrice: 369,
    rating: 4.8,
    ratingCount: 310,
    description: 'Dusted with fiery African bird\'s eye peri-peri seasoning, crunchy paprika, red onions, and creamy herb drizzle.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '20-24 mins',
    calories: '720 kcal',
    tags: ['Spicy', 'Peri Peri'],
    reviews: [
      { id: 'r8', userName: 'Harsh Vardhan', rating: 5, date: '2 days ago', comment: 'Hot and flavorful peri peri kick!' }
    ]
  },
  {
    id: 'food-8',
    number: 8,
    name: 'Double Cheese Pizza',
    category: 'Pizza',
    price: 279,
    originalPrice: 329,
    rating: 4.9,
    ratingCount: 388,
    description: 'Loaded with a heavy blanket of pure Wisconsin mozzarella and golden English cheddar on garlic-infused herb crust.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '20-25 mins',
    calories: '820 kcal',
    tags: ['Extra Cheese', 'Comfort Food'],
    reviews: [
      { id: 'r9', userName: 'Divya Nair', rating: 5, date: '3 days ago', comment: 'Cheese lover dream come true.' }
    ]
  },

  // Burgers (9 - 15)
  {
    id: 'food-9',
    number: 9,
    name: 'Classic Veg Burger',
    category: 'Burgers',
    price: 129,
    originalPrice: 159,
    rating: 4.6,
    ratingCount: 420,
    description: 'Crispy seasoned vegetable patty, crunchy iceberg lettuce, tomato slice, and our secret chef mayo in a soft toasted sesame bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '15-20 mins',
    calories: '450 kcal',
    tags: ['Classic', 'Value Pick'],
    reviews: [
      { id: 'r10', userName: 'Aditya Rao', rating: 4.5, date: 'Yesterday', comment: 'Crisp patty and fresh soft bun.' }
    ]
  },
  {
    id: 'food-10',
    number: 10,
    name: 'Paneer Burger',
    category: 'Burgers',
    price: 179,
    originalPrice: 219,
    rating: 4.8,
    ratingCount: 390,
    description: 'Thick marinated block of fresh cottage cheese coated in golden panko crumbs, fried till crunchy, layered with mint mayo.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '18-22 mins',
    calories: '560 kcal',
    tags: ['Paneer', 'Crunchy'],
    reviews: [
      { id: 'r11', userName: 'Kavita Singh', rating: 5, date: '3 days ago', comment: 'Juicy paneer inside and super crispy outside.' }
    ]
  },
  {
    id: 'food-11',
    number: 11,
    name: 'Cheese Burger',
    category: 'Burgers',
    price: 159,
    originalPrice: 189,
    rating: 4.7,
    ratingCount: 310,
    description: 'Spiced herb potato & veggie patty topped with two thick slices of melted cheddar cheese, caramelized onions, and smoky BBQ relish.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-20 mins',
    calories: '520 kcal',
    tags: ['Cheesy', 'Smoky'],
    reviews: [
      { id: 'r12', userName: 'Tarun G', rating: 5, date: '5 days ago', comment: 'Melted cheese makes it so creamy and delicious.' }
    ]
  },
  {
    id: 'food-12',
    number: 12,
    name: 'Aloo Tikki Burger',
    category: 'Burgers',
    price: 99,
    originalPrice: 129,
    rating: 4.5,
    ratingCount: 650,
    description: 'Desi street style spiced potato patty with cumin, green peas, sweet tamarind drizzle, spicy mint chutney, and onion rings.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '12-15 mins',
    calories: '390 kcal',
    tags: ['Pocket Friendly', 'Desi Favorite'],
    reviews: [
      { id: 'r13', userName: 'Meera Iyer', rating: 5, date: '2 days ago', comment: 'Brought back nostalgic memories. Great price!' }
    ]
  },
  {
    id: 'food-13',
    number: 13,
    name: 'Crispy Veg Burger',
    category: 'Burgers',
    price: 149,
    originalPrice: 179,
    rating: 4.7,
    ratingCount: 275,
    description: 'Ultra-crispy golden crumbed corn and mixed vegetable patty paired with thousand island dressing and pickled gherkins.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-18 mins',
    calories: '480 kcal',
    tags: ['Super Crisp', 'Crunch'],
    reviews: [
      { id: 'r14', userName: 'Deepak N', rating: 4.5, date: '6 days ago', comment: 'Stays crunchy even after delivery.' }
    ]
  },
  {
    id: 'food-14',
    number: 14,
    name: 'Peri Peri Burger',
    category: 'Burgers',
    price: 169,
    originalPrice: 199,
    rating: 4.8,
    ratingCount: 320,
    description: 'Fiery peri-peri coated vegetable patty with spicy garlic aioli, sliced jalapenos, and crisp purple cabbage slaw.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '16-20 mins',
    calories: '495 kcal',
    tags: ['Spicy', 'Peri Peri'],
    reviews: [
      { id: 'r15', userName: 'Rajesh K', rating: 5, date: 'Yesterday', comment: 'Proper spicy kick without overpowering the taste.' }
    ]
  },
  {
    id: 'food-15',
    number: 15,
    name: 'Double Patty Burger',
    category: 'Burgers',
    price: 219,
    originalPrice: 269,
    rating: 4.9,
    ratingCount: 290,
    description: 'Double stacked golden crispy patties sandwiched with double cheese slices, grilled onion, lettuce, and barbecue sauce.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '18-24 mins',
    calories: '680 kcal',
    tags: ['Monster Size', 'Double Patty'],
    reviews: [
      { id: 'r16', userName: 'Chetan M', rating: 5, date: '3 days ago', comment: 'Huge burger! Very filling and satisfying meal.' }
    ]
  },

  // Chinese (16 - 23)
  {
    id: 'food-16',
    number: 16,
    name: 'Veg Momos',
    category: 'Chinese',
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    ratingCount: 680,
    description: '6 pcs authentic Tibetan style steamed dumplings stuffed with finely minced cabbage, carrots, bell peppers, garlic, and served with spicy red chili chutney.',
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '15-18 mins',
    calories: '280 kcal',
    tags: ['Steamed', 'Best Seller'],
    reviews: [
      { id: 'r17', userName: 'Priya Sundaram', rating: 5, date: '2 days ago', comment: 'Thin translucent skin and bursting with flavour. Chutney is fire!' }
    ]
  },
  {
    id: 'food-17',
    number: 17,
    name: 'Fried Momos',
    category: 'Chinese',
    price: 149,
    originalPrice: 179,
    rating: 4.7,
    ratingCount: 430,
    description: '6 pcs golden crisp fried dumplings filled with shredded spiced veggies, served with tangy garlic mayonnaise and spicy dip.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-20 mins',
    calories: '380 kcal',
    tags: ['Crispy', 'Snack'],
    reviews: [
      { id: 'r18', userName: 'Nitin Paul', rating: 5, date: '4 days ago', comment: 'Super crunchy crust with warm soft filling.' }
    ]
  },
  {
    id: 'food-18',
    number: 18,
    name: 'Paneer Momos',
    category: 'Chinese',
    price: 169,
    originalPrice: 199,
    rating: 4.9,
    ratingCount: 395,
    description: '6 pcs dumplings packed with seasoned malai paneer, spring onions, ginger, and subtle Sichuan peppers. Steamed to perfection.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '15-20 mins',
    calories: '340 kcal',
    tags: ['Paneer', 'Delicate'],
    reviews: [
      { id: 'r19', userName: 'Shweta K', rating: 5, date: 'Yesterday', comment: 'Rich paneer filling, very well seasoned.' }
    ]
  },
  {
    id: 'food-19',
    number: 19,
    name: 'Veg Manchurian',
    category: 'Chinese',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    ratingCount: 350,
    description: 'Crisp vegetable dumplings simmered in an aromatic dark soy, ginger, garlic, and fresh green chili gravy with scallions.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '18-22 mins',
    calories: '420 kcal',
    tags: ['Indo-Chinese', 'Saucy'],
    reviews: [
      { id: 'r20', userName: 'Sanjay Reddy', rating: 5, date: '3 days ago', comment: 'Goes amazingly well with fried rice or noodles.' }
    ]
  },
  {
    id: 'food-20',
    number: 20,
    name: 'Hakka Noodles',
    category: 'Chinese',
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    ratingCount: 520,
    description: 'Wok-tossed long wheat noodles tossed with shredded cabbage, bell peppers, carrots, spring onions, and light soya sauce.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '15-20 mins',
    calories: '440 kcal',
    tags: ['Wok Fresh', 'Best Seller'],
    reviews: [
      { id: 'r21', userName: 'Anil Desai', rating: 5, date: 'Yesterday', comment: 'Non-oily, flavorful wok aroma and perfectly cooked.' }
    ]
  },
  {
    id: 'food-21',
    number: 21,
    name: 'Schezwan Noodles',
    category: 'Chinese',
    price: 199,
    originalPrice: 239,
    rating: 4.7,
    ratingCount: 410,
    description: 'Fiery wok-tossed noodles coated in authentic homemade Sichuan pepper paste, garlic, fresh celery, and colorful garden veggies.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '16-20 mins',
    calories: '470 kcal',
    tags: ['Spicy Schezwan', 'Hot'],
    reviews: [
      { id: 'r22', userName: 'Gaurav Sen', rating: 4.5, date: '4 days ago', comment: 'Proper spicy street style schezwan.' }
    ]
  },
  {
    id: 'food-22',
    number: 22,
    name: 'Veg Fried Rice',
    category: 'Chinese',
    price: 179,
    originalPrice: 219,
    rating: 4.6,
    ratingCount: 380,
    description: 'Fragrant basmati rice wok-charred with diced carrots, french beans, sweet corn, garlic oil, and crushed white pepper.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-18 mins',
    calories: '410 kcal',
    tags: ['Aromatic', 'Stir Fry'],
    reviews: [
      { id: 'r23', userName: 'Manish Kumar', rating: 5, date: '5 days ago', comment: 'Light and fragrant grains, loved it.' }
    ]
  },
  {
    id: 'food-23',
    number: 23,
    name: 'Spring Rolls',
    category: 'Chinese',
    price: 159,
    originalPrice: 189,
    rating: 4.8,
    ratingCount: 310,
    description: '4 golden crisp pastry rolls filled with seasoned Asian veggies and vermicelli, served with sweet spicy dipping sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-18 mins',
    calories: '320 kcal',
    tags: ['Crispy Rolls', 'Appetizer'],
    reviews: [
      { id: 'r24', userName: 'Rashmi B', rating: 5, date: '1 week ago', comment: 'Crisp sheet without being too greasy.' }
    ]
  },

  // Indian Food (24 - 32)
  {
    id: 'food-24',
    number: 24,
    name: 'Paneer Butter Masala',
    category: 'Indian Food',
    price: 269,
    originalPrice: 319,
    rating: 4.9,
    ratingCount: 820,
    description: 'Soft cubes of fresh malai cottage cheese simmered in a velvety, buttery tomato, cashew nut, and cream gravy scented with kasuri methi.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '20-25 mins',
    calories: '580 kcal',
    tags: ['North Indian', 'Royal Gravy', 'Best Seller'],
    reviews: [
      { id: 'r25', userName: 'Vivek Chawla', rating: 5, date: 'Yesterday', comment: 'Melt-in-mouth paneer and the gravy is restaurant perfection!' },
      { id: 'r26', userName: 'Geeta Nair', rating: 5, date: '3 days ago', comment: 'Best Paneer Butter Masala in Hoodi by far.' }
    ]
  },
  {
    id: 'food-25',
    number: 25,
    name: 'Paneer Tikka',
    category: 'Indian Food',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    ratingCount: 460,
    description: 'Succulent cubes of paneer marinated in spiced hung curd, tandoori masala, skewered with onions and capsicum, roasted in clay tandoor.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '20-25 mins',
    calories: '450 kcal',
    tags: ['Tandoori Starter', 'Smoky'],
    reviews: [
      { id: 'r27', userName: 'Sunil Rao', rating: 5, date: '2 days ago', comment: 'Smoky char and super juicy paneer.' }
    ]
  },
  {
    id: 'food-26',
    number: 26,
    name: 'Veg Biryani',
    category: 'Indian Food',
    price: 239,
    originalPrice: 289,
    rating: 4.7,
    ratingCount: 540,
    description: 'Long grain aged basmati rice cooked with fresh seasonal vegetables, saffron, rose water, cardamom, served with spiced cucumber raita and salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '25-30 mins',
    calories: '620 kcal',
    tags: ['Biryani', 'Traditional'],
    reviews: [
      { id: 'r28', userName: 'Arjun Das', rating: 5, date: '4 days ago', comment: 'Aromatic rice with plenty of veggies and great raita.' }
    ]
  },
  {
    id: 'food-27',
    number: 27,
    name: 'Hyderabadi Veg Biryani',
    category: 'Indian Food',
    price: 259,
    originalPrice: 309,
    rating: 4.9,
    ratingCount: 710,
    description: 'Authentic royal Nizami dum biryani cooked in sealed clay pot with browned onions (birista), fresh mint, ghee, saffron, and whole spices.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '25-30 mins',
    calories: '660 kcal',
    tags: ['Dum Biryani', 'Hyderabadi', 'Signature'],
    reviews: [
      { id: 'r29', userName: 'Fatima Sheikh', rating: 5, date: 'Yesterday', comment: 'Incredible depth of flavor, perfectly balanced spices.' }
    ]
  },
  {
    id: 'food-28',
    number: 28,
    name: 'Dal Makhani',
    category: 'Indian Food',
    price: 219,
    originalPrice: 259,
    rating: 4.8,
    ratingCount: 490,
    description: 'Whole black lentils and red kidney beans slow-cooked overnight over tandoor with fresh tomatoes, ginger, and rich white butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '20-25 mins',
    calories: '490 kcal',
    tags: ['Overnight Cooked', 'Creamy Dal'],
    reviews: [
      { id: 'r30', userName: 'Alok Sharma', rating: 5, date: '5 days ago', comment: 'Creamy, rich and not heavy. Pure comfort food.' }
    ]
  },
  {
    id: 'food-29',
    number: 29,
    name: 'Chole Bhature',
    category: 'Indian Food',
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    ratingCount: 630,
    description: '2 fluffy golden bhature served with Delhi-style spicy Punjabi chickpea masala, pickled carrots, raw onions, and fried green chilies.',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '15-20 mins',
    calories: '750 kcal',
    tags: ['Delhi Style', 'Bestseller'],
    reviews: [
      { id: 'r31', userName: 'Kunal Kapoor', rating: 5, date: '2 days ago', comment: 'Puffed like balloons and chole had that dark, tangy tang!' }
    ]
  },
  {
    id: 'food-30',
    number: 30,
    name: 'Masala Dosa',
    category: 'Indian Food',
    price: 139,
    originalPrice: 169,
    rating: 4.9,
    ratingCount: 940,
    description: 'Golden roasted crispy rice crepe smeared with fragrant red garlic chutney, filled with potato onion podi masala, served with coconut chutney and sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '12-15 mins',
    calories: '380 kcal',
    tags: ['South Indian', 'Ghee Roast'],
    reviews: [
      { id: 'r32', userName: 'Lakshmi V', rating: 5, date: 'Yesterday', comment: 'Crispy Bengaluru style butter masala dosa. Outstanding!' }
    ]
  },
  {
    id: 'food-31',
    number: 31,
    name: 'Pav Bhaji',
    category: 'Indian Food',
    price: 169,
    originalPrice: 199,
    rating: 4.8,
    ratingCount: 780,
    description: 'Mumbai style mashed spiced mixed vegetable curry topped with a dollop of Amul butter, served with 2 toasted butter pav buns, onion, and lemon.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '15-18 mins',
    calories: '590 kcal',
    tags: ['Mumbai Special', 'Butter Pav'],
    reviews: [
      { id: 'r33', userName: 'Rohan Joshi', rating: 5, date: '3 days ago', comment: 'Rich butter aroma and spicy bhaji. Superb!' }
    ]
  },
  {
    id: 'food-32',
    number: 32,
    name: 'Veg Thali',
    category: 'Indian Food',
    price: 299,
    originalPrice: 359,
    rating: 4.8,
    ratingCount: 410,
    description: 'Complete wholesome meal featuring Paneer Butter Masala, Dal Tadka, Aloo Gobhi, Jeera Rice, 2 Butter Rotis, Raita, Papad, Pickle, and Gulab Jamun.',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '20-25 mins',
    calories: '920 kcal',
    tags: ['Full Meal', 'Thali Special'],
    reviews: [
      { id: 'r34', userName: 'Bhavna K', rating: 5, date: '4 days ago', comment: 'Extremely generous portion and everything tasted fresh.' }
    ]
  },

  // Sandwiches (33 - 37)
  {
    id: 'food-33',
    number: 33,
    name: 'Veg Grilled Sandwich',
    category: 'Sandwiches',
    price: 139,
    originalPrice: 169,
    rating: 4.7,
    ratingCount: 390,
    description: 'Tri-layer sandwich with thinly sliced cucumber, tomatoes, boiled potatoes, mint chutney, and chaat masala, grilled crisp with butter.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '12-15 mins',
    calories: '360 kcal',
    tags: ['Grilled', 'Street Style'],
    reviews: [
      { id: 'r35', userName: 'Siddharth M', rating: 4.5, date: 'Yesterday', comment: 'Crisp bread and perfect green chutney punch.' }
    ]
  },
  {
    id: 'food-34',
    number: 34,
    name: 'Cheese Sandwich',
    category: 'Sandwiches',
    price: 149,
    originalPrice: 179,
    rating: 4.8,
    ratingCount: 320,
    description: 'Loaded with a gooey double layer of cheddar and mozzarella cheese, Italian herbs, and chili flakes on golden toasted artisan bread.',
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '12-15 mins',
    calories: '420 kcal',
    tags: ['Cheesy Melt', 'Snack'],
    reviews: [
      { id: 'r36', userName: 'Pooja V', rating: 5, date: '4 days ago', comment: 'Epic cheese pull, kids love it.' }
    ]
  },
  {
    id: 'food-35',
    number: 35,
    name: 'Paneer Sandwich',
    category: 'Sandwiches',
    price: 169,
    originalPrice: 199,
    rating: 4.8,
    ratingCount: 280,
    description: 'Crumbled spiced tandoori cottage cheese with crunchy diced capsicum, onions, and spicy mayo grilled to golden perfection.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '14-18 mins',
    calories: '460 kcal',
    tags: ['Paneer', 'Filling'],
    reviews: [
      { id: 'r37', userName: 'Naveen K', rating: 5, date: '3 days ago', comment: 'Very hearty and well-spiced paneer mixture.' }
    ]
  },
  {
    id: 'food-36',
    number: 36,
    name: 'Club Sandwich',
    category: 'Sandwiches',
    price: 189,
    originalPrice: 229,
    rating: 4.7,
    ratingCount: 240,
    description: 'Triple-decker toasted sandwich packed with layers of crisp lettuce, tomato, cucumber, cheese slice, grilled veggies, and creamy coleslaw.',
    image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '15-20 mins',
    calories: '510 kcal',
    tags: ['Triple Decker', 'Club'],
    reviews: [
      { id: 'r38', userName: 'Ritu Sen', rating: 5, date: '5 days ago', comment: 'Huge portion, served with potato chips.' }
    ]
  },
  {
    id: 'food-37',
    number: 37,
    name: 'Corn Cheese Sandwich',
    category: 'Sandwiches',
    price: 159,
    originalPrice: 189,
    rating: 4.8,
    ratingCount: 310,
    description: 'Sweet golden American corn kernels folded with melted cheese, oregano, black pepper, and butter inside toasted bread slices.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '12-16 mins',
    calories: '430 kcal',
    tags: ['Corn Cheese', 'Sweet & Savory'],
    reviews: [
      { id: 'r39', userName: 'Tanvi G', rating: 5, date: 'Yesterday', comment: 'Sweet corn and salty cheese is the best pair.' }
    ]
  },

  // Pasta (38 - 42)
  {
    id: 'food-38',
    number: 38,
    name: 'White Sauce Pasta',
    category: 'Pasta',
    price: 229,
    originalPrice: 279,
    rating: 4.8,
    ratingCount: 520,
    description: 'Penne pasta tossed in silky Italian bechamel cream sauce with sautéed mushrooms, sweet corn, broccoli, black olives, and Parmesan.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '18-22 mins',
    calories: '610 kcal',
    tags: ['Creamy', 'Alfredo Style', 'Best Seller'],
    reviews: [
      { id: 'r40', userName: 'Ananya B', rating: 5, date: '2 days ago', comment: 'Super velvety sauce and perfectly cooked al dente penne.' }
    ]
  },
  {
    id: 'food-39',
    number: 39,
    name: 'Red Sauce Pasta',
    category: 'Pasta',
    price: 219,
    originalPrice: 269,
    rating: 4.7,
    ratingCount: 380,
    description: 'Penne simmered in a tangy crushed Italian tomato arrabbiata sauce with garlic, chili flakes, basil, bell peppers, and olive oil.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '18-22 mins',
    calories: '490 kcal',
    tags: ['Arrabbiata', 'Tangy & Spicy'],
    reviews: [
      { id: 'r41', userName: 'Karthik S', rating: 4.5, date: '3 days ago', comment: 'Zesty tomato flavor with pleasant garlic aroma.' }
    ]
  },
  {
    id: 'food-40',
    number: 40,
    name: 'Pink Sauce Pasta',
    category: 'Pasta',
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    ratingCount: 460,
    description: 'The ultimate union of rich white cream and tangy tomato sauce (Rosa sauce) with garden vegetables, basil, and mozzarella.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '20-24 mins',
    calories: '570 kcal',
    tags: ['Rosa Sauce', 'Chef Recommended'],
    reviews: [
      { id: 'r42', userName: 'Simran K', rating: 5, date: 'Yesterday', comment: 'Neither too sour nor too heavy. Absolute balance!' }
    ]
  },
  {
    id: 'food-41',
    number: 41,
    name: 'Alfredo Pasta',
    category: 'Pasta',
    price: 259,
    originalPrice: 319,
    rating: 4.8,
    ratingCount: 340,
    description: 'Classic Roman style fettuccine coated in rich butter, heavy cream, garlic, nutmeg, and aged imported Parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '18-22 mins',
    calories: '690 kcal',
    tags: ['Authentic', 'Parmesan'],
    reviews: [
      { id: 'r43', userName: 'David Thomas', rating: 5, date: '4 days ago', comment: 'Real parmesan taste, decadent comfort food.' }
    ]
  },
  {
    id: 'food-42',
    number: 42,
    name: 'Cheese Pasta',
    category: 'Pasta',
    price: 239,
    originalPrice: 289,
    rating: 4.7,
    ratingCount: 290,
    description: 'Macaroni enveloped in a luscious four-cheese sauce (Cheddar, Mozzarella, Gouda, Parmesan) baked until bubbly golden.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '18-22 mins',
    calories: '680 kcal',
    tags: ['Four Cheese', 'Baked'],
    reviews: [
      { id: 'r44', userName: 'Prateek S', rating: 5, date: '1 week ago', comment: 'Cheesy indulgence at its best.' }
    ]
  },

  // Snacks (43 - 48)
  {
    id: 'food-43',
    number: 43,
    name: 'French Fries',
    category: 'Snacks',
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    ratingCount: 780,
    description: 'Golden crispy salted potato fries, fried to crunch perfection on outside, soft fluffy potato inside. Served with ketchup.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '10-12 mins',
    calories: '310 kcal',
    tags: ['Crispy Fries', 'Classic'],
    reviews: [
      { id: 'r45', userName: 'Akhil V', rating: 5, date: 'Yesterday', comment: 'Stays crispy until delivered! Great salt balance.' }
    ]
  },
  {
    id: 'food-44',
    number: 44,
    name: 'Peri Peri Fries',
    category: 'Snacks',
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    ratingCount: 650,
    description: 'Crunchy golden french fries tossed in our signature spicy peri peri seasoning blend. Shaken hot and served with garlic mayo.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '10-12 mins',
    calories: '330 kcal',
    tags: ['Peri Peri', 'Spicy'],
    reviews: [
      { id: 'r46', userName: 'Neha Jain', rating: 5, date: '2 days ago', comment: 'Addictive spice blend. Can never stop at one!' }
    ]
  },
  {
    id: 'food-45',
    number: 45,
    name: 'Cheese Balls',
    category: 'Snacks',
    price: 149,
    originalPrice: 189,
    rating: 4.9,
    ratingCount: 420,
    description: '6 golden crumb-coated crispy bites oozing with molten melted cheese, chopped jalapenos, and aromatic herbs.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '12-15 mins',
    calories: '410 kcal',
    tags: ['Molten Cheese', 'Jalapeno'],
    reviews: [
      { id: 'r47', userName: 'Varun S', rating: 5, date: '3 days ago', comment: 'The jalapeno cheese burst inside is mind-blowing.' }
    ]
  },
  {
    id: 'food-46',
    number: 46,
    name: 'Garlic Bread',
    category: 'Snacks',
    price: 129,
    originalPrice: 159,
    rating: 4.8,
    ratingCount: 560,
    description: '4 slices of freshly baked baguette brushed with roasted garlic herb butter, toasted until crisp and aromatic.',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '10-14 mins',
    calories: '320 kcal',
    tags: ['Garlic Butter', 'Crispy'],
    reviews: [
      { id: 'r48', userName: 'Maya L', rating: 5, date: 'Yesterday', comment: 'Aromatic garlic goodness, crusty edges.' }
    ]
  },
  {
    id: 'food-47',
    number: 47,
    name: 'Potato Wedges',
    category: 'Snacks',
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    ratingCount: 310,
    description: 'Thick cut skin-on potato wedges seasoned with smoked paprika, rosemary, garlic powder, and roasted to golden crunchiness.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '12-15 mins',
    calories: '340 kcal',
    tags: ['Rustic Cut', 'Herbed'],
    reviews: [
      { id: 'r49', userName: 'Ganesh P', rating: 4.5, date: '5 days ago', comment: 'Loved the seasoning on the wedges.' }
    ]
  },
  {
    id: 'food-48',
    number: 48,
    name: 'Veg Nuggets',
    category: 'Snacks',
    price: 139,
    originalPrice: 169,
    rating: 4.7,
    ratingCount: 380,
    description: '8 golden crispy vegetable bites packed with carrots, corn, mashed potatoes, and spices. Served with sweet chili dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '12-15 mins',
    calories: '360 kcal',
    tags: ['Crispy Nuggets', 'Finger Food'],
    reviews: [
      { id: 'r50', userName: 'Pallavi D', rating: 5, date: '4 days ago', comment: 'Perfect tea-time snack for the evening.' }
    ]
  },

  // Beverages (49 - 55)
  {
    id: 'food-49',
    number: 49,
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 119,
    originalPrice: 149,
    rating: 4.9,
    ratingCount: 890,
    description: 'Creamy, thick chilled brew of dark roast Arabica espresso, chilled milk, vanilla bean syrup, and a scoop of vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '5-8 mins',
    calories: '280 kcal',
    tags: ['Thick Brew', 'Best Seller', 'Refreshing'],
    reviews: [
      { id: 'r51', userName: 'Ritika Roy', rating: 5, date: 'Yesterday', comment: 'Best cold coffee in town, so thick and frothy!' }
    ]
  },
  {
    id: 'food-50',
    number: 50,
    name: 'Chocolate Milkshake',
    category: 'Beverages',
    price: 139,
    originalPrice: 169,
    rating: 4.8,
    ratingCount: 540,
    description: 'Rich Belgian chocolate ice cream blended with full cream milk, Hershey\'s chocolate syrup, and crowned with chocolate curls.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '6-10 mins',
    calories: '390 kcal',
    tags: ['Belgian Chocolate', 'Indulgent'],
    reviews: [
      { id: 'r52', userName: 'Samir Ghosh', rating: 5, date: '2 days ago', comment: 'Chocolaty heaven, very satisfying.' }
    ]
  },
  {
    id: 'food-51',
    number: 51,
    name: 'Oreo Milkshake',
    category: 'Beverages',
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    ratingCount: 620,
    description: 'Crushed chocolate Oreo cookies blended with creamy vanilla ice cream, topped with whipped cream and crunchy cookie crumbs.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '6-10 mins',
    calories: '440 kcal',
    tags: ['Oreo Crunch', 'Bestseller'],
    reviews: [
      { id: 'r53', userName: 'Devanshi P', rating: 5, date: '3 days ago', comment: 'Thick, crunchy, and not overly sweet. Loved it!' }
    ]
  },
  {
    id: 'food-52',
    number: 52,
    name: 'Strawberry Milkshake',
    category: 'Beverages',
    price: 139,
    originalPrice: 169,
    rating: 4.7,
    ratingCount: 380,
    description: 'Luscious real Mahabaleshwar strawberry puree blended with fresh milk, strawberry gelato, and a drizzle of fruit syrup.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '6-10 mins',
    calories: '320 kcal',
    tags: ['Real Strawberry', 'Berry Blast'],
    reviews: [
      { id: 'r54', userName: 'Natasha W', rating: 5, date: '4 days ago', comment: 'Fresh fruity strawberry flavor, so refreshing.' }
    ]
  },
  {
    id: 'food-53',
    number: 53,
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    ratingCount: 410,
    description: 'Zesty freshly squeezed key lime juice served with sparkling soda, mint leaves, rock salt, and sweet sugar syrup.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '5 mins',
    calories: '90 kcal',
    tags: ['Refreshing', 'Cooler'],
    reviews: [
      { id: 'r55', userName: 'Ashok J', rating: 4.5, date: 'Yesterday', comment: 'Perfect palate cleanser and thirst quencher.' }
    ]
  },
  {
    id: 'food-54',
    number: 54,
    name: 'Mango Shake',
    category: 'Beverages',
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    ratingCount: 750,
    description: 'Pure Alphonso mango pulp churned with rich milk, sweetened condensed milk, and garnished with chopped pistachios.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '6-10 mins',
    calories: '360 kcal',
    tags: ['Alphonso Mango', 'Seasonal King'],
    reviews: [
      { id: 'r56', userName: 'Bhavesh M', rating: 5, date: 'Yesterday', comment: 'Authentic royal mango taste, thick and luscious.' }
    ]
  },
  {
    id: 'food-55',
    number: 55,
    name: 'Iced Tea',
    category: 'Beverages',
    price: 99,
    originalPrice: 129,
    rating: 4.7,
    ratingCount: 320,
    description: 'Brewed premium Assam black tea chilled with freshly sliced lemons, crushed mint leaves, and light peach syrup over ice cubes.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '5-7 mins',
    calories: '85 kcal',
    tags: ['Lemon Mint', 'Chilled Tea'],
    reviews: [
      { id: 'r57', userName: 'Snehal T', rating: 5, date: '3 days ago', comment: 'Crisp, citrusy, and not overly sweet.' }
    ]
  },

  // Desserts (56 - 62)
  {
    id: 'food-56',
    number: 56,
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    ratingCount: 690,
    description: 'Fudgy, rich dark chocolate brownie baked with toasted walnut chunks and topped with a drizzle of warm chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    isPopular: true,
    prepTime: '8-10 mins',
    calories: '420 kcal',
    tags: ['Fudgy', 'Best Seller', 'Walnut'],
    reviews: [
      { id: 'r58', userName: 'Anushka Sen', rating: 5, date: 'Yesterday', comment: 'Dense fudgy center with crackly top. 10/10!' }
    ]
  },
  {
    id: 'food-57',
    number: 57,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 149,
    originalPrice: 189,
    rating: 4.9,
    ratingCount: 840,
    description: 'Warm cocoa sponge cake with an irresistible center of hot molten dark chocolate that oozes out with the first fork cut.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '10-12 mins',
    calories: '460 kcal',
    tags: ['Molten Lava', 'Hot Dessert'],
    reviews: [
      { id: 'r59', userName: 'Kunal T', rating: 5, date: '2 days ago', comment: 'Warm molten chocolate flowing out was heavenly.' }
    ]
  },
  {
    id: 'food-58',
    number: 58,
    name: 'Chocolate Ice Cream',
    category: 'Desserts',
    price: 89,
    originalPrice: 119,
    rating: 4.8,
    ratingCount: 490,
    description: 'Two generous scoops of velvety dark chocolate gelato prepared with pure Dutch cocoa and studded with chocolate chips.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '5 mins',
    calories: '290 kcal',
    tags: ['Gelato', 'Rich Cocoa'],
    reviews: [
      { id: 'r60', userName: 'Soham D', rating: 5, date: '4 days ago', comment: 'Very smooth and high cocoa depth.' }
    ]
  },
  {
    id: 'food-59',
    number: 59,
    name: 'Vanilla Ice Cream',
    category: 'Desserts',
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    ratingCount: 380,
    description: 'Classic creamy scoops made with pure Madagascar Bourbon vanilla beans and fresh dairy cream. Pairs perfectly with brownies.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '5 mins',
    calories: '240 kcal',
    tags: ['Madagascar Vanilla', 'Classic'],
    reviews: [
      { id: 'r61', userName: 'Prachi M', rating: 5, date: '5 days ago', comment: 'Real vanilla bean specks visible! Very creamy.' }
    ]
  },
  {
    id: 'food-60',
    number: 60,
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 99,
    originalPrice: 129,
    rating: 4.9,
    ratingCount: 920,
    description: '2 pcs soft melt-in-mouth fried khoya dumplings steeped in warm saffron, cardamom, and rose water scented sugar syrup.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isBestSeller: true,
    prepTime: '5-8 mins',
    calories: '340 kcal',
    tags: ['Traditional Sweet', 'Desi Ghee'],
    reviews: [
      { id: 'r62', userName: 'Radhika R', rating: 5, date: 'Yesterday', comment: 'Melted instantly in mouth, perfectly sweetened.' }
    ]
  },
  {
    id: 'food-61',
    number: 61,
    name: 'Cheesecake',
    category: 'Desserts',
    price: 179,
    originalPrice: 229,
    rating: 4.8,
    ratingCount: 430,
    description: 'Classic New York style baked cheesecake with a buttery graham cracker crust and smooth Philadelphia cream cheese filling with blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: true,
    prepTime: '5 mins',
    calories: '450 kcal',
    tags: ['New York Style', 'Blueberry'],
    reviews: [
      { id: 'r63', userName: 'Jasmine P', rating: 5, date: '3 days ago', comment: 'Rich texture, great tart blueberry layer on top.' }
    ]
  },
  {
    id: 'food-62',
    number: 62,
    name: 'Chocolate Pastry',
    category: 'Desserts',
    price: 119,
    originalPrice: 149,
    rating: 4.7,
    ratingCount: 390,
    description: 'Multi-layered moist chocolate sponge layered with whipped dark chocolate truffle ganache and dusted with cocoa powder.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&auto=format&fit=crop&q=80',
    isVeg: true,
    isAvailable: true,
    prepTime: '5 mins',
    calories: '380 kcal',
    tags: ['Truffle Pastry', 'Moist'],
    reviews: [
      { id: 'r64', userName: 'Aakash V', rating: 5, date: 'Yesterday', comment: 'Super fresh and moist pastry slice.' }
    ]
  }
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'The Pizza Kitchen',
    cuisine: 'Pizza, Italian, Fast Food',
    rating: 4.8,
    ratingCount: 1420,
    deliveryTime: '25-30 mins',
    distance: '1.2 km',
    minOrder: 199,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&auto=format&fit=crop&q=80',
    address: 'Hoodi Main Road, Near ITPL Back Gate, Bengaluru',
    isPromoted: true,
  },
  {
    id: 'rest-2',
    name: 'Burger Barn Cafe',
    cuisine: 'Burgers, American, Shakes',
    rating: 4.7,
    ratingCount: 980,
    deliveryTime: '20-25 mins',
    distance: '0.8 km',
    minOrder: 149,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    address: 'Ayyappa Nagar Main Rd, Hoodi, Bengaluru',
    isPromoted: false,
  },
  {
    id: 'rest-3',
    name: 'Chinatown Express',
    cuisine: 'Chinese, Asian, Momos, Noodles',
    rating: 4.8,
    ratingCount: 1250,
    deliveryTime: '20-28 mins',
    distance: '1.5 km',
    minOrder: 179,
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=700&auto=format&fit=crop&q=80',
    address: 'Seetharampalya Road, Mahadevapura, Bengaluru',
    isPromoted: true,
  },
  {
    id: 'rest-4',
    name: 'Royal Punjab Heritage',
    cuisine: 'North Indian, Biryani, Mughlai, Tandoor',
    rating: 4.9,
    ratingCount: 2310,
    deliveryTime: '30-35 mins',
    distance: '2.1 km',
    minOrder: 249,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80',
    address: 'Near Hoodi Railway Station, Whitefield Road, Bengaluru',
    isPromoted: true,
  },
  {
    id: 'rest-5',
    name: 'The Sandwich Bar & Cafe',
    cuisine: 'Sandwiches, Snacks, Beverages',
    rating: 4.6,
    ratingCount: 740,
    deliveryTime: '15-20 mins',
    distance: '0.5 km',
    minOrder: 99,
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=700&auto=format&fit=crop&q=80',
    address: 'Near Gandhi Chowk, Latur, Maharashtra 413512',
    isPromoted: false,
  },
  {
    id: 'rest-6',
    name: 'Sweet Treat Delights',
    cuisine: 'Desserts, Bakery, Ice Creams, Shakes',
    rating: 4.9,
    ratingCount: 1680,
    deliveryTime: '15-22 mins',
    distance: '1.0 km',
    minOrder: 129,
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=700&auto=format&fit=crop&q=80',
    address: 'Ausa Road, Near Deshikendra School, Latur, Maharashtra 413512',
    isPromoted: true,
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'HOODI50',
    title: '50% OFF up to ₹100',
    discountPercent: 50,
    maxDiscount: 100,
    minOrderAmount: 199,
    description: 'Use code HOODI50 to get 50% discount on orders above ₹199',
    expiryDate: '2026-12-31',
  },
  {
    code: 'WELCOME100',
    title: 'Flat ₹100 OFF on First Order',
    discountPercent: 30,
    maxDiscount: 100,
    minOrderAmount: 299,
    description: 'Exclusive welcome voucher for delicious food in Latur!',
    expiryDate: '2026-12-31',
  },
  {
    code: 'FESTIVE20',
    title: '20% OFF on Gourmet Feast',
    discountPercent: 20,
    maxDiscount: 150,
    minOrderAmount: 399,
    description: 'Special weekend feast discount on all dishes',
    expiryDate: '2026-12-31',
  },
  {
    code: 'FREEDEL',
    title: 'Free Delivery',
    discountPercent: 100,
    maxDiscount: 50,
    minOrderAmount: 249,
    description: 'Get 100% off delivery charges on orders above ₹249',
    expiryDate: '2026-12-31',
  },
];

export const INITIAL_DELIVERY_PARTNERS: DeliveryPartner[] = [
  {
    id: 'dp-1',
    name: 'Ramesh Shinde',
    phone: '+91 98451 22345',
    email: 'ramesh.delivery@hoodihub.com',
    vehicleNumber: 'MH-24-HA-4592 (EV Scooter)',
    rating: 4.9,
    totalDeliveries: 428,
    status: 'Available',
    locationArea: 'Shivaji Chowk, Latur',
  },
  {
    id: 'dp-2',
    name: 'Suresh Jadhav',
    phone: '+91 97410 88912',
    email: 'suresh.delivery@hoodihub.com',
    vehicleNumber: 'MH-24-EJ-8012 (Bike)',
    rating: 4.8,
    totalDeliveries: 312,
    status: 'On Delivery',
    currentOrderId: 'ORD-7821',
    locationArea: 'Ausa Road, Latur',
  },
  {
    id: 'dp-3',
    name: 'Kiran Deshmukh',
    phone: '+91 99002 67341',
    email: 'kiran.delivery@hoodihub.com',
    vehicleNumber: 'MH-24-MB-3190 (EV Scooter)',
    rating: 4.9,
    totalDeliveries: 560,
    status: 'Available',
    locationArea: 'Gandhi Chowk, Latur',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9021',
    customerName: 'Dhanashri Kendre',
    customerPhone: '+91 98201 45890',
    customerEmail: 'dhanashrikendre24@gmail.com',
    address: {
      id: 'addr-1',
      type: 'Home',
      name: 'Dhanashri Kendre',
      phone: '+91 98201 45890',
      flatNo: 'Shree Niwas, Plot 14',
      street: 'Opposite Town Hall, Shivaji Chowk',
      landmark: 'Near Rajarshi Shahu College',
      area: 'Shivaji Chowk',
      city: 'Latur',
      pincode: '413512',
      lat: 18.4088,
      lng: 76.5604,
    },
    items: [
      {
        foodId: 'food-27',
        food: INITIAL_FOOD_ITEMS[26], // Hyderabadi Veg Biryani
        quantity: 2,
      },
      {
        foodId: 'food-49',
        food: INITIAL_FOOD_ITEMS[48], // Cold Coffee
        quantity: 2,
      },
      {
        foodId: 'food-57',
        food: INITIAL_FOOD_ITEMS[56], // Chocolate Lava Cake
        quantity: 1,
      },
    ],
    subtotal: 905,
    discount: 100,
    deliveryCharge: 0,
    taxes: 40.25,
    totalAmount: 845.25,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Out for Delivery',
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
    estimatedDeliveryMinutes: 12,
    deliveryPartnerId: 'dp-1',
    deliveryPartnerName: 'Ramesh Shinde',
    deliveryPartnerPhone: '+91 98451 22345',
    specialInstructions: 'Ring doorbell once and leave with security if unavailable',
  },
  {
    id: 'ORD-8812',
    customerName: 'Dhanashri Kendre',
    customerPhone: '+91 98201 45890',
    customerEmail: 'dhanashrikendre24@gmail.com',
    address: {
      id: 'addr-1',
      type: 'Home',
      name: 'Dhanashri Kendre',
      phone: '+91 98201 45890',
      flatNo: 'Shree Niwas, Plot 14',
      street: 'Shivaji Chowk',
      area: 'Shivaji Chowk',
      city: 'Latur',
      pincode: '413512',
    },
    items: [
      {
        foodId: 'food-1',
        food: INITIAL_FOOD_ITEMS[0], // Margherita Pizza
        quantity: 1,
      },
      {
        foodId: 'food-44',
        food: INITIAL_FOOD_ITEMS[43], // Peri Peri Fries
        quantity: 1,
      },
      {
        foodId: 'food-56',
        food: INITIAL_FOOD_ITEMS[55], // Chocolate Brownie
        quantity: 1,
      },
    ],
    subtotal: 497,
    discount: 50,
    deliveryCharge: 50,
    taxes: 24.85,
    totalAmount: 521.85,
    paymentMethod: 'Google Pay',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    estimatedDeliveryMinutes: 0,
    deliveryPartnerId: 'dp-3',
    deliveryPartnerName: 'Kiran Deshmukh',
  },
];

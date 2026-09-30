type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

type Products = Product[];

export const featuredProducts: Products = [
  {
    id: 1,
    title: "Sicilian",
    desc: "Spicy pepperoni pizza with bold, fiery flavor everywhere.",
    img: "/items/p1.png",
    price: 249,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 2,
    title: "Bacon Deluxe",
    desc: "Smoky beef burger topped with crispy bacon and BBQ.",
    img: "/items/p2.png",
    price: 299,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 3,
    title: "Bella Napoli",
    desc: "Classic Italian pizza with crispy crust and fresh toppings.",
    img: "/items/p3.png",
    price: 249,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 4,
    title: "Spicy Arrabbiata",
    desc: "Fiery pasta tossed in spicy tomato sauce and basil.",
    img: "/items/p4.png",
    price: 269,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 5,
    title: "Jalapeño Fiesta",
    desc: "Zesty burger loaded with jalapeños, cheese, and chipotle mayo.",
    img: "/items/p5.png",
    price: 299,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 6,
    title: "Margherita Magic",
    desc: "Timeless pizza with tomatoes, basil, mozzarella, and olive oil.",
    img: "/items/p6.png",
    price: 249,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 7,
    title: "Garlic Linguine",
    desc: "Creamy linguine infused with garlic, Parmesan, and herbs.",
    img: "/items/p7.png",
    price: 289,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 8,
    title: "Mediterranean Delight",
    desc: "Mediterranean-inspired pizza with feta, olives, tomatoes, and oregano.",
    img: "/items/p8.png",
    price: 329,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 9,
    title: "Hawaiian Teriyaki",
    desc: "Sweet teriyaki burger with pineapple, bacon, and lettuce.",
    img: "/items/p9.png",
    price: 299,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
];




export const pizzas: Products = [
  {
    id: 1,
    title: "Sicilian",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: "/items/p1.png",
    price: 249,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 2,
    title: "Mediterranean Delight",
    desc: "Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.",
    img: "/items/p8.png",
    price: 329,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 3,
    title: "Bella Napoli",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/items/p3.png",
    price: 269,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 4,
    title: "Pesto Primavera",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/items/p10.png",
    price: 289,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 5,
    title: "Veggie Supreme",
    desc: "A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.",
    img: "/items/p11.png",
    price: 249,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
  {
    id: 6,
    title: "Four Cheese Fantasy",
    desc: "Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.",
    img: "/items/p12.png",
    price: 229,
    options: [
      {
        title: "Small",
        additionalPrice: 0,
      },
      {
        title: "Medium",
        additionalPrice: 40,
      },
      {
        title: "Large",
        additionalPrice: 60,
      },
    ],
  },
];

export const singleProduct: Product = {
  id: 1,
  title: "Sicilian",
  desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
  img: "/items/p1.png",
  price: 249,
  options: [
    {
      title: "Small",
      additionalPrice: 0,
    },
    {
      title: "Medium",
      additionalPrice: 40,
    },
    {
      title: "Large",
      additionalPrice: 60,
    },
  ],
};


type Menu = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export const menu: Menu = [
  {
    id: 1,
    slug: "pastas",
    title: "Italian Pastas",
    desc: "Savor the taste of perfection with our exquisite Italian handmade pasta menu.",
    img: "/items/m1.png",
    color: "white",
  },
  {
    id: 2,
    slug: "burgers",
    title: "Juicy Burgers",
    desc: "Burger Bliss: Juicy patties, bold flavors, and gourmet toppings galore.",
    img: "/items/m2.png",
    color: "black",
  },
  {
    id: 3,
    slug: "pizzas",
    title: "Cheesy Pizzas",
    desc: "Pizza Paradise: Perfect, Mouthwatering toppings, and cheesy perfection.",
    img: "/items/m3.png",
    color: "white",
  },
];
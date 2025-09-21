// src/productsData.js

// ✅ Store all your products here
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Vanilla jar cake",
    price: "1200",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Vanilla%20jar%20cake.jpg",
  },
  {
    id: 2,
    name: "Vanilla Cup Cake",
    price: "1500",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Vanilla%20Cup%20Cake.jpg",
  },
  {
    id: 3,
    name: "Vanilla cake",
    price: "1300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Vanilla%20cake.jpg",
  },
  {
    id: 4,
    name: "Tutti frutti custard cookies",
    price: "₹1,400",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Tutti%20frutti%20custard%20cookies.jpg",
  },
  {
    id: 5,
    name: "Strawberry Cake",
    price: "₹1,250",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Strawberry%20Cake.jpg",
  },
  {
    id: 6,
    name: "Spiderman Bento Cake",
    price: "₹1,600",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Spiderman%20Bento%20Cake.jpg",
  },
  {
    id: 7,
    name: "Rosette Chocolate Bento Cake",
    price: "₹1,350",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Rosette%20Chocolate%20Bento%20Cake.jpg",
  },
  {
    id: 8,
    name: "Red velvet cream cheese cake",
    price: "₹1,450",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Red%20velvet%20cream%20cheese%20cake.jpg",
  },
  {
    id: 9,
    name: "Red Velvet Bento Cake",
    price: "₹1,550",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Red%20Velvet%20Bento%20Cake.jpg",
  },
  {
    id: 10,
    name: "Panda Bento Cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Panda%20Bento%20Cake.jpg",
  },
  {
    id: 11,
    name: "Mini butter cookies",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Mini%20butter%20cookies.jpg",
  },
  {
    id: 12,
    name: "Jar cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Jar%20cake.jpg",
  },
  {
    id: 13,
    name: "Cupcake bouquet-bunch of seven",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Cupcake%20bouquet%20(bunch%20of%20seven).jpg",
  },
  {
    id: 14,
    name: "Coconut cookies",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Coconut%20cookies.jpg",
  },
  {
    id: 15,
    name: "Chocolate Overloaded Cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Chocolate%20Overloaded%20Cake.jpg",
  },
  {
    id: 16,
    name: "Chocolate Jar cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Chocolate%20Jar%20cake.jpg",
  },
  {
    id: 17,
    name: "Chocolate cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Chocolate%20cake.jpg",
  },
  {
    id: 18,
    name: "Calender Cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Calender%20Cake.jpg",
  },
  {
    id: 19,
    name: "Bride to be Cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Bride%20to%20be%20Cake.jpg",
  },
  {
    id: 20,
    name: "Bento Cake",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Bento%20Cake.jpg",
  },
  {
    id: 21,
    name: "Almond cookies",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Almond%20cookies.jpg",
  },
  {
    id: 22,
    name: "Almond cashew cookies",
    price: "₹1,300",
    img: "https://raw.githubusercontent.com/AmaanOO7/Talesofthecake-images/7f7d16b370ed6c65b2acc26904c0de45ff3e01d0/Zomato%20pics/Almond%20cashew%20cookies.jpg",
  },
  // ✅ Add as many products as you like here
];

export default ALL_PRODUCTS;

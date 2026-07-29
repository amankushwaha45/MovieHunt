require("dotenv").config();

const mongoose = require("mongoose");
const City = require("../models/City");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const cities = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    image: "/cities/mumbai.png",
    isPopular: true,
  },
  {
    name: "Delhi",
    state: "Delhi",
    image: "/cities/delhi.png",
    isPopular: true,
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    image: "/cities/bengaluru.png",
    isPopular: true,
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    image: "/cities/hyderabad.png",
    isPopular: true,
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    image: "/cities/chennai.png",
    isPopular: true,
  },
  {
    name: "Kolkata",
    state: "West Bengal",
    image: "/cities/kolkata.png",
    isPopular: true,
  },
  {
    name: "Pune",
    state: "Maharashtra",
    image: "/cities/pune.png",
    isPopular: true,
  },
  {
    name: "Lucknow",
    state: "Uttar Pradesh",
    image: "/cities/lucknow.png",
    isPopular: true,
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    image: "/cities/jaipur.png",
    isPopular: true,
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    image: "/cities/ahmedabad.png",
    isPopular: true,
  },

  {
    name: "Kanpur",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Prayagraj",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Noida",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Patna",
    state: "Bihar",
    image: "",
    isPopular: false,
  },
  {
    name: "Ranchi",
    state: "Jharkhand",
    image: "",
    isPopular: false,
  },
  {
    name: "Bhopal",
    state: "Madhya Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Indore",
    state: "Madhya Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Surat",
    state: "Gujarat",
    image: "",
    isPopular: false,
  },
  {
    name: "Vadodara",
    state: "Gujarat",
    image: "",
    isPopular: false,
  },
  {
    name: "Nagpur",
    state: "Maharashtra",
    image: "",
    isPopular: false,
  },
  {
    name: "Nashik",
    state: "Maharashtra",
    image: "",
    isPopular: false,
  },
  {
    name: "Aurangabad",
    state: "Maharashtra",
    image: "",
    isPopular: false,
  },
  {
    name: "Amritsar",
    state: "Punjab",
    image: "",
    isPopular: false,
  },
  {
    name: "Ludhiana",
    state: "Punjab",
    image: "",
    isPopular: false,
  },
  {
    name: "Chandigarh",
    state: "Chandigarh",
    image: "",
    isPopular: false,
  },
  {
    name: "Dehradun",
    state: "Uttarakhand",
    image: "",
    isPopular: false,
  },
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Jammu",
    state: "Jammu & Kashmir",
    image: "",
    isPopular: false,
  },
  {
    name: "Srinagar",
    state: "Jammu & Kashmir",
    image: "",
    isPopular: false,
  },
  {
    name: "Guwahati",
    state: "Assam",
    image: "",
    isPopular: false,
  },
  {
    name: "Bhubaneswar",
    state: "Odisha",
    image: "",
    isPopular: false,
  },
  {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Vijayawada",
    state: "Andhra Pradesh",
    image: "",
    isPopular: false,
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    image: "",
    isPopular: false,
  },
  {
    name: "Madurai",
    state: "Tamil Nadu",
    image: "",
    isPopular: false,
  },
  {
    name: "Kochi",
    state: "Kerala",
    image: "",
    isPopular: false,
  },
  {
    name: "Thiruvananthapuram",
    state: "Kerala",
    image: "",
    isPopular: false,
  },
];

const seedCities = async () => {
  try {
    await City.deleteMany();

    await City.insertMany(cities);

    console.log("✅ Cities Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedCities();
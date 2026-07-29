const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../models/Movie");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const movies = [
{
  title: "War 2",
  description: "Action Thriller starring Hrithik Roshan and Jr NTR.",
  poster: "https://picsum.photos/300/450?random=1",
  trailer: "https://youtube.com/watch?v=test1",
  language: "Hindi",
  genre: ["Action", "Thriller"],
  format: "IMAX 2D",
  duration: "2h 45m",
  certificate: "UA13+",
  releaseDate: new Date("2026-08-14"),
  rating: 8.9,
  isTrending: true,
  isRecommended: true,
  isLatest: true
},
{
  title: "The Odyssey",
  description: "Epic adventure movie.",
  poster: "https://picsum.photos/300/450?random=2",
  trailer: "https://youtube.com/watch?v=test2",
  language: "English",
  genre: ["Adventure", "Drama"],
  format: "2D",
  duration: "2h 35m",
  certificate: "UA",
  releaseDate: new Date("2026-09-10"),
  rating: 8.7,
  isTrending: true,
  isRecommended: true,
  isLatest: true
},
{
  title: "Dhamaal 4",
  description: "Comedy entertainer.",
  poster: "https://picsum.photos/300/450?random=3",
  trailer: "https://youtube.com/watch?v=test3",
  language: "Hindi",
  genre: ["Comedy"],
  format: "2D",
  duration: "2h 20m",
  certificate: "U",
  releaseDate: new Date("2026-07-30"),
  rating: 8.2,
  isTrending: false,
  isRecommended: true,
  isLatest: true
},
];
const seedDB = async () => {
  try {
    await Movie.deleteMany();

    await Movie.insertMany(movies);

    console.log("✅ Movies Inserted Successfully");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();
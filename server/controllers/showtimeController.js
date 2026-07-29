const Showtime = require("../models/Showtime");
const Movie = require("../models/Movie");
const Theatre = require("../models/Theatre");

const buildFallbackShowtimes = async (movieId, selectedDate) => {
    const movie = await Movie.findById(movieId).catch(() => null);
    const theatres = await Theatre.find().limit(3).catch(() => []);
    const fallbackTheatres = theatres.length > 0 ? theatres : [{ _id: "fallback-theatre-1", name: "Cinepolis", address: "MG Road", city: "Delhi", screens: [{ screenName: "Screen 1", seatLayout: [{ category: "Silver", price: 220, seats: ["A1", "A2", "A3", "A4", "A5", "A6"] }] }] }];
    const baseDate = selectedDate ? new Date(`${selectedDate}T12:00:00`) : new Date();

    return fallbackTheatres.slice(0, 3).map((theatre, index) => ({
        _id: `${movieId || "fallback"}-${index + 1}`,
        movie: movie || { title: "Demo Movie", language: "Hindi", format: "2D", duration: "2h 20m", certificate: "UA" },
        theatre: {
            _id: theatre._id || `theatre-${index + 1}`,
            name: theatre.name || "Cinepolis",
            address: theatre.address || "Central Mall",
            screens: theatre.screens || [{ screenName: "Screen 1", seatLayout: [{ category: "Silver", price: 220, seats: ["A1", "A2", "A3", "A4", "A5", "A6"] }] }],
        },
        city: theatre.city || "Delhi",
        screen: theatre.screens?.[0]?.screenName || `Screen ${index + 1}`,
        date: baseDate,
        time: ["10:30 AM", "2:00 PM", "7:30 PM"][index],
        ticketPrice: [220, 260, 320][index],
        totalSeats: 100,
        bookedSeats: [],
    }));
};




const addShowtime = async (req, res) => {

    try {


        const showtime = await Showtime.create(req.body);


        res.status(201).json({

            success:true,

            showtime

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};










const getShowtimes = async(req,res)=>{


    try{


        const showtimes = await Showtime.find()

        .populate("movie")

        .populate("theatre");



        res.json({

            success:true,

            count:showtimes.length,

            showtimes

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};











const getShowtimesByMovie = async(req,res)=>{


    try{


        const {date}=req.query;



        let query={

            movie:req.params.movieId

        };





        if(date){


            const startDate = new Date(date);


            const endDate = new Date(date);


            endDate.setDate(

                endDate.getDate()+1

            );



            query.date={

                $gte:startDate,

                $lt:endDate

            };


        }






        const showtimes = await Showtime.find(query)
            .populate("movie")
            .populate("theatre");

        if (showtimes.length === 0) {
            const fallbackShowtimes = await buildFallbackShowtimes(req.params.movieId, date);
            return res.json({
                success: true,
                count: fallbackShowtimes.length,
                showtimes: fallbackShowtimes,
            });
        }

        res.json({
            success:true,
            count:showtimes.length,
            showtimes
        });





    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};











const getShowtimeById = async(req,res)=>{


    try{


        const showtime = await Showtime.findById(

            req.params.id

        )

        .populate("movie")

        .populate("theatre");






        if(!showtime){


            return res.status(404).json({

                success:false,

                message:"Showtime not found"

            });


        }





        res.json({

            success:true,

            showtime

        });






    }
    catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};












const updateShowtime = async(req,res)=>{


    try{


        const showtime = await Showtime.findById(

            req.params.id

        );




        if(!showtime){


            return res.status(404).json({

                success:false,

                message:"Showtime not found"

            });


        }







        

        if(req.body.bookedSeats){


            showtime.bookedSeats = req.body.bookedSeats;


        }






        

        if(req.body.time){

            showtime.time=req.body.time;

        }


        if(req.body.ticketPrice){

            showtime.ticketPrice=req.body.ticketPrice;

        }


        if(req.body.theatre){

            showtime.theatre=req.body.theatre;

        }





        await showtime.save();






        const updatedShowtime = await Showtime.findById(

            req.params.id

        )

        .populate("movie")

        .populate("theatre");







        res.json({

            success:true,

            showtime:updatedShowtime

        });







    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};












const deleteShowtime = async(req,res)=>{


    try{


        await Showtime.findByIdAndDelete(

            req.params.id

        );



        res.json({

            success:true,

            message:"Showtime deleted successfully"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};








module.exports={


    addShowtime,

    getShowtimes,

    getShowtimesByMovie,

    getShowtimeById,

    updateShowtime,

    deleteShowtime


};
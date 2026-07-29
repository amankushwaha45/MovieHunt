import "./SeatCountModal.css";


function SeatCountModal({

    open,
    show,
    seatCount,
    setSeatCount,
    onContinue,
    close

}) {



    if(!open) return null;



    const seatLayout =

    show?.theatre?.screens?.[0]?.seatLayout || [];





    // VEHICLE CHANGE

    const vehicleImages = {

        1:"🚲",

        2:"🏍️",

        3:"🛺",

        4:"🚗",

        5:"🚙",

        6:"🚌",

        7:"🚌",

        8:"🚌",

        9:"🚌",

        10:"🚌"

    };



    const currentVehicle =

    vehicleImages[seatCount];





    return (


        <div className="seat-modal-overlay">



            <div className="seat-modal-box">





                <button

                className="close-btn"

                onClick={close}

                >

                    ✕

                </button>






                <h2>

                    How many seats?

                </h2>







                <div className="vehicle-img">


                    {currentVehicle}


                </div>







                <div className="seat-count-row">



                {

                [1,2,3,4,5,6,7,8,9,10]

                .map(num=>(



                    <button


                    key={num}


                    className={

                    seatCount===num

                    ?

                    "seat-count-active"

                    :

                    ""

                    }



                    onClick={()=>setSeatCount(num)}



                    >


                    {num}


                    </button>



                ))

                }



                </div>









                <div className="seat-types">



                {


                seatLayout.map(item=>(



                    <div

                    className="seat-type-card"

                    key={item.category}

                    >




                        <h4>

                        {item.category}

                        </h4>





                        <p>

                        ₹{item.price}

                        </p>





                        <span>

                        AVAILABLE

                        </span>





                    </div>



                ))



                }



                </div>









                <button


                className="continue-seat-btn"


                onClick={onContinue}



                >


                    Select Seats


                </button>






            </div>



        </div>


    );


}



export default SeatCountModal;
import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts";


import "./Charts.css";





function Charts({

bookingData=[],

revenueData=[],

movieData=[]

}){





const bookingChart = bookingData.map(item=>({

date:item._id,

bookings:item.bookings

}));







const revenueChart = revenueData.map(item=>({

month:`Month ${item._id}`,

revenue:item.revenue

}));








const movies = movieData.map(item=>({

name:item.movie?.title || "Movie",

tickets:item.tickets

}));







return(



<div className="charts-container">





{/* BOOKING CHART */}


<div className="chart-card">


<h2>

Booking Analytics

</h2>




<ResponsiveContainer

width="100%"

height={300}

>


<LineChart data={bookingChart}>


<CartesianGrid

strokeDasharray="3 3"

stroke="#333"

/>


<XAxis

dataKey="date"

stroke="#aaa"

/>


<YAxis

stroke="#aaa"

/>


<Tooltip/>



<Line

type="monotone"

dataKey="bookings"

stroke="#8b1e3f"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



</div>









{/* REVENUE CHART */}


<div className="chart-card">


<h2>

Revenue Analytics

</h2>





<ResponsiveContainer

width="100%"

height={300}

>



<BarChart data={revenueChart}>


<CartesianGrid

strokeDasharray="3 3"

stroke="#333"

/>



<XAxis

dataKey="month"

stroke="#aaa"

/>


<YAxis

stroke="#aaa"

/>


<Tooltip/>




<Bar

dataKey="revenue"

fill="#b76e79"

radius={[10,10,0,0]}

/>



</BarChart>



</ResponsiveContainer>



</div>









{/* TOP MOVIES */}


<div className="chart-card">


<h2>

Top Movies

</h2>




<ResponsiveContainer

width="100%"

height={300}

>



<BarChart data={movies}>


<CartesianGrid

strokeDasharray="3 3"

stroke="#333"

/>


<XAxis

dataKey="name"

stroke="#aaa"

/>


<YAxis

stroke="#aaa"

/>


<Tooltip/>




<Bar

dataKey="tickets"

fill="#6b2737"

radius={[10,10,0,0]}

/>



</BarChart>


</ResponsiveContainer>



</div>







</div>



);


}



export default Charts;
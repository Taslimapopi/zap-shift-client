import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Payment = () => {
  const { parcelId } = useParams();
  console.log(parcelId);
  const axiosSecure = useAxiosSecure();

  const {user} = useAuth()
  console.log(user)

  const {isLoading, data } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      // console.log(res.data);
      const data = res.data
      return data;
    },
  });

  const handlePayment = async() =>{
    const parcelInfo = {
      parcelName: data.parcelName,
      cost: data.cost,
      parcelId: data._id,
      senderEmail: data.senderEmail
    }

    const res =await axiosSecure.post('/create-checkout-session',parcelInfo)
    console.log(res.data)

    window.location.href = res.data.url;


  }
  
  if (isLoading){return <p>loading</p>}

  return <div>
    {/* <h2>{parcelName}</h2>  */}
    <h2>please pay ${data.cost} for : {data.parcelName}</h2>
    <button onClick={handlePayment} className="btn btn-primary text-black"> Pay</button>
    </div>;
};

export default Payment;

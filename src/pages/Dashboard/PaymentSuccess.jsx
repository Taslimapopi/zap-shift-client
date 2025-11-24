import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  const [paymentInfo,setPaymentInfo] = useState({});
 

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,


          })
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-4xl">Payment Successful</h2>
      <p>Transaction Id : {paymentInfo.transactionId}</p>
      <p>Tracking Id : {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;

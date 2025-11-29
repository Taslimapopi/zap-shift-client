import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";


const Rider = () => {
  const {
    register,
    handleSubmit,
    control,

    // formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenter = useLoaderData();
  const duplicateRegions = serviceCenter.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post('/riders',data)
    .then((res)=>{
          if (res.data.insertedId) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your application has been received. we will reach within 45days",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                  }
    })
  };

  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        {/* document type */}
    
        {/* parcel info */}
        
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* sender details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            {/* sender name */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("name")}
              placeholder="Rider Name"
            />
            {/* Sender email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              defaultValue={user?.email}
              {...register("email")}
              placeholder="Email"
            />
            {/* Sender Address */}
            <label className="label">Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("address")}
              placeholder="Address"
            />
            {/* Rider region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                defaultValue="Pick a region"
                {...register("riderRegion")}
                className="select"
              >
                <option disabled={true}>Pick a browser</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>
            {/* sender District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                defaultValue="Pick a District"
                {...register("district")}
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegions(riderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

          
          </fieldset>
          {/* NID */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Details</h4>
            {/* Receiver name */}
            <label className="label">NID</label>
            <input
              type="text"
              className="input w-full"
              {...register("nid")}
              placeholder="NID"
            />
              {/*bike */}
            <label className="label">Bike Description</label>
            <textarea
              className="textarea w-full"
              {...register("bike")}
              placeholder="PickUp Description"
            ></textarea>
            {/* License */}
            <label className="label">Driver License</label>
            <input
              type="text"
              className="input w-full"
              {...register("license")}
              placeholder="Driver License"
            />

           
            {/* receiver District */}

            {/* Sender Address */}
            {/* <label className="label">Receiver Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverAddress")}
              placeholder="Receiver Address"
            /> */}

            {/*Delivery Desc */}
            {/* <label className="label">Delivery Description</label>
            <textarea
              className="textarea w-full"
              {...register("deliveryInst")}
              placeholder="PickUp Description"
            ></textarea> */}
          </fieldset>
        </div>
        {/* button */}
        <button type="submit" className="btn btn-primary text-black mb-4">
          {" "}
          Apply As A Rider
        </button>
      </form>
    </div>
  );
};

export default Rider;

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
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
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  //   console.log(regions)
  const navigate = useNavigate()

  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after parcel savings", res.data);
          navigate('/dashboard/my-parcels')
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "parcel has created pleaces pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });

        // save the parcel info to the database
        // axiosSecure.post('/parcels', data)
        //     .then(res => {
        //         console.log('after saving parcel', res.data);
        //     })

        // Swal.fire({
        //     title: "Deleted!",
        //     text: "Your file has been deleted.",
        //     icon: "success"
        // });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold mb-8">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* document type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parceltype")}
              value="document"
              className="radio"
            />{" "}
            document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parceltype")}
              value="non-document"
              className="radio"
            />{" "}
            non-document
          </label>
        </div>
        {/* parcel info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* sender details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("senderName")}
              placeholder="Sender Name"
            />
            {/* Sender email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              className="input w-full"
              defaultValue={user?.email}
              {...register("senderEmail")}
              placeholder="Sender Email"
            />
            {/* Sender Address */}
            <label className="label">Sender Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("senderAddress")}
              placeholder="Sender Address"
            />
            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                defaultValue="Pick a region"
                {...register("senderRegion")}
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
                {...register("senderDistrict")}
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegions(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/*PickDesc */}
            <label className="label">PickUp Description</label>
            <textarea
              className="textarea w-full"
              {...register("pickUpDesc")}
              placeholder="PickUp Description"
            ></textarea>
          </fieldset>
          {/* receiver details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* Receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverName")}
              placeholder="Receiver Name"
            />
            {/* Receiver Address */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              className="input w-full"
              {...register("receiverEmail")}
              placeholder="Receiver Email"
            />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                defaultValue="Pick a region"
                {...register("receiverRegion")}
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
            {/* receiver District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select
                defaultValue="Pick a District"
                {...register("receiverDistrict")}
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegions(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/* Sender Address */}
            <label className="label">Receiver Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("receiverAddress")}
              placeholder="Receiver Address"
            />

            {/*Delivery Desc */}
            <label className="label">Delivery Description</label>
            <textarea
              className="textarea w-full"
              {...register("deliveryInst")}
              placeholder="PickUp Description"
            ></textarea>
          </fieldset>
        </div>
        {/* button */}
        <button type="submit" className="btn btn-primary text-black mb-4">
          {" "}
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;

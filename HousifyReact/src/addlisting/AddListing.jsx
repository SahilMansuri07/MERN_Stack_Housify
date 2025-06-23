import React, { useState } from "react";
import AddListingStepper from "./AddListingStepper";
import HouseDetailsForm from "./HouseDetailsForm";
import HouseSpecificationsForm from "./HouseSpecificationsForm";
import ImagesUploaderForm from "./ImagesUploaderForm";
import ContactInfoForm from "./ContactInfoForm";
import PreviewSubmitForm from "./PreviewSubmitForm";

const steps = [
  "House Details",
  "Specifications",
  "Images",
  "Contact info",
  "Preview & Submit",
];

function AddListing() {
  const [currentStep, setCurrentStep] = useState(1);

  // House Details State
  const [details, setDetails] = useState({
    title: "",
    description: "",
    price: "",
    currency: "INR",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Specifications State
  const [specs, setSpecs] = useState({
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "",
    yearBuilt: "",
    features: [],
  });

  // Images State
  const [images, setImages] = useState([]);

  // Render current step form
  let stepForm;
  if (currentStep === 1)
    stepForm = (
      <HouseDetailsForm
        details={details}
        setDetails={setDetails}
        onNext={() => setCurrentStep(2)}
      />
    );
  else if (currentStep === 2)
    stepForm = (
      <HouseSpecificationsForm
        specs={specs}
        setSpecs={setSpecs}
        onBack={() => setCurrentStep(1)}
        onNext={() => setCurrentStep(3)}
      />
    );
  else if (currentStep === 3)
    stepForm = (
      <ImagesUploaderForm
        images={images}
        setImages={setImages}
        onBack={() => setCurrentStep(2)}
        onNext={() => setCurrentStep(4)}
      />
    );
  else if (currentStep === 4)
    stepForm = (
      <ContactInfoForm
        onBack={() => setCurrentStep(3)}
        onNext={() => setCurrentStep(5)}
      />
    );
  else if (currentStep === 5)
    stepForm = (
      <PreviewSubmitForm
        details={details}
        specs={specs}
        images={images}
        onBack={() => setCurrentStep(4)}
      />
    );

  return (
    <div className="min-h-screen bg-[#e9ecf2] flex flex-col">
      {/* Header */}
      <div className="w-full text-center py-8">
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Add New House Listing</h1>
        <p className="text-gray-500">Fill in the details below to create a new house listing</p>
      </div>

      <AddListingStepper steps={steps} currentStep={currentStep} />

      <div className="flex justify-center flex-1">
        <div className="bg-white rounded-xl shadow border border-[#e8eaf6] w-full max-w-2xl p-8 mb-12">
          {stepForm}
        </div>
      </div>
    </div>
  );
}

export default AddListing;
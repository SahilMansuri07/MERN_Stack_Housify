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
  const [form, setForm] = useState({
  "title": "Luxury 3BHK Apartment in Mumbai",
  "description": "A spacious 3BHK apartment located in a prime area with modern amenities, nearby schools, and metro connectivity.",
  "price": 5000000,
  "address": "123 Marine Drive",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pinCode": "400001",

  "bedrooms": 3,
  "bathrooms": 2,
  "squareFootage": 1500,
  "propertyType": "Apartment",
  "yearBuilt": 2015,
  "features": [
    "Garden",
    "Swimming Pool",
    "Garage",
    "Balcony",
    "Air Conditioning",
    "Gym",
    "Security",
    "Parking"
  ],

  "images": [
    "https://example.com/uploads/image1.jpg",
    "https://example.com/uploads/image2.jpg"
  ],

  "contactName": "Rahul Mehta",
  "contactEmail": "rahul.mehta@example.com",
  "contactPhone": "+91-9876543210"
 

  });


  // Render current step form
  let stepForm;
  if (currentStep === 1)
    stepForm = (
      <HouseDetailsForm
        form={form}
        setForm={setForm}
        onNext={() => setCurrentStep(2)}
      />
    );
  else if (currentStep === 2)
    stepForm = (
      <HouseSpecificationsForm
        form={form}
        setForm={setForm}
        onBack={() => setCurrentStep(1)}
        onNext={() => setCurrentStep(3)}
      />
    );
  else if (currentStep === 3)
    stepForm = (
      <ImagesUploaderForm
       form={form}
        setForm={setForm}
        onBack={() => setCurrentStep(2)}
        onNext={() => setCurrentStep(4)}
      />
    );
  else if (currentStep === 4)
    stepForm = (
      <ContactInfoForm
        form={form}
        setForm={setForm}
        onBack={() => setCurrentStep(3)}
        onNext={() => setCurrentStep(5)}
      />
    );
  else if (currentStep === 5)
    stepForm = (
      <PreviewSubmitForm
        form={form}
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
        <div className="bg-white rounded-xl shadow border border-[#e8eaf6] w-full max-w-7xl p-8 mb-12">
          {stepForm}
        </div>
      </div>
    </div>
  );
}

export default AddListing;
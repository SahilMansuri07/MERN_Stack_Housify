import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImagesUploaderForm({ form, setForm, onBack, onNext }) {
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = files => {
    const filesArr = Array.from(files).slice(0, 10 - form.images.length);
    const newImages = filesArr.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 10)
    }));
  };

  const handleRemoveImage = idx => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const onImageDrop = e => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-xl font-bold text-[#1e293b] mb-2">Upload Images</h2>
      <p className="text-gray-500 mb-6">
        Upload high-quality images of your property. You can upload up to 10 images.
      </p>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-44 mb-7 transition ${dragActive ? "border-blue-400 bg-blue-50" : "border-[#e8eaf6]"}`}
        onDragOver={e => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={e => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={onImageDrop}
      >
        <FaCloudUploadAlt className="text-4xl text-[#1e293b] mb-2 mt-2" />
        <p className="font-semibold text-[#1e293b]">Drag & Drop Images Here</p>
        <span className="text-gray-500 text-sm mb-2">or</span>
        <label className="px-4 py-2 border border-blue-600 text-blue-600 rounded font-semibold cursor-pointer hover:bg-blue-50">
          Browse Files
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={e => handleImageUpload(e.target.files)}
          />
        </label>
        <span className="text-xs text-gray-400 mt-2">
          Recommended: JPG, PNG. Max size: 5MB per image
        </span>
      </div>

      {/* Uploaded Images Preview */}
      <div className="bg-[#f6f7fa] rounded-md p-4 mb-7">
        <p className="text-[#1e293b] font-medium mb-2">
          Uploaded Images
          <span className="text-gray-500 font-normal ml-2 text-sm">
            Drag to reorder. First image will be the featured image.
          </span>
        </p>
        <div className="flex flex-wrap gap-4">
          {form.images.length === 0 && (
            <span className="text-gray-500 text-sm">No images uploaded yet.</span>
          )}
          {form.images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 rounded overflow-hidden border border-[#e8eaf6] bg-white flex-shrink-0"
            >
              <img
                src={img.url || img}
                alt={`upload-${idx}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs px-1 py-0.5 rounded-bl rounded-br text-center">
                  Featured
                </span>
              )}
              <button
                type="button"
                className="absolute top-1 right-1 bg-white rounded-full text-red-500 font-bold px-1"
                onClick={() => handleRemoveImage(idx)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-[#e8eaf6] rounded font-semibold text-[#1e293b] hover:bg-gray-100 bg-white"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition"
        >
          Continue to Contact Info
        </button>
      </div>
    </form>
  );
}

export default ImagesUploaderForm;

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MultiImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({ onImagesChange, maxImages = 4 }: MultiImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (previewImages.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const updatedImages = [...previewImages, ...newImages];
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages.map(img => img.file));
  };

  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages.map(img => img.file));
  };

  return (
    <div className="space-y-4">
      {/* Image preview grid */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {previewImages.length < maxImages && (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (max {maxImages} images)</p>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              multiple={previewImages.length < maxImages}
            />
          </label>
        </div>
      )}
    </div>
  );
}

import React, { useState, useRef } from 'react';

interface FileUploadAreaProps {
  selectedFile: File | null;
  isProcessing: boolean;
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  selectedFile,
  isProcessing,
  onFileSelect,
  onFileClear,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!isProcessing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = () => {
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    preventDefaults(e);
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && !isProcessing) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const getUploadAreaClass = () => {
    let baseClass = "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 bg-gray-50";
    
    if (isDragging) {
      baseClass += " border-primary bg-primary/10";
    } else if (selectedFile) {
      baseClass += " border-success bg-success/5";
    } else {
      baseClass += " border-gray-200";
    }
    
    return baseClass;
  };

  return (
    <div className="w-full">
      <label className="block mb-3 font-medium text-gray-700 flex items-center">
        <i className="fas fa-file-excel mr-2"></i>
        Upload File
      </label>
      
      <div 
        className={getUploadAreaClass()}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={preventDefaults}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile && (
          <button 
            className="absolute top-2 right-2 text-error text-xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              onFileClear();
            }}
            title="Clear selected file"
          >
            <i className="fas fa-times-circle"></i>
          </button>
        )}
        
        <i className="fas fa-cloud-upload-alt text-primary text-4xl mb-4 opacity-85"></i>
        <p className="text-gray-500 mb-1">Drag & drop your Excel/CSV file here</p>
        <p className="text-gray-500 mb-4">or click to browse</p>
        
        <p className="font-semibold text-primary-dark truncate px-2">
          {selectedFile ? selectedFile.name : "No file selected"}
        </p>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx, .xls, .csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadArea;
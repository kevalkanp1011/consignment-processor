import React from 'react';

interface ResultItemProps {
  consignmentNumber: string;
  status: 'success' | 'error';
  message: string;
  trackingUrl?: string;
  pdfUrl?: string;
  screenshotUrl?: string;
}

const ResultItem: React.FC<ResultItemProps> = ({
  consignmentNumber,
  status,
  message,
  trackingUrl,
  pdfUrl,
  screenshotUrl
}) => {
  const statusClass = status === 'success' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';
    
  const statusText = status === 'success' ? 'Success' : 'Error';
  const iconClass = status === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show toast would be handled in parent component
    });
  };

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <i className="fas fa-truck text-indigo-600"></i>
        <h3 className="font-bold text-lg text-gray-900">{consignmentNumber}</h3>
      </div>
      
      <span className={`${statusClass} px-3 py-1 rounded-full text-sm font-medium inline-block mb-3`}>
        {statusText}
      </span>
      
      <p className="text-gray-700 mb-4">{message}</p>
      
      {trackingUrl && (
        <div className="flex items-center gap-3 mb-2">
          <span className="font-medium text-gray-700 min-w-[100px]">Tracking URL:</span>
          <a 
            href={trackingUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate"
          >
            {trackingUrl}
          </a>
          <button 
            onClick={() => copyToClipboard(trackingUrl)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
      )}
      
      {pdfUrl && (
        <div className="flex items-center gap-3 mb-2">
          <span className="font-medium text-gray-700 min-w-[100px]">PDF Link:</span>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate"
          >
            {pdfUrl}
          </a>
          <button 
            onClick={() => copyToClipboard(pdfUrl)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
      )}
      
      {screenshotUrl && (
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 min-w-[100px]">Screenshot:</span>
          <a 
            href={screenshotUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline truncate"
          >
            {screenshotUrl}
          </a>
          <button 
            onClick={() => copyToClipboard(screenshotUrl)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultItem;
'use client';

import React, { useState, useRef, useEffect } from 'react';
import FileUploadArea from './components/FileUploadArea';
import HowItWorksCard from './components/HowItWorksCard';
import ResultItem, { ResultItemProps } from './components/ResultItem';
import StatCard from './components/StatCard';
import { showToast } from '../utils/toast';
import { uploadFile } from '@/lib/api';

// Constants
const VALID_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv'
];


export default function Home() {
  // State
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('Processing...');
  const [results, setResults] = useState<ResultItemProps[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0
  });

  // Effects
  useEffect(() => {
    document.title = 'Consignment Processor | Professional Tracking Solution';
  }, []);

  // Handlers
  const handleFileSelect = (file: File) => {
    if (VALID_FILE_TYPES.includes(file.type)) {
      setSelectedFile(file);
    } else {
      showToast('Invalid file type. Please upload Excel (XLS, XLSX) or CSV file.', 'error');
    }
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    showToast('File selection cleared', 'success');
  };

  const updateProgress = (percent: number, statusText = "Processing...") => {
    setProgress(percent);
    setProgressStatus(statusText);
  };

  const processFile = async () => {
    if (!selectedFile) {
      showToast('Please select a file first.', 'error');
      return;
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      showToast('If providing an email, please enter a valid one.', 'error');
      return;
    }

    setIsProcessing(true);
    updateProgress(10, "Uploading file...");

    try {
      const data = await uploadFile(selectedFile, email, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        updateProgress(percent, `Uploading... ${percent}%`);
      });

      updateProgress(100, "File uploaded successfully!");
      showToast(data.message || 'File uploaded successfully.', 'success');

      if (data.results) {
        setResults(data.results);
        const successCount = data.results.filter((r: any) => r.status === 'success').length;
        setStats({
          total: data.results.length,
          success: successCount,
          failed: data.results.length - successCount,
        });
      }

    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Upload failed.";
      showToast(`Upload error: ${message}`, 'error');
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        updateProgress(0);
      }, 3000);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Consignment Processor
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Upload your Excel or CSV file with consignment numbers and receive a detailed tracking report with PDF links and screenshots.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 px-6 font-semibold text-xl flex items-center gap-3">
              <i className="fas fa-file-upload"></i>
              Upload & Process
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="email" className="block mb-3 font-medium text-gray-700 flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <FileUploadArea
                selectedFile={selectedFile}
                isProcessing={isProcessing}
                onFileSelect={handleFileSelect}
                onFileClear={handleFileClear}
              />

              <button
                onClick={processFile}
                disabled={isProcessing}
                className={`mt-6 w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center transition-all ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  }`}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-3"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-3"></i>
                    Process Consignments
                  </>
                )}
              </button>

              {isProcessing && (
                <div className="mt-6">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span>{progressStatus}</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - How It Works */}
          <HowItWorksCard />
        </div>

        {/* Stats Cards */}
        {stats.total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatCard
              title="Total"
              value={stats.total.toString()}
              icon={<i className="fas fa-boxes text-2xl"></i>}
              color="bg-indigo-100 text-indigo-600"
            />
            <StatCard
              title="Success"
              value={stats.success.toString()}
              icon={<i className="fas fa-check-circle text-2xl"></i>}
              color="bg-emerald-100 text-emerald-600"
            />
            <StatCard
              title="Failed"
              value={stats.failed.toString()}
              icon={<i className="fas fa-exclamation-circle text-2xl"></i>}
              color="bg-rose-100 text-rose-600"
            />
          </div>
        )}

        {/* Results Container */}
        {results.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <i className="fas fa-file-contract text-indigo-600"></i>
              Processing Results
            </h3>

            <div className="space-y-5">
              {results.map((result, index) => (
                <ResultItem
                  key={index}
                  consignmentNumber={result.consignmentNumber}
                  status={result.status}
                  message={result.message}
                  trackingUrl={result.trackingUrl}
                  pdfUrl={result.pdfUrl}
                  screenshotUrl={result.screenshotUrl}
                />
              ))}
            </div>
          </div>
        )}

        <footer className="text-center mt-12 pt-6 border-t border-gray-200 text-gray-600">
          <p>© {new Date().getFullYear()} Consignment Processor. All rights reserved. Secure and efficient processing of your shipment data.</p>
        </footer>
      </div>
    </div>
  );
}
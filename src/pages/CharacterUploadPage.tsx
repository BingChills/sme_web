import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Cloud, 
  Home, 
  Grid, 
  User, 
  ShoppingCart,
  MoreVertical, 
  AlertCircle, 
  CheckCircle2,
  Tv,
  Headset,
  X
} from 'lucide-react';

function CharacterUploadPage() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'preview' | 'uploading' | 'complete' | 'error'>('idle');

  const sidebarLinks = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Grid className="w-5 h-5" />, label: 'Manage Characters', path: '/manage-characters' },
    { icon: <Upload className="w-5 h-5" />, label: 'Upload Character', path: '/upload-character' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Change Plan', path: '/pricing' },
    { icon: <User className="w-5 h-5" />, label: 'Business Profile', path: '/profile' },
    { icon: <Headset className="w-5 h-5" />, label: 'Customer Support', path: '/support' }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setUploadStatus('preview');
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmUpload = () => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleCancelUpload = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadStatus('idle');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">Linkz.</span>
          </div>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center px-6 py-3 text-sm ${
                link.path === '/upload-character'
                  ? 'text-purple-600 bg-purple-50 border-r-4 border-purple-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Character Upload</h1>
              <p className="text-gray-500 mt-2">
                Upload your brand mascot or art style that represents your brand
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                {uploadStatus === 'preview' ? (
                  <div className="text-center">
                    <div className="mb-6">
                      <img
                        src={previewUrl!}
                        alt="Preview"
                        className="max-h-96 mx-auto rounded-lg"
                      />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleCancelUpload}
                        className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmUpload}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Confirm Upload
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Upload Your Character</h3>
                      <p className="text-gray-500 mb-4">
                        We will use your uploaded brand represented character as the
                        references for our virtual character design & creation
                      </p>
                    </div>

                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                    
                    <label
                      htmlFor="fileInput"
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                    >
                      <Cloud className="w-5 h-5 mr-2" />
                      Upload Now
                    </label>

                    <p className="text-xs text-gray-500 mt-4">
                      PNG, JPG and PNG files are allowed
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Panel */}
            <div className="space-y-8">
              {/* Upload Status */}
              {(uploadStatus === 'uploading' || uploadStatus === 'complete') && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Character Progress</h3>
                    {uploadStatus === 'complete' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {uploadStatus === 'complete'
                      ? 'Upload Complete!'
                      : "We're processing your character"}
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Guidelines */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Upload Guidelines</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Image should be at least 1024x1024 pixels</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Maximum file size is 10MB</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Character should be clearly visible with good lighting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterUploadPage;
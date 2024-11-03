import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
          throw new Error('No user logged in');
        }
        const response = await fetch(`http://localhost:1337/api/user/${currentUser.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCurrentUserData();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('files', file);

      // First upload to Strapi Media Library
      const uploadResponse = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('uploaded image');
      
      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult[0].url;

      // Update user profile with new image URL
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updateResponse = await fetch(`http://localhost:1337/api/user/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePicture: imageUrl,
        }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update profile');

      const updatedUser = await updateResponse.json();
      setUserData(updatedUser);
      setUploadStatus('success');
    } catch (err) {
      setError(err.message);
      setUploadStatus('error');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (!userData) return <div className="p-4">No user data found</div>;

  return (
    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
      <div className="relative group">
        <div className="mb-4 relative">
          <img
            src={imagePreview || userData.profilePicture || '/api/placeholder/50/50'}
            alt={`${userData.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-700"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm">@{userData.email}</p>
          <p className="text-white text-lg font-bold">{userData.name}</p>
          
          <label className="mt-4 inline-block">
            <Button 
              variant="secondary" 
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Change Profile Picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </label>
        </div>

        {uploadStatus === 'uploading' && (
          <div className="mt-2 text-center text-sm text-blue-400">
            Uploading image...
          </div>
        )}
        
        {uploadStatus === 'success' && (
          <div className="mt-2 text-center text-sm text-green-400">
            Profile picture updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
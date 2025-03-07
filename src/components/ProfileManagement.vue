<template>
  <div class="profile-container">
    <h2 class="title">Profile Management</h2>
    
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="profileImage || 'https://via.placeholder.com/150'" alt="Profile" />
          <label for="profile-upload" class="upload-btn">
            <span>Change Photo</span>
            <input 
              type="file" 
              id="profile-upload" 
              accept="image/*" 
              @change="handleImageUpload" 
              style="display: none"
            />
          </label>
        </div>
        <div class="profile-info">
          <h3>{{ user.name || 'User Name' }}</h3>
          <p>{{ user.email || 'user@example.com' }}</p>
          <p>Role: {{ user.role || 'admin' }}</p>
        </div>
      </div>
      
      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-section">
          <h4>Update Profile Information</h4>
          
          <div class="form-group">
            <input v-model="name" type="text" required class="form-input" />
            <label class="floating-label">Name</label>
          </div>
          
          <div class="form-group">
            <input v-model="email" type="email" required class="form-input" />
            <label class="floating-label">Email</label>
          </div>
        </div>
        
        <div class="form-section">
          <h4>Change Password</h4>
          
          <div class="form-group">
            <input v-model="currentPassword" type="password" class="form-input" />
            <label class="floating-label">Current Password</label>
          </div>
          
          <div class="form-group">
            <input 
              v-model="newPassword" 
              type="password" 
              class="form-input"
              :class="{ 'invalid': newPassword && newPassword.length < 6 }"
            />
            <label class="floating-label">New Password</label>
            <small v-if="newPassword && newPassword.length < 6" class="error-text">
              Password must be at least 6 characters
            </small>
          </div>
          
          <div class="form-group">
            <input 
              v-model="confirmPassword" 
              type="password" 
              class="form-input"
              :class="{ 'invalid': confirmPassword && confirmPassword !== newPassword }"
            />
            <label class="floating-label">Confirm Password</label>
            <small v-if="confirmPassword && confirmPassword !== newPassword" class="error-text">
              Passwords do not match
            </small>
          </div>
        </div>
        
        <div class="navigation-buttons">
          <button type="submit" class="nav-btn submit-btn" :disabled="isSubmitDisabled">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      profileImage: null
    };
  },
  computed: {
    isSubmitDisabled() {
      // Disable submit if passwords don't match or new password is too short
      if (this.newPassword && (this.newPassword.length < 6 || this.newPassword !== this.confirmPassword)) {
        return true;
      }
      
      // Disable if trying to change password but current password is empty
      if ((this.newPassword || this.confirmPassword) && !this.currentPassword) {
        return true;
      }
      
      return false;
    }
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        // Get user ID from token or localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
          return;
        }
        
        // Decode token to get user ID
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const { id } = JSON.parse(jsonPayload);
        
        // Fetch user profile
        const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        this.user = response.data;
        this.name = this.user.name;
        this.email = this.user.email;
        
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Error fetching user profile. Please check console for details.");
      }
    },
    
    async updateProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
          return;
        }
        
        // Prepare update data
        const updateData = {
          name: this.name,
          email: this.email
        };
        
        // Add password update if provided
        if (this.currentPassword && this.newPassword) {
          updateData.currentPassword = this.currentPassword;
          updateData.newPassword = this.newPassword;
        }
        
        // Update profile
        const response = await axios.put(
          `http://localhost:5000/api/auth/profile/${this.user._id}`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        alert("Profile updated successfully!");
        
        // Reset password fields
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
        
        // Refresh user data
        this.fetchUserProfile();
        
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(error.response?.data?.message || "Error updating profile. Please check console for details.");
      }
    },
    
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Check file type
      if (!file.type.match('image.*')) {
        alert("Please select an image file");
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should not exceed 2MB");
        return;
      }
      
      try {
        // Create form data
        const formData = new FormData();
        formData.append('profileImage', file);
        
        const token = localStorage.getItem("token");
        
        // Upload image
        const response = await axios.post(
          `http://localhost:5000/api/auth/profile/${this.user._id}/image`,
          formData,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            } 
          }
        );
        
        // Update profile image
        this.profileImage = response.data.imageUrl;
        alert("Profile image updated successfully!");
        
      } catch (error) {
        console.error("Error uploading profile image:", error);
        alert("Error uploading profile image. Please check console for details.");
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.profile-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  position: relative;
  margin-right: 2rem;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f9fa;
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.profile-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.profile-info p {
  margin: 0.2rem 0;
  color: #6c757d;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h4 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-input.invalid {
  border-color: #dc3545;
}

.floating-label {
  position: absolute;
  left: 10px;
  top: -10px;
  font-size: 0.85rem;
  color: #555;
  background: white;
  padding: 0 5px;
  z-index: 1;
}

.error-text {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
}

.navigation-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.nav-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn {
  background: #28a745;
  color: white;
}
</style>

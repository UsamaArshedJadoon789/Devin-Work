<template>
  <div class="register-container">
    <h2 class="title">Register Resident</h2>
    <form @submit.prevent="register" class="register-form">
      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <!-- Personal Information -->
      <div class="form-section" v-show="currentStep === 0">
        <h3 class="section-title">Personal Information</h3>
        <div class="form-group">
          <select ref="titleSelect" v-model="title" required class="form-input">
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          <label class="floating-label">Title</label>
        </div>
        <div class="form-group">
          <input v-model="name" type="text" required class="form-input" />
          <label class="floating-label">Full Name</label>
        </div>
        <div class="form-group">
          <input v-model="fathersName" type="text" required class="form-input" />
          <label class="floating-label">Father's Name</label>
        </div>
        <div class="form-group">
          <input v-model="nicOrPassport" type="text" required class="form-input" />
          <label class="floating-label">NIC/Passport Number</label>
        </div>
        <div class="form-group">
          <select ref="nationalitySelect" v-model="nationality" required class="form-input">
            <option disabled value="">Select Nationality</option>
            <option v-for="nation in nationalities" :key="nation" :value="nation">
              {{ nation }}
            </option>
          </select>
          <label class="floating-label">Nationality</label>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="form-section" v-show="currentStep === 1">
        <h3 class="section-title">Contact Information</h3>
        <div class="form-group">
          <input v-model="address" type="text" required class="form-input" />
          <label class="floating-label">Address</label>
        </div>
        <div class="form-group">
          <input v-model="city" type="text" required class="form-input" />
          <label class="floating-label">City</label>
        </div>
        <div class="form-group">
          <input v-model="phoneResidence" type="tel" class="form-input" />
          <label class="floating-label">Residence Phone</label>
        </div>
        <div class="form-group">
          <input v-model="phoneOffice" type="tel" class="form-input" />
          <label class="floating-label">Office Phone</label>
        </div>
        <div class="form-group">
          <input v-model="emergencyContact" type="tel" required class="form-input" />
          <label class="floating-label">Emergency Contact</label>
        </div>
      </div>

      <!-- Stay Details -->
      <div class="form-section" v-show="currentStep === 2">
        <h3 class="section-title">Stay Details</h3>
        <div class="form-group">
          <input v-model="stayFrom" type="date" required class="form-input" />
          <label class="floating-label">Stay From</label>
        </div>
        <div class="form-group">
          <input v-model="stayTo" type="date" required class="form-input" />
          <label class="floating-label">Stay To</label>
        </div>
        <div class="form-group">
          <textarea v-model="purposeOfStay" required class="form-input textarea"></textarea>
          <label class="floating-label">Purpose of Stay</label>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="form-section" v-show="currentStep === 3">
        <h3 class="section-title">Additional Information</h3>
        <div class="form-group">
          <select ref="roleSelect" v-model="role" required class="form-input">
            <option value="Guest">Guest</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Staff">Staff</option>
          </select>
          <label class="floating-label">Role</label>
        </div>

        <!-- Student-specific fields -->
        <template v-if="role === 'Student'">
          <div class="form-group">
            <input v-model="registrationNumber" type="text" required class="form-input" />
            <label class="floating-label">Registration Number</label>
          </div>
          <div class="form-group">
            <select ref="departmentSelect" v-model="department" required class="form-input">
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
            <label class="floating-label">Department</label>
          </div>
          <div class="form-group">
            <select ref="semesterSelect" v-model="semester" required class="form-input">
              <option value="">Select Semester</option>
              <option v-for="sem in semesters" :key="sem" :value="sem">
                {{ sem }}
              </option>
            </select>
            <label class="floating-label">Semester</label>
          </div>
        </template>

        <!-- Faculty-specific fields -->
        <template v-if="role === 'Faculty'">
          <div class="form-group">
            <input v-model="employeeId" type="text" required class="form-input" />
            <label class="floating-label">Employee ID</label>
          </div>
          <div class="form-group">
            <select ref="departmentSelect" v-model="department" required class="form-input">
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
            <label class="floating-label">Department</label>
          </div>
        </template>

        <!-- Staff-specific fields -->
        <template v-if="role === 'Staff'">
          <div class="form-group">
            <input v-model="employeeId" type="text" required class="form-input" />
            <label class="floating-label">Employee ID</label>
          </div>
          <div class="form-group">
            <input v-model="organization" type="text" required class="form-input" />
            <label class="floating-label">Organization/Department</label>
          </div>
        </template>

        <!-- Fields common to all roles -->
        <div class="form-group">
          <input v-model="accompaniedBy" type="text" class="form-input" />
          <label class="floating-label">Accompanied By</label>
        </div>
        <div class="form-group">
          <input v-model="relation" type="text" class="form-input" />
          <label class="floating-label">Relation</label>
        </div>
        <div class="form-group">
          <input v-model="referredBy" type="text" class="form-input" />
          <label class="floating-label">Referred By</label>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <button 
          type="button" 
          class="nav-btn prev-btn" 
          v-if="currentStep > 0" 
          @click="previousStep"
        >
          Previous
        </button>
        <button 
          v-if="currentStep < totalSteps - 1" 
          type="button" 
          class="nav-btn next-btn" 
          @click="nextStep"
        >
          Next
        </button>
        <button 
          v-if="currentStep === totalSteps - 1" 
          type="submit" 
          class="nav-btn submit-btn"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/services/api'; // Import the API service

export default {
  data() {
    return {
      currentStep: 0,
      totalSteps: 4,
      title: "Mr",
      name: "",
      fathersName: "",
      nicOrPassport: "",
      nationality: "Pakistan",
      address: "",
      city: "",
      phoneResidence: "",
      phoneOffice: "",
      emergencyContact: "",
      stayFrom: "",
      stayTo: "",
      purposeOfStay: "",
      role: "Guest",
      registrationNumber: "",
      department: "",
      semester: "",
      employeeId: "",
      organization: "",
      accompaniedBy: "",
      relation: "",
      referredBy: "",
      nationalities: [
        'Pakistani',
        'American',
        'British',
        'Canadian',
        'Indian',
        'Australian',
        'Chinese',
        'German',
      ],
      departments: [
        'Computer Science',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Business Administration',
        'Social Sciences',
      ],
      semesters: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
      ],
    };
  },
  computed: {
    progressPercentage() {
      return (this.currentStep / (this.totalSteps - 1)) * 100;
    }
  },
  methods: {
    nextStep() {
      if (this.validateCurrentStep()) {
        this.currentStep = Math.min(this.currentStep + 1, this.totalSteps - 1);
      }
    },
    previousStep() {
      this.currentStep = Math.max(this.currentStep - 1, 0);
    },
    validateCurrentStep() {
      const requiredFieldsByStep = {
        0: ['title', 'name', 'fathersName', 'nicOrPassport', 'nationality'],
        1: ['address', 'city', 'emergencyContact'],
        2: ['stayFrom', 'stayTo', 'purposeOfStay'],
        3: ['role', ...this.getRoleSpecificFields()]
      };

      const fieldsToValidate = requiredFieldsByStep[this.currentStep];
      return fieldsToValidate.every(field => this[field]);
    },
    getRoleSpecificFields() {
      switch (this.role) {
        case 'Student':
          return ['registrationNumber', 'department', 'semester'];
        case 'Faculty':
          return ['employeeId', 'department'];
        case 'Staff':
          return ['employeeId', 'organization'];
        default:
          return [];
      }
    },
    async register() {
      try {
        const response = await api.addResident({
          title: this.title,
          name: this.name,
          fathersName: this.fathersName,
          nicOrPassport: this.nicOrPassport,
          nationality: this.nationality,
          address: this.address,
          city: this.city,
          phoneResidence: this.phoneResidence,
          phoneOffice: this.phoneOffice,
          emergencyContact: this.emergencyContact,
          stayFrom: this.stayFrom,
          stayTo: this.stayTo,
          purposeOfStay: this.purposeOfStay,
          role: this.role,
          registrationNumber: this.registrationNumber,
          department: this.department,
          semester: this.semester,
          employeeId: this.employeeId,
          organization: this.organization,
          accompaniedBy: this.accompaniedBy,
          relation: this.relation,
          referredBy: this.referredBy,
        });

        alert('Resident registered successfully!');
        this.resetForm(); // Reset the form after successful submission
      } catch (error) {
        alert('Error registering resident: ' + error.response.data.message);
      }
    },
    resetForm() {
      // Reset all form fields
      Object.keys(this.$data).forEach(key => {
        if (key !== 'residents') {
          if (key === 'title') this[key] = 'Mr';
          else if (key === 'nationality') this[key] = 'Pakistan';
          else if (key === 'role') this[key] = 'Guest';
          else this[key] = '';
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 600px;
  width: 100%;
  margin: 2rem auto;
  padding: 2.5rem 2.5rem 2.5rem 4rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 4rem);
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.form-group {
  position: relative;
  margin-top: 1rem;
}

.form-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.textarea {
  min-height: 100px;
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

.floating-label-active {
  top: -15px;
  font-size: 0.85rem;
  color: #007bff;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #f4f4f4;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background: #007bff;
  border-radius: 5px;
}

.navigation-buttons {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-btn {
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  min-width: 100px;
}

.prev-btn {
  background: #6c757d;
  color: white;
}

.next-btn, .submit-btn {
  background: #007bff;
  color: white;
}

.submit-btn {
  background: #28a745;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
}

/* Tom Select Custom Styles */
:deep(.ts-control) {
  margin-top: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  min-height: 47px;
  background-color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

:deep(.ts-control:hover) {
  border-color: #aaa;
}

:deep(.ts-control.focus) {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

:deep(.ts-control input) {
  font-size: 1.1rem;
  color: #333;
}

:deep(.ts-dropdown) {
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  background: #fff;
}

:deep(.ts-dropdown .option) {
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

:deep(.ts-dropdown .option:hover) {
  background-color: #f0f7ff;
}

:deep(.ts-dropdown .active) {
  background-color: #007bff;
  color: white;
}

:deep(.ts-dropdown .create) {
  padding: 0.75rem 1rem;
  color: #666;
}

:deep(.ts-wrapper.multi .ts-control .item) {
  background: #e9ecef;
  color: #333;
  border-radius: 3px;
  padding: 2px 8px;
  margin: 2px 4px 2px 0;
}

:deep(.ts-wrapper.has-items .ts-control input) {
  margin: 4px 0;
}

:deep(.ts-wrapper.disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

:deep(.ts-control .item) {
  color: #333;
}

:deep(.ts-wrapper) {
  padding-top: 0.5rem;
}
</style>

<template>
  <div class="payment-container">
    <h2 class="title">Payment Management</h2>
    
    <div class="payment-actions">
      <button @click="showAddPaymentForm = true" class="action-btn add-btn">
        <span>Add New Payment</span>
      </button>
      
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by resident name or room number..." 
          class="search-input"
          @input="filterPayments"
        />
      </div>
    </div>
    
    <!-- Add Payment Modal -->
    <div v-if="showAddPaymentForm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Payment</h3>
          <button @click="showAddPaymentForm = false" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="addPayment" class="payment-form">
          <div class="form-group">
            <select v-model="newPayment.residentId" required class="form-input">
              <option value="" disabled>Select Resident</option>
              <option v-for="resident in residents" :key="resident._id" :value="resident._id">
                {{ resident.name }}
              </option>
            </select>
            <label class="floating-label">Resident</label>
          </div>
          
          <div class="form-group">
            <select v-model="newPayment.roomId" required class="form-input">
              <option value="" disabled>Select Room</option>
              <option v-for="room in rooms" :key="room._id" :value="room._id">
                {{ room.number }} ({{ room.hall }}, {{ room.floor }})
              </option>
            </select>
            <label class="floating-label">Room</label>
          </div>
          
          <div class="form-group">
            <input v-model="newPayment.amount" type="number" required class="form-input" />
            <label class="floating-label">Amount (PKR)</label>
          </div>
          
          <div class="form-group">
            <input v-model="newPayment.paymentDate" type="date" required class="form-input" />
            <label class="floating-label">Payment Date</label>
          </div>
          
          <div class="form-group">
            <select v-model="newPayment.paymentMethod" required class="form-input">
              <option value="" disabled>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Online Payment">Online Payment</option>
            </select>
            <label class="floating-label">Payment Method</label>
          </div>
          
          <div class="form-group">
            <input v-model="newPayment.receiptNumber" type="text" required class="form-input" />
            <label class="floating-label">Receipt Number</label>
          </div>
          
          <div class="form-group">
            <select v-model="newPayment.status" required class="form-input">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <label class="floating-label">Status</label>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="showAddPaymentForm = false" class="cancel-btn">
              Cancel
            </button>
            <button type="submit" class="submit-btn">
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Payments Table -->
    <div class="payments-table">
      <table v-if="filteredPayments.length > 0">
        <thead>
          <tr>
            <th>Receipt #</th>
            <th>Resident</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment._id" :class="{ 'completed': payment.status === 'completed', 'pending': payment.status === 'pending', 'failed': payment.status === 'failed' }">
            <td>{{ payment.receiptNumber }}</td>
            <td>{{ getResidentName(payment.residentId) }}</td>
            <td>{{ getRoomNumber(payment.roomId) }}</td>
            <td>{{ payment.amount }} PKR</td>
            <td>{{ formatDate(payment.paymentDate) }}</td>
            <td>{{ payment.paymentMethod }}</td>
            <td>
              <span class="status-badge" :class="payment.status">
                {{ payment.status.charAt(0).toUpperCase() + payment.status.slice(1) }}
              </span>
            </td>
            <td>
              <button @click="editPayment(payment)" class="action-icon edit">✏️</button>
              <button @click="deletePayment(payment._id)" class="action-icon delete">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">
        <p>No payments found</p>
      </div>
    </div>
    
    <!-- Edit Payment Modal -->
    <div v-if="showEditPaymentForm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Payment</h3>
          <button @click="showEditPaymentForm = false" class="close-btn">&times;</button>
        </div>
        
        <form @submit.prevent="updatePayment" class="payment-form">
          <div class="form-group">
            <select v-model="editedPayment.residentId" required class="form-input">
              <option value="" disabled>Select Resident</option>
              <option v-for="resident in residents" :key="resident._id" :value="resident._id">
                {{ resident.name }}
              </option>
            </select>
            <label class="floating-label">Resident</label>
          </div>
          
          <div class="form-group">
            <select v-model="editedPayment.roomId" required class="form-input">
              <option value="" disabled>Select Room</option>
              <option v-for="room in rooms" :key="room._id" :value="room._id">
                {{ room.number }} ({{ room.hall }}, {{ room.floor }})
              </option>
            </select>
            <label class="floating-label">Room</label>
          </div>
          
          <div class="form-group">
            <input v-model="editedPayment.amount" type="number" required class="form-input" />
            <label class="floating-label">Amount (PKR)</label>
          </div>
          
          <div class="form-group">
            <input v-model="editedPayment.paymentDate" type="date" required class="form-input" />
            <label class="floating-label">Payment Date</label>
          </div>
          
          <div class="form-group">
            <select v-model="editedPayment.paymentMethod" required class="form-input">
              <option value="" disabled>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Online Payment">Online Payment</option>
            </select>
            <label class="floating-label">Payment Method</label>
          </div>
          
          <div class="form-group">
            <input v-model="editedPayment.receiptNumber" type="text" required class="form-input" />
            <label class="floating-label">Receipt Number</label>
          </div>
          
          <div class="form-group">
            <select v-model="editedPayment.status" required class="form-input">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <label class="floating-label">Status</label>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="showEditPaymentForm = false" class="cancel-btn">
              Cancel
            </button>
            <button type="submit" class="submit-btn">
              Update Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      payments: [],
      filteredPayments: [],
      residents: [],
      rooms: [],
      searchQuery: "",
      showAddPaymentForm: false,
      showEditPaymentForm: false,
      newPayment: {
        residentId: "",
        roomId: "",
        amount: 0,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "",
        receiptNumber: "",
        status: "pending"
      },
      editedPayment: {
        _id: "",
        residentId: "",
        roomId: "",
        amount: 0,
        paymentDate: "",
        paymentMethod: "",
        receiptNumber: "",
        status: ""
      }
    };
  },
  mounted() {
    this.fetchPayments();
    this.fetchResidents();
    this.fetchRooms();
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await axios.get("http://localhost:5000/api/payments");
        this.payments = response.data;
        this.filteredPayments = [...this.payments];
      } catch (error) {
        console.error("Error fetching payments:", error);
        alert("Error fetching payments. Please check console for details.");
      }
    },
    
    async fetchResidents() {
      try {
        const response = await axios.get("http://localhost:5000/api/residents");
        this.residents = response.data;
      } catch (error) {
        console.error("Error fetching residents:", error);
        alert("Error fetching residents. Please check console for details.");
      }
    },
    
    async fetchRooms() {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        this.rooms = response.data;
      } catch (error) {
        console.error("Error fetching rooms:", error);
        alert("Error fetching rooms. Please check console for details.");
      }
    },
    
    filterPayments() {
      if (!this.searchQuery) {
        this.filteredPayments = [...this.payments];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      
      this.filteredPayments = this.payments.filter(payment => {
        const resident = this.residents.find(r => r._id === payment.residentId);
        const room = this.rooms.find(r => r._id === payment.roomId);
        
        return (
          (resident && resident.name.toLowerCase().includes(query)) ||
          (room && room.number.toLowerCase().includes(query)) ||
          payment.receiptNumber.toLowerCase().includes(query) ||
          payment.paymentMethod.toLowerCase().includes(query) ||
          payment.status.toLowerCase().includes(query)
        );
      });
    },
    
    async addPayment() {
      try {
        const response = await axios.post("http://localhost:5000/api/payments/add", this.newPayment);
        
        alert("Payment added successfully!");
        this.showAddPaymentForm = false;
        this.resetNewPaymentForm();
        this.fetchPayments();
      } catch (error) {
        console.error("Error adding payment:", error);
        alert("Error adding payment. Please check console for details.");
      }
    },
    
    editPayment(payment) {
      this.editedPayment = { ...payment };
      
      // Format date for input
      if (this.editedPayment.paymentDate) {
        const date = new Date(this.editedPayment.paymentDate);
        this.editedPayment.paymentDate = date.toISOString().split("T")[0];
      }
      
      this.showEditPaymentForm = true;
    },
    
    async updatePayment() {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/payments/${this.editedPayment._id}`,
          this.editedPayment
        );
        
        alert("Payment updated successfully!");
        this.showEditPaymentForm = false;
        this.fetchPayments();
      } catch (error) {
        console.error("Error updating payment:", error);
        alert("Error updating payment. Please check console for details.");
      }
    },
    
    async deletePayment(paymentId) {
      if (!confirm("Are you sure you want to delete this payment?")) return;
      
      try {
        const response = await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
        
        alert("Payment deleted successfully!");
        this.fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Error deleting payment. Please check console for details.");
      }
    },
    
    resetNewPaymentForm() {
      this.newPayment = {
        residentId: "",
        roomId: "",
        amount: 0,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "",
        receiptNumber: "",
        status: "pending"
      };
    },
    
    getResidentName(residentId) {
      const resident = this.residents.find(r => r._id === residentId);
      return resident ? resident.name : "Unknown";
    },
    
    getRoomNumber(roomId) {
      const room = this.rooms.find(r => r._id === roomId);
      return room ? `${room.number} (${room.hall})` : "Unknown";
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.payment-container {
  max-width: 1200px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
}

.payment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-btn {
  background-color: #28a745;
  color: white;
}

.search-container {
  flex: 1;
  max-width: 500px;
  margin-left: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.payments-table {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tr:hover {
  background-color: #f8f9fa;
}

tr.completed {
  background-color: rgba(40, 167, 69, 0.1);
}

tr.pending {
  background-color: rgba(255, 193, 7, 0.1);
}

tr.failed {
  background-color: rgba(220, 53, 69, 0.1);
}

.status-badge {
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: capitalize;
}

.status-badge.completed {
  background-color: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.status-badge.pending {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.status-badge.failed {
  background-color: rgba(220, 53, 69, 0.2);
  color: #dc3545;
}

.action-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: #6c757d;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.payment-form {
  padding: 1.5rem;
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
  background-color: white;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.submit-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
</style>

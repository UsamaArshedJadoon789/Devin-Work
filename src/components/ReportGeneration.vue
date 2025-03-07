<template>
  <div class="report-container">
    <h2 class="report-title">Generate Report</h2>

    <!-- Report Controls -->
    <div class="report-controls">
      <div class="control-group">
        <label for="reportType">Report Type</label>
        <select id="reportType" v-model="selectedReportType">
          <option value="income">Income Report</option>
          <option value="occupancy">Occupancy Report</option>
        </select>
      </div>

      <div class="control-group">
        <label for="hall">Select Hall</label>
        <select id="hall" v-model="selectedHall">
          <option value="all">All Halls</option>
          <option v-for="hall in halls" :key="hall.id" :value="hall.id">
            {{ hall.name }}
          </option>
        </select>
      </div>

      <div class="date-controls">
        <div class="control-group">
          <label for="startDate">Start Date</label>
          <input id="startDate" type="date" v-model="startDate" />
        </div>
        <div class="control-group">
          <label for="endDate">End Date</label>
          <input id="endDate" type="date" v-model="endDate" />
        </div>
      </div>

      <button class="generate-btn" @click="generateReport">Generate Report</button>
      <button v-if="reports.length > 0" class="pdf-btn" @click="downloadPDF">Download PDF</button>
    </div>

    <!-- Report Table -->
    <div v-if="reports.length > 0" id="report-section" class="report-table">
      <h3>Generated Reports</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Hall</th>
            <th>Date Range</th>
            <th v-if="selectedReportType === 'income'">Total Income (PKR)</th>
            <th v-if="selectedReportType === 'occupancy'">Total Occupancy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report._id">
            <td>{{ report.title }}</td>
            <td>{{ report.hall }}</td>
            <td>{{ report.dateRange }}</td>
            <td v-if="selectedReportType === 'income'">{{ report.income }} PKR</td>
            <td v-if="selectedReportType === 'occupancy'">{{ report.occupancy }} Residents</td>
            <td><button class="delete-btn" @click="deleteReport(report._id)">🗑️ Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No reports available</p>
  </div>
</template>

<script>
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      selectedReportType: "income",
      selectedHall: "all",
      startDate: "",
      endDate: "",
      reports: [],
      halls: [
        { id: 1, name: "Jinnah Hall" },
        { id: 2, name: "Liaquat Hall" },
        { id: 3, name: "Bachelors Hall" },
      ],
    };
  },
  async mounted() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await axios.get("http://localhost:5000/api/reports");
        if (!Array.isArray(response.data)) throw new Error("Invalid response format");

        this.reports = response.data.map(report => ({
          _id: report._id || "N/A",
          title: report.title || "Untitled Report",
          hall: report.hall ? report.hall : "All Halls",
          dateRange: report.startDate && report.endDate 
            ? `${new Date(report.startDate).toLocaleDateString()} to ${new Date(report.endDate).toLocaleDateString()}`
            : "No Date Provided",
          income: report.income ?? "N/A",
          occupancy: report.occupancy ?? "N/A",
        }));

        console.log("Fetched reports:", this.reports);
      } catch (error) {
        console.error("Error fetching reports:", error.message);
        alert("Failed to load reports. Please check the console for details.");
      }
    },

    async deleteReport(reportId) {
      console.log("Attempting to delete report with ID:", reportId);
      if (!reportId) return alert("Error: Report ID is undefined!");

      if (!confirm("Are you sure you want to delete this report?")) return;

      try {
        const response = await axios.delete(`http://localhost:5000/api/reports/${reportId}`);
        if (response.status === 200) {
          alert("Report deleted successfully!");
          this.fetchReports();
        } else {
          alert("Failed to delete report. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Error deleting report. Check console for details.");
      }
    },

    async generateReport() {
      if (!this.startDate || !this.endDate) {
        alert("Please select a date range");
        return;
      }

      const selectedHallName = this.selectedHall === "all"
        ? "All Halls"
        : this.halls.find(hall => hall.id == this.selectedHall)?.name || "Unknown Hall";

      try {
        const response = await axios.post("http://localhost:5000/api/reports/create", {
          title: `${this.selectedReportType} Report`,
          hall: selectedHallName,
          startDate: this.startDate,
          endDate: this.endDate,
          reportType: this.selectedReportType,
        });

        alert("Report generated successfully!");
        this.fetchReports();
      } catch (error) {
        console.error("Error generating report:", error);
        alert("Error generating report. Please check console.");
      }
    },

    downloadPDF() {
      const element = document.getElementById("report-section");
      html2pdf(element, {
        margin: 10,
        filename: "Report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "landscape" },
      });
    },
  },
};
</script>

<style scoped>
/* 📌 Main Container */
.report-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 📌 Title */
.report-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

/* 📌 Controls Section */
.report-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

/* 📌 Control Groups (Label + Input) */
.control-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
}

/* 📌 Fix Date Field Layout */
.date-controls {
  display: flex;
  gap: 15px;
  width: 100%;
  align-items: center;
}

/* 📌 Make sure both date inputs take equal space */
.date-controls .control-group {
  flex: 1; 
  min-width: 150px; /* Prevents collapsing */
}

/* 📌 Responsive Fix - Stack Date Inputs on Small Screens */
@media (max-width: 600px) {
  .date-controls {
    flex-direction: column; /* Stack start & end date */
    gap: 10px;
  }
}


/* 📌 Input & Select Fields */
input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
}

/* 📌 Add Hover & Focus Effects */
input:focus, select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* 📌 Label Styling */
label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

/* 📌 Buttons */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

/* ✅ Green - Generate Report */
button.generate-btn {
  background: #28a745;
}

button.generate-btn:hover {
  background: #218838;
}

button.generate-btn:active {
  background: #1e7e34;
}

/* 🔹 Blue - Download PDF */
button.pdf-btn {
  background: #007bff;
}

button.pdf-btn:hover {
  background: #0056b3;
}

button.pdf-btn:active {
  background: #004494;
}

/* ❌ Red - Delete */
button.delete-btn {
  background: #dc3545;
}

button.delete-btn:hover {
  background: #b52b3b;
}

button.delete-btn:active {
  background: #a2232f;
}

/* 📌 Table Styling */
.report-table {
  margin-top: 20px;
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background: #007bff;
  color: white;
  font-weight: bold;
}

td {
  background: #f8f9fa;
}

tr:hover td {
  background: #e9ecef;
}

/* 📌 Responsive Fixes */
@media (max-width: 768px) {
  .report-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .date-controls {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>




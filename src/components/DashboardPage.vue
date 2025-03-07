<template>
  <div class="dashboard-container">
    <h2 class="dashboard-title">Dashboard</h2>

    <!-- 📌 Statistics Cards (Centered) -->
    <div class="stats">
      <div class="stat-card">
        <span class="stat-label">Total Rooms</span>
        <span class="stat-value">{{ rooms.length }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Available Rooms</span>
        <span class="stat-value">{{ availableRooms.length }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Occupied Rooms</span>
        <span class="stat-value">{{ occupiedRooms.length }}</span>
      </div>
    </div>

    <!-- 📊 Real-Time Occupancy & Income Graph -->
    <div class="chart-container">
      <canvas ref="occupancyChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      rooms: [],
      occupancyHistory: [], // Stores last 10 occupancy data points
      incomeHistory: [], // Stores last 10 income data points
      chartInstance: null, // Chart.js instance
    };
  },
  computed: {
    availableRooms() {
      return this.rooms.filter((room) => room.status === "available");
    },
    occupiedRooms() {
      return this.rooms.filter((room) => room.status === "occupied");
    },
  },
  methods: {
    async fetchDashboardData() {
      try {
        // Fetch rooms
        const roomResponse = await axios.get("http://localhost:5000/api/rooms");
        this.rooms = roomResponse.data.rooms; // Fix: Access the 'rooms' property of the response

        try {
          // Fetch income and occupancy data
          const reportResponse = await axios.get("http://localhost:5000/api/reports");
          const reports = reportResponse.data;

          if (reports && Array.isArray(reports) && reports.length > 0) {
            // Extract last 10 data points
            const last10Reports = reports.slice(-10);
            const incomeData = last10Reports.map(report => report.income || 0);
            const occupancyData = last10Reports.map(report => report.occupancy || 0);
            const labels = last10Reports.map(report => new Date(report.startDate).toLocaleDateString());
            this.incomeHistory = incomeData;
            this.occupancyHistory = occupancyData;
            this.updateChart(labels);
          } else {
            console.warn("⚠ No reports found or invalid response format.");
            // Use default data for the chart
            this.occupancyHistory = [65, 75, 85];
            this.incomeHistory = [45000, 52000, 58000];
            this.updateChart(['Jan', 'Feb', 'Mar']);
          }
        } catch (reportError) {
          console.warn("⚠ Error fetching reports:", reportError);
          // Use default data for the chart
          this.occupancyHistory = [65, 75, 85];
          this.incomeHistory = [45000, 52000, 58000];
          this.updateChart(['Jan', 'Feb', 'Mar']);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },

    updateChart(labels) {
      if (!this.$refs.occupancyChart) {
        console.error("❌ Chart canvas not found!");
        return;
      }

      // Use empty arrays if no data is available
      const occupancyData = this.occupancyHistory.length > 0 ? [...this.occupancyHistory] : [0, 0, 0];
      const incomeData = this.incomeHistory.length > 0 ? [...this.incomeHistory] : [0, 0, 0];
      const chartLabels = labels && labels.length > 0 ? labels : ['Day 1', 'Day 2', 'Day 3'];

      if (this.chartInstance) {
        // ✅ Update dataset values properly
        this.chartInstance.data.labels = chartLabels;
        this.chartInstance.data.datasets[0].data = occupancyData;
        this.chartInstance.data.datasets[1].data = incomeData;

        this.chartInstance.update(); // ✅ Refresh the chart properly
        return;
      }

      console.log("✅ Initializing Chart...");

      const ctx = this.$refs.occupancyChart.getContext("2d");
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Occupancy",
              data: occupancyData,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: true,
            },
            {
              label: "Income (PKR)",
              data: incomeData,
              borderColor: "#dc2626",
              backgroundColor: "rgba(220, 38, 38, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                font: { size: 14 },
                color: "#333",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.8)",
              titleFont: { size: 16 },
              bodyFont: { size: 14 },
              padding: 10,
              cornerRadius: 8,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#555", font: { size: 12 } },
            },
            y: {
              grid: { color: "rgba(200, 200, 200, 0.3)" },
              ticks: { color: "#555", font: { size: 12 } },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.fetchDashboardData();
    setInterval(this.fetchDashboardData, 5000); // Update every 5 seconds
  },
};
</script>

<style scoped>
/* 📌 Dashboard Container */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

/* 📌 Title */
.dashboard-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
  background: linear-gradient(to right, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 📌 Statistics Cards */
.stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 260px;
  text-align: center;
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.stat-label {
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3748;
}

/* 📊 Chart Styling */
.chart-container {
  margin-top: 2rem;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 950px;
  margin: auto;
}

/* 📌 Responsive Design */
@media (max-width: 768px) {
  .stats {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    width: 90%;
  }
}
</style>

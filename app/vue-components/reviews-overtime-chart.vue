<template>
  <div v-if="error">
    <Error />
  </div>
  <div v-else-if="isloading">
    <h2>loading...</h2>
  </div>
  <div class="c-chart__container" v-else>
    <label for="start-date">Start Date:</label>
    <input
      type="date"
      v-model="startDate"
      id="start-date"
      @change="filterData"
    />

    <label for="end-date">End Date:</label>
    <input type="date" v-model="endDate" id="end-date" @change="filterData" />
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import Error from "./error.vue";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
    Error,
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.filterData();
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      chartData: [],
      filteredData: [],
      isloading: false,
      error: false,
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          left: "center",
          top: "bottom",
          text: "Reviews Overtime",
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "60px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
        visualMap: {
          left: "right",
          top: "top",
          min: 0,
          max: 100,
          pieces: [
            {
              gte: 0,
              lt: 1,
              color: "#DE3842",
            },
            {
              gte: 1,
              lt: 2,
              color: "#F3B00A",
            },
            {
              gte: 2,
              lt: 3,
              color: "#FFDE48",
            },
            {
              gte: 3,
              lt: 4,
              color: "#25C55B",
            },
            {
              gte: 4,
              lt: 5,
              color: "#219B51",
            },
          ],
        },
      };
    },

    xAxisData() {
      return this.filteredData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.filteredData.map((item) => item.value);
    },
  },

  methods: {
    formatDate(dateInMs) {
      const date = new Date(dateInMs);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
    toISOString(date_ms) {
      const date = new Date(date_ms);
      return date.toISOString().substr(0, 10);
    },

    fetchData() {
      this.isloading = true;
      fetch("https://frontend-task.instabug-dev.com/api/web/reviews_overall")
        .then((res) =>
          res.json().then(({ data }) => {
            this.chartData = data;
            this.filteredData = data;
            this.isloading = false;
            const firstItem = data[0];
            const lastItem = data[data.length - 1];
            if (firstItem) this.startDate = this.toISOString(firstItem.date_ms);
            if (lastItem) this.endDate = this.toISOString(lastItem.date_ms);
          })
        )
        .catch((e) => {
          this.error = true;
          this.isloading = false;
        });
    },
    filterData() {
      if (this.startDate && this.endDate) {
        const startTimestamp = new Date(this.startDate).getTime();
        const endTimestamp = new Date(this.endDate).getTime();

        // Filter the data points based on the selected date range
        this.filteredData = this.chartData.filter((item) => {
          return item.date_ms >= startTimestamp && item.date_ms <= endTimestamp;
        });
      } else {
        // If no date range is selected, show all data
        this.filteredData = this.chartData;
      }
    },
  },
};
</script>

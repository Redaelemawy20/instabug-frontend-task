<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from "moment";
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
  },

  data() {
    return {
      chartData: [
        {
          date_ms: 1641772800000,
          value: 4.2,
        },
        {
          date_ms: 1641859200000,
          value: 3.33,
        },
        {
          date_ms: 1641945600000,
          value: 3.93,
        },
        {
          date_ms: 1642032000000,
          value: 4.31,
        },
        {
          date_ms: 1642118400000,
          value: 5,
        },
        {
          date_ms: 1642204800000,
          value: 2.88,
        },
        {
          date_ms: 1642291200000,
          value: 3.7,
        },
      ],
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
          left: 'center',
          top: 'bottom',
          text: 'Reviews Overtime'
        },
        tooltip: {
          trigger: 'axis',
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
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => item.value);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
  },
};
</script>

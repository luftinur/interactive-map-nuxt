<template>
  <div ref="visitorChart" class="w-full h-64"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as Highcharts from "highcharts";

const chartProps = defineProps<{
  title: string;
  data: number[];
  category: string;
  categories: string[];
}>();

const visitorChart = ref<HTMLDivElement | null>(null);

const renderChart = () => {
    if (!visitorChart.value) return;
        Highcharts.chart(visitorChart.value, {
            chart: {
            type: "column",
            },
            title: {
                text: "Jumlah Kunjungan",
            },
            subtitle:{
                text: "per Tahun",
            },
            xAxis: {
            categories: chartProps.categories,
            },
            yAxis: {
            title: { text: "" },
            },
            series: [
            {
                name: "Jumlah Pengunjung",
                type: "column",
                data: chartProps.data,
            },
            ],
    });
};


onMounted(renderChart);

watch(() => [chartProps.data, chartProps.categories, chartProps.category, chartProps.title], renderChart);



</script>

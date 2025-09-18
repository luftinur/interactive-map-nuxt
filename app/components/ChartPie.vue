<template>
    <div ref="chart"></div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as Highcharts from "highcharts";

const chartProps = defineProps<{
  title: string
  citizens: {domestic: number; international: number}
}>();

const chart = ref<HTMLDivElement | null>(null);

const renderChart = () => {
    if (!chart.value) return;
        Highcharts.chart(chart.value, {
            chart: {
            type: "pie",
            },
            title: {
                text: "Tipe Wisatawan",
            },
            series: [
            {
                name: "Jumlah",
                type: "pie",
                data: [
                    {name: 'Domestik', y: chartProps.citizens.domestic},
                    {name: 'Mancanegara', y: chartProps.citizens.international}
                ]
            },
            ],
    });
};


onMounted(renderChart);

watch(() => [chartProps.citizens, chartProps.title], renderChart);



</script>
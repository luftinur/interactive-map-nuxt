import { defineNuxtPlugin } from "#app";
import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("L", L);
});
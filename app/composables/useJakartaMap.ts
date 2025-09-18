import {ref, reactive, onMounted} from 'vue';

export interface FeatureProps{
    name: string, 
    category: string,
    visitors: Record<string, number>
}

export interface Feature{
    type: string, 
    properties: FeatureProps,
    geometry:  {type: string; coordinates: [number, number]}
}

export interface GeoJSON{
    type: string, 
    features: Feature[]
}

export function useJakartaMap(mapContainer: Ref<HTMLDivElement | null>)
{
   

    const preloader = ref(true);
    const dialog = reactive({
        visible: false,
        data: null as FeatureProps | null
    })
    
    onMounted(async () => {
        if(!mapContainer.value) return;
        // const {$L} = useNuxtApp();
        // const L = $L as any;
        // const L = await import("leaflet");
        const L = (await import("leaflet")).default;
        await import("leaflet.markercluster");
        await import("leaflet/dist/leaflet.css");
        await import("leaflet.markercluster/dist/MarkerCluster.css");
        await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

        const res = await fetch('/jakarta.json');
        const data: GeoJSON = await res.json();

        const map = L.map(mapContainer.value!, {
            center: [-6.2088, 106.8456] as L.LatLngTuple,
            zoom: 12,
            minZoom: 11,
            maxZoom: 18,
            scrollWheelZoom: true,
            maxBounds: [
                [-6.4, 106.6],
                [-5.9, 107.1],
            ] as L.LatLngBoundsExpression,
            maxBoundsViscosity: 1.0,
            zoomControl: false,
        });

        const customMarker = L.icon({
            iconUrl:'/custom-pin.png',
            iconSize: [32, 48], 
            iconAnchor: [16, 16], 
        });


        L.control.zoom({
            position: 'bottomleft'
        }).addTo(map);

        L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
            attribution: '&copy; Carto &copy; OpenStreetMap',
            subdomains: 'abcd',
            maxZoom: 19,
        }
        ).addTo(map);

        const markers = (L as any).markerClusterGroup();

        data.features.forEach((f:any) => {
            const [lang, lat] = f.geometry.coordinates;
            const marker = L.marker([lat, lang], { icon: customMarker });

            marker.on("click", () => {
                dialog.visible = true;
                dialog.data = f.properties;
            });

            markers.addLayer(marker);
         })

        markers.addTo(map);
         // data.features.forEach((feature) => {
        // const [lng, lat] = feature.geometry.coordinates
        //     L.marker([lat, lng])
        //         .addTo(map)
        //         .bindPopup(
        //         `<b>${feature.properties.name}</b><br>Category: ${feature.properties.category}<br>Visitors 2022: ${feature.properties.visitors['2022']}`)
        // });
        preloader.value = false;
    });

    return { preloader, dialog }
}
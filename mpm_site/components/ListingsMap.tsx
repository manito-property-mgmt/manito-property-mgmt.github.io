"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";

export interface MapListing {
  id: number;
  title: string;
  address: string;
  rent: string;
  rent_numeric: number;
  bed_bath: string;
  sqft: string;
  available: string;
  image: string;
  latitude?: number | null;
  longitude?: number | null;
  detail_url?: string;
}

interface ListingsMapProps {
  listings: MapListing[];
  selectedId: number | null;
  onSelectListing: (listing: MapListing) => void;
  className?: string;
}

export default function ListingsMap({
  listings,
  selectedId,
  onSelectListing,
  className = "w-full h-full min-h-[480px]",
}: ListingsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: number]: L.Marker }>({});

  // Map initialization and unmount cleanup
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [47.6588, -117.426], // Spokane, WA
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when listings, selectedId, or callback changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const validListings = listings.filter(
      (l) => l.latitude && l.longitude && !isNaN(l.latitude) && !isNaN(l.longitude)
    );

    if (validListings.length === 0) return;

    const bounds = L.latLngBounds([]);

    validListings.forEach((item) => {
      const lat = item.latitude!;
      const lng = item.longitude!;
      bounds.extend([lat, lng]);

      const isSelected = item.id === selectedId;

      // Custom real estate pill marker
      const customIcon = L.divIcon({
        className: "custom-property-pin",
        html: `
          <div style="
            background: ${isSelected ? "#1e293b" : "#415161"};
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 9999px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            white-space: nowrap;
            cursor: pointer;
            transform: ${isSelected ? "scale(1.15)" : "scale(1)"};
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 3px;
          ">
            <span>${item.rent || "Available"}</span>
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Lightweight tooltip on hover (non-intrusive, doesn't pull up listing)
      marker.bindTooltip(
        `<div style="font-family: inherit; font-size: 11px; font-weight: 600; padding: 2px 4px;">${item.rent} &bull; ${item.address}</div>`,
        { direction: "top", offset: [0, -14], opacity: 0.95 }
      );

      // Clicking marker filters to the listing on the right-hand side
      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectListing(item);
      });

      markersRef.current[item.id] = marker;
    });

    if (validListings.length > 0 && !selectedId) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [listings, onSelectListing, selectedId]);

  // When selectedId changes, gently pan to marker
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedId) return;
    const marker = markersRef.current[selectedId];
    if (marker) {
      const map = mapInstanceRef.current;
      map.panTo(marker.getLatLng(), { animate: true, duration: 0.4 });
    }
  }, [selectedId]);

  return (
    <div className={`relative ${className} rounded-xl overflow-hidden shadow-inner border border-slate-200 z-0`}>
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: "inherit" }} />
    </div>
  );
}

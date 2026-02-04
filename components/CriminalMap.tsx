import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para icones do Leaflet no React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Dados simulados de criminalidade (Mancha Criminal)
const crimeData = [
    { id: 1, ra: "Ceilândia", lat: -15.819, lng: -48.110, severity: 0.8, type: "CVLI" },
    { id: 2, ra: "Plano Piloto", lat: -15.793, lng: -47.882, severity: 0.4, type: "Furto" },
    { id: 3, ra: "Taguatinga", lat: -15.833, lng: -48.056, severity: 0.6, type: "Roubo" },
    { id: 4, ra: "Samambaia", lat: -15.873, lng: -48.085, severity: 0.7, type: "CVLI" },
];

const CriminalMap: React.FC = () => {
    return (
        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg border border-slate-200">
            <MapContainer
                center={[-15.793, -47.882]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {crimeData.map((crime) => (
                    <CircleMarker
                        key={crime.id}
                        center={[crime.lat, crime.lng]}
                        radius={20 * crime.severity}
                        pathOptions={{
                            color: crime.severity > 0.6 ? '#ef4444' : '#eab308',
                            fillColor: crime.severity > 0.6 ? '#ef4444' : '#eab308',
                            fillOpacity: 0.5
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-slate-800">{crime.ra}</h3>
                                <p className="text-sm text-slate-600">Tipo: {crime.type}</p>
                                <p className="text-sm font-semibold">Severidade: {(crime.severity * 100).toFixed(0)}%</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CriminalMap;

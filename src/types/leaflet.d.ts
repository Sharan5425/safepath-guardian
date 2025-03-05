
declare namespace L {
  class Map {
    constructor(element: HTMLElement | string, options?: MapOptions);
    setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this;
    remove(): this;
    panTo(latlng: LatLngExpression, options?: PanOptions): this;
    setZoom(zoom: number, options?: ZoomOptions): this;
  }

  interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    [key: string]: any;
  }

  interface LatLng {
    lat: number;
    lng: number;
  }

  type LatLngExpression = LatLng | [number, number] | { lat: number; lng: number };

  interface ZoomPanOptions {
    animate?: boolean;
    duration?: number;
    easeLinearity?: number;
    noMoveStart?: boolean;
  }

  interface PanOptions {
    animate?: boolean;
    duration?: number;
    easeLinearity?: number;
    noMoveStart?: boolean;
  }

  interface ZoomOptions {
    animate?: boolean;
  }

  interface CircleOptions {
    radius?: number;
    stroke?: boolean;
    color?: string;
    weight?: number;
    opacity?: number;
    fill?: boolean;
    fillColor?: string;
    fillOpacity?: number;
    dashArray?: string;
    lineCap?: string;
    lineJoin?: string;
    clickable?: boolean;
  }

  interface DivIconOptions {
    html?: string;
    className?: string;
    iconSize?: Point;
    iconAnchor?: Point;
  }

  class Point {
    constructor(x: number, y: number, round?: boolean);
    x: number;
    y: number;
  }

  function map(element: HTMLElement | string, options?: MapOptions): Map;
  function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;
  function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;
  function circle(latlng: LatLngExpression, options?: CircleOptions): Circle;
  function divIcon(options?: DivIconOptions): Icon;

  interface TileLayerOptions {
    attribution?: string;
    maxZoom?: number;
    minZoom?: number;
    [key: string]: any;
  }

  class TileLayer {
    constructor(urlTemplate: string, options?: TileLayerOptions);
    addTo(map: Map): this;
  }

  interface MarkerOptions {
    icon?: Icon;
    clickable?: boolean;
    draggable?: boolean;
    [key: string]: any;
  }

  class Marker {
    constructor(latlng: LatLngExpression, options?: MarkerOptions);
    addTo(map: Map): this;
    on(type: string, fn: (e: any) => void, context?: any): this;
  }

  class Circle {
    constructor(latlng: LatLngExpression, options?: CircleOptions);
    addTo(map: Map): this;
    on(type: string, fn: (e: any) => void, context?: any): this;
  }

  class Icon {
    constructor(options: any);
  }
}

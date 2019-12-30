export interface ICoords {
  lat: number;
  lng: number;
}

export interface IExtractedInfo {
  id: string;
  title: string;
  address: string;
  pricePure: number;
  coords: ICoords;
}

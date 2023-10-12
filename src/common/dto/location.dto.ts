export class LocationDTO {
  constructor(
    public city: string,
    public state: string,
    public country: string,
    public zipCode: number,
    public address: string
  ) {}
}

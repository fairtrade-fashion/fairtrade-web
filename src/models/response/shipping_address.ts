export interface ShippingAddressResponse {
  id: string;
  userId: string;
  streetAddress: string;
  fullName: string;
  city: string;
  state: string;
  phoneNumber: string | null;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export interface SizeVariant {
  id: string;
  width: number;
  height: number;
  depth: number;
  price: number;
  affiliateLink: string;
}

export interface ArtProduct {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  roomPreviewUrl: string;
  sizes: SizeVariant[];
  isActive: boolean;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
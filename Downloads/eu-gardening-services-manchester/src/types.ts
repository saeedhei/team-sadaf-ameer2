export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  features: string[];
  pricingGuide: string;
  bestFor: string;
  recommendedFrequency: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'lawns' | 'hedges' | 'makeovers' | 'pressure-washing' | 'planting';
  location: string;
  image: string;
  description: string;
  completionTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  postcode: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
}

export interface QuoteFormState {
  services: string[];
  gardenSize: string;
  frequency: string;
  postcode: string;
  name: string;
  phone: string;
  notes: string;
}

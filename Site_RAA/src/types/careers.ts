export interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  active: boolean;
}
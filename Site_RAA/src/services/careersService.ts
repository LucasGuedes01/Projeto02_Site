import { JobPosting, JobFormData } from '../types/careers';

class CareersService {
  private readonly API_URL = '/api/careers';
  private jobs: JobPosting[] = [
    {
      id: '1',
      title: 'ANALISTA AMBIENTAL',
      location: 'Naviraí - MS',
      type: 'Tempo Integral',
      department: 'Meio Ambiente',
      description: 'Responsável por análises e monitoramento ambiental...',
      requirements: [
        'Formação superior em Engenharia Ambiental ou áreas correlatas',
        'Experiência em licenciamento ambiental',
        'Conhecimento da legislação ambiental',
      ],
      active: true,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01'
    },
    // Add more mock data as needed
  ];

  async getAll(): Promise<JobPosting[]> {
    // In production, this would be an API call
    return this.jobs;
  }

  async getById(id: string): Promise<JobPosting | null> {
    const job = this.jobs.find(j => j.id === id);
    return job || null;
  }

  async create(data: JobFormData): Promise<JobPosting> {
    const now = new Date().toISOString();
    const newJob: JobPosting = {
      id: Date.now().toString(),
      ...data,
      createdAt: now,
      updatedAt: now
    };
    this.jobs.unshift(newJob);
    return newJob;
  }

  async update(id: string, data: JobFormData): Promise<JobPosting | null> {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return null;

    const updatedJob: JobPosting = {
      ...this.jobs[index],
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };
    this.jobs[index] = updatedJob;
    return updatedJob;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.jobs.findIndex(j => j.id === id);
    if (index === -1) return false;

    this.jobs.splice(index, 1);
    return true;
  }
}

export const careersService = new CareersService();
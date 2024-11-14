import React from 'react';
import { MapPin, Briefcase, Clock, ChevronRight } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  benefits: string[]; // Adiciona os benefícios
  coverImageUrl: string; // Adiciona a URL da imagem de capa
}

interface JobListProps {
  jobs: Job[];
  onApply: (jobId: number) => void;
}

export default function JobList({ jobs, onApply }: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhuma vaga encontrada com os critérios selecionados.
          </p>
        </div>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            {job.coverImageUrl && (
              <div className="mb-4">
                <img
                  src={job.coverImageUrl}
                  alt="Imagem da vaga"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Imagem+não+encontrada';
                  }}
                />
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onApply(job.id)}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Candidatar-se
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{job.description}</p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Requisitos:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {job.benefits && job.benefits.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Benefícios:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

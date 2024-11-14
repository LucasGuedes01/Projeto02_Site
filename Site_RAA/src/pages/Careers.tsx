import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, ChevronRight, Filter, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobList from '../components/careers/JobList';
import ApplicationForm from '../components/careers/ApplicationForm';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
  active: boolean;
}

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = localStorage.getItem('careers_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  const locations = [...new Set(jobs.map(job => job.location))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const isActive = job.active; // Only show active jobs
    return matchesSearch && matchesLocation && isActive;
  });

  const handleApply = (jobId: number) => {
    setSelectedJob(jobId);
    setShowApplicationForm(true);
  };

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Faça Parte do Nosso Time</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Junte-se a nós e faça parte de uma empresa que valoriza seus colaboradores 
              e está comprometida com o seu crescimento.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showApplicationForm ? (
          <>
            {/* Admin Login Button */}
            <div className="flex justify-end mb-6">
              <Link
                to="/carreiras/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Lock className="h-5 w-5" />
                Área Administrativa
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pesquisar vagas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none pl-12 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="">Todas as localidades</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Job Listings */}
            <JobList jobs={filteredJobs} onApply={handleApply} />
          </>
        ) : (
          <ApplicationForm 
            job={jobs.find(j => j.id === selectedJob)!}
            onBack={() => setShowApplicationForm(false)}
          />
        )}
      </div>
    </div>
  );
}
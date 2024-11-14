import React, { useState } from 'react';
import { ArrowLeft, Upload, Loader2, CheckCircle } from 'lucide-react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
}

interface ApplicationFormProps {
  job: Job;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  experience: string;
  education: string;
  resume: File | null;
}

// Configuração do cliente S3
const s3 = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: 'AKIAY2XNEE45TT36S3EU', // Substitua pela sua chave de acesso
    secretAccessKey: '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' // Substitua pela sua chave secreta
  }
});

// Configuração do cliente SES
const ses = new SESClient({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: 'AKIAY2XNEE45TT36S3EU', // Substitua pela sua chave de acesso
    secretAccessKey: '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' // Substitua pela sua chave secreta
  }
});

export default function ApplicationForm({ job, onBack }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    education: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
      setFileUploaded(true); // Marca o arquivo como vinculado
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.resume) {
      setError('Por favor, adicione seu currículo em PDF.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload do PDF para o S3
      const s3Params = {
        Bucket: 'bkp-navirai-ded',
        Key: `RAA/${formData.resume.name}`,
        Body: formData.resume
      };
      await s3.send(new PutObjectCommand(s3Params));

      // Configuração dos parâmetros do SES
      const emailParams = {
        Source: 'naoresponda@rioamambaiagroenergia.com.br', // Endereço verificado no Amazon SES
        Destination: {
          ToAddresses: ['naoresponda@rioamambaiagroenergia.com.br']
        },
        Message: {
          Subject: {
            Data: `Nova Candidatura para ${job.title}`
          },
          Body: {
            Text: {
              Data: `
                Nome: ${formData.name}
                Email: ${formData.email}
                Telefone: ${formData.phone}
                LinkedIn: ${formData.linkedin}
                Experiência: ${formData.experience}
                Educação: ${formData.education}

                O currículo foi enviado para o bucket S3 e está disponível com o nome: ${formData.resume.name}
              `
            }
          }
        }
      };

      // Envio do e-mail usando SES
      await ses.send(new SendEmailCommand(emailParams));
      
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar a candidatura:', error);
      setError('Erro ao enviar a candidatura. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Candidatura Enviada com Sucesso!
        </h2>
        <p className="text-gray-600 mb-8">
          Agradecemos seu interesse em fazer parte da nossa equipe. Analisaremos seu 
          currículo e entraremos em contato em breve.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Voltar para Vagas
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar para lista de vagas
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Candidatura para {job.title}
        </h2>
        <p className="text-gray-600 mb-8">
          {job.department} • {job.location}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos do formulário */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currículo (PDF) *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload um arquivo</span>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      required
                      accept=".pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                {fileUploaded && (
                  <div className="flex items-center justify-center text-green-600 mt-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Currículo anexado com sucesso!</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  PDF até 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Botão de envio */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Candidatura'
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-600 text-sm mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Shield, AlertTriangle, FileText, ExternalLink, ChevronRight, Download } from 'lucide-react';

const reportTypes = [
  {
    title: 'O que você pode relatar?',
    description: 'O Canal de Ética está disponível para reportar qualquer situação que envolva práticas que violem nossos princípios.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80',
    items: [
      'Corrupção e Fraude: ações que atentem contra a honestidade ou que envolvam ganho indevido.',
      'Assédio Moral ou Sexual: comportamentos impróprios que impactem negativamente o ambiente de trabalho.',
      'Conflito de Interesse: situações em que interesses pessoais se sobreponham aos profissionais.',
      'Violação de Privacidade: uso indevido de informações pessoais ou corporativas.',
      'Qualquer outra conduta que viole nossos valores e princípios.'
    ]
  },
  {
    title: 'Saiba quando você deve abrir uma denúncia',
    description: 'O Canal de Ética é exclusivo para receber suspeitas ou evidências de violações ao Código de Conduta, à legislação ou normas internas.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80',
    warning: 'O uso indevido do Canal, com falsas denúncias, viola as regras éticas e pode configurar crime de Denunciação Caluniosa (Art. 339 do Código Penal).'
  },
  {
    title: 'E quando você deve registrar uma reclamação',
    description: 'Nem todas as situações devem ser registradas no Canal de Ética.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    note: 'Reclamações ou solicitações enviadas indevidamente ao Canal de Ética serão consideradas como fora de escopo e encerradas.'
  }
];

export default function Ethics() {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nosso Compromisso com a Integridade
            </h1>
            <p className="text-xl text-gray-300">
              A RAA valoriza a transparência e o respeito em todas as nossas relações. 
              Para assegurar que nossa conduta esteja sempre alinhada com nossos valores, 
              disponibilizamos o Canal de Ética, um espaço seguro e confidencial.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Code of Ethics Download */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-16 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Código de Ética</h2>
                <p className="text-blue-100">
                  Conheça nossos princípios e valores que norteiam nossa conduta
                </p>
              </div>
            </div>
            <a
              href="https://www.rioamambaiagroenergia.com.br/_files/ugd/cbe7ad_8697942271f44135bb957979e1de41dd.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Download className="h-5 w-5" />
              Baixar PDF
            </a>
          </div>
        </div>

        {/* Report Types Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reportTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{type.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{type.description}</p>
                {type.items && (
                  <ul className="space-y-2 mb-4">
                    {type.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {type.warning && (
                  <div className="flex items-start gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{type.warning}</p>
                  </div>
                )}
                {type.note && (
                  <div className="flex items-start gap-2 p-4 bg-gray-50 text-gray-700 rounded-lg">
                    <Shield className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{type.note}</p>
                  </div>
                )}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedType(index)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {index === 0 ? 'Saiba Mais' : index === 1 ? 'Registrar Denúncia' : 'Registrar Reclamação'}
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Confidencialidade e Proteção
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Garantias do Canal de Ética
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Confidencialidade absoluta no tratamento das informações
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Possibilidade de relato anônimo
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Proibição de retaliação contra denunciantes de boa-fé
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Como sua denúncia será tratada
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Análise inicial em até 48 horas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Investigação conduzida por equipe especializada
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Feedback sobre o andamento do processo
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
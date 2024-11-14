import React from 'react';
import { Check, Clock } from 'lucide-react';

const timelineEvents = [
  { year: 2016, text: 'AMERRA e CarVal adquirem a planta industrial e o canavial, adotando o nome de Rio Amambai Agroenergia (RAA)' },
  { year: 2017, text: 'AMERRA torna-se a única acionista da RAA' },
  { year: 2018, text: 'RAA processa 700 mil ton em sua primeira safra' },
  { year: 2019, text: 'RAA processa 1.711 mil ton' },
  { year: 2020, text: 'Certificação RenovaBio\nRAA processa 2,3 milhões de toneladas de cana-de-açúcar' },
  { year: 2021, text: 'Acesso ao mercado de capitais com a emissão de um CRA verde\nRecertificação RenovaBio' },
  { year: 2022, text: 'RAA administra 47.000 hectares de área e garante o fornecimento de matéria-prima para a produção de açúcar e etanol em seu parque industrial.' },
  { year: 2023, text: 'RAA atinge um recorde ao processar 2,9 milhões de toneladas de cana-de-açúcar' },
];

const values = [
  'Ética',
  'Integridade',
  'Respeito pelo meio ambiente',
  'Respeito pelas pessoas',
  'Compromisso com metas e resultados',
];

export default function History() {
  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Nossa História</h1>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 space-y-6">
              <p>
                A Rio Amambai Agroenergia iniciou suas atividades em 2016, quando a AMERRA Capital Management, 
                gestora de fundos de investimentos de Nova York, juntamente com a CarVal Investors, braço de 
                investimentos independente da multinacional americana Cargill, adquiriram os ativos de uma 
                planta industrial localizada no município de Naviraí/MS e de canaviais implantados no mesmo 
                município e região, por meio de um leilão judicial.
              </p>
              <p>
                No ano subsequente, a AMERRA tornou-se a única acionista da empresa, iniciando, então, a 
                reforma e modernização da planta industrial, renovando e tratando adequadamente os canaviais, 
                tendo, inclusive, incorporado novas áreas à produção de cana-de-açúcar, e conseguido gerar 
                um número significativo de empregos diretos e indiretos.
              </p>
              <p>
                Na primeira safra da Companhia, ocorrida em 2018, foram processadas 700 mil toneladas de 
                cana-de-açúcar. Em 2019, foram processadas 1,7 milhões de toneladas, onde nota-se um 
                crescimento na moagem correspondente a 142%. Esse progresso prosseguiu, em 2020 a unidade 
                alcançou moagem de 2,3 milhões de toneladas de cana-de-açúcar, representando um aumento 
                expressivo de 35% e, na safra 23/24, obteve a moagem recorde de 2,9 milhões de toneladas.
              </p>
              <p>
                A meta da Rio Amambai Agroenergia é atingir a plena capacidade de sua planta industrial, 
                processando 3.142.000 toneladas de cana-de açúcar nos próximos anos.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white shadow-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Missão</h2>
              <p className="text-gray-600">
                Transformar a cana-de-açúcar em energia e alimento, gerando valor aos acionistas, 
                colaboradores, parceiros e sociedade.
              </p>
            </div>

            <div className="bg-white shadow-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Visão</h2>
              <p className="text-gray-600">
                Atingir e consolidar a capacidade instalada de nossa unidade de produção, com 
                eficiência nos processos, rentabilidade e geração de caixa.
              </p>
            </div>

            <div className="bg-white shadow-lg p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Valores</h2>
              <ul className="space-y-2">
                {values.map((value, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Nossa Linha do Tempo
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-300" />
              
              {/* Timeline events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className="w-1/2 px-8">
                      <div
                        className={`bg-white shadow-lg p-6 rounded-lg ${
                          index % 2 === 0 ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div className="font-bold text-green-600 text-xl mb-2">
                          {event.year}
                        </div>
                        <p className="text-gray-600 whitespace-pre-line">{event.text}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center w-8">
                      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
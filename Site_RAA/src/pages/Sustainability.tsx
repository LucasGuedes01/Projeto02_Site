import React, { useState } from 'react';
import { 
  Leaf, Droplet, Sun, Recycle, TreePine, 
  Factory, Shield, Users, GraduationCap, Heart,
  Target, ArrowRight
} from 'lucide-react';

const policies = [
  {
    icon: Shield,
    title: 'Transparência e Ética',
    description: 'Compromisso com requisitos legais e regulamentares em todas as operações.',
  },
  {
    icon: TreePine,
    title: 'Preservação Ambiental',
    description: 'Sistemas de controle ambiental eficientes e gerenciamento adequado de resíduos.',
  },
  {
    icon: Recycle,
    title: 'Economia Circular',
    description: 'Aproveitamento integral de subprodutos na fabricação de açúcar e etanol.',
  },
  {
    icon: Sun,
    title: 'Mudanças Climáticas',
    description: 'Avaliação e ação sobre impactos climáticos em nossas operações.',
  },
  {
    icon: Droplet,
    title: 'Gestão Hídrica',
    description: 'Práticas eficientes no uso e reuso de água nos processos industriais.',
  },
  {
    icon: Factory,
    title: 'Eficiência Energética',
    description: 'Otimização de processos e garantia da qualidade dos produtos.',
  },
  {
    icon: Users,
    title: 'Responsabilidade Social',
    description: 'Desenvolvimento de colaboradores e comunidades locais.',
  },
  {
    icon: Heart,
    title: 'Direitos Humanos',
    description: 'Tolerância zero para trabalho escravo e infantil.',
  },
];

const monitoringPrograms = [
  {
    title: 'Águas e Solo',
    description: 'Monitoramento contínuo da qualidade da água e conservação do solo.',
    metrics: [
      { label: 'Pontos de Monitoramento', value: '24' },
      { label: 'Análises Anuais', value: '144' },
    ],
  },
  {
    title: 'Emissões Atmosféricas',
    description: 'Controle rigoroso das emissões e qualidade do ar.',
    metrics: [
      { label: 'Redução de Emissões', value: '30%' },
      { label: 'Pontos de Controle', value: '12' },
    ],
  },
  {
    title: 'Biodiversidade',
    description: 'Preservação da fauna e flora locais.',
    metrics: [
      { label: 'Área Preservada', value: '47k ha' },
      { label: 'Espécies Monitoradas', value: '200+' },
    ],
  },
];

export default function Sustainability() {
  const [activeTab, setActiveTab] = useState('policy');

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax Effect */}
      <div 
        className="h-[600px] relative bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Compromisso com o Futuro
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Nossa jornada rumo a um futuro mais sustentável através de práticas 
            responsáveis e inovação contínua.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setActiveTab('policy')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors ${
                activeTab === 'policy'
                  ? 'bg-green-600 text-white'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              Política de Sustentabilidade
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors ${
                activeTab === 'monitoring'
                  ? 'bg-green-600 text-white'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              Programas de Monitoramento
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Policy Section */}
        {activeTab === 'policy' && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Política de Sustentabilidade
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossa política é baseada em compromissos que envolvem responsabilidades 
                socioambientais, alinhadas aos ODS da ONU e às Práticas ESG.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {policies.map((policy, index) => {
                const Icon = policy.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                    <p className="text-gray-600">{policy.description}</p>
                  </div>
                );
              })}
            </div>

            {/* ESG Goals */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Metas ESG 2025</h3>
                <p className="text-lg opacity-90">
                  Nosso compromisso com métricas claras e objetivas
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-4">30%</div>
                  <p className="text-lg">Redução no consumo de água</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-4">100%</div>
                  <p className="text-lg">Energia renovável em operações</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-4">50%</div>
                  <p className="text-lg">Redução de emissões de CO₂</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Monitoring Programs Section */}
        {activeTab === 'monitoring' && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Programas de Monitoramento
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Monitoramento contínuo e sistemático para garantir a efetividade 
                de nossas ações ambientais.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {monitoringPrograms.map((program, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {program.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {metric.value}
                        </div>
                        <p className="text-sm text-gray-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Environmental Education */}
            <div className="bg-green-50 rounded-2xl p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Educação Ambiental
                </h3>
                <p className="text-gray-600">
                  Programas e iniciativas para conscientização ambiental
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="text-xl font-semibold mb-4">
                    Projeto "Consciência Verde"
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Desenvolvimento de atividades lúdicas e culturais nas escolas 
                    municipais e estaduais de Naviraí.
                  </p>
                  <a 
                    href="/projetos/consciencia-verde"
                    className="inline-flex items-center text-green-600 hover:text-green-700"
                  >
                    Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="text-xl font-semibold mb-4">
                    Dia Nacional do Campo Limpo
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Evento anual que demonstra o processo de transformação da 
                    cana-de-açúcar e promove consciência ambiental.
                  </p>
                  <a 
                    href="/projetos/campo-limpo"
                    className="inline-flex items-center text-green-600 hover:text-green-700"
                  >
                    Saiba mais <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Entre em Contato
              </h3>
              <p className="text-gray-600 mb-8">
                Tem dúvidas sobre nossos programas ambientais? Entre em contato com nossa equipe.
              </p>
              <a
                href="mailto:meioambiente@rioamambaiagroenergia.com.br"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
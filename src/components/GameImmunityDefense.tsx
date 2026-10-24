import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Shield, Award, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface Citizen {
  x: number;
  y: number;
  vx: number;
  vy: number;
  status: 'susceptible' | 'infected' | 'vaccinated1' | 'vaccinated2' | 'hospitalized';
  timer: number;
}

interface GameDecision {
  stage: number;
  title: string;
  date: string;
  context: string;
  question: string;
  choices: {
    label: string;
    sublabel: string;
    isEvidenceBased: boolean;
    livesDelta: number;
    casesDelta: number;
    rDelta: number;
    trustDelta: number;
    explanation: string;
    scientificPaperCitation: string;
  }[];
}

const GAME_STAGES: GameDecision[] = [
  {
    stage: 1,
    title: 'A Proposta da Pfizer em 2020',
    date: 'Agosto de 2020',
    context: 'A farmacêutica americana Pfizer oferece 70 milhões de doses de vacina ao Brasil por US$ 10 cada (metade do preço cobrado nos EUA e Europa), com início de entrega para dezembro de 2020.',
    question: 'Qual decisão estratégica você toma para o país?',
    choices: [
      {
        label: 'Assinar o contrato de 70 milhões de doses imediatamente',
        sublabel: 'Garantir vacinas antes da onda do inverno e iniciar em dezembro de 2020.',
        isEvidenceBased: true,
        livesDelta: 48000,
        casesDelta: 104000,
        rDelta: -0.35,
        trustDelta: 20,
        explanation: 'Excelente! O estudo de Ferreira et al. (The Lancet) provou que antecipar a vacinação em 8 semanas teria poupado mais de 46.888 vidas adicionais de idosos e evitado 104 mil hospitalizações.',
        scientificPaperCitation: 'Ferreira et al., The Lancet Reg. Health 2023'
      },
      {
        label: 'Ignorar a proposta, alegar cláusulas abusivas e falar em "virar jacaré"',
        sublabel: 'Deixar 53 e-mails sem resposta e esperar o ano seguinte.',
        isEvidenceBased: false,
        livesDelta: -45000,
        casesDelta: -90000,
        rDelta: 0.3,
        trustDelta: -25,
        explanation: 'Decisão histórica trágica: a recusa custou 8 meses de atraso no fornecimento de vacinas e provocou sobrecarga extrema dos hospitais no início de 2021.',
        scientificPaperCitation: 'CPI da Covid / Correio Braziliense'
      }
    ]
  },
  {
    stage: 2,
    title: 'A Parceria CoronaVac & Butantan',
    date: 'Outubro de 2020',
    context: 'O Instituto Butantan oferece 46 milhões de doses da CoronaVac já para o primeiro trimestre de 2021, com transferência de tecnologia.',
    question: 'O ministro da Saúde quer assinar a compra. O que você faz?',
    choices: [
      {
        label: 'Aprovar a compra de todas as doses e acelerar a produção nacional',
        sublabel: 'Fortalecer a capacidade do Butantan e planejar a logística.',
        isEvidenceBased: true,
        livesDelta: 35000,
        casesDelta: 85000,
        rDelta: -0.25,
        trustDelta: 15,
        explanation: 'Foi exatamente a CoronaVac que permitiu iniciar a vacinação em janeiro de 2021, vacinando mais de 75% dos idosos brasileiros com rapidez.',
        scientificPaperCitation: 'Santos et al., The Lancet 2023'
      },
      {
        label: 'Desautorizar publicamente o ministro e dizer que "não compra vacina chinesa"',
        sublabel: 'Cancelar o protocolo de intenções por disputa política.',
        isEvidenceBased: false,
        livesDelta: -30000,
        casesDelta: -70000,
        rDelta: 0.25,
        trustDelta: -20,
        explanation: 'O cancelamento atrasou insumos e deixou o país à beira de não ter nenhuma dose disponível em janeiro de 2021.',
        scientificPaperCitation: 'BBC News Brasil'
      }
    ]
  },
  {
    stage: 3,
    title: 'Prioridade Vacinal: Idosos vs Setor Privado',
    date: 'Janeiro de 2021',
    context: 'Começa a vacinação com primeiras doses escassas. Empresários pedem autorização para comprar doses para vacinar seus funcionários antes dos grupos de risco.',
    question: 'Como definir a ordem de aplicação no Sistema Único de Saúde (SUS)?',
    choices: [
      {
        label: 'Priorizar estritamente idosos (>60 anos) e profissionais de saúde no SUS',
        sublabel: 'Seguir o critério técnico internacional de maior letalidade.',
        isEvidenceBased: true,
        livesDelta: 50000,
        casesDelta: 120000,
        rDelta: -0.2,
        trustDelta: 25,
        explanation: 'Acerto fundamental: os idosos representavam apenas 20% da população, mas 61% das mortes evitadas (187.890 idosos) decorreram dessa priorização!',
        scientificPaperCitation: 'Santos et al., The Lancet 2023'
      },
      {
        label: 'Liberar a compra para clínicas particulares e vacinação corporativa',
        sublabel: 'Permitir que quem puder pagar se vacine primeiro.',
        isEvidenceBased: false,
        livesDelta: -35000,
        casesDelta: -80000,
        rDelta: 0.15,
        trustDelta: -30,
        explanation: 'Violação da bioética e da epidemiologia: vacinar jovens saudáveis com dinheiro enquanto idosos pobres morriam causaria explosão na mortalidade.',
        scientificPaperCitation: 'Folha de S.Paulo / ABCVAC'
      }
    ]
  },
  {
    stage: 4,
    title: 'O Escândalo da Covaxin e a Propina',
    date: 'Fevereiro de 2021',
    context: 'Aparece uma proposta de 20 milhões de doses da Covaxin a US$ 15 (a dose mais cara do mercado) via intermediária privada, com pedido de propina de US$ 1 por dose relatado por vendedor.',
    question: 'Como agir diante desta negociação no Ministério da Saúde?',
    choices: [
      {
        label: 'Suspender a negociação suspeita e exigir auditoria imediata da Anvisa e PF',
        sublabel: 'Concentrar recursos em fabricantes aprovados por órgãos reguladores.',
        isEvidenceBased: true,
        livesDelta: 20000,
        casesDelta: 45000,
        rDelta: -0.15,
        trustDelta: 20,
        explanation: 'Correto! A vacina não tinha certificação de pureza da Anvisa e o contrato custaria R$ 1,6 bilhão sem garantia de entrega no prazo.',
        scientificPaperCitation: 'MPF / Folha de S.Paulo'
      },
      {
        label: 'Pressionar servidores para liberar a compra com pagamento antecipado',
        sublabel: 'Acelerar o contrato a toque de caixa e ignorar os alertas técnicos.',
        isEvidenceBased: false,
        livesDelta: -25000,
        casesDelta: -50000,
        rDelta: 0.2,
        trustDelta: -35,
        explanation: 'Crime de prevaricação investigado pela CPI: desvio de foco e recursos públicos no momento mais crítico da emergência sanitária.',
        scientificPaperCitation: 'Inquérito MPF / CPI da Pandemia'
      }
    ]
  },
  {
    stage: 5,
    title: 'A Batalha da Segunda Dose',
    date: 'Junho de 2021',
    context: 'Milhões de pessoas que tomaram a 1ª dose estão atrasando ou não retornando para a 2ª dose, influenciadas por boatos de que 1 dose já seria suficiente.',
    question: 'Qual estratégia você adota para garantir a imunização completa?',
    choices: [
      {
        label: 'Busca ativa, campanhas de esclarecimento e centros móveis de vacinação',
        sublabel: 'Garantir que a taxa de abandono da 2ª dose fique abaixo de 5%.',
        isEvidenceBased: true,
        livesDelta: 30000,
        casesDelta: 70000,
        rDelta: -0.3,
        trustDelta: 20,
        explanation: 'O estudo de Libotte et al. (Royal Society) provou que se 20% da população perdesse a 2ª dose, as mortes diárias poderiam saltar mais de 50%.',
        scientificPaperCitation: 'Libotte et al., Royal Society 2022'
      },
      {
        label: 'Considerar a campanha encerrada para quem tomou apenas uma dose',
        sublabel: 'Não investir em campanhas de conscientização ou busca ativa.',
        isEvidenceBased: false,
        livesDelta: -28000,
        casesDelta: -65000,
        rDelta: 0.35,
        trustDelta: -20,
        explanation: 'O abandono da segunda dose enfraquece a resposta imune humoral e celular, facilitando o surgimento de surtos e novas variantes.',
        scientificPaperCitation: 'Royal Society 2022'
      }
    ]
  },
  {
    stage: 6,
    title: 'Ataques à Fiocruz e o "Tratamento Precoce"',
    date: 'Maio de 2021',
    context: 'Integrantes do governo divulgam áudios atacando a Fiocruz e promovem o uso massivo de hidroxicloroquina e ivermectina.',
    question: 'Como orientar a população brasileira?',
    choices: [
      {
        label: 'Reafirmar a autoridade científica da Fiocruz e alertar contra remédios ineficazes',
        sublabel: 'Combater a falsa segurança que expõe pessoas a contaminações fatais.',
        isEvidenceBased: true,
        livesDelta: 25000,
        casesDelta: 60000,
        rDelta: -0.2,
        trustDelta: 25,
        explanation: 'A ciência mundial comprovou que a cloroquina não previne nem cura a Covid, apenas gerando falsa sensação de segurança que atrasava a ida ao hospital.',
        scientificPaperCitation: 'Sociedade Brasileira de Infectologia / Fiocruz'
      },
      {
        label: 'Financiar a distribuição do "kit covid" e atacar pesquisadores públicos',
        sublabel: 'Incentivar remédios sem eficácia e boicotar o isolamento.',
        isEvidenceBased: false,
        livesDelta: -30000,
        casesDelta: -75000,
        rDelta: 0.3,
        trustDelta: -30,
        explanation: 'A disseminação do tratamento precoce ineficaz foi apontada pela CPI como um dos principais fatores de recusa de cuidados médicos adequados.',
        scientificPaperCitation: 'Revista VEJA / CPI da Covid'
      }
    ]
  },
  {
    stage: 7,
    title: 'Proteção de Crianças e Bebês',
    date: 'Novembro de 2021',
    context: 'Estudos apontam alto número de mortes pediátricas no Brasil (10 vezes maior que nos EUA) e 1,3 milhão de órfãos de cuidadores.',
    question: 'Qual medida de saúde pública você implementa com prioridade?',
    choices: [
      {
        label: 'Aprovar rapidamente a vacina pediátrica e criar plano de amparo a órfãos',
        sublabel: 'Proteger crianças de 5 a 11 anos e rastrear dependentes pelo CPF.',
        isEvidenceBased: true,
        livesDelta: 15000,
        casesDelta: 40000,
        rDelta: -0.15,
        trustDelta: 25,
        explanation: 'Excelente! O estudo do The Lancet revelou que crianças e órfãos sofreram impactos silenciosos gigantescos durante a pandemia no Brasil.',
        scientificPaperCitation: 'The Lancet Reg. Health 2025 / Barberia et al.'
      },
      {
        label: 'Adiar a vacinação infantil, fazer consulta pública desnecessária e assustar pais',
        sublabel: 'Exigir receita médica e retardar o início da vacinação pediátrica.',
        isEvidenceBased: false,
        livesDelta: -12000,
        casesDelta: -30000,
        rDelta: 0.15,
        trustDelta: -25,
        explanation: 'A protelação da vacinação de crianças de 5 a 11 anos no final de 2021 atrasou o retorno seguro às escolas e expôs milhares de lares à infecção.',
        scientificPaperCitation: 'Folha de S.Paulo / BBC Brasil'
      }
    ]
  },
  {
    stage: 8,
    title: 'A Dose de Reforço contra a Ômicron',
    date: 'Dezembro de 2021',
    context: 'A variante Ômicron surge com alta capacidade de escape imune. Estudos mostram que a 3ª dose (reforço) restaura a proteção contra casos graves para >80%.',
    question: 'Qual a sua decisão para conter a nova onda?',
    choices: [
      {
        label: 'Campanha maciça de reforço (3ª dose) para todos os adultos acima de 18 anos',
        sublabel: 'Garantir aplicação imediata nos postos de saúde de todo o território.',
        isEvidenceBased: true,
        livesDelta: 40000,
        casesDelta: 95000,
        rDelta: -0.4,
        trustDelta: 20,
        explanation: 'Vitória! O estudo de Santos et al. (The Lancet) comprovou que a dose de reforço salvou quase 28 mil vidas extras apenas nas primeiras semanas da Ômicron!',
        scientificPaperCitation: 'Santos et al., The Lancet 2023'
      },
      {
        label: 'Dizer que a Ômicron é "bem-vinda" e desacelerar a campanha de reforço',
        sublabel: 'Apostar na infecção natural descontrolada como imunidade.',
        isEvidenceBased: false,
        livesDelta: -38000,
        casesDelta: -85000,
        rDelta: 0.45,
        trustDelta: -30,
        explanation: 'A teoria da imunidade de rebanho por contágio resultou em centenas de milhares de mortes evitáveis em todo o mundo.',
        scientificPaperCitation: 'The Lancet Regional Health'
      }
    ]
  }
];

export const GameImmunityDefense: React.FC = () => {
  const [gameState, setGameState] = useState<'title' | 'playing' | 'decision_feedback' | 'finished'>('title');
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [livesSaved, setLivesSaved] = useState<number>(100000);
  const [severeCasesAverted, setSevereCasesAverted] = useState<number>(250000);
  const [effectiveR, setEffectiveR] = useState<number>(1.4);
  const [publicTrust, setPublicTrust] = useState<number>(60);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<{
    choice: GameDecision['choices'][0];
    explanation: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const citizensRef = useRef<Citizen[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Web Audio Synth for sound feedback
  const playTone = (type: 'success' | 'alert' | 'start') => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Initialize Citizens for 60fps simulation
  useEffect(() => {
    const width = 800;
    const height = 240;
    const citizens: Citizen[] = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      citizens.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        status: i < 8 ? 'infected' : i < 30 ? 'vaccinated1' : 'susceptible',
        timer: Math.random() * 200
      });
    }
    citizensRef.current = citizens;
  }, []);

  // Canvas loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Update citizens
          citizensRef.current.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;

            // Bounce off borders
            if (c.x <= 6 || c.x >= canvas.width - 6) c.vx *= -1;
            if (c.y <= 6 || c.y >= canvas.height - 6) c.vy *= -1;

            // Render citizen dot
            ctx.beginPath();
            ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);

            if (c.status === 'infected') {
              ctx.fillStyle = '#ef4444'; // Red
            } else if (c.status === 'vaccinated2') {
              ctx.fillStyle = '#10b981'; // Green
            } else if (c.status === 'vaccinated1') {
              ctx.fillStyle = '#3b82f6'; // Blue
            } else {
              ctx.fillStyle = '#94a3b8'; // Gray susceptible
            }
            ctx.fill();
          });
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Start game
  const startGame = () => {
    playTone('start');
    setCurrentStageIdx(0);
    setLivesSaved(100000);
    setSevereCasesAverted(250000);
    setEffectiveR(1.4);
    setPublicTrust(60);
    setLastFeedback(null);
    setGameState('playing');
  };

  // Handle player decision
  const handleSelectChoice = (choice: GameDecision['choices'][0]) => {
    if (choice.isEvidenceBased) {
      playTone('success');
    } else {
      playTone('alert');
    }

    setLivesSaved(prev => Math.max(0, prev + choice.livesDelta));
    setSevereCasesAverted(prev => Math.max(0, prev + choice.casesDelta));
    setEffectiveR(prev => Number(Math.max(0.4, prev + choice.rDelta).toFixed(2)));
    setPublicTrust(prev => Math.min(100, Math.max(0, prev + choice.trustDelta)));

    // Update canvas citizens according to choice
    citizensRef.current.forEach(c => {
      if (choice.isEvidenceBased) {
        if (c.status === 'susceptible' && Math.random() < 0.35) {
          c.status = 'vaccinated2';
        } else if (c.status === 'infected' && Math.random() < 0.25) {
          c.status = 'vaccinated2';
        }
      } else {
        if (c.status === 'susceptible' && Math.random() < 0.25) {
          c.status = 'infected';
        }
      }
    });

    setLastFeedback({
      choice,
      explanation: choice.explanation
    });
    setGameState('decision_feedback');
  };

  const nextStage = () => {
    if (currentStageIdx + 1 < GAME_STAGES.length) {
      setCurrentStageIdx(prev => prev + 1);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  };

  const currentDecision = GAME_STAGES[currentStageIdx];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <span>Experiência Educativa Gamificada</span>
            <span aria-hidden="true">·</span>
            <span>Simulador de Gestão Sanitária Baseada em Evidências</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            O Epidemiologista no Comando: Salve Vidas contra o Relógio
          </h2>
          <p className="mt-1 text-slate-600 max-w-3xl leading-relaxed text-sm">
            Assuma a coordenação do Plano Nacional de Imunização no momento mais crítico da história brasileira. 
            Suas decisões mudarão o curso das mortes, o índice de contágio R(t) e a confiança pública.
          </p>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-xs hover:bg-slate-50 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          <span>{isMuted ? 'Áudio Mudo' : 'Som Ligado'}</span>
        </button>
      </div>

      {/* Dynamic Population Canvas Simulation (always visible at top of game area) */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase">Simulação Micro de Agentes:</span>
            <span className="text-emerald-400 font-bold">● População em Tempo Real</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span>
              <span>Suscetível</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span>1ª Dose</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>2ª Dose / Imune</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              <span>Infectado</span>
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={160}
          className="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800"
        />

        {/* Live Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
          <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] uppercase">Vidas Salvas</div>
            <div className="text-lg font-bold text-emerald-400 tabular-nums">
              {livesSaved.toLocaleString('pt-BR')}
            </div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] uppercase">Casos Graves Evitados</div>
            <div className="text-lg font-bold text-blue-400 tabular-nums">
              {severeCasesAverted.toLocaleString('pt-BR')}
            </div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] uppercase">R(t) Efetivo</div>
            <div className={`text-lg font-bold tabular-nums ${effectiveR < 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {effectiveR} {effectiveR < 1 ? '(Queda)' : '(Alerta)'}
            </div>
          </div>
          <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] uppercase">Confiança no SUS</div>
            <div className="text-lg font-bold text-indigo-300 tabular-nums">
              {publicTrust}%
            </div>
          </div>
        </div>
      </div>

      {/* GAME SHELL SCREENS */}

      {/* Screen 1: Title Screen */}
      {gameState === 'title' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              O Desafio da Gestão Epidemiológica
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Você passará por 8 episódios reais vivenciados pelo Brasil entre 2020 e 2022. 
              Em cada encruzilhada histórica, você enfrentará pressões políticas e escolherá entre 
              <strong> seguir rigorosamente as evidências dos periódicos científicos</strong> ou 
              <strong> ceder às narrativas negacionistas e esquemas paralelos</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900">Seu objetivo como gestor:</div>
            <div>• Salvar o máximo de vidas possível (meta: superar 303 mil vidas poupadas).</div>
            <div>• Manter o R(t) abaixo de 1 para evitar o colapso das UTIs hospitalares.</div>
            <div>• Defender o SUS contra desinformação, atrasos e cobranças ilícitas de propina.</div>
          </div>

          <button
            onClick={startGame}
            className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors inline-flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Simulação Histórica</span>
          </button>
        </div>
      )}

      {/* Screen 2: Playing a Stage */}
      {gameState === 'playing' && currentDecision && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Progress and Date */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="font-semibold text-slate-800">
                Fase {currentStageIdx + 1} de {GAME_STAGES.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-bold">{currentDecision.date}</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {Math.round(((currentStageIdx + 1) / GAME_STAGES.length) * 100)}% concluído
            </div>
          </div>

          {/* Context Card */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {currentDecision.title}
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {currentDecision.context}
            </p>
          </div>

          {/* Question */}
          <div className="font-semibold text-slate-900 text-sm">
            {currentDecision.question}
          </div>

          {/* Choices Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDecision.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectChoice(choice)}
                className="text-left p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all space-y-2 group focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="text-xs font-bold font-mono text-slate-400 group-hover:text-blue-600">
                  Opção {idx === 0 ? 'A' : 'B'}
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900">
                  {choice.label}
                </div>
                <div className="text-xs text-slate-600 leading-snug">
                  {choice.sublabel}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Screen 3: Decision Feedback */}
      {gameState === 'decision_feedback' && lastFeedback && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            {lastFeedback.choice.isEvidenceBased ? (
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {lastFeedback.choice.isEvidenceBased
                  ? 'Decisão Apoiada pela Evidência Científica!'
                  : 'Decisão em Desacordo com a Ciência'}
              </h3>
              <p className="text-xs text-slate-500">
                Fonte: {lastFeedback.choice.scientificPaperCitation}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed">
            {lastFeedback.explanation}
          </div>

          {/* Numerical Impact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block text-[10px]">Impacto em Vidas</span>
              <span className={`font-bold text-sm ${lastFeedback.choice.livesDelta >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {lastFeedback.choice.livesDelta >= 0 ? '+' : ''}{lastFeedback.choice.livesDelta.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block text-[10px]">Internações Evitadas</span>
              <span className={`font-bold text-sm ${lastFeedback.choice.casesDelta >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {lastFeedback.choice.casesDelta >= 0 ? '+' : ''}{lastFeedback.choice.casesDelta.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block text-[10px]">Variação do R(t)</span>
              <span className={`font-bold text-sm ${lastFeedback.choice.rDelta <= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {lastFeedback.choice.rDelta <= 0 ? '' : '+'}{lastFeedback.choice.rDelta}
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-500 block text-[10px]">Confiança Pública</span>
              <span className={`font-bold text-sm ${lastFeedback.choice.trustDelta >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {lastFeedback.choice.trustDelta >= 0 ? '+' : ''}{lastFeedback.choice.trustDelta}%
              </span>
            </div>
          </div>

          <button
            onClick={nextStage}
            className="w-full py-3 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors shadow-xs"
          >
            {currentStageIdx + 1 < GAME_STAGES.length ? 'Avançar para a Próxima Fase' : 'Ver Resultado Final'}
          </button>
        </div>
      )}

      {/* Screen 4: Finished Game & Evaluation */}
      {gameState === 'finished' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Balanço Geral da Sua Gestão Sanitária
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Você concluiu os 8 desafios cruciais da pandemia no Brasil. Veja seu desempenho comparado com a realidade histórica:
            </p>
          </div>

          {/* Final Score Grid */}
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="text-xs uppercase font-medium text-emerald-800">Total de Vidas Salvas</div>
              <div className="text-2xl font-mono font-bold text-emerald-950 mt-1 tabular-nums">
                {livesSaved.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-emerald-800 mt-1">
                Realidade histórica: 303.129 vidas poupadas no 1º ano
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="text-xs uppercase font-medium text-blue-800">Casos Graves Evitados</div>
              <div className="text-2xl font-mono font-bold text-blue-950 mt-1 tabular-nums">
                {severeCasesAverted.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-blue-800 mt-1">
                Realidade histórica: 875.846 internações evitadas
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 text-left leading-relaxed">
            <strong>Conclusão Epidemiológica:</strong> Os modelos matemáticos do The Lancet e da Royal Society provam 
            que quando a ciência e o SUS são priorizados com agilidade, dezenas de milhares de famílias deixam de chorar 
            a perda de seus entes queridos. O atraso e a politização custam vidas reais.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={startGame}
              className="flex-1 py-3 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

(function () {
var SHEET = 'https://script.google.com/macros/s/AKfycbzlug_ghGNAD50rfcy-DEB06gt4kVMp7rTfBzuLVS7cLIgfePv7sKeT_OEZnt0yYYbA/exec';
var PAY = 'https://pay.hotmart.com/P106902508P?off=hlno92ej';
var L = ['A', 'B', 'C', 'D'];
var AGES = ['Até 24 anos', 'Entre 25 e 36 anos', 'Entre 37 e 49 anos', 'Mais de 50 anos'];
var LOGO = '<svg viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M100 14 116 46 100 78 84 46Z" fill="#C9B27E"/><path d="M70 92c10 14 20 24 30 30 10-6 20-16 30-30v24c-12 10-22 18-30 30-8-12-18-20-30-30Z" fill="#EFEADF"/><path d="M20 100c42 28 68 56 80 92 12-36 38-64 80-92-42 14-66 36-80 60-14-24-38-46-80-60Z" fill="#EFEADF"/></svg>';

var FB = {
  'Até 24 anos': {
    Homem: ['Muito bom, campeão. Você está saindo na frente.', 'Enquanto a maioria da sua idade perde tempo com bobeira, você já entendeu que precisa do caminho certo.', 'Sua juventude é a sua maior vantagem pra conquistar a liberdade agora.'],
    Mulher: ['Incrível. Você tem o tempo a seu favor.', 'Ter essa clareza agora vai te poupar anos de batida de cabeça.', 'Você está no momento ideal pra ajustar sua energia e dominar o caminho que a maioria só descobre tarde demais.']
  },
  'Entre 25 e 36 anos': {
    Homem: ['Perfeito. Você está no momento ideal.', 'Já tem experiência suficiente pra saber o que não funciona, e ainda tem toda a energia que precisa pra acelerar.', 'É exatamente agora que você vai equilibrar sua mentalidade e suas finanças para conquistar a liberdade que merece.'],
    Mulher: ['Excelente. Você está no momento ideal.', 'A energia encontra a maturidade: você já sabe o que não funciona e ainda tem todo o pique pra acelerar.', 'É exatamente agora que você vai equilibrar sua mentalidade e suas finanças para conquistar a liberdade que merece.']
  },
  'Entre 37 e 49 anos': {
    Homem: ['Entendido, [NOME]. Você já caminhou muito.', 'Você sabe que a vida não perdoa erros bobos, e toda a sua experiência acumulada conta a seu favor.', 'Com a chave certa da Trinca, é ela que vai te garantir a liberdade que você busca há anos.'],
    Mulher: ['Muito bem. Você já viveu o suficiente pra não aceitar promessas vazias.', 'Vamos usar a sua experiência pra você ter a energia e o resultado que tanto se esforçou pra conquistar.', 'A sua hora chegou.']
  },
  'Mais de 50 anos': {
    Homem: ['Olha, [NOME], vou te falar uma verdade: a hora certa é agora.', 'Muitos homens mudam de vida exatamente depois dos 50.', 'Não existe tempo perdido, existe o tempo de começar do jeito certo pra ter a sua liberdade.'],
    Mulher: ['Que bom ter você aqui. Você está na sua fase mais potente.', 'Muita gente acha que o tempo passou, mas a sua sabedoria é a sua maior aliada.', 'É ela que vai ajustar a sua energia e te fazer viver o seu melhor momento a partir de hoje.']
  }
};

var STEPS = [
  { k: 'intro', kick: 'COMECE AQUI' },
  { k: 'cover', kick: 'QUEM É VOCÊ' },
  { k: 'q', kick: 'SOBRE VOCÊ', field: 'age', q: 'Qual é a sua idade, [NOME]?', sub: 'Cada fase da vida tem o seu próprio “manual de instruções”. O que funciona aos 20 nem sempre funciona aos 45.', o: AGES },
  { k: 'q', p: 'MIND', kick: 'PILAR MIND', q: '[NOME], a sua mente vive voando?', sub: 'Por mais que você queira muito, parece que o controle do seu próprio foco não é seu.', o: ['Minha mente vive voando e perco o foco o tempo todo.', 'Sinto que não tenho controle nenhum da minha própria mente.', 'Isso acontece quase todo dia e me atrapalha demais.', 'Eu tento me concentrar, mas minha mente sempre foge de mim.'] },
  { k: 'q', p: 'MIND', kick: 'PILAR MIND', q: 'A sua mente vive te convencendo a deixar as coisas importantes para amanhã?', sub: 'Como se você estivesse sempre com o freio de mão puxado na vida.', o: ['Sinto que empurro o que é importante com a barriga o tempo todo.', 'Adio as tarefas mais do que eu gostaria e isso me atrasa muito.', 'Minha mente sempre arruma uma desculpa para eu não começar.', 'Esse hábito de deixar tudo para depois é o meu maior peso hoje.'] },
  { k: 'q', p: 'MIND', kick: 'PILAR MIND', q: 'Para fechar essa parte da mente: você sente que falta clareza sobre o próximo passo?', sub: 'Por mais que você tente se organizar, nunca fica óbvio o que fazer agora.', o: ['Minha mente vive confusa e eu nunca sei direito por onde começar.', 'Sinto que estou sempre perdido, sem saber qual é o caminho certo.', 'Essa falta de clareza me faz patinar no mesmo lugar há muito tempo.', 'Eu até tenho ideias, mas minha mente trava na hora de organizar tudo.'] },
  { k: 'q', p: 'MOTION', kick: 'PILAR MOTION', q: 'Você sente um cansaço pesado por volta das 3h da tarde?', sub: 'Ele te rouba a vontade de trabalhar e te joga pro celular no meio do dia, pra ficar vendo vídeos curtos.', o: ['Sinto um cansaço que me derruba todo santo dia.', 'Depois do almoço meu pique some e eu não rendo nada.', 'Eu queria ter ânimo, mas meu corpo pede descanso toda hora.', 'Minha disposição acaba cedo e eu fico só enrolando no serviço.'] },
  { k: 'q', p: 'MOTION', kick: 'PILAR MOTION', q: 'E como você acorda de manhã?', sub: 'Levanta com disposição ou já sai da cama com o corpo pesado?', o: ['Já acordo sentindo que não descansei nada.', 'Demoro um tempão para conseguir “pegar no tranco” de manhã.', 'Parece que o meu corpo está pesando igual chumbo.', 'Sinto que o sono nunca é o suficiente para me dar ânimo.'] },
  { k: 'q', p: 'MOTION', kick: 'PILAR MOTION', q: 'Você passa muito tempo parado ou sentado durante o dia?', sub: 'Sente que o seu corpo está meio pesado, sem aquele pique pra correr atrás da sua liberdade.', o: ['Meu corpo vive pesado e sem ânimo para nada.', 'Sinto que estou enferrujado de tanto ficar parado.', 'Passo o dia sem pique e sem vontade de me mexer.', 'Meu corpo parece que não acompanha a minha vontade.'] },
  { k: 'q', p: 'MONEY', kick: 'PILAR MONEY', q: '[NOME], você sente que o dinheiro some da sua mão?', sub: 'Você trabalha duro e se esforça muito, mas a sua vida nunca prospera de verdade.', o: ['Trabalho muito, mas o dinheiro nunca sobra no final do mês.', 'Sinto que estou sempre “nadando e morrendo na praia”.', 'Minhas finanças estão travadas e não saio do lugar.', 'Parece que o dinheiro foge de mim, não importa o meu esforço.'] },
  { k: 'q', p: 'MONEY', kick: 'PILAR MONEY', q: 'Me diz a verdade: as contas te deixam sempre no sufoco?', sub: 'Os boletos não param de chegar e falta paz pra planejar o futuro.', o: ['Vivo num sufoco danado e as contas tiram o meu sono e a minha paz todos os dias.', 'Sinto que estou sempre “apagando incêndio” nas finanças e por isso minha vida não sai do lugar.', 'A preocupação com o dinheiro sequestra minha atenção e não tenho cabeça pra planos maiores.', 'Parece que estou numa areia movediça e o dinheiro foge de mim, não importa o quanto eu me esforce.'] },
  { k: 'q', p: 'MONEY', kick: 'PILAR MONEY', q: 'Quando você pensa em dinheiro, qual é a primeira sensação que vem?', sub: 'Não é sobre o valor, é sobre o que o dinheiro representa na sua vida.', o: ['Ansiedade. Sempre penso no que falta pagar, nunca no que posso construir.', 'Cansaço. Sinto que trabalho muito e não vejo o dinheiro valer a pena.', 'Frustração. Parece que nunca é o suficiente, não importa quanto eu ganhe.', 'Medo. Tenho medo de ficar sem, de não conseguir me manter se algo der errado.'] },
  { k: 'load', kick: 'ANÁLISE' },
  { k: 'mail', kick: 'FALTA SÓ O E-MAIL' }
];
var MSGS = ['Lendo as respostas do MIND…', 'Avaliando a sua energia no MOTION…', 'Calculando o impacto no MONEY…', 'PADRÃO IDENTIFICADO.'];

var S = { i: 0, name: '', sex: '', age: '', email: '', ans: {}, err: '' };
var pane = document.getElementById('pane'), kickEl = document.getElementById('kick'),
    pctEl = document.getElementById('pct'), ticksEl = document.getElementById('ticks'),
    stepEl = document.getElementById('steplab'), shell = document.getElementById('shell'),
    resEl = document.getElementById('result');

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function nm() { var r = (S.name || '').trim().split(' ')[0]; return r ? r.charAt(0).toUpperCase() + r.slice(1) : 'você'; }
function fill(t) { return String(t || '').split('[NOME]').join(nm()); }
function fbq(a, b) { try { if (window.fbq) window.fbq(a, b); } catch (e) {} }
function sheet(form) {
  try {
    0&&fetch(SHEET, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: (S.name || '').trim(), proj: 'Quiz Trinca', form: form, startedAt: 0, finishedAt: Date.now(), days: 1 }) }).catch(function () {});
  } catch (e) {}
}

var ORD = [], _c = 0;
for (var _j = 0; _j < STEPS.length; _j++) { if (STEPS[_j].k === 'cover' || STEPS[_j].k === 'q') _c++; ORD[_j] = _c; }
var CTOTAL = _c;
function chrome() {
  var st = STEPS[S.i] || STEPS[0];
  kickEl.textContent = st.kick || '';
  var isC = (st.k === 'cover' || st.k === 'q'), pos = ORD[S.i] || 0, done = isC ? pos - 1 : pos;
  pctEl.textContent = Math.round(done / CTOTAL * 100) + '%';
  stepEl.textContent = String(Math.max(1, isC ? pos : Math.min(pos + 1, CTOTAL))).padStart(2, '0') + ' de ' + CTOTAL + ' etapas';
  var h = '';
  for (var k = 0; k < CTOTAL; k++) h += '<i class="' + (k < done ? 'on' : (isC && k === pos - 1 ? 'now' : '')) + '"></i>';
  ticksEl.innerHTML = h;
}

function render() {
  var st = STEPS[S.i], h = '';
  chrome();
  if (st.k === 'intro') {
    h = '<div class="badge"><b></b>DIAGNÓSTICO DA TRINCA</div>' +
      '<h1 class="q">Em 2 minutos, o que está te travando fica claro.</h1>' +
      '<p class="introp">Você vai responder um diagnóstico rápido sobre os três pilares da sua vida: a sua mente, a sua energia e o seu dinheiro. No fim, um retrato de onde você está travando e o primeiro passo pra destravar.</p>' +
      '<button class="cta" id="go"><span>COMEÇAR</span><span>→</span></button>' +
      '<div class="fine">' + CTOTAL + ' etapas · menos de 2 minutos · sem spam</div>';
  } else if (st.k === 'cover') {
    h = '<div class="badge"><b></b>DIAGNÓSTICO DA TRINCA</div>' +
      '<h1 class="q">Com quem eu estou falando agora?</h1>' +
      '<p style="font-size:clamp(15px,4.2vw,19px);font-weight:400;line-height:1.55;color:rgba(20,49,44,.72);max-width:460px">Escreva seu nome ou apelido e o seu sexo, pra começar o quiz.</p>' +
      '<div class="card"><div style="display:flex;flex-direction:column;gap:8px"><label>COMO DEVO TE CHAMAR?</label>' +
      '<input id="nm" type="text" placeholder="Nome ou apelido" value="' + esc(S.name) + '"></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><label>VOCÊ É</label><div class="sex">' +
      '<button data-sex="Homem" class="' + (S.sex === 'Homem' ? 'on' : '') + '">Homem</button>' +
      '<button data-sex="Mulher" class="' + (S.sex === 'Mulher' ? 'on' : '') + '">Mulher</button></div></div>' +
      (S.err ? '<div class="err">' + esc(S.err) + '</div>' : '') +
      '<button class="cta" id="go"><span>COMEÇAR O QUIZ</span><span>→</span></button>' +
      '<div class="fine">' + CTOTAL + ' etapas · menos de 2 minutos · sem spam</div></div>';
  } else if (st.k === 'q') {
    h = '<div class="badge' + (st.p === 'MONEY' ? ' money' : '') + '"><b></b>' + (st.p ? 'PILAR ' + st.p : 'SOBRE VOCÊ') + '</div>' +
      '<h2 class="q">' + esc(fill(st.q)) + '</h2><p class="sub">' + esc(fill(st.sub)) + '</p><div class="opts">' +
      st.o.map(function (o, k) { return '<button class="opt" data-pick="' + k + '"><i>' + L[k] + '</i><span>' + esc(o) + '</span></button>'; }).join('') +
      '</div>';
  } else if (st.k === 'fb') {
    var lines = st.lines || (FB[S.age] || FB[AGES[1]])[S.sex === 'Mulher' ? 'Mulher' : 'Homem'];
    h = lines.map(function (t, k) { return k === 0 ? '<p class="fb">' + esc(fill(t)) + '</p>' : '<p class="fbp">' + esc(fill(t)) + '</p>'; }).join('') +
      '<div class="rule"></div><button class="cta inline" id="go"><span>' + esc(st.cta) + '</span><span>→</span></button>';
  } else if (st.k === 'load') {
    h = '<div class="load"><svg viewBox="0 0 200 200" fill="none">' +
      '<path d="M100 14 116 46 100 78 84 46Z" fill="#9C8654" style="animation:pulse 1.6s ease-in-out infinite;transform-origin:100px 46px"/>' +
      '<path d="M70 92c10 14 20 24 30 30 10-6 20-16 30-30v24c-12 10-22 18-30 30-8-12-18-20-30-30Z" fill="#0F3B34" style="animation:pulse 1.6s ease-in-out .2s infinite;transform-origin:100px 119px"/>' +
      '<path d="M20 100c42 28 68 56 80 92 12-36 38-64 80-92-42 14-66 36-80 60-14-24-38-46-80-60Z" fill="#0F3B34" style="animation:pulse 1.6s ease-in-out .4s infinite;transform-origin:100px 146px"/></svg>' +
      '<div><h2 class="q" style="text-align:center">Analisando suas respostas…</h2>' +
      '<p style="font-size:16px;color:rgba(20,49,44,.65);margin-top:10px">Cruzando MIND, MOTION e MONEY.</p></div>' +
      '<div class="bar"><i id="lbar"></i></div><div class="row"><span id="lmsg">' + MSGS[0] + '</span><b id="lpct">0%</b></div></div>';
  } else {
    h = '<h2 style="font-family:Anton,sans-serif;font-size:clamp(34px,9vw,58px);line-height:.94;text-transform:uppercase;color:#0F3B34">Padrão identificado</h2>' +
      '<p style="font-size:clamp(16px,4.4vw,20px);font-weight:400;line-height:1.55;color:rgba(20,49,44,.8);max-width:480px">Você está a um passo de ver onde está o seu maior travamento.</p>' +
      '<p style="font-size:clamp(15px,4.2vw,18px);font-weight:300;line-height:1.6;color:rgba(20,49,44,.7);max-width:480px">Digite seu e-mail para receber o diagnóstico completo também no seu e-mail.</p>' +
      '<div class="card"><input id="em" type="email" inputmode="email" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="Digite seu melhor e-mail aqui" value="' + esc(S.email) + '">' +
      (S.err ? '<div class="err">' + esc(S.err) + '</div>' : '') +
      '<button class="cta gold" id="go"><span>VER MEU DIAGNÓSTICO AGORA</span><span>→</span></button>' +
      '<div class="fine" style="text-align:left">O resultado aparece na próxima tela. A cópia vai para o seu e-mail.</div></div>';
  }
  pane.innerHTML = h;
  pane.style.animation = 'none'; void pane.offsetWidth; pane.style.animation = '';
  if (st.k === 'load') runLoad();
  if (st.k === 'mail' && !S._emv){ S._emv=1; try{ if(window.ga)window.ga('email_view'); if(window.zpost)window.zpost('email_view',{name:(S.name||'').trim()}); }catch(_){} }
  var n = document.getElementById('nm'); if (n) n.oninput = function () { S.name = this.value; };
  var e = document.getElementById('em'); if (e) e.oninput = function () { S.email = this.value; };
}

pane.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') next(); });
pane.addEventListener('click', function (ev) {
  var t = ev.target.closest('[data-pick],[data-sex],#go');
  if (!t) return;
  if (t.id === 'go') return next();
  if (t.dataset.sex) { S.sex = t.dataset.sex; S.err = ''; return render(); }
  var st = STEPS[S.i], lab = st.o[+t.dataset.pick];
  S.ans[S.i] = lab; if (st.field === 'age') S.age = lab;
  try{ var _qn=Object.keys(S.ans).length; if(window.ga)window.ga('quiz_step',{step:_qn}); if(window.zpost)window.zpost('answer',{step:_qn,age:(st.field==='age'?lab:undefined)}); }catch(_){}
  S.i++; render();
});

function next() {
  var st = STEPS[S.i];
  if (st.k === 'cover') {
    if (!(S.name || '').trim()) { S.err = 'Me diz o seu nome primeiro para eu poder te chamar.'; return render(); }
    if (!S.sex) { S.err = 'Me diz também se você é homem ou mulher.'; return render(); }
    fbq('trackCustom', 'quiz_start'); try{ if(window.ga)window.ga('quiz_start'); if(window.zpost)window.zpost('quiz_start',{name:(S.name||'').trim(),sex:S.sex}); }catch(_){} S.err = ''; S.i++; return render();
  }
  if (st.k === 'mail') {
    var em = (S.email || '').trim().replace(/\s+/g, '').toLowerCase(); S.email = em;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { showEmailHelp(); return; }
    try{ if(window.amInit)window.amInit(em); }catch(_){}
    var _lid=window.evId?window.evId():''; try{ if(window.fbq)window.fbq('track','Lead',{},{eventID:_lid}); }catch(_){} if(window.ga)window.ga('generate_lead',{method:'diagnostico'});
    var _cid=window.evId?window.evId():''; try{ if(window.fbq){ window.fbq('track','CompleteRegistration',{content_name:'Diagnostico concluido'},{eventID:_cid}); window.fbq('track','ViewContent',{content_name:'Resultado'},{eventID:(window.evId?window.evId():'')}); } }catch(_){} if(window.ga)window.ga('diagnostico_view');
    if(window.zpost){ window.zpost('lead',{name:(S.name||'').trim(),email:em,sex:S.sex,age:S.age,evId:_lid}); window.zpost('diag_view',{name:(S.name||'').trim(),email:em,evId:_cid}); }
    return showResult();
  }
  if (st.k === 'load') return;
  S.err = ''; S.i++; render();
}

function runLoad() {
  var v = 0, bar = document.getElementById('lbar'), msg = document.getElementById('lmsg'), p = document.getElementById('lpct');
  var t = setInterval(function () {
    v += 2;
    if (v >= 100) { v = 100; clearInterval(t); if (bar){ bar.style.width='100%'; p.textContent='100%'; msg.textContent=MSGS[3]; } setTimeout(function () { S.i++; render(); }, 300); return; }
    if (bar) { bar.style.width = v + '%'; p.textContent = v + '%'; msg.textContent = MSGS[Math.min(3, Math.floor(v / 25))]; }
  }, 95);
}

function showEmailHelp() {
  if (document.getElementById('emhelp')) return;
  var d = document.createElement('div'); d.id = 'emhelp'; d.className = 'modal';
  d.innerHTML = '<div class="mbox">' +
    '<h3>Confere o seu e-mail</h3>' +
    '<p>O e-mail que você digitou não está no formato certo. Ele precisa ser parecido com este:</p>' +
    '<div class="mex">seunome@gmail.com</div>' +
    '<p class="msm">Pode ser @gmail.com, @hotmail.com, @outlook.com… e sempre termina em .com</p>' +
    '<p class="msm">Você só consegue ver o seu diagnóstico colocando um e-mail válido.</p>' +
    '<button class="cta" id="emok"><span>ENTENDI, VOU CORRIGIR</span><span>→</span></button>' +
    '</div>';
  document.body.appendChild(d);
  d.addEventListener('click', function (ev) {
    if (ev.target === d || ev.target.closest('#emok')) { d.remove(); var e = document.getElementById('em'); if (e) { e.focus(); } }
  });
}

var RINGS = [{ n: 'MIND', v: 80, t: 'ALTO' }, { n: 'MOTION', v: 92, t: 'CRÍTICO' }, { n: 'MONEY', v: 74, t: 'ALTO' }];
var HERO = [
  'As suas respostas desenham um padrão bem específico, [NOME]. Você não é uma pessoa sem vontade: você tem vontade de sobra, o problema é que ela nunca vira execução. Você decide, planeja, se anima, e no dia seguinte o corpo não acompanha, a cabeça foge e o dia acaba antes de você começar o que importava.',
  'É por isso que dá para se esforçar muito e continuar exatamente onde estava seis meses atrás. Não é o plano que está errado. É a base: sono ruim, pouco movimento e cortisol alto derrubam o combustível que a sua cabeça precisa para decidir, e sem decisão nada anda. O dinheiro, no fim, só mostra no extrato o que já estava acontecendo na sua energia.',
  'A leitura abaixo mostra onde cada um dos três pilares está travando você hoje, do mais leve ao mais crítico. Leia com calma, porque é a partir daqui que dá para trocar o quase por movimento de verdade.'
];
var BULLETS = ['Começa as coisas com energia e larga no meio.', 'Sente o corpo pesado e o sono ruim, mesmo dormindo.', 'Sabe o que precisa fazer, mas na hora não sai.'];
var OPPS = [['MIND', 'Clareza para saber qual é o próximo passo.'], ['MOTION', 'Sono e movimento que devolvem energia para o dia.'], ['MONEY', 'O dinheiro vira consequência do que você executa.']];
var TRANS = [
  'Você acabou de ver o que te segura. E aqui mora a armadilha: entender dá um alívio gostoso de “agora eu sei”, e esse alívio te engana. Ele te faz sentir que avançou sem sair do lugar.',
  'É nesse ponto exato que a maioria fecha a aba e volta pra mesma rotina. Semana que vem lembra do diagnóstico, sente o mesmo alívio de novo, e continua no quase.',
  'Com você vai ser diferente por um motivo simples. Nos próximos 90 dias você tem um método que te faz agir antes de estar com tudo entendido. Nada de mais um curso comprado animado e largado no módulo 2. Nada de planilha que você abre uma vez. Cada aula termina numa ação pra fazer na hora. Você assiste e faz. Aprende fazendo.'
];
var ITEMS = ['44 aulas em 6 módulos, liberadas em ondas ao longo de 90 dias', 'Bônus: Ebook Gestão do Tempo', 'Bônus: Planilha dos 3 Pilares', 'Bônus: Guia de Recomeço'];
var FAQ = [
  ['Não tenho tempo.', 'Aula curta, ação pequena. Foi feito pra caber na sua correria, não pra virar mais uma coisa que você começa e larga.'],
  ['Já larguei outros cursos.', 'Esse é diferente na regra. Você não sai sabendo, sai tendo feito. Cada aula termina com uma ação pra executar na hora.'],
  ['E se não for pra mim?', '7 dias de garantia. Se não sentir que saiu do lugar, você pede o reembolso e está resolvido. Sem pergunta.']
];

function showResult() {
  var C = 2 * Math.PI * 52;
  var rings = RINGS.map(function (r) {
    var gold = r.v >= 90, col = gold ? '#9C8654' : '#0F3B34';
    return '<div class="ring"><div class="dial"><svg viewBox="0 0 120 120">' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="rgba(20,49,44,.12)" stroke-width="9"></circle>' +
      '<circle class="arc" data-off="' + (C * (1 - r.v / 100)).toFixed(1) + '" cx="60" cy="60" r="52" fill="none" stroke="' + col + '" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + C.toFixed(1) + '"></circle>' +
      '</svg><div class="num" style="color:' + col + '">' + r.v + '%</div></div>' +
      '<div style="text-align:center"><div class="nm">' + r.n + '</div><div class="tg" style="color:' + col + '">' + r.t + '</div></div></div>';
  }).join('');

  resEl.innerHTML = '<div class="res">' +
    '<header class="hero"><div class="wrap">' +
      '<div class="top"><div class="brand">' + LOGO + '<div class="wm" style="margin-left:14px">ZÊNITE</div></div>' +
      '<div class="pill"><b></b>DIAGNÓSTICO CONCLUÍDO</div></div>' +
      '<div class="hr"></div>' +
      '<div class="lead">' + esc(nm().toUpperCase()) + ', O SEU PERFIL É O</div>' +
      '<h1 class="big">Prisioneiro <span>do Quase</span></h1><div class="grad"></div>' +
      '<p class="say">Quem quase começa, quase muda, quase vai. E vive convencido de que a próxima semana vai ser diferente.</p>' +
      HERO.map(function (t) { return '<p>' + esc(fill(t)) + '</p>'; }).join('') +
    '</div></header>' +
    '<section class="body">' +
      '<div class="wrap"><div class="hd"><span>NÍVEL DE TRAVAMENTO</span><i></i></div>' +
      '<div class="rings">' + rings + '</div>' +
      '<div class="note">Quanto maior o número, mais esse pilar está segurando você.</div></div>' +
      '<div class="wrap"><div class="hd"><em>01</em><span>O ESTADO ATUAL</span><i></i></div>' +
      '<h2 class="blk">Você se esforça e continua no mesmo lugar.</h2>' +
      '<p class="blk">Você acorda decidido e termina o dia sem ter saído do lugar. Faz, tenta, se cobra, e a sensação é de correr parado. Você provavelmente reconhece isto:</p>' +
      BULLETS.map(function (b) { return '<div class="bul">' + esc(b) + '</div>'; }).join('') +
      '<div class="dark"><h3>A mentira que te contaram</h3><p>Que falta força de vontade, ou mais um curso. Não falta. Tentar produzir com a energia no fim é o que trava quase todo mundo antes de começar.</p></div></div>' +
      '<div class="wrap"><div class="hd"><em>02</em><span>A CAUSA RAIZ</span><i></i></div>' +
      '<h2 class="blk">Sua bateria interna está no vermelho.</h2>' +
      '<div class="bul" style="font-weight:300;line-height:1.62;padding:28px">Com o MOTION desregulado, sono ruim e pouco movimento, o corpo entra em modo de sobrevivência e mantém o cortisol alto. Nesse estado, o córtex pré-frontal, a parte do cérebro que decide e planeja, trabalha pela metade. Não é falta de disciplina. É química. Sua cabeça não coopera porque o seu corpo não está te dando base.</div></div>' +
      '<div class="wrap"><div class="hd"><em>03</em><span>A NOVA OPORTUNIDADE</span><i></i></div>' +
      '<h2 class="blk">Você não precisa de mais um plano. Precisa alinhar a Trinca.</h2>' +
      '<p class="blk">MIND, MOTION e MONEY andam juntos. Quando o corpo volta a te dar energia, a mente clareia, e o dinheiro deixa de ser luta e vira consequência. É por aí que se destrava, não por mais uma planilha.</p>' +
      '<div class="pcards">' + OPPS.map(function (o) { return '<div class="pc"><b>' + o[0] + '</b><p>' + o[1] + '</p></div>'; }).join('') + '</div>' +
      '<p class="bridge">Você já sabe onde dói. Agora tem uma escolha na sua frente, e ela não espera.</p></div>' +
    '</section>' +
    '<section class="trans"><div class="wrap"><h2>O diagnóstico está feito. Falta a parte que <span>quase ninguém faz.</span></h2><div class="grad"></div>' +
      TRANS.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div></section>' +
    '<section class="offer"><div class="wrap">' +
      '<div class="lead" style="color:#9C8654">A OFERTA</div><h2>A Trinca</h2>' +
      '<p class="sig">O programa que tira você do quase em 6 meses, no método TRIAD 3M. Uma aula, uma ação.</p>' +
      '<div class="box"><div class="lb">O QUE VOCÊ RECEBE</div><ul>' + ITEMS.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' +
      '<div class="price"><div><div class="old">De R$1.997</div><div style="display:flex;align-items:baseline;gap:10px"><span style="font-size:16px;color:rgba(20,49,44,.6)">por</span><span class="now">R$97</span></div></div>' +
      '<div style="font-size:17px;color:rgba(20,49,44,.65);padding-bottom:12px">ou 12x de R$10,03</div></div>' +
      '<a class="buy" href="' + PAY + '" target="_blank" rel="noopener" data-buy><span>QUERO SAIR DO QUASE AGORA</span><span>→</span></a>' +
      '<div class="guar"><b></b>7 dias de garantia. O risco é meu, não seu.</div></div>' +
    '</div></section>' +
    '<section class="faq"><div class="wrap"><h2 class="blk">Antes de decidir, três coisas.</h2>' +
      FAQ.map(function (f) { return '<div class="qa"><b>' + esc(f[0]) + '</b><p>' + esc(f[1]) + '</p></div>'; }).join('') + '</div></section>' +
    '<section class="last"><div class="wrap"><div class="cav">A hora certa é agora.</div>' +
      '<h2>Ou você começa hoje, ou <span>empata mais um ano</span> igual a esse.</h2>' +
      '<p>Preço de lançamento. Sobe na próxima onda.</p>' +
      '<a class="buy gold" href="' + PAY + '" target="_blank" rel="noopener" data-buy><span>QUERO MINHA VAGA AGORA</span><span>→</span></a>' +
      '<div class="fine">Menos de R$11 por mês pra mudar o rumo. A hora certa é agora.</div></div></section>' +
    '<footer class="foot"><div class="a">ZÊNITE · @ZENITE.MOV · POR LEONARDO PINTO</div>' +
      '<div class="b">Material educacional. Não substitui acompanhamento de saúde nem consultoria financeira.</div></footer>' +
  '</div>';

  shell.hidden = true; resEl.hidden = false;
  window.scrollTo(0, 0);
  setTimeout(function () {
    resEl.querySelectorAll('.arc').forEach(function (a) { a.setAttribute('stroke-dashoffset', a.dataset.off); });
  }, 220);
  resEl.addEventListener('click', function (ev) { if (ev.target.closest('[data-buy]')){ try{ var _k=window.evId?window.evId():''; if(window.fbq)window.fbq('track','InitiateCheckout',{value:97,currency:'BRL'},{eventID:_k}); if(window.ga)window.ga('begin_checkout',{value:97,currency:'BRL'}); if(window.zpost)window.zpost('checkout',{name:(S.name||'').trim(),email:(S.email||'').trim(),evId:_k}); }catch(_){} } });
}

try{ if(window.zpost)window.zpost('lp_view'); }catch(_){}
render();
})();

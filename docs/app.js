const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const generationModes = ['copy', 'image', 'video'];
let activeGenerationMode = 'copy';
const heroModels = {
  copy: {name: 'DeepSeek', capability: '深度推理', runningTitle: 'DeepSeek 正在撰写文案', completeTitle: 'DeepSeek 文案生成完成', islandRunning: 'DeepSeek 正在撰写', islandComplete: 'DeepSeek 文案已完成', islandDetail: '正在梳理品牌语气与核心卖点'},
  image: {name: 'ChatGPT', capability: '图像生成', runningTitle: 'ChatGPT 正在生成主视觉', completeTitle: 'ChatGPT 主视觉生成完成', islandRunning: 'ChatGPT 正在生成图片', islandComplete: 'ChatGPT 主视觉已完成', islandDetail: '正在组合构图、材质与品牌色彩'},
  video: {name: 'Google Flow', capability: '视频生成', runningTitle: 'Google Flow 正在渲染视频', completeTitle: 'Google Flow 视频生成完成', islandRunning: 'Google Flow 正在生成视频', islandComplete: 'Google Flow 视频已完成', islandDetail: '正在合成运镜、节奏与场景转场'}
};
const island = document.querySelector('.dynamic-island');
function renderIsland(mode, complete = false) {
  const model = heroModels[mode];
  document.querySelector('#islandTitle').textContent = complete ? model.islandComplete : model.islandRunning;
  document.querySelector('#islandDetail').textContent = complete ? `${model.name} 的生成结果可以查看` : model.islandDetail;
  island.classList.toggle('complete', complete);
}
island.addEventListener('click', () => {
  const nextMode = generationModes[(generationModes.indexOf(activeGenerationMode) + 1) % generationModes.length];
  showGeneration(nextMode);
});
renderIsland('copy');

const heroCopy = '“带走温度，不留下负担。” 视觉建议：用清晨自然光、低饱和城市街景，以及随行杯贯穿三个生活片段。';
const generationLabels = {copy: '文案', image: '主视觉', video: '视频'};
const thinkingDetails = {
  copy: '梳理品牌语气、核心卖点与发布节奏',
  image: '组合构图、材质、光线与品牌色彩',
  video: '规划镜头运动、节奏与场景转场'
};
const completionDetails = {
  copy: '已完成品牌语气与发布结构整理',
  image: '已完成画面生成与清晰度检查',
  video: '已完成镜头合成与视频渲染'
};
const generationElapsed = {
  copy: '00:03',
  image: '00:08',
  video: '00:12'
};
let generationRun = 0;
let generationTimer = 0;

async function typeInto(element, text, speed, run) {
  element.textContent = '';
  for (const char of text) {
    if (run !== generationRun) return false;
    element.textContent += char;
    if (!reducedMotion) await new Promise(resolve => window.setTimeout(resolve, speed));
  }
  return true;
}

async function showGeneration(mode) {
  window.clearTimeout(generationTimer);
  const run = ++generationRun;
  activeGenerationMode = mode;
  const model = heroModels[mode];
  const buttons = document.querySelectorAll('[data-generation]');
  const panels = document.querySelectorAll('[data-generation-panel]');
  const thinking = document.querySelector('#heroThinking');
  const detail = document.querySelector('#thinkingDetail');
  const title = document.querySelector('#thinkingTitle');
  const step = document.querySelector('#thinkingStep');
  const elapsed = document.querySelector('#thinkingElapsed');
  const responseBody = document.querySelector('.response-body');

  buttons.forEach(button => {
    const active = button.dataset.generation === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('[data-model-service]').forEach(service => {
    service.classList.toggle('active', service.dataset.modelService === mode);
  });
  document.querySelector('#activeModelName').textContent = model.name;
  document.querySelector('#activeModelCapability').textContent = model.capability;
  panels.forEach(panel => {
    panel.classList.remove('is-active');
    panel.hidden = true;
  });
  thinking.classList.remove('is-complete');
  title.textContent = model.runningTitle;
  detail.textContent = thinkingDetails[mode];
  step.textContent = `生成${generationLabels[mode]}`;
  elapsed.textContent = '运行中';
  responseBody.classList.remove('is-finished');
  renderIsland(mode);

  if (!reducedMotion) await new Promise(resolve => window.setTimeout(resolve, 1100));
  if (run !== generationRun) return;

  thinking.classList.add('is-complete');
  title.textContent = model.completeTitle;
  detail.textContent = completionDetails[mode];
  elapsed.textContent = generationElapsed[mode];
  renderIsland(mode, true);
  const panel = document.querySelector(`[data-generation-panel="${mode}"]`);
  panel.hidden = false;
  window.requestAnimationFrame(() => panel.classList.add('is-active'));

  if (mode === 'copy') {
    await typeInto(document.querySelector('#heroStream'), heroCopy, 22, run);
    responseBody.classList.add('is-finished');
  }
  if (run !== generationRun || reducedMotion) return;

  generationTimer = window.setTimeout(() => {
    const next = generationModes[(generationModes.indexOf(mode) + 1) % generationModes.length];
    showGeneration(next);
  }, mode === 'copy' ? 4000 : 5200);
}

document.querySelectorAll('[data-generation]').forEach(button => {
  button.addEventListener('click', () => showGeneration(button.dataset.generation));
});
showGeneration('copy');

const models = [
  {name:'Claude',maker:'Anthropic',region:'GLOBAL',image:'./assets/model-home-claude.webp',copy:'长文本、写作与复杂分析'},
  {name:'ChatGPT',maker:'OpenAI',region:'GLOBAL',image:'./assets/model-home-chatgpt.webp',copy:'通用智能与创意生产'},
  {name:'Gemini',maker:'Google',region:'GLOBAL',image:'./assets/model-home-gemini.webp',copy:'原生多模态理解与生成'},
  {name:'Google Flow',maker:'Google',region:'GLOBAL',image:'./assets/model-home-flow.webp',copy:'图片、视频与创意工作流'},
  {name:'Manus',maker:'Manus AI',region:'GLOBAL',image:'./assets/model-home-manus.webp',copy:'自主执行复杂任务'},
  {name:'Perplexity',maker:'Perplexity AI',region:'GLOBAL',image:'./assets/model-home-perplexity.webp',copy:'智能搜索与答案引擎'},
  {name:'DeepSeek',maker:'DeepSeek',region:'CHINA',image:'./assets/model-home-deepseek.webp',copy:'深度推理、代码与研究'},
  {name:'GLM',maker:'智谱 AI',region:'CHINA',image:'./assets/model-home-glm.webp',copy:'中英文通用智能助手'},
  {name:'豆包',maker:'ByteDance',region:'CHINA',image:'./assets/model-home-doubao.webp',copy:'对话、创作与多模态'},
  {name:'MiniMax',maker:'MiniMax',region:'CHINA',image:'./assets/model-home-minimax.webp',copy:'文本、语音与视频生成'},
  {name:'Kimi',maker:'Moonshot AI',region:'CHINA',image:'./assets/model-home-kimi.webp',copy:'长上下文与知识工作'},
  {name:'文心',maker:'Baidu',region:'CHINA',image:'./assets/model-home-wenxin.webp',copy:'搜索、创作与智能体'},
  {name:'Qwen',maker:'Alibaba',region:'CHINA',image:'./assets/model-home-qwen.webp?v=landing-2',copy:'通用对话与多模态创作'},
  {name:'即梦',maker:'ByteDance',region:'CHINA',image:'./assets/model-home-jimeng.webp?v=landing-2',copy:'图片、视频与数字人创作'},
  {name:'扣子',maker:'ByteDance',region:'CHINA',image:'./assets/model-home-coze.webp?v=overview-2',copy:'智能体、工作流与团队协作'}
];
const topLeftModelImages = new Set(['DeepSeek','GLM','豆包','MiniMax','Kimi','文心','扣子','Claude','ChatGPT','Gemini','Google Flow','Manus']);
let orbitPosition = 0;
const orbitTrack = document.querySelector('#orbitTrack');
const modulo = (value, length) => ((value % length) + length) % length;
function modelCard(model, slot) {
  const visual = `<img src="${model.image}" alt="${model.name} 官方页面视觉" loading="lazy">`;
  const imagePosition = topLeftModelImages.has(model.name) ? 'left-top' : 'center';
  return `<div class="orbit-item" data-slot="${slot}" style="--slot:${slot}"><article class="model-card"><div class="model-art" data-region="${model.region}" data-position="${imagePosition}">${visual}</div><div class="model-copy"><span>${model.maker}</span><h3>${model.name}</h3><p>${model.copy}</p></div></article></div>`;
}
function renderOrbit() {
  orbitTrack.innerHTML = Array.from({length:31},(_,i) => i - 15).map(slot => modelCard(models[modulo(slot + 1, models.length)], slot)).join('');
  updateOrbit(false);
}
function updateOrbit(announce = true) {
  orbitTrack.style.setProperty('--position', orbitPosition);
  orbitTrack.querySelectorAll('.orbit-item').forEach(item => item.classList.toggle('is-center', Number(item.dataset.slot) === orbitPosition));
  const active = models[modulo(orbitPosition + 1, models.length)];
  document.querySelector('#orbitName').textContent = active.name;
  document.querySelector('#orbitCount').textContent = `${String(modulo(orbitPosition + 1, models.length) + 1).padStart(2,'0')} / ${models.length}`;
}
function moveOrbit(direction) {
  orbitPosition += direction;
  updateOrbit();
  if (Math.abs(orbitPosition) > 7) window.setTimeout(() => { orbitPosition -= Math.sign(orbitPosition) * models.length; orbitTrack.style.transition = 'none'; updateOrbit(false); requestAnimationFrame(() => { orbitTrack.style.transition = ''; }); }, 760);
}
document.querySelectorAll('[data-orbit]').forEach(button => button.addEventListener('click', () => moveOrbit(Number(button.dataset.orbit))));
document.querySelector('.orbit-window').addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveOrbit(event.key === 'ArrowLeft' ? -1 : 1); } });
renderOrbit();

const answerSets = {
  deepseek:'01  先建立冲突：城市很快，但周末应该慢下来。\n\n02  0–5 秒：清晨地铁门打开，声音先行。\n\n03  5–18 秒：三个城市细节快速交叉。\n\n04  18–30 秒：人物登上天台，落到主题句。',
  kimi:'01  开场文案：别把周末，过成另一个工作日。\n\n02  镜头跟着一双鞋离开熟悉的路线。\n\n03  旁白轻一点，环境声保留城市呼吸。\n\n04  结尾：走远一点，才听见自己。',
  qwen:'01  镜头 1：24mm 广角，低机位跟拍脚步。\n\n02  镜头 2：50mm 手持，捕捉街角招牌与咖啡。\n\n03  转场：用经过镜头的公交车做遮挡切换。\n\n04  配乐：92 BPM，结尾 2 秒留白落标。',
  claude:'01  叙事从“离开熟悉路线”开始，让城市成为人物。\n\n02  用脚步、风声和咖啡机建立真实的周末触感。\n\n03  旁白只保留一句：今天，不必急着抵达。\n\n04  结尾让人物停下，画面留白后出现主题。',
  chatgpt:'01  0–4 秒：地铁门打开，人物逆着人流走出站台。\n\n02  4–15 秒：街角、咖啡与旧书店快速蒙太奇。\n\n03  15–26 秒：镜头跟随人物登上城市天台。\n\n04  26–30 秒：落版“换条路，重新遇见周末”。'
};
const answerModelOrder = ['deepseek','kimi','qwen','claude','chatgpt'];
const answerModelNames = {deepseek:'DeepSeek',kimi:'Kimi',qwen:'Qwen',claude:'Claude',chatgpt:'ChatGPT'};
const selectedAnswerModels = new Set(['deepseek','kimi','qwen']);
const maxAnswerModels = 3;
const rerunAnswers = document.querySelector('#rerunAnswers');
const modelConfigTrigger = document.querySelector('#modelConfigTrigger');
const modelConfigMenu = document.querySelector('#modelConfigMenu');
let answerRun = 0;

const waitForAnswer = delay => new Promise(resolve => window.setTimeout(resolve, delay));
async function typeAnswerText(target, text, speed, delay, run) {
  if (!reducedMotion) await waitForAnswer(delay);
  if (run !== answerRun) return false;
  target.textContent = '';
  if (reducedMotion) {
    target.textContent = text;
    return true;
  }
  for (const character of text) {
    if (run !== answerRun) return false;
    target.textContent += character;
    await waitForAnswer(speed);
  }
  return true;
}

async function runAnswers() {
  const run = ++answerRun;
  const entries = answerModelOrder.filter(key => selectedAnswerModels.has(key));
  rerunAnswers.disabled = true;
  answerModelOrder.forEach(key => {
    const column = document.querySelector(`[data-answer="${key}"]`);
    const target = column.querySelector('.answer-content');
    column.classList.remove('is-running','is-done');
    if (selectedAnswerModels.has(key)) {
      column.classList.add('is-running');
      target.textContent = '思考中';
      target.classList.add('pending');
    } else {
      target.textContent = '';
      target.classList.remove('pending');
    }
  });
  await Promise.all(entries.map(async (key, index) => {
    const column = document.querySelector(`[data-answer="${key}"]`);
    const target = column.querySelector('.answer-content');
    const completed = await typeAnswerText(target, answerSets[key], 7, 180 + index * 130, run);
    if (!completed) return;
    target.classList.remove('pending');
    column.classList.remove('is-running');
    column.classList.add('is-done');
  }));
  if (run === answerRun) rerunAnswers.disabled = false;
}

function setModelConfigOpen(open) {
  modelConfigMenu.hidden = !open;
  modelConfigTrigger.setAttribute('aria-expanded', String(open));
}

function updateAnswerModels() {
  const selected = answerModelOrder.filter(key => selectedAnswerModels.has(key));
  const columns = answerModelOrder.map(key => document.querySelector(`[data-answer="${key}"]`));
  document.querySelector('#modelConfigName').textContent = answerModelNames[selected[0]];
  document.querySelector('#modelConfigExtra').textContent = `×${selected.length}`;
  document.querySelector('#selectedModelCount').textContent = selected.length;
  modelConfigTrigger.setAttribute('aria-label', `配置模型，已选择 ${selected.length} 个模型`);
  document.querySelector('.answer-grid').style.setProperty('--answer-count', selected.length);
  columns.forEach(column => {
    const enabled = selectedAnswerModels.has(column.dataset.answer);
    column.classList.toggle('is-disabled', !enabled);
    column.classList.remove('is-last-visible');
    column.setAttribute('aria-hidden', String(!enabled));
  });
  columns.filter(column => !column.classList.contains('is-disabled')).at(-1)?.classList.add('is-last-visible');
  document.querySelectorAll('[data-model-option]').forEach(option => {
    const selectedOption = selectedAnswerModels.has(option.dataset.modelOption);
    const disabledByLimit = !selectedOption && selectedAnswerModels.size >= maxAnswerModels;
    option.classList.toggle('is-selected', selectedOption);
    option.classList.toggle('is-limit-disabled', disabledByLimit);
    option.setAttribute('aria-checked', String(selectedOption));
    option.setAttribute('aria-disabled', String(disabledByLimit));
    option.disabled = disabledByLimit;
    if (disabledByLimit) option.title = `最多选择 ${maxAnswerModels} 个模型`;
    else option.removeAttribute('title');
  });
}

modelConfigTrigger.addEventListener('click', () => setModelConfigOpen(modelConfigMenu.hidden));
document.querySelectorAll('[data-model-option]').forEach(option => option.addEventListener('click', () => {
  const key = option.dataset.modelOption;
  if (selectedAnswerModels.has(key) && selectedAnswerModels.size === 1) return;
  if (!selectedAnswerModels.has(key) && selectedAnswerModels.size >= maxAnswerModels) return;
  if (selectedAnswerModels.has(key)) selectedAnswerModels.delete(key);
  else selectedAnswerModels.add(key);
  answerRun++;
  rerunAnswers.disabled = false;
  updateAnswerModels();
  runAnswers();
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.model-config')) setModelConfigOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setModelConfigOpen(false);
});
rerunAnswers.addEventListener('click', runAnswers);
updateAnswerModels();

const switchScreens = {
  deepseek:{src:'./assets/switch-deepseek.png',alt:'OmniAI 主程序中的 DeepSeek 界面'},
  kimi:{src:'./assets/switch-kimi.png',alt:'OmniAI 主程序中的 Kimi 界面'},
  qwen:{src:'./assets/switch-qwen.png',alt:'OmniAI 主程序中的 Qwen 界面'},
  chatgpt:{src:'./assets/switch-chatgpt.png',alt:'OmniAI 主程序中的 ChatGPT 界面'},
  gemini:{src:'./assets/switch-gemini.png',alt:'OmniAI 主程序中的 Gemini 界面'},
  claude:{src:'./assets/switch-claude.png',alt:'OmniAI 主程序中的 Claude 界面'}
};
Object.values(switchScreens).forEach(screen => { const image = new Image(); image.src = screen.src; });
document.querySelectorAll('[data-switch]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-switch]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', String(item === button)); });
  const next = switchScreens[button.dataset.switch];
  const screenshot = document.querySelector('#switchScreenshot');
  screenshot.classList.add('is-changing');
  window.setTimeout(() => {
    screenshot.src = next.src;
    screenshot.alt = next.alt;
    screenshot.classList.remove('is-changing');
  }, reducedMotion ? 0 : 140);
}));

let quickVisible = true;
function toggleQuickWindow() {
  quickVisible = !quickVisible;
  document.querySelector('#quickWindow').classList.toggle('is-hidden', !quickVisible);
  document.querySelector('#shortcutStatus').textContent = quickVisible ? 'OmniAI 已显示' : 'OmniAI 已隐藏，再按一次唤回';
}
document.querySelector('#shortcutToggle').addEventListener('click', toggleQuickWindow);
window.addEventListener('keydown', event => { if (event.altKey && event.code === 'Space') { event.preventDefault(); toggleQuickWindow(); } });

const workflow = document.querySelector('.workflow-track');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.workflow-node').forEach((node,index) => window.setTimeout(() => node.classList.add('is-active'), index * 420)); }), {threshold:.35});
  observer.observe(workflow);
}

const videoButton = document.querySelector('.video-frame button');
videoButton.addEventListener('click', () => { videoButton.textContent = videoButton.textContent.trim() === '▶' ? 'Ⅱ' : '▶'; });

window.setTimeout(runAnswers, reducedMotion ? 0 : 700);

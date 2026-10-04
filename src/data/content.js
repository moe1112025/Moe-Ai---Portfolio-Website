export const profile = {
  name: 'Moe Htet Ar Kar (Phoe Cho)',
  shortName: 'MOE HTET AR KAR (Phoe Cho)',
  role: 'Cybersecurity Engineer | AI Red Teamer | Penetration Tester',
  specialization: 'AI Red Teaming | AI Penetration Testing | LLM Security',
  headline: 'Security engineering across web applications, APIs, AI/LLM systems, and assessment tooling.',
  bio: 'Primary focus: cybersecurity engineering, penetration testing and AI/LLM security assessment. Supporting engineering work spans machine learning, computer vision, edge AI and robotics as an active learning and systems-building track.',
  email: 'moehtetarkar259@gmail.com',
  github: 'https://github.com/moe1112025',
  cv: '/Moe-Htet-Ar-Kar-CV.pdf',
};

export const disciplines = [
  { key: 'security', title: 'AI / LLM Security', text: 'Application, API and agent security assessment across prompts, context, RAG, memory, tools and trust boundaries.' },
  { key: 'pentest', title: 'Penetration Testing', text: 'Web and API security testing, authentication and authorization review, evidence capture and structured reporting in controlled environments.' },
  { key: 'engineering', title: 'Security Engineering', text: 'Python tooling, Linux, FastAPI, testing, reproducibility and repeatable assessment workflows.' },
  { key: 'applied', title: 'Applied AI Engineering', text: 'Machine learning, computer vision, edge inference and robotics systems developed as a supporting engineering track.' },
];

export const securityProjects = [
  {
    id: 'shadow-ai', number: '01', track: 'SECURITY', name: 'SHADOW-AI', category: 'AI / LLM SECURITY', repo: 'https://github.com/moe1112025/Shadow-AI',
    description: 'Modular AI/LLM security assessment platform for authorized lab environments, covering reconnaissance, attack-surface mapping, testing, evidence and reporting workflows.',
    stack: ['Python', 'FastAPI', 'SQLite', 'Pytest', 'Docker'],
  },
  {
    id: 'password', number: '02', track: 'SECURITY', name: 'PRO Password Security Analyzer', category: 'PYTHON SECURITY ENGINEERING', repo: 'https://github.com/moe1112025/Pro-Password-Analyzer',
    description: 'Standalone password-security assessment utility covering entropy models, policy analysis, local blocklist checks, heuristics and transparent scenario-based attack-time estimation.',
    stack: ['Python', 'Pytest', 'CLI', 'Docker'],
  },
  {
    id: 'ghost-log', number: '03', track: 'SECURITY', name: 'GHOST-LOG', category: 'ENDPOINT SECURITY ANALYSIS', repo: 'https://github.com/moe1112025/Ghost-Log',
    description: 'Read-only endpoint-security laboratory for process reconnaissance, behavioral triage, structured findings, optional bounded AI assistance and local reporting.',
    stack: ['Python', 'CustomTkinter', 'Pytest', 'Docker'],
  },
  {
    id: 'ai-ml-redteam', number: '04', track: 'SECURITY', name: 'AI-ML Red Team Enterprise', category: 'AI / ML SECURITY ASSESSMENT', repo: 'https://github.com/moe1112025/ai-ml-redteam-enterprise',
    description: 'Enterprise-style Python assessment platform combining synthetic adversarial-ML testing, multimodal review, API attack-surface analysis, privacy simulations, orchestration and reporting.',
    stack: ['Python', 'OpenCV', 'NumPy', 'Streamlit', 'Docker'],
  },
  {
    id: 'ai-pentest', number: '05', track: 'SECURITY', name: 'AI Pentest Framework', category: 'AI SECURITY / PENTESTING', repo: 'https://github.com/moe1112025/Ai-Pentest-Framework',
    description: 'Dedicated AI penetration-testing codebase maintained as a separate project from the broader AI/ML assessment platform and other security utilities.',
    stack: ['Python', 'Security Testing', 'Assessment Workflow'],
  },
];

export const appliedProjects = [
  {
    id: 'cine-shelf', number: 'A01', track: 'AI / ML', category: 'RECOMMENDER SYSTEMS', name: 'CineShelf Recommendation Intelligence',
    description: 'Recommendation-engine project combining content-based movie discovery with TF-IDF/cosine similarity and item-item collaborative book recommendation, with optional TMDB enrichment.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'TF-IDF', 'Cosine Similarity', 'Streamlit'],
    repo: 'https://github.com/moe1112025/Cine-Shelf-Recommender.git',
    detail: 'Applied ML project focused on representation, similarity search, metadata fusion and reproducible inference artifacts.',
    visual: '/assets/ml/cine-shelf.svg',
  },
  {
    id: 'edge-aiot', number: 'A02', track: 'COMPUTER VISION', category: 'EDGE AI / MODEL OPTIMIZATION', name: 'EdgeVision AIoT — ONNX Edge Detection',
    description: 'Edge inference pipeline that separates model export from runtime execution and evaluates preprocessing, ONNX Runtime inference, post-processing and latency/FPS telemetry.',
    stack: ['Python', 'Ultralytics', 'ONNX', 'ONNX Runtime', 'OpenCV', 'NMS'],
    repo: 'https://github.com/moe1112025/EdgeVision-AIoT---ONNX-Edge-Detection---Model-Optimization.git',
    detail: 'Engineering emphasis: portable inference graphs, CPU-first execution, predictable preprocessing and observable runtime performance.',
    visual: '/assets/ml/edge-aiot.svg',
  },
  {
    id: 'edge-qc', number: 'A03', track: 'COMPUTER VISION', category: 'INDUSTRIAL VISION', name: 'EdgeVision QC — Visual Defect Detection',
    description: 'Industrial image-classification reference system using PyTorch, FastAPI and Streamlit, with reproducible training, validation, checkpointing and API inference.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'OpenCV', 'Streamlit', 'CNN'],
    repo: 'https://github.com/moe1112025/EdgeVision-QC-Industrial-Visual-Defect-Detection.git',
    detail: 'Built around a trainable CNN pipeline rather than an uninitialized prototype, with explicit model and API boundaries.',
    visual: '/assets/ml/edge-qc.svg',
  },
  {
    id: 'sentinel-edge', number: 'A04', track: 'COMPUTER VISION', category: 'REAL-TIME MONITORING', name: 'SentinelEdge Vision — Zone Monitoring',
    description: 'Real-time person detection and configurable restricted-zone monitoring using local inference, geometry rules, event cooldowns and structured event logging.',
    stack: ['Python', 'Ultralytics', 'YOLO', 'OpenCV', 'Zone Logic', 'CSV Logging'],
    repo: 'https://github.com/moe1112025/SentinelEdge-Vision-Real-Time-Zone-Monitoring.git',
    detail: 'A practical CV systems project that connects detection output to a deterministic spatial policy layer.',
    visual: '/assets/ml/sentinel-edge.svg',
  },
  {
    id: 'vision-lens', number: 'A05', track: 'COMPUTER VISION', category: 'XAI / INTERPRETABILITY', name: 'VisionLens XAI — Image Classification Studio',
    description: 'Image-classification studio comparing pretrained MobileNetV2 and ResNet50 models while generating Grad-CAM explanation overlays and top-5 ImageNet predictions.',
    stack: ['Python', 'TensorFlow', 'Keras', 'Grad-CAM', 'Pillow', 'Streamlit'],
    repo: 'https://github.com/moe1112025/VisionLens-XAI-Explainable-Image-Classification-Studio.git',
    detail: 'Demonstrates model inference plus an interpretability layer, with explicit limits on what saliency visualizations can establish.',
    visual: '/assets/ml/vision-lens.svg',
  },
  {
    id: 'mailguard', number: 'A06', track: 'AI / ML', category: 'NLP / CLASSIFICATION', name: 'MailGuard ML — Email Spam Detection',
    description: 'Text-classification system comparing classical ML pipelines with TF-IDF features, stratified evaluation, hyperparameter search and persisted inference artifacts.',
    stack: ['Python', 'scikit-learn', 'TF-IDF', 'GridSearchCV', 'NLP', 'Streamlit'],
    repo: 'https://github.com/moe1112025/MailGuard-ML-Email-Spam-Detection-Classification.git',
    detail: 'The final pipeline keeps feature fitting inside the model pipeline to reduce evaluation leakage across cross-validation folds.',
    visual: '/assets/ml/mailguard.svg',
  },
  {
    id: 'california', number: 'A07', track: 'AI / ML', category: 'REGRESSION', name: 'California Housing Price Prediction',
    description: 'Regression project using the California Housing dataset to estimate median house values from census-derived features, evaluated with MSE and R².',
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Linear Regression'],
    repo: 'https://github.com/moe1112025', repoLabel: 'GitHub Profile',
    detail: 'Foundation project covering train/test splitting, supervised regression and evaluation metrics.',
    visual: '/assets/ml/california.svg',
  },
  {
    id: 'wine', number: 'A08', track: 'AI / ML', category: 'REGRESSION', name: 'Wine Quality Prediction',
    description: 'Tabular regression project exploring how measurable wine properties can be mapped to quality scores with an ensemble tree model.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Random Forest', 'Regression'],
    repo: 'https://github.com/moe1112025', repoLabel: 'GitHub Profile',
    detail: 'The portfolio presentation treats quality as the prediction target rather than using it as an input feature, avoiding target leakage.',
    visual: '/assets/ml/wine.svg',
  },
  {
    id: 'titanic', number: 'A09', track: 'AI / ML', category: 'CLASSIFICATION', name: 'Titanic Survival Prediction',
    description: 'Binary classification project built around passenger attributes, categorical encoding, missing-value handling and logistic-regression evaluation.',
    stack: ['Python', 'Pandas', 'scikit-learn', 'Logistic Regression'],
    repo: 'https://github.com/moe1112025', repoLabel: 'GitHub Profile',
    detail: 'A foundational classification workflow demonstrating preprocessing, model fitting and evaluation on a well-known benchmark dataset.',
    visual: '/assets/ml/titanic.svg',
  },
  {
    id: 'maintenance', number: 'A10', track: 'AI / ML', category: 'PREDICTIVE MAINTENANCE', name: 'Predictive Maintenance AI',
    description: 'Industrial telemetry risk model using gradient boosting over simulated temperature, speed, torque and tool-wear signals with an interactive dashboard.',
    stack: ['Python', 'scikit-learn', 'Gradient Boosting', 'Streamlit', 'Pandas', 'NumPy'],
    repo: 'https://github.com/moe1112025/Predictive-Maintenance-Machine-Failure-Prediction-System.git',
    detail: 'Demonstrates a practical supervised-learning loop from telemetry inputs to interpretable risk-oriented output.',
    visual: '/assets/ml/maintenance.svg',
  },
  {
    id: 'financial', number: 'A11', track: 'AI / ML', category: 'ANOMALY DETECTION', name: 'Financial Risk & Anomaly Detection Engine',
    description: 'Unsupervised monitoring prototype using Isolation Forest to identify unusual transaction patterns from amount, velocity, account age and geographic distance features.',
    stack: ['Python', 'scikit-learn', 'Isolation Forest', 'Streamlit', 'NumPy'],
    repo: 'https://github.com/moe1112025/Financial-Market-Risk-Anomaly-Detection-Engine.git',
    detail: 'A compact anomaly-detection project demonstrating unsupervised modeling and risk-review oriented output.',
    visual: '/assets/ml/financial.svg',
  },
  {
    id: 'superbike', number: 'A12', track: 'AI / ML', category: 'MULTI-MODEL INTELLIGENCE', name: 'Superbike Performance & Safety Intelligence',
    description: 'Multi-model application combining logistic regression, random forest and neural-network experiments with contextual rule-based feedback for simulated riding-risk analysis.',
    stack: ['Python', 'scikit-learn', 'TensorFlow', 'Streamlit', 'NumPy'],
    repo: 'https://github.com/moe1112025/Superbike-Performance-Safety-Intelligence-System.git',
    detail: 'Engineering exercise in model comparison, feature scaling, ensemble scoring and UI-level interpretation of model outputs.',
    visual: '/assets/ml/superbike.svg',
  },
  {
    id: 'multimodal-dashboard', number: 'A13', track: 'COMPUTER VISION', category: 'MULTIMODAL SYSTEMS', name: 'Vision & Voice-Controlled 3D Dashboard',
    description: 'Desktop multimodal interface combining webcam vision, hand tracking, voice commands and a 3D OpenGL dashboard scene for real-time interaction.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'PyQt6', 'OpenGL', 'Voice Recognition'],
    repo: 'https://github.com/moe1112025', repoLabel: 'GitHub Profile',
    detail: 'The project connects perception, event-driven UI state and graphics rendering into a single interactive desktop system.',
    visual: '/assets/ml/multimodal.svg',
  },
];

export const aiLabs = [
  { id:'ai0', level:'LEVEL 00', title:'First Break', pdf:'/ai_lab/lab0.pdf', image:'/ai_lab/lab0.png' },
  { id:'ai1', level:'LEVEL 01', title:'Say Hello', pdf:'/ai_lab/lab1.pdf', image:'/ai_lab/lab1.png' },
  { id:'ai2', level:'LEVEL 02', title:'AI Lies With Confidence', pdf:'/ai_lab/lab2.pdf', image:'/ai_lab/lab2.png' },
  { id:'ai3', level:'LEVEL 03', title:'Words Are Controls', pdf:'/ai_lab/lab3.pdf', image:'/ai_lab/lab3.png' },
  { id:'ai4', level:'LEVEL 04', title:'Give It a Role', pdf:'/ai_lab/lab4.pdf', image:'/ai_lab/lab4.png' },
  { id:'ai5', level:'LEVEL 05', title:'Rules Collide', pdf:'/ai_lab/lab5.pdf', image:'/ai_lab/lab5.png' },
  { id:'ai6', level:'LEVEL 06', title:'Bypass a Refusal', pdf:'/ai_lab/lab6.pdf', image:'/ai_lab/lab6.png' },
];

export const sqlLabs = [
  { id:'sql1', title:'SQL Injection Allowing Authentication Bypass', pdf:'/sql_lab/sql1.pdf', image:'/sql_lab/sql1.png' },
  { id:'sql2', title:'SQL Injection in WHERE Clause Allowing Retrieval of Hidden Data', pdf:'/sql_lab/sql2.pdf', image:'/sql_lab/sql2.png' },
  { id:'sql3', title:'SQL Injection UNION Attack — Determining the Number of Columns Returned', pdf:'/sql_lab/sql3.pdf', image:'/sql_lab/sql3.png' },
  { id:'sql4', title:'SQL Injection UNION Attack — Retrieving Data from Other Tables', pdf:'/sql_lab/sql4.pdf', image:'/sql_lab/sql4.png' },
  { id:'sql5', title:'SQL Injection UNION Attack — Retrieving Multiple Values in a Single Column', pdf:'/sql_lab/sql5.pdf', image:'/sql_lab/sql5.png' },
];

export const walkthroughs = [
  ['01','AI Agents → Secondary Vulnerabilities','https://youtu.be/3i851RCkDMw','/pdf/Exploiting AI Agents to Trigger Secondary Vulnerabilities.pdf'],
  ['02','API Endpoint Using Documentation','https://youtu.be/5hD8bXScp0U','/pdf/Exploiting an API Endpoint Using Documentation.pdf'],
  ['03','Insecure Output Handling in LLM Applications','https://youtu.be/CEbYrm0H_c8','/pdf/Exploiting Insecure Output Handling in LLM Applications.pdf'],
  ['04','LLM APIs with Excessive Agency','https://youtu.be/qMYmm93TOyo','/pdf/Exploiting LLM APIs with Excessive Agency.pdf'],
  ['05','Vulnerabilities in LLMs','https://youtu.be/zmW98tSukag','/pdf/Exploiting Vulnerabilities in LLMs.pdf'],
  ['06','AI Agents → Destructive Actions','https://youtu.be/POn1VGEv_p0','/pdf/Exploiting_ai_agents_to_perform_destructive_actions.pdf'],
  ['07','Unused API Endpoint','https://youtu.be/FBt8B-e1cwY','/pdf/Finding and Exploiting an Unused API Endpoint.pdf'],
  ['08','Indirect Prompt Injection','https://youtu.be/SBEu0toUUQM','/pdf/Indirect Prompt Injection.pdf'],
  ['09','OWASP Juice Shop Assessment','https://youtu.be/nQDP2NRJ7Vk','/pdf/OWASP Juice Shop Assessment Report.pdf'],
  ['10','Technical Report','https://youtu.be/Ftl0REnxWhk','/pdf/Technical Report.pdf'],
].map(([number,title,video,pdf]) => ({number,title,video,pdf}));

export const credentials = [
  { name:'Google Cybersecurity', type:'Professional Certificate', url:'https://www.credly.com/badges/2dbb7724-6ad8-48f8-89b3-ddfd74db75ea/linked_in_profile' },
  { name:'CompTIA PenTest+', type:'Professional credential record', url:'https://www.coursera.org/account/accomplishments/specialization/47RRHLRSA1Q6' },
  { name:'Kali Linux Ethical Hacking', type:'Specialization certificate', url:'https://www.coursera.org/account/accomplishments/specialization/3IY4SEI4F1SM' },
  { name:'Practical Pentesting', type:'Course / certificate record', url:'https://www.coursera.org/account/accomplishments/records/TKMVCEEZ3RHN' },
  { name:'LLM Security', type:'Course / certificate record', url:'https://www.coursera.org/account/accomplishments/records/PL372SGHWK2Q' },
  { name:'Generative AI', type:'Course / certificate record', url:'https://www.coursera.org/account/accomplishments/records/5OVZVPXKSPVZ' },
  { name:'Robotic Programming', type:'Specialization certificate', url:'https://www.coursera.org/account/accomplishments/specialization/ZBMRQPLY5GBE' },
  { name:'OpenCV', type:'Specialization certificate', url:'https://www.coursera.org/account/accomplishments/specialization/NEFDJ3ZBOHCS' },
  { name:'Machine Learning', type:'Specialization certificate', url:'https://www.coursera.org/account/accomplishments/specialization/LHGGO9XX291M' },
  { name:'PowerShell', type:'Specialization certificate', url:'https://www.coursera.org/account/accomplishments/specialization/M0WMXT4H90JV' },
];

export const tools = ['Python','Linux','Kali Linux','Nmap','Burp Suite','Wireshark','Metasploit','FastAPI','OWASP','LLM Security','Prompt Injection','RAG Security','AI Agents','Git','Docker','OpenCV','MediaPipe','Machine Learning','PyTorch','TensorFlow','ONNX','Streamlit'];

export const journey = [
  ['01','Cybersecurity Foundation','Networking, Linux, security fundamentals and assessment vocabulary.'],
  ['02','Offensive Security','Penetration testing, reconnaissance, web/API testing and vulnerability assessment.'],
  ['03','Python Security Engineering','Automation, tooling, testable modules, local analysis and structured reporting.'],
  ['04','AI / ML Foundations','Machine learning, OpenCV, model concepts, inference workflows and engineering experiments.'],
  ['05','LLM Security','Prompt injection, context exposure, RAG, memory, output handling and application-level LLM risks.'],
  ['06','AI Penetration Testing','Reconnaissance, attack-surface mapping, test-case engineering and evidence-driven assessment.'],
  ['07','Professional AI Red Team Assessment','Application, API, model, agent, tool, trust-boundary and reporting layers.'],
];

export const allLabNodes = [
  ...aiLabs.map(x=>({id:x.id, group:'AI LAB', label:x.title, accent:'cyan'})),
  ...sqlLabs.map(x=>({id:x.id, group:'SQL LAB', label:x.title.replace('SQL Injection ', 'SQLi — '), accent:'violet'})),
  ...walkthroughs.map(x=>({id:`vid${x.number}`, group:'WALKTHROUGH', label:x.title, accent:'white'})),
];

export const toolLinks = [
  ['Nmap','https://nmap.org/'], ['Burp Suite','https://portswigger.net/burp'], ['Wireshark','https://www.wireshark.org/'],
  ['Metasploit','https://www.metasploit.com/'], ['Kali Linux','https://www.kali.org/'], ['OpenCV','https://opencv.org/'],
  ['PyTorch','https://pytorch.org/'], ['ONNX Runtime','https://onnxruntime.ai/'],
];

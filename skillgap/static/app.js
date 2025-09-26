// Sample Data
const sampleData = {
  sampleResume: "John Smith\nSoftware Developer\n\nEXPERIENCE:\n• Developed web applications using Python, Flask, and HTML/CSS\n• Built database systems with SQL and MySQL\n• Created interactive websites with JavaScript and jQuery\n• Collaborated on Git version control projects\n• Worked with REST APIs and JSON data processing\n\nSKILLS:\n• Programming: Python, JavaScript, HTML, CSS, SQL\n• Frameworks: Flask, jQuery\n• Tools: Git, MySQL, Visual Studio Code\n• Soft Skills: Problem-solving, Team collaboration, Communication",
  
  sampleJobDescription: "Full Stack Developer Position\n\nWe are seeking a talented Full Stack Developer to join our team.\n\nRequired Skills:\n• Programming Languages: Python, JavaScript, SQL\n• Frontend: React, HTML, CSS, Bootstrap\n• Backend: Django or Flask, REST APIs\n• Database: PostgreSQL, MongoDB\n• Cloud: AWS, Docker containerization\n• Machine Learning: TensorFlow, scikit-learn\n• Tools: Git, Jenkins, Kubernetes\n• Soft Skills: Leadership, Agile methodology, Problem-solving\n\nResponsibilities:\n• Develop scalable web applications\n• Implement machine learning models\n• Deploy applications on cloud infrastructure\n• Work in agile development environment",

  skillCategories: {
    programming: ["Python", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS", "PHP", "Ruby", "Go"],
    frameworks: ["React", "Angular", "Vue", "Django", "Flask", "Spring", "Express", "Laravel", "Bootstrap", "jQuery"],
    tools: ["Git", "Docker", "Kubernetes", "Jenkins", "AWS", "Azure", "GCP", "MySQL", "PostgreSQL", "MongoDB"],
    technologies: ["Machine Learning", "AI", "Cloud Computing", "DevOps", "Microservices", "REST API", "GraphQL", "TensorFlow", "scikit-learn"],
    soft_skills: ["Leadership", "Communication", "Problem-solving", "Team collaboration", "Agile", "Project management"]
  },

  learningResources: {
    "Machine Learning": [
      {"title": "Machine Learning Course - Coursera", "url": "https://coursera.org/learn/machine-learning", "type": "Course"},
      {"title": "Python ML Tutorial - YouTube", "url": "https://youtube.com/watch?v=7eh4d6sabA0", "type": "Video"},
      {"title": "scikit-learn Documentation", "url": "https://scikit-learn.org/stable/", "type": "Documentation"}
    ],
    "React": [
      {"title": "React Official Tutorial", "url": "https://reactjs.org/tutorial/tutorial.html", "type": "Documentation"},
      {"title": "React Course - freeCodeCamp", "url": "https://www.freecodecamp.org/news/react-beginner-handbook/", "type": "Course"},
      {"title": "React Projects - YouTube", "url": "https://youtube.com/watch?v=hQAHSlTtcmY", "type": "Video"}
    ],
    "Docker": [
      {"title": "Docker Tutorial - GeeksforGeeks", "url": "https://www.geeksforgeeks.org/docker-tutorial/", "type": "Tutorial"},
      {"title": "Container Course - Udemy", "url": "https://www.udemy.com/course/docker-mastery/", "type": "Course"},
      {"title": "Docker Official Documentation", "url": "https://docs.docker.com/", "type": "Documentation"}
    ],
    "AWS": [
      {"title": "AWS Fundamentals - AWS Training", "url": "https://aws.amazon.com/training/", "type": "Course"},
      {"title": "Cloud Computing - edX", "url": "https://www.edx.org/course/introduction-to-cloud-computing", "type": "Course"},
      {"title": "AWS Free Tier Practice", "url": "https://aws.amazon.com/free/", "type": "Hands-on"}
    ],
    "Django": [
      {"title": "Django Documentation", "url": "https://docs.djangoproject.com/", "type": "Documentation"},
      {"title": "Django Tutorial - Mozilla", "url": "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django", "type": "Tutorial"},
      {"title": "Django Projects - Real Python", "url": "https://realpython.com/tutorials/django/", "type": "Course"}
    ],
    "Bootstrap": [
      {"title": "Bootstrap Official Documentation", "url": "https://getbootstrap.com/docs/", "type": "Documentation"},
      {"title": "Bootstrap Tutorial - W3Schools", "url": "https://www.w3schools.com/bootstrap/", "type": "Tutorial"},
      {"title": "Bootstrap Course - freeCodeCamp", "url": "https://www.freecodecamp.org/news/learn-bootstrap-4-in-30-minute/", "type": "Course"}
    ],
    "MongoDB": [
      {"title": "MongoDB University", "url": "https://university.mongodb.com/", "type": "Course"},
      {"title": "MongoDB Documentation", "url": "https://docs.mongodb.com/", "type": "Documentation"},
      {"title": "MongoDB Tutorial - GeeksforGeeks", "url": "https://www.geeksforgeeks.org/mongodb-tutorial/", "type": "Tutorial"}
    ],
    "PostgreSQL": [
      {"title": "PostgreSQL Tutorial", "url": "https://www.postgresqltutorial.com/", "type": "Tutorial"},
      {"title": "PostgreSQL Documentation", "url": "https://www.postgresql.org/docs/", "type": "Documentation"},
      {"title": "Database Design Course", "url": "https://www.coursera.org/learn/database-design", "type": "Course"}
    ],
    "Jenkins": [
      {"title": "Jenkins Documentation", "url": "https://www.jenkins.io/doc/", "type": "Documentation"},
      {"title": "Jenkins Tutorial - Guru99", "url": "https://www.guru99.com/jenkins-tutorial.html", "type": "Tutorial"},
      {"title": "CI/CD with Jenkins", "url": "https://www.udemy.com/course/jenkins-from-zero-to-hero/", "type": "Course"}
    ],
    "Kubernetes": [
      {"title": "Kubernetes Documentation", "url": "https://kubernetes.io/docs/", "type": "Documentation"},
      {"title": "Kubernetes Course - edX", "url": "https://www.edx.org/course/introduction-to-kubernetes", "type": "Course"},
      {"title": "Kubernetes Tutorial - YouTube", "url": "https://www.youtube.com/watch?v=X48VuDVv0do", "type": "Video"}
    ]
  }
};

// Global variables
let currentAnalysis = {
  matchingSkills: [],
  missingSkills: [],
  allJobSkills: [],
  allResumeSkills: []
};

// UI Functions
function startAnalysis() {
  document.getElementById('welcome-section').classList.add('hidden');
  document.getElementById('input-section').classList.remove('hidden');
}

function startNewAnalysis() {
  // Reset all sections
  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('input-section').classList.remove('hidden');
  
  // Clear inputs
  document.getElementById('resume-text').value = '';
  document.getElementById('job-description').value = '';
  document.getElementById('resume-file').value = '';
  document.getElementById('file-name').classList.add('hidden');
  
  // Reset analysis data
  currentAnalysis = {
    matchingSkills: [],
    missingSkills: [],
    allJobSkills: [],
    allResumeSkills: []
  };
}

function switchTab(tabType) {
  const parentCard = event.target.closest('.input-card');
  const tabBtns = parentCard.querySelectorAll('.tab-btn');
  const tabContents = parentCard.querySelectorAll('.tab-content');
  
  // Remove active class from all tabs
  tabBtns.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  
  // Add active class to clicked tab
  event.target.classList.add('active');
  
  if (tabType === 'upload') {
    document.getElementById('upload-tab').classList.add('active');
  } else if (tabType === 'text') {
    document.getElementById('text-tab').classList.add('active');
  }
}

function switchJDTab(tabType) {
  const parentCard = event.target.closest('.input-card');
  const tabBtns = parentCard.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

async function handleFileUpload(input) {
  const file = input.files[0];
  if (!file) return;

  document.getElementById('file-name').innerHTML = `📁 Selected: ${file.name}`;
  document.getElementById('file-name').classList.remove('hidden');

  // Send to backend for parsing
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch('/api/parse-resume', { method: 'POST', body: form });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(data.message || 'Failed to parse file');
      return;
    }
    document.getElementById('resume-text').value = data.text || '';
    // Switch to text tab to show parsed text
    const resumeCard = document.querySelectorAll('.input-card')[0];
    const tabBtns = resumeCard.querySelectorAll('.tab-btn');
    const tabContents = resumeCard.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    tabBtns[1].classList.add('active'); // Text tab
    document.getElementById('text-tab').classList.add('active');
  } catch (err) {
    alert('Failed to parse file');
  }
}

function loadSampleResume() {
  // Disabled until user explicitly requests sample data
  alert('Sample data is disabled. Please upload a file.');
}

function loadSampleJD() {
  // Disabled until user explicitly requests sample data
  alert('Sample JD is disabled. Please paste your own job description.');
}

// Analysis Functions
function extractSkills(text) {
  const skills = [];
  const textLower = text.toLowerCase();
  
  // Check all skill categories
  Object.entries(sampleData.skillCategories).forEach(([category, skillList]) => {
    skillList.forEach(skill => {
      // More sophisticated matching
      const skillLower = skill.toLowerCase();
      const skillRegex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      
      if (skillRegex.test(text) || textLower.includes(skillLower)) {
        skills.push({
          name: skill,
          category: category,
          found: true
        });
      }
    });
  });
  
  return skills;
}

function analyzeSkills() {
  const resumeText = document.getElementById('resume-text').value.trim();
  const jobDescription = document.getElementById('job-description').value.trim();
  
  if (!resumeText || !jobDescription) {
    alert('Please provide both resume and job description');
    return;
  }
  
  // Hide input section and show loading
  document.getElementById('input-section').classList.add('hidden');
  document.getElementById('loading-section').classList.remove('hidden');
  
  // Start loading animation
  startLoadingAnimation();
  
  // Simulate analysis delay
  setTimeout(() => {
    performAnalysis(resumeText, jobDescription);
  }, 4000);
}

function startLoadingAnimation() {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  let currentStep = 0;
  
  const interval = setInterval(() => {
    if (currentStep > 0) {
      document.getElementById(steps[currentStep - 1]).classList.remove('active');
    }
    
    if (currentStep < steps.length) {
      document.getElementById(steps[currentStep]).classList.add('active');
      currentStep++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

function performAnalysis(resumeText, jobDescription) {
  // Extract skills from both texts
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobDescription);
  
  // Find matching and missing skills
  const resumeSkillNames = resumeSkills.map(skill => skill.name.toLowerCase());
  const jobSkillNames = jobSkills.map(skill => skill.name.toLowerCase());
  
  const matchingSkills = jobSkills.filter(jobSkill => 
    resumeSkillNames.includes(jobSkill.name.toLowerCase())
  );
  
  const missingSkills = jobSkills.filter(jobSkill => 
    !resumeSkillNames.includes(jobSkill.name.toLowerCase())
  );
  
  // Store results
  currentAnalysis = {
    matchingSkills,
    missingSkills,
    allJobSkills: jobSkills,
    allResumeSkills: resumeSkills
  };
  
  // Show results
  displayResults();
}

function displayResults() {
  // Hide loading and show results
  document.getElementById('loading-section').classList.add('hidden');
  document.getElementById('results-section').classList.remove('hidden');
  
  // Update statistics
  const totalJobSkills = currentAnalysis.allJobSkills.length;
  const matchingCount = currentAnalysis.matchingSkills.length;
  const missingCount = currentAnalysis.missingSkills.length;
  const matchPercentage = totalJobSkills > 0 ? Math.round((matchingCount / totalJobSkills) * 100) : 0;
  
  document.getElementById('match-percentage').textContent = `${matchPercentage}%`;
  document.getElementById('skills-found').textContent = matchingCount;
  document.getElementById('skills-missing').textContent = missingCount;
  
  // Display matching skills
  displayMatchingSkills();
  
  // Display missing skills
  displayMissingSkills();
  
  // Display recommended resources
  displayRecommendedResources();
}

function displayMatchingSkills() {
  const container = document.getElementById('matching-skills');
  container.innerHTML = '';
  
  if (currentAnalysis.matchingSkills.length === 0) {
    container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); grid-column: 1 / -1;">No matching skills found. Consider adding more relevant skills to your resume.</p>';
    return;
  }
  
  currentAnalysis.matchingSkills.forEach(skill => {
    const skillCard = createSkillCard(skill, 'found');
    container.appendChild(skillCard);
  });
}

function displayMissingSkills() {
  const container = document.getElementById('missing-skills');
  container.innerHTML = '';
  
  if (currentAnalysis.missingSkills.length === 0) {
    container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); grid-column: 1 / -1;">Great! You have all the required skills.</p>';
    return;
  }
  
  currentAnalysis.missingSkills.forEach(skill => {
    const skillCard = createSkillCard(skill, 'missing');
    container.appendChild(skillCard);
  });
}

function createSkillCard(skill, type) {
  const card = document.createElement('div');
  card.className = `skill-card skill-card--${type}`;
  
  card.innerHTML = `
    <div class="skill-name">${skill.name}</div>
    <div class="skill-category">${skill.category.replace('_', ' ')}</div>
  `;
  
  return card;
}

function displayRecommendedResources() {
  const container = document.getElementById('recommended-resources');
  container.innerHTML = '';
  
  if (currentAnalysis.missingSkills.length === 0) {
    container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary);">No learning resources needed - you have all required skills!</p>';
    return;
  }
  
  // Get unique missing skills and their resources
  const uniqueSkills = [...new Set(currentAnalysis.missingSkills.map(skill => skill.name))];
  
  uniqueSkills.forEach(skillName => {
    let resources = sampleData.learningResources[skillName];
    
    // If no specific resources, provide generic ones
    if (!resources) {
      resources = [
        {"title": `${skillName} Tutorial - YouTube`, "url": `https://youtube.com/results?search_query=${skillName}+tutorial`, "type": "Video"},
        {"title": `${skillName} Course - Coursera`, "url": `https://coursera.org/courses?query=${skillName}`, "type": "Course"},
        {"title": `${skillName} Documentation`, "url": `https://google.com/search?q=${skillName}+documentation`, "type": "Documentation"}
      ];
    }
    
    const resourceCard = createResourceCard(skillName, resources);
    container.appendChild(resourceCard);
  });
}

function createResourceCard(skillName, resources) {
  const card = document.createElement('div');
  card.className = 'resource-card';
  
  const resourceItems = resources.map(resource => `
    <li class="resource-item">
      <a href="${resource.url}" target="_blank" class="resource-link">${resource.title}</a>
      <span class="resource-type">${resource.type}</span>
    </li>
  `).join('');
  
  card.innerHTML = `
    <div class="resource-header">
      <h4 class="resource-skill">${skillName}</h4>
    </div>
    <div class="resource-body">
      <ul class="resource-list">
        ${resourceItems}
      </ul>
    </div>
  `;
  
  return card;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Skill Gap Analyzer initialized');
  
  // Handle file drag and drop
  const fileUpload = document.querySelector('.file-upload');
  
  if (fileUpload) {
    fileUpload.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--color-primary)';
      this.style.background = 'var(--color-bg-1)';
    });
    
    fileUpload.addEventListener('dragleave', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--color-border)';
      this.style.background = 'var(--color-bg-2)';
    });
    
    fileUpload.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--color-border)';
      this.style.background = 'var(--color-bg-2)';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        document.getElementById('resume-file').files = files;
        handleFileUpload(document.getElementById('resume-file'));
      }
    });
  }
});
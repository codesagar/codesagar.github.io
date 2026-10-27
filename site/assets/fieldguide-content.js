/* Public-facing overview. Evidence notes are kept outside the published site. */
window.FIELDGUIDE = {
  "journey": [
    {
      "year": "2016–2020",
      "organization": "INSOFE · Imarticus Learning",
      "label": "Applied Data Science",
      "detail": "Data-science consulting and forecasting, alongside classroom teaching and corporate training in statistical machine learning.",
      "highlight": {
        "value": "500+ hours",
        "text": "Classroom teaching in statistics and machine learning."
      }
    },
    {
      "year": "2020–2021",
      "organization": "Novartis",
      "label": "Natural Language Processing",
      "detail": "Text analytics to understand themes in patient experiences and support patient-insight research."
    },
    {
      "year": "2021–2022",
      "organization": "Georgia State University",
      "label": "Astrophysics & ML Research",
      "detail": "Scientific data engineering and machine-learning research using solar imagery and solar-flare forecasting data."
    },
    {
      "year": "2022–present",
      "organization": "Visa · Cyber Analytics & GenAI Innovation",
      "label": "Cybersecurity & AI Safety",
      "current": true,
      "summary": "AI application protection, agent containment, and secure evaluation.",
      "detail": "Started with a cyber-analytics internship in 2022 and joined full-time in 2023. Current work focuses on AI security, agent containment, and evaluation."
    }
  ],
  "projects": [
    {
      "id": "containment",
      "nav": "Red Team Containment",
      "title": "Red Team Agent Containment",
      "setting": "Visa · Authorized offensive testing",
      "problem": [
        "An agent encouraged to keep trying can cross safety boundaries while pursuing a legitimate goal. Automated red teaming adds a harder case: the agent is deliberately asked to act adversarially against operator-owned applications.",
        "Even with an approved target, a persistent agent may reach beyond its scope by using public services or chaining external resources. Authorization for the target does not authorize every step taken to reach it."
      ],
      "contribution": "I designed and built a supervised environment for authorized red-team agents, combining execution isolation, tool controls, network restrictions, and records for review. Containment operates at multiple layers, with key controls outside the agent’s authority.",
      "purpose": "Support realistic application testing while limiting unintended effects beyond the approved engagement and keeping agent activity reviewable."
    },
    {
      "id": "evaluation",
      "nav": "Vulnerability Benchmarking",
      "title": "Agent Benchmarking for Vulnerability Research",
      "setting": "Visa · VVAH evaluated against CyberGym",
      "problem": "A vulnerability-research agent needs to demonstrate valid task completion, not just produce a convincing report or exploit an evaluation shortcut. Benchmarking must control access, follow the required protocols, and check that the intended objective was met.",
      "contribution": "I evaluated Visa’s VVAH harness against CyberGym, applying agent isolation, containment, and the required evaluation protocols. The work included checking task completion and guarding against unauthorized shortcuts that could invalidate the results.",
      "purpose": "Provide a sounder basis for comparing agent capabilities, understanding failures, and deciding what to improve."
    },
    {
      "id": "fine-tuning",
      "nav": "Prompt-Injection Defense",
      "title": "Jailbreak & Prompt-Injection Detection",
      "setting": "Visa · Protecting AI applications and agent workflows",
      "problem": "Malicious instructions can enter through retrieved documents, web pages, tool responses, or stored context. If they reach an agent’s working context or memory, their influence can carry into later decisions and actions.",
      "contribution": [
        "My early WatchTower work involved fine-tuning Mistral 7B for jailbreak and prompt-injection detection. The accompanying report remains an unpublished Stanford Online course project.",
        "The enterprise focus later shifted toward evaluating open-source detection models and adapting them to application requirements, including threat coverage, false positives, and fit with existing safeguards."
      ],
      "purpose": "Detect adversarial instructions before they influence application behavior, while keeping legitimate use practical. Detection is one layer of protection alongside the controls around the agent."
    },
    {
      "id": "guard",
      "nav": "Data Loss Prevention",
      "title": "Data Loss Prevention",
      "setting": "Visa · GenAI Guard and sensitive-data protection",
      "problem": "As enterprise AI changed where information could travel, the protection needs extended beyond confidential documents to payment-card and personal data crossing application and network boundaries.",
      "contribution": "I began with BART-MNLI zero-shot classification for company-confidential information. The work later expanded to primary account numbers (PAN) and personally identifiable information (PII), combining Microsoft Presidio with custom patterns and validation rules for detection at the network boundary.",
      "purpose": "Support sensitive-data protection in a payment-card environment with PCI requirements, while managing false positives and disruption to legitimate work."
    }
  ],
  "recent": [
    {
      "title": "Silent Failures",
      "kind": "Independent study",
      "summary": "A study of how AI agents respond when their tools fail, including whether they acknowledge that a task is unfinished.",
      "links": [
        {
          "label": "Read study",
          "url": "https://codesagar.github.io/silent-failures/"
        },
        {
          "label": "GitHub",
          "url": "https://github.com/codesagar/silent-failures"
        }
      ]
    },
    {
      "title": "LLM WatchTower",
      "kind": "Stanford Online coursework · Unpublished",
      "summary": "A course project exploring whether a language model can identify harmful prompts and explain its classifications.",
      "links": [
        {
          "label": "Read project report (PDF)",
          "url": "assets/papers/watchtower.pdf"
        }
      ]
    },
    {
      "title": "Models and datasets",
      "kind": "Hugging Face",
      "summary": "Public models and datasets related to detecting attacks on AI applications.",
      "links": [
        {
          "label": "View on Hugging Face",
          "url": "https://huggingface.co/codesagar"
        }
      ]
    }
  ],
  "education": [
    {
      "title": "M.S. Big Data & Machine Learning",
      "detail": "Georgia State University · 2021–2022",
      "status": "Completed"
    },
    {
      "title": "B.S. Computer Science",
      "detail": "Gujarat Technological University · 2012–2016",
      "status": "Completed"
    },
    {
      "title": "M.S. Computer Science",
      "detail": "The University of Texas at Austin · In progress",
      "status": "Continuous learning"
    }
  ],
  "links": [
    {
      "label": "LinkedIn",
      "url": "https://www.linkedin.com/in/codesagar/"
    },
    {
      "label": "GitHub",
      "url": "https://github.com/codesagar"
    },
    {
      "label": "Hugging Face",
      "url": "https://huggingface.co/codesagar"
    },
    {
      "label": "Google Scholar",
      "url": "https://scholar.google.com/citations?user=fx7mKOcAAAAJ"
    }
  ],
  "otherContributions": [
    {
      "title": "Feature Selection on a Flare Forecasting Testbed: A Comparative Study of 24 Methods",
      "venue": "IEEE ICDM Workshops · 2021 · Co-authored",
      "url": "https://arxiv.org/abs/2109.14770"
    },
    {
      "title": "Tracing MCP Security Vulnerabilities: Constructing and Analyzing an MCP Security Vulnerability Dataset",
      "venue": "IEEE Security and Privacy Workshops · 2026 · Co-authored",
      "url": "https://doi.org/10.1109/SPW72489.2026.00047"
    }
  ],
  "speaking": [
    {
      "name": "Spark by Go Studio",
      "detail": "Keynote speaker · September 10, 2025"
    },
    {
      "name": "Analytics Vidhya DataHour",
      "detail": "WatchTower — Securing LLMs against Jailbreak Attempts · July 17, 2024",
      "url": "https://www.analyticsvidhya.com/events/datahour/watchtower-securing-llms-against-jailbreak-attempts/"
    },
    {
      "name": "IEEE DA-IICT",
      "detail": "Speaker at Tic Tech Toe ’20 Virtual Hackathon · 2020"
    },
    {
      "name": "GDG DevFest Baroda",
      "detail": "Resale Value Prediction Using Machine Learning · September 2019"
    }
  ]
};

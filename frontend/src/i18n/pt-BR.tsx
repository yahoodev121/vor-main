const industry = {
  Accounting: 'Accounting',
  'Airlines/Aviation': 'Airlines/Aviation',
  'Alternative Dispute Resolution':
    'Alternative Dispute Resolution',
  'Alternative Medicine': 'Alternative Medicine',
  Animation: 'Animation',
  'Apparel & Fashion': 'Apparel & Fashion',
  'Architecture & Planning': 'Architecture & Planning',
  'Arts and Crafts': 'Arts and Crafts',
  Automotive: 'Automotive',
  'Aviation & Aerospace': 'Aviation & Aerospace',
  Banking: 'Banking',
  Biotechnology: 'Biotechnology',
  'Broadcast Media': 'Broadcast Media',
  'Building Materials': 'Building Materials',
  'Business Supplies and Equipment':
    'Business Supplies and Equipment',
  'Capital Markets': 'Capital Markets',
  Chemicals: 'Chemicals',
  'Civic & Social Organization':
    'Civic & Social Organization',
  'Civil Engineering': 'Civil Engineering',
  'Commercial Real Estate': 'Commercial Real Estate',
  'Computer & Network Security':
    'Computer & Network Security',
  'Computer Games': 'Computer Games',
  'Computer Hardware': 'Computer Hardware',
  'Computer Networking': 'Computer Networking',
  'Computer Software': 'Computer Software',
  Construction: 'Construction',
  'Consumer Electronics': 'Consumer Electronics',
  'Consumer Goods': 'Consumer Goods',
  'Consumer Services': 'Consumer Services',
  Cosmetics: 'Cosmetics',
  Dairy: 'Dairy',
  'Defense & Space': 'Defense & Space',
  Design: 'Design',
  'Education Management': 'Education Management',
  'E-Learning': 'E-Learning',
  'Electrical/Electronic Manufacturing':
    'Electrical/Electronic Manufacturing',
  Entertainment: 'Entertainment',
  'Environmental Services': 'Environmental Services',
  'Events Services': 'Events Services',
  'Executive Office': 'Executive Office',
  'Facilities Services': 'Facilities Services',
  Farming: 'Farming',
  'Financial Services': 'Financial Services',
  'Fine Art': 'Fine Art',
  Fishery: 'Fishery',
  'Food & Beverages': 'Food & Beverages',
  'Food Production': 'Food Production',
  'Fund-Raising': 'Fund-Raising',
  Furniture: 'Furniture',
  'Gambling & Casinos': 'Gambling & Casinos',
  Glass: 'Glass',
  'Ceramics & Concrete': 'Ceramics & Concrete',
  'Government Administration': 'Government Administration',
  'Government Relations': 'Government Relations',
  'Graphic Design': 'Graphic Design',
  Health: 'Health',
  'Wellness and Fitness': 'Wellness and Fitness',
  'Higher Education': 'Higher Education',
  Horticulture: 'Horticulture',
  'Hospital & Health Care': 'Hospital & Health Care',
  Hospitality: 'Hospitality',
  'Human Resources': 'Human Resources',
  'Import and Export': 'Import and Export',
  'Individual & Family Services':
    'Individual & Family Services',
  'Industrial Automation': 'Industrial Automation',
  'Information Services': 'Information Services',
  'Information Technology and Services':
    'Information Technology and Services',
  Insurance: 'Insurance',
  'International Affairs': 'International Affairs',
  'International Trade and Development':
    'International Trade and Development',
  Internet: 'Internet',
  'Investment Banking': 'Investment Banking',
  'Investment Management': 'Investment Management',
  Judiciary: 'Judiciary',
  'Law Enforcement': 'Law Enforcement',
  'Law Practice': 'Law Practice',
  'Legal Services': 'Legal Services',
  'Legislative Office': 'Legislative Office',
  Leisure: 'Leisure',
  'Travel & Tourism': 'Travel & Tourism',
  Libraries: 'Libraries',
  'Logistics and Supply Chain':
    'Logistics and Supply Chain',
  'Luxury Goods & Jewelry': 'Luxury Goods & Jewelry',
  Machinery: 'Machinery',
  'Management Consulting': 'Management Consulting',
  Maritime: 'Maritime',
  'Market Research': 'Market Research',
  'Marketing and Advertising': 'Marketing and Advertising',
  'Mechanical or Industrial Engineering':
    'Mechanical or Industrial Engineering',
  'Media Production': 'Media Production',
  'Medical Devices': 'Medical Devices',
  'Medical Practice': 'Medical Practice',
  'Mental Health Care': 'Mental Health Care',
  Military: 'Military',
  'Mining & Metals': 'Mining & Metals',
  'Mobile Games': 'Mobile Games',
  'Motion Pictures and Film': 'Motion Pictures and Film',
  'Museums and Institutions': 'Museums and Institutions',
  Music: 'Music',
  Nanotechnology: 'Nanotechnology',
  Newspapers: 'Newspapers',
  'Non-Profit Organization Management':
    'Non-Profit Organization Management',
  'Oil & Energy': 'Oil & Energy',
  'Online Media': 'Online Media',
  'Outsourcing/Offshoring': 'Outsourcing/Offshoring',
  'Package/Freight Delivery': 'Package/Freight Delivery',
  'Packaging and Containers': 'Packaging and Containers',
  'Paper & Forest Products': 'Paper & Forest Products',
  'Performing Arts': 'Performing Arts',
  Pharmaceuticals: 'Pharmaceuticals',
  Philanthropy: 'Philanthropy',
  Photography: 'Photography',
  Plastics: 'Plastics',
  'Political Organization': 'Political Organization',
  'Primary/Secondary Education':
    'Primary/Secondary Education',
  Printing: 'Printing',
  'Professional Training & Coaching':
    'Professional Training & Coaching',
  'Program Development': 'Program Development',
  'Public Policy': 'Public Policy',
  'Public Relations and Communications':
    'Public Relations and Communications',
  'Public Safety': 'Public Safety',
  Publishing: 'Publishing',
  'Railroad Manufacture': 'Railroad Manufacture',
  Ranching: 'Ranching',
  'Real Estate': 'Real Estate',
  'Recreational Facilities and Services':
    'Recreational Facilities and Services',
  'Religious Institutions': 'Religious Institutions',
  'Renewables & Environment': 'Renewables & Environment',
  Research: 'Research',
  Restaurants: 'Restaurants',
  Retail: 'Retail',
  'Security and Investigations':
    'Security and Investigations',
  Semiconductors: 'Semiconductors',
  Shipbuilding: 'Shipbuilding',
  'Sporting Goods': 'Sporting Goods',
  Sports: 'Sports',
  'Staffing and Recruiting': 'Staffing and Recruiting',
  Supermarkets: 'Supermarkets',
  Telecommunications: 'Telecommunications',
  Textiles: 'Textiles',
  'Think Tanks': 'Think Tanks',
  Tobacco: 'Tobacco',
  'Translation and Localization':
    'Translation and Localization',
  'Transportation/Trucking/Railroad':
    'Transportation/Trucking/Railroad',
  Utilities: 'Utilities',
  'Venture Capital & Private Equity':
    'Venture Capital & Private Equity',
  Veterinary: 'Veterinary',
  Warehousing: 'Warehousing',
  Wholesale: 'Wholesale',
  'Wine and Spirits': 'Wine and Spirits',
  Wireless: 'Wireless',
  'Writing and Editing': 'Writing and Editing',
};

const ptBR = {
  common: {
    or: 'ou',
    cancel: 'Cancelar',
    reset: 'Limpar',
    save: 'Salvar',
    search: 'Buscar',
    edit: 'Editar',
    new: 'Novo',
    export: 'Exportar para Excel',
    noDataToExport: 'Não há dados para exportar',
    import: 'Importar',
    discard: 'Descartar',
    yes: 'Sim',
    no: 'Não',
    pause: 'Pausar',
    areYouSure: 'Tem certeza?',
    doYouContinue: 'Você tem certeza que quer continuar?',
    view: 'Visualizar',
    destroy: 'Deletar',
    mustSelectARow: 'Selecine uma linha',
    start: 'Inicio',
    end: 'Fim',
    select: 'Selecionar',
    continue: 'Continuar',
    filters: 'Filtros',
    more: 'More',
  },

  app: {
    title: 'VOR | GRC - Consciência Informada',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Configurador de Material UI',
      description: 'Veja nossas opções de painel.',
      sidenavColor: 'Cores',
      sidenavType: {
        title: 'Tipo Sidenav',
        description:
          'Escolha entre diferentes tipos de sidenav.',
        dark: 'Escuro',
        transparent: 'Transparente',
        white: 'Branco',
      },
      navbarFixed: 'Navbar Fixo',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Claro / Escuro',
    },
  },

  collapses: {
    reports: {
      menu: 'Reports',
    },
    tasks: {
      menu: 'Tasks',
    },
    vendors: {
      menu: 'Vendors',
    },
    risks: {
      menu: 'Risks',
    },
    marketplace: {
      menu: 'Marketplace',
    },
    vorAI: {
      menu: 'Response Center',
    },
  },

  reports: {
    tasksByMonth: {
      menu: 'Tasks By Month',
    },
  },

  widgets: {
    tasksByMonth: {
      title: 'Tasks By Month',
    },
    tasksOnCalendar: {
      title: 'Calendar',
      modals: {
        recurring: {
          title: 'Recurring Task On {0}',
        },
        edit: {
          title: 'Edit Task',
        },
        new: {
          title: 'New Task On {0}',
        },
      },
    },
    tasksSummary: {
      title: 'Tasks',
    },
    upcomingTasks: {
      title: 'Upcoming Tasks',
    },
    risksSummary: {
      title: 'Risks',
    },
  },

  entities: {
    vendor: {
      name: 'Vendor',
      label: 'Vendors',
      menu: 'Vendor Register',
      info: 'Vendor Information',
      exporterFileName: 'Vendor_exportados',
      list: {
        menu: 'Vendors',
        title: 'Vendors',
      },
      create: {
        success: 'Vendor salvo com sucesso',
      },
      update: {
        success: 'Vendor salvo com sucesso',
      },
      destroy: {
        success: 'Vendor deletado com sucesso',
      },
      destroyAll: {
        success: 'Vendor(s) deletado com sucesso',
      },
      sections: {
        about: 'About',
        business: 'Business',
        contactInformation: 'Contact Information',
        compliance: 'Compliance',
        risks: 'Risks',
        tasks: 'Tasks',
      },
      edit: {
        title: 'Editar Vendor',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        name: 'Name',
        status: 'Status',
        category: 'Category',
        rating: 'Rating',
        countryOfIncorporation: 'Country of Incorporation',
        dataProcessed: 'Data Processed',
        industry: 'Industry',
        supportEmail: 'Support Email',
        supportPhoneNumber: 'Support Phone Number',
        internalBusinessSponsor:
          'Internal Business Sponsor',
        descriptionOfServices: 'Description Of Services',
        logo: 'Logo',
        website: 'Website',
        address: 'Address',
        contract: 'Contract',
        documentation: 'Documentation',
        dpiaCompleted: 'DPIA Completed',
        dtiaCompleted: 'DTIA Completed',
        iso27001: 'ISO 27001',
        soc1: 'SOC1',
        soc2: 'SOC2',
        hippa: 'HIPPA',
        pcidss: 'PCI DSS',
        fedramp: 'FedRAMP',
        gdpr: 'GDPR',
        ccpa: 'CCPA',
        sox: 'SOX',
        cobit: 'COBIT',
        risks: 'Risks',
        tasks: 'Tasks',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          Active: 'Active',
          Inactive: 'Inactive',
        },
        rating: {
          Critical: 'Critical',
          High: 'High',
          Medium: 'Medium',
          Low: 'Low',
          None: 'None',
        },
        countryOfIncorporation: {
          UK: 'UK',
          US: 'US',
        },
        dataProcessed: {
          None: 'None',
          PII: 'PII',
          'GDPR Special Categories':
            'GDPR Special Categories',
          Confidential: 'Confidential',
          'Highly Classified': 'Highly Classified',
        },
        industry,
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Vendor',
      },
      view: {
        title: 'Visualizar Vendor',
      },
      importer: {
        title: 'Importar Vendors',
        fileName: 'vendor_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    vendorCategory: {
      name: 'Vendor Category',
      label: 'Vendor Categories',
      menu: 'Vendor Categories',
      exporterFileName: 'Vendor Category_exportados',
      list: {
        menu: 'Vendor Categories',
        title: 'Vendor Categories',
      },
      create: {
        success: 'Vendor Category salvo com sucesso',
      },
      update: {
        success: 'Vendor Category salvo com sucesso',
      },
      destroy: {
        success: 'Vendor Category deletado com sucesso',
      },
      destroyAll: {
        success: 'Vendor Category(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Vendor Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Vendor Category',
      },
      view: {
        title: 'Visualizar Vendor Category',
      },
      importer: {
        title: 'Importar Vendor Categories',
        fileName: 'vendorCategory_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    task: {
      name: 'Task',
      label: 'Tasks',
      menu: 'Task Register',
      info: 'Task Information',
      instances: 'Task Instances',
      exporterFileName: 'Task_exportados',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task salvo com sucesso',
      },
      update: {
        success: 'Task salvo com sucesso',
      },
      destroy: {
        success: 'Task deletado com sucesso',
      },
      destroyAll: {
        success: 'Task(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Task',
      },
      states: {
        created: 'Created',
        completed: 'Completed',
        overdue: 'Completed overdue',
        notCompleted: 'Not completed in time',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        taskList: 'Task List',
        description: 'Description',
        notes: 'Notes',
        priority: 'Priority',
        repeat: 'Repeat',
        status: 'Status',
        owner: 'Owner',
        approver: 'Approver',
        dueDateRange: 'Due Date',
        dueDate: 'Due Date',
        completedDateRange: 'Completed Date',
        completedDate: 'Completed Date',
        attachments: 'Attachments',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        repeat: {
          Never: 'Never',
          Daily: 'Daily',
          Weekdays: 'Weekdays',
          Weekends: 'Weekends',
          Weekly: 'Weekly',
          Biweekly: 'Biweekly',
          Monthly: 'Monthly',
          'Every 3 Months': 'Every 3 Months',
          'Every 6 Months': 'Every 6 Months',
          Annually: 'Annually',
        },
        status: {
          Backlog: 'Backlog',
          ToDo: 'ToDo',
          'In progress': 'In progress',
          Complete: 'Complete',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Task',
      },
      view: {
        title: 'Visualizar Task',
      },
      importer: {
        title: 'Importar Tasks',
        fileName: 'task_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    taskPriority: {
      name: 'Task Priority',
      label: 'Task Priorities',
      menu: 'Task Priorities',
      exporterFileName: 'Task Priority_exportados',
      list: {
        menu: 'Task Priorities',
        title: 'Task Priorities',
      },
      create: {
        success: 'Task Priority salvo com sucesso',
      },
      update: {
        success: 'Task Priority salvo com sucesso',
      },
      destroy: {
        success: 'Task Priority deletado com sucesso',
      },
      destroyAll: {
        success: 'Task Priority(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Task Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Task Priority',
      },
      view: {
        title: 'Visualizar Task Priority',
      },
      importer: {
        title: 'Importar Task Priorities',
        fileName: 'taskPriority_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    taskList: {
      name: 'Task List',
      label: 'Task Lists',
      menu: 'Task Lists',
      exporterFileName: 'Task List_exportados',
      list: {
        menu: 'Task Lists',
        title: 'Task Lists',
      },
      create: {
        success: 'Task List salvo com sucesso',
      },
      update: {
        success: 'Task List salvo com sucesso',
      },
      destroy: {
        success: 'Task List deletado com sucesso',
      },
      destroyAll: {
        success: 'Task List(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Task List',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        taskdisplaycolor: 'Display Color',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        taskdisplaycolor: {
          red: 'Red',
          orange: 'Orange',
          yellow: 'Yellow',
          green: 'Green',
          blue: 'Blue',
          indigo: 'Indigo',
          violet: 'Violet',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Task List',
      },
      view: {
        title: 'Visualizar Task List',
      },
      importer: {
        title: 'Importar Task Lists',
        fileName: 'taskList_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    qaLibrary: {
      name: 'qaLibrary',
      label: 'Q&A Library',
      menu: 'Q&A Library',
      exporterFileName: 'qaLibrary_export',
      list: {
        menu: 'Questões & Respostas Library',
        title: 'Questões & Respostas Library',
      },
      create: {
        success: 'Q&A Library salvo com sucesso',
      },
      update: {
        success: 'Q&A Library salvo com sucesso',
      },
      destroy: {
        success: 'Q&A Library deletado com sucesso',
      },
      destroyAll: {
        success: 'Q&A Library(s) deletado com sucesso',
      },
      edit: {
        title: 'Edit Q&A Library',
      },
      fields: {
        id: 'Id',
        question: 'Pergunta',
        answer: 'Responder',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
        aiKnowledgebase: 'AI Knowledgebase',
        expirationDate: 'Data de Validade',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Q&A Library',
      },
      view: {
        title: 'Visualizar Q&A Library',
      },
      importer: {
        title: 'Importar Q&A Library',
        fileName: 'qaLibrary_import_template',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    note: {
      name: 'Note',
      label: 'Notes',
      menu: 'Notes',
      exporterFileName: 'Note_exportados',
      list: {
        menu: 'Notes',
        title: 'Notes',
      },
      create: {
        success: 'Note salvo com sucesso',
      },
      update: {
        success: 'Note salvo com sucesso',
      },
      destroy: {
        success: 'Note deletado com sucesso',
      },
      destroyAll: {
        success: 'Note(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Note',
      },
      fields: {
        id: 'Id',
        message: 'Message',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Note',
      },
      view: {
        title: 'Visualizar Note',
      },
      importer: {
        title: 'Importar Notes',
        fileName: 'note_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    risk: {
      name: 'Risk',
      label: 'Risks',
      menu: 'Risk Register',
      info: 'Risk Information',
      exporterFileName: 'Risk_exportados',
      list: {
        menu: 'Risks',
        title: 'Risks',
      },
      create: {
        success: 'Risk salvo com sucesso',
      },
      update: {
        success: 'Risk salvo com sucesso',
      },
      destroy: {
        success: 'Risk deletado com sucesso',
      },
      destroyAll: {
        success: 'Risk(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Risk',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        status: 'Status',
        owner: 'Owner',
        likelihood: 'Likelihood',
        impact: 'Impact',
        inherentScoreRange: 'Inherent Score',
        inherentScore: 'Inherent Score',
        residualScoreRange: 'Residual Score',
        residualScore: 'Residual Score',
        costRange: 'Cost',
        cost: 'Cost',
        tasks: 'Tasks',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          Open: 'Open',
          Acceptance: 'Acceptance',
          Avoidance: 'Avoidance',
          Mitigation: 'Mitigation',
          Remediation: 'Remediation',
          Transfer: 'Transfer',
        },
        likelihood: {
          'Very Unlikely 1-10%': 'Very Unlikely 1-10%',
          'Unlikely 11-30%': 'Unlikely 11-30%',
          'Possible 31-50%': 'Possible 31-50%',
          'Likely 51-80%': 'Likely 51-80%',
          'Very Likely > 80%': 'Very Likely > 80%',
        },
        impact: {
          Negligible: 'Negligible',
          Minor: 'Minor',
          Moderate: 'Moderate',
          Significant: 'Significant',
          Severe: 'Severe',
        },
        inherentScore: {
          Low: 'Low',
          'Low Med': 'Low Medium',
          Medium: 'Medium',
          'Med Hi': 'Medium High',
          High: 'High',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Risk',
      },
      view: {
        title: 'Visualizar Risk',
      },
      importer: {
        title: 'Importar Risks',
        fileName: 'risk_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    riskCategory: {
      name: 'Risk Category',
      label: 'Risk Categories',
      menu: 'Risk Categories',
      exporterFileName: 'Risk Category_exportados',
      list: {
        menu: 'Risk Categories',
        title: 'Risk Categories',
      },
      create: {
        success: 'Risk Category salvo com sucesso',
      },
      update: {
        success: 'Risk Category salvo com sucesso',
      },
      destroy: {
        success: 'Risk Category deletado com sucesso',
      },
      destroyAll: {
        success: 'Risk Category(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Risk Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Risk Category',
      },
      view: {
        title: 'Visualizar Risk Category',
      },
      importer: {
        title: 'Importar Risk Categories',
        fileName: 'riskCategory_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    product: {
      name: 'Product',
      label: 'Products',
      menu: 'Products',
      info: 'Product Information',
      exporterFileName: 'Product_exportados',
      list: {
        menu: 'Products',
        title: 'Products',
      },
      create: {
        success: 'Product salvo com sucesso',
      },
      update: {
        success: 'Product salvo com sucesso',
      },
      destroy: {
        success: 'Product deletado com sucesso',
      },
      destroyAll: {
        success: 'Product(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Product',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        website: 'Website',
        logo: 'Logo',
        ratingRange: 'Rating',
        rating: 'Rating',
        priceRange: 'Price',
        price: 'Price',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Product',
      },
      view: {
        title: 'Visualizar Product',
      },
      importer: {
        title: 'Importar Products',
        fileName: 'product_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    productCategory: {
      name: 'Product Category',
      label: 'Product Categories',
      menu: 'Product Categories',
      exporterFileName: 'Product Category_exportados',
      list: {
        menu: 'Product Categories',
        title: 'Product Categories',
      },
      create: {
        success: 'Product Category salvo com sucesso',
      },
      update: {
        success: 'Product Category salvo com sucesso',
      },
      destroy: {
        success: 'Product Category deletado com sucesso',
      },
      destroyAll: {
        success: 'Product Category(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Product Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Product Category',
      },
      view: {
        title: 'Visualizar Product Category',
      },
      importer: {
        title: 'Importar Product Categories',
        fileName: 'productCategory_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    newsArticle: {
      name: 'News',
      label: 'News',
      menu: 'News',
      exporterFileName: 'News_exportados',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News salvo com sucesso',
      },
      update: {
        success: 'News salvo com sucesso',
      },
      destroy: {
        success: 'News deletado com sucesso',
      },
      destroyAll: {
        success: 'News(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar News',
      },
      fields: {
        id: 'Id',
        rssid: 'RSSID',
        feedURL: 'Feed URL',
        feedLink: 'Feed Link',
        feedTitle: 'Feed Title',
        feedDescription: 'Feed Description',
        feedIcon: 'Feed Icon',
        title: 'Title',
        link: 'Link',
        description: 'Description',
        image: 'Image',
        plainDescription: 'Plain Description',
        author: 'Author',
        dateRange: 'Date',
        date: 'Date',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo News',
      },
      view: {
        title: 'Visualizar News',
      },
      importer: {
        title: 'Importar News',
        fileName: 'newsArticle_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    newsFavorite: {
      name: 'Favorite',
      label: 'Favorites',
      menu: 'Favorites',
      exporterFileName: 'Favorite_exportados',
      list: {
        menu: 'Favorites',
        title: 'Favorites',
      },
      create: {
        success: 'Favorite salvo com sucesso',
      },
      update: {
        success: 'Favorite salvo com sucesso',
      },
      destroy: {
        success: 'Favorite deletado com sucesso',
      },
      destroyAll: {
        success: 'Favorite(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Favorite',
      },
      fields: {
        id: 'Id',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Favorite',
      },
      view: {
        title: 'Visualizar Favorite',
      },
      importer: {
        title: 'Importar Favorites',
        fileName: 'newsFavorite_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    tag: {
      name: 'Tag',
      label: 'Tags',
      menu: 'Tags',
      exporterFileName: 'Tag_exportados',
      list: {
        menu: 'Tags',
        title: 'Tags',
      },
      create: {
        success: 'Tag salvo com sucesso',
      },
      update: {
        success: 'Tag salvo com sucesso',
      },
      destroy: {
        success: 'Tag deletado com sucesso',
      },
      destroyAll: {
        success: 'Tag(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Tag',
      },
      fields: {
        id: 'Id',
        tag: 'Tag',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Tag',
      },
      view: {
        title: 'Visualizar Tag',
      },
      importer: {
        title: 'Importar Tags',
        fileName: 'tag_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    policyTemplate: {
      name: 'Policy Template',
      label: 'Policy Templates',
      menu: 'Policy Templates',
      exporterFileName: 'Policy Template_exportados',
      list: {
        menu: 'Policy Templates',
        title: 'Policy Templates',
      },
      create: {
        success: 'Policy Template salvo com sucesso',
      },
      update: {
        success: 'Policy Template salvo com sucesso',
      },
      destroy: {
        success: 'Policy Template deletado com sucesso',
      },
      destroyAll: {
        success: 'Policy Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Policy Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        lastUpdatedRange: 'Last Updated',
        lastUpdated: 'Last Updated',
        attachment: 'Attachment',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Policy Template',
      },
      view: {
        title: 'Visualizar Policy Template',
      },
      importer: {
        title: 'Importar Policy Templates',
        fileName: 'policyTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    policy: {
      name: 'Policy',
      label: 'Policies',
      menu: 'Policies',
      exporterFileName: 'Policy_exportados',
      list: {
        menu: 'Policies',
        title: 'Policies',
      },
      create: {
        success: 'Policy salvo com sucesso',
      },
      update: {
        success: 'Policy salvo com sucesso',
      },
      destroy: {
        success: 'Policy deletado com sucesso',
      },
      destroyAll: {
        success: 'Policy(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Policy',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        type: 'Type',
        versionRange: 'Version',
        version: 'Version',
        lastPublishedDateRange: 'Last Published Date',
        lastPublishedDate: 'Last Published Date',
        publishedBy: 'Published By',
        attachment: 'Attachment',
        link: 'Link',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        type: {
          Document: 'Document',
          Link: 'Link',
        },
      },
      placeholders: {},
      hints: {
        type: 'Upload your policy or link to it on your intranet',
      },
      new: {
        title: 'Novo Policy',
      },
      view: {
        title: 'Visualizar Policy',
      },
      importer: {
        title: 'Importar Policies',
        fileName: 'policy_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    vorAI: {
      name: 'questionaires',
      label: 'Questionaires',
      menu: 'Questionaires',
      title: 'Questionaires',
      buttons: {
        downloadExcelTemplate: 'Baixe o Modelo do Excel',
        submitExtraction: 'Extrair Perguntas',
        answerQuestions: 'Responder a Perguntas',
        generateDocument: 'Gerar Q&A Documento',
        trainStatus: 'Status do Trem',
        uploadAndTrain: 'Carregar & Trem',
      },
      enumerators: {
        models: {
          'gpt-4': 'GPT-4',
          'gpt-35-turbo': 'GPT-3.5',
        },
      },
      fields: {
        answer: 'Responder',
        apiBearerToken: 'API Bearer Token',
        apiURL: 'API URL',
        attachment: 'Anexo',
        engine: 'Motor',
        frequencyPenalty: 'Penalidade de Frequência',
        maxTokens: 'Máximo de Tokens',
        method: 'Método',
        presencePenalty: 'Penalidade de Presença',
        prompt: 'Prompt',
        promptFiles: 'Word Documento',
        promptFileText: 'Prompt Arquivo Texto',
        question: 'Pergunta',
        responseFromAPIService: 'Resposta do Serviço API',
        stopSequence: 'Sequência de Parada',
        temperature: 'Temperatura',
        topP: 'Top P',
      },
      importer: {
        fileName: 'VOR_AI_QA_template',
      },
      status: {
        submit: {
          started: 'Comece a enviar',
          success: 'Submetido com sucesso',
          error: 'Ocorreu um erro ao enviar',
          files:
            'Fazendo upload do arquivo(s) de treinamento',
          fineTunes:
            'Aprendendo com determinado conjunto(s) de dados',
          status: 'Verificando o status do treinamento',
          submitExtractions: 'Envio de extrações',
          completions: 'Obtendo a conclusão(s) prevista',
          submits: 'Obtendo resposta',
        },
      },
      modal: {
        noQALibrary:
          'A biblioteca de perguntas e respostas não possui perguntas e respostas elegíveis para a IA.',
      },
    },

    campaign: {
      name: 'Campaign',
      label: 'Campaigns',
      menu: 'Campaigns',
      exporterFileName: 'Campaign_exportados',
      list: {
        menu: 'Campaigns',
        title: 'Campaigns',
      },
      create: {
        success: 'Campaign salvo com sucesso',
      },
      update: {
        success: 'Campaign salvo com sucesso',
      },
      destroy: {
        success: 'Campaign deletado com sucesso',
      },
      destroyAll: {
        success: 'Campaign(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Campaign',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        type: 'Type',
        audience: 'Audience',
        dueDateRange: 'Due Date',
        dueDate: 'Due Date',
        progressRange: 'Progress',
        progress: 'Progress',
        totalRecipientsRange: 'Total Recipients',
        totalRecipients: 'Total Recipients',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          'Not Started': 'Not Started',
          'In Progress': 'In Progress',
          Completed: 'Completed',
        },
        type: {
          Questionnaire: 'Questionnaire',
          Email: 'Email',
        },
        audience: {
          Vendors: 'Vendors',
          Clients: 'Clients',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Campaign',
      },
      view: {
        title: 'Visualizar Campaign',
      },
      importer: {
        title: 'Importar Campaigns',
        fileName: 'campaign_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    campaignInstance: {
      name: 'Campaign Instance',
      label: 'CampaignInstances',
      menu: 'CampaignInstances',
      exporterFileName: 'Campaign Instance_exportados',
      list: {
        menu: 'CampaignInstances',
        title: 'CampaignInstances',
      },
      create: {
        success: 'Campaign Instance salvo com sucesso',
      },
      update: {
        success: 'Campaign Instance salvo com sucesso',
      },
      destroy: {
        success: 'Campaign Instance deletado com sucesso',
      },
      destroyAll: {
        success:
          'Campaign Instance(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Campaign Instance',
      },
      fields: {
        id: 'Id',
        title: 'Title',
        status: 'Status',
        progressRange: 'Progress',
        progress: 'Progress',
        vendor: 'Vendor',
        users: 'Users',
        additionalContacts: 'Additional Contacts',
        submittedDateRange: 'Submitted Date',
        submittedDate: 'Submitted Date',
        submittedBy: 'Submitted By',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          NotStarted: 'NotStarted',
          InProgress: 'InProgress',
          Complete: 'Complete',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Campaign Instance',
      },
      view: {
        title: 'Visualizar Campaign Instance',
      },
      importer: {
        title: 'Importar CampaignInstances',
        fileName: 'campaignInstance_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    campaignInstanceEmails: {
      name: 'Emails',
      label: 'CampaignInstanceEmails',
      menu: 'CampaignInstanceEmails',
      exporterFileName: 'Emails_exportados',
      list: {
        menu: 'CampaignInstanceEmails',
        title: 'CampaignInstanceEmails',
      },
      create: {
        success: 'Emails salvo com sucesso',
      },
      update: {
        success: 'Emails salvo com sucesso',
      },
      destroy: {
        success: 'Emails deletado com sucesso',
      },
      destroyAll: {
        success: 'Emails(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Emails',
      },
      fields: {
        id: 'Id',
        fromEmailAddress: 'From Email Address',
        toEmailAddress: 'To Email Address',
        ccEmailAddress: 'Cc Email Address',
        sentRange: 'Sent',
        sent: 'Sent',
        subject: 'Subject',
        body: 'Body',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Emails',
      },
      view: {
        title: 'Visualizar Emails',
      },
      importer: {
        title: 'Importar CampaignInstanceEmails',
        fileName:
          'campaignInstanceEmails_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    emailTemplate: {
      name: 'Email Template',
      label: 'Email Templates',
      menu: 'Email Templates',
      exporterFileName: 'Email Template_exportados',
      list: {
        menu: 'Email Templates',
        title: 'Email Templates',
      },
      create: {
        success: 'Email Template salvo com sucesso',
      },
      update: {
        success: 'Email Template salvo com sucesso',
      },
      destroy: {
        success: 'Email Template deletado com sucesso',
      },
      destroyAll: {
        success: 'Email Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Email Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        fromEmailAddress: 'From Email Address',
        subject: 'Subject',
        body: 'Body',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Email Template',
      },
      view: {
        title: 'Visualizar Email Template',
      },
      importer: {
        title: 'Importar Email Templates',
        fileName: 'emailTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    questionnaireTemplate: {
      name: 'Questionnaire Template',
      label: 'Questionnaire Templates',
      menu: 'Questionnaire Templates',
      exporterFileName: 'Questionnaire Template_exportados',
      list: {
        menu: 'Questionnaire Templates',
        title: 'Questionnaire Templates',
      },
      create: {
        success: 'Questionnaire Template salvo com sucesso',
      },
      update: {
        success: 'Questionnaire Template salvo com sucesso',
      },
      destroy: {
        success:
          'Questionnaire Template deletado com sucesso',
      },
      destroyAll: {
        success:
          'Questionnaire Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Questionnaire Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        totalQuestionsRange: 'Total Questions',
        totalQuestions: 'Total Questions',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Questionnaire Template',
      },
      view: {
        title: 'Visualizar Questionnaire Template',
      },
      importer: {
        title: 'Importar Questionnaire Templates',
        fileName:
          'questionnaireTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    client: {
      name: 'Client',
      label: 'Clients',
      menu: 'Clients',
      exporterFileName: 'Client_exportados',
      list: {
        menu: 'Clients',
        title: 'Clients',
      },
      create: {
        success: 'Client salvo com sucesso',
      },
      update: {
        success: 'Client salvo com sucesso',
      },
      destroy: {
        success: 'Client deletado com sucesso',
      },
      destroyAll: {
        success: 'Client(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Client',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Reference',
        reference: 'Reference',
        name: 'Name',
        description: 'Description',
        logo: 'Logo',
        status: 'Status',
        category: 'Category',
        rating: 'Rating',
        location: 'Location',
        address: 'Address',
        website: 'Website',
        industry: 'Industry',
        dataProcessed: 'Data Processed',
        dateOnboardedRange: 'Date Onboarded',
        dateOnboarded: 'Date Onboarded',
        dateOffboardedRange: 'Date Offboarded',
        dateOffboarded: 'Date Offboarded',
        infoSecContactName: 'Info Sec Contact Name',
        infoSecEmail: 'Info Sec Email',
        infoSecPhoneNumber: 'Info Sec Phone Number',
        contract: 'Contract',
        documentation: 'Documentation',
        gdprRopa: 'GDPR ROPA',
        risks: 'Risks',
        tasks: 'Tasks',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          Active: 'Active',
          Inactive: 'Inactive',
        },
        rating: {
          Critical: 'Critical',
          High: 'High',
          Medium: 'Medium',
          Low: 'Low',
        },
        location: {
          US: 'US',
          UK: 'UK',
        },
        industry,
        dataProcessed: {
          None: 'None',
          PII: 'PII',
          'GDPR Special Categories':
            'GDPR Special Categories',
          Confidential: 'Confidential',
          'Highly Classified': 'Highly Classified',
        },
        gdprRopa: {
          'N/A': 'N/A',
          No: 'No',
          Yes: 'Yes',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Client',
      },
      view: {
        title: 'Visualizar Client',
      },
      importer: {
        title: 'Importar Clients',
        fileName: 'client_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    clientCategory: {
      name: 'Client Category',
      label: 'Client Categories',
      menu: 'Client Categories',
      exporterFileName: 'Client Category_exportados',
      list: {
        menu: 'Client Categories',
        title: 'Client Categories',
      },
      create: {
        success: 'Client Category salvo com sucesso',
      },
      update: {
        success: 'Client Category salvo com sucesso',
      },
      destroy: {
        success: 'Client Category deletado com sucesso',
      },
      destroyAll: {
        success: 'Client Category(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Client Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Client Category',
      },
      view: {
        title: 'Visualizar Client Category',
      },
      importer: {
        title: 'Importar Client Categories',
        fileName: 'clientCategory_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programTemplate: {
      name: 'Program Template',
      label: 'Program Templates',
      menu: 'Program Templates',
      exporterFileName: 'Program Template_exportados',
      list: {
        menu: 'Program Templates',
        title: 'Program Templates',
      },
      create: {
        success: 'Program Template salvo com sucesso',
      },
      update: {
        success: 'Program Template salvo com sucesso',
      },
      destroy: {
        success: 'Program Template deletado com sucesso',
      },
      destroyAll: {
        success: 'Program Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Program Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Program Template',
      },
      view: {
        title: 'Visualizar Program Template',
      },
      importer: {
        title: 'Importar Program Templates',
        fileName: 'programTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programRequirementTemplate: {
      name: 'Requirement Template',
      label: 'Requirement Templates',
      menu: 'Requirement Templates',
      exporterFileName: 'Requirement Template_exportados',
      list: {
        menu: 'Requirement Templates',
        title: 'Requirement Templates',
      },
      create: {
        success: 'Requirement Template salvo com sucesso',
      },
      update: {
        success: 'Requirement Template salvo com sucesso',
      },
      destroy: {
        success:
          'Requirement Template deletado com sucesso',
      },
      destroyAll: {
        success:
          'Requirement Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Requirement Template',
      },
      fields: {
        id: 'Id',
        programTemplate: 'Program Template',
        name: 'Name',
        description: 'Description',
        requirementID: 'Requirement ID',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Requirement Template',
      },
      view: {
        title: 'Visualizar Requirement Template',
      },
      importer: {
        title: 'Importar Requirement Templates',
        fileName:
          'programRequirementTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programRequirementGuidanceTemplate: {
      name: 'Requirement Guidance',
      label: 'Requirement Guidances',
      menu: 'Requirement Guidances',
      exporterFileName: 'Requirement Guidance_exportados',
      list: {
        menu: 'Requirement Guidances',
        title: 'Requirement Guidances',
      },
      create: {
        success: 'Requirement Guidance salvo com sucesso',
      },
      update: {
        success: 'Requirement Guidance salvo com sucesso',
      },
      destroy: {
        success:
          'Requirement Guidance deletado com sucesso',
      },
      destroyAll: {
        success:
          'Requirement Guidance(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Requirement Guidance',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        programRequirementTemplate: 'Requirement Template',
        productCategories: 'Product Guidance',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Requirement Guidance',
      },
      view: {
        title: 'Visualizar Requirement Guidance',
      },
      importer: {
        title: 'Importar Requirement Guidances',
        fileName:
          'programRequirementGuidanceTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programControlTemplate: {
      name: 'Control Template',
      label: 'Control Templates',
      menu: 'Control Templates',
      exporterFileName: 'Control Template_exportados',
      list: {
        menu: 'Control Templates',
        title: 'Control Templates',
      },
      create: {
        success: 'Control Template salvo com sucesso',
      },
      update: {
        success: 'Control Template salvo com sucesso',
      },
      destroy: {
        success: 'Control Template deletado com sucesso',
      },
      destroyAll: {
        success: 'Control Template(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Control Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        requirementTemplates: 'Requirement Templates',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Control Template',
      },
      view: {
        title: 'Visualizar Control Template',
      },
      importer: {
        title: 'Importar Control Templates',
        fileName:
          'programControlTemplate_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    program: {
      name: 'Program',
      label: 'Programs',
      menu: 'Programs',
      exporterFileName: 'Program_exportados',
      list: {
        menu: 'Programs',
        title: 'Programs',
      },
      create: {
        success: 'Program salvo com sucesso',
      },
      update: {
        success: 'Program salvo com sucesso',
      },
      destroy: {
        success: 'Program deletado com sucesso',
      },
      destroyAll: {
        success: 'Program(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Program',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          Healthy: 'Healthy',
          AtRisk: 'AtRisk',
          NonCompliance: 'NonCompliance',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Program',
      },
      view: {
        title: 'Visualizar Program',
      },
      importer: {
        title: 'Importar Programs',
        fileName: 'program_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programRequirement: {
      name: 'Requirement',
      label: 'Requirements',
      menu: 'Requirements',
      exporterFileName: 'Requirement_exportados',
      list: {
        menu: 'Requirements',
        title: 'Requirements',
      },
      create: {
        success: 'Requirement salvo com sucesso',
      },
      update: {
        success: 'Requirement salvo com sucesso',
      },
      destroy: {
        success: 'Requirement deletado com sucesso',
      },
      destroyAll: {
        success: 'Requirement(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Requirement',
      },
      fields: {
        id: 'Id',
        program: 'Program',
        name: 'Name',
        description: 'Description',
        requirementID: 'Requirement ID',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Requirement',
      },
      view: {
        title: 'Visualizar Requirement',
      },
      importer: {
        title: 'Importar Requirements',
        fileName: 'programRequirement_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    programControl: {
      name: 'Control',
      label: 'Controls',
      menu: 'Controls',
      exporterFileName: 'Control_exportados',
      list: {
        menu: 'Controls',
        title: 'Controls',
      },
      create: {
        success: 'Control salvo com sucesso',
      },
      update: {
        success: 'Control salvo com sucesso',
      },
      destroy: {
        success: 'Control deletado com sucesso',
      },
      destroyAll: {
        success: 'Control(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Control',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        tasks: 'Tasks',
        requirements: 'Requirements',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Control',
      },
      view: {
        title: 'Visualizar Control',
      },
      importer: {
        title: 'Importar Controls',
        fileName: 'programControl_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    userGroup: {
      name: 'User Group',
      label: 'User Groups',
      menu: 'User Groups',
      exporterFileName: 'User Group_exportados',
      list: {
        menu: 'User Groups',
        title: 'User Groups',
      },
      create: {
        success: 'User Group salvo com sucesso',
      },
      update: {
        success: 'User Group salvo com sucesso',
      },
      destroy: {
        success: 'User Group deletado com sucesso',
      },
      destroyAll: {
        success: 'User Group(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar User Group',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        type: 'Type',
        users: 'Users',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        type: {
          Default: 'Default',
          Office: 'Office',
          LineOfBusiness: 'LineOfBusiness',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo User Group',
      },
      view: {
        title: 'Visualizar User Group',
      },
      importer: {
        title: 'Importar User Groups',
        fileName: 'userGroup_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    project: {
      name: 'Project',
      label: 'Projects',
      menu: 'Projects',
      exporterFileName: 'Project_exportados',
      list: {
        menu: 'Projects',
        title: 'Projects',
      },
      create: {
        success: 'Project salvo com sucesso',
      },
      update: {
        success: 'Project salvo com sucesso',
      },
      destroy: {
        success: 'Project deletado com sucesso',
      },
      destroyAll: {
        success: 'Project(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Project',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Reference',
        reference: 'Reference',
        name: 'Name',
        owner: 'Owner',
        description: 'Description',
        status: 'Status',
        type: 'Type',
        priority: 'Priority',
        dueDateRange: 'Due Date',
        dueDate: 'Due Date',
        completedDateRange: 'Completed Date',
        completedDate: 'Completed Date',
        teamMembers: 'Team Members',
        teamGroups: 'Team Groups',
        tasks: 'Tasks',
        risks: 'Risks',
        notes: 'Notes',
        attachments: 'Attachments',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Project',
      },
      view: {
        title: 'Visualizar Project',
      },
      importer: {
        title: 'Importar Projects',
        fileName: 'project_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    projectPriority: {
      name: 'Project Priority',
      label: 'Project Priorities',
      menu: 'Project Priorities',
      exporterFileName: 'Project Priority_exportados',
      list: {
        menu: 'Project Priorities',
        title: 'Project Priorities',
      },
      create: {
        success: 'Project Priority salvo com sucesso',
      },
      update: {
        success: 'Project Priority salvo com sucesso',
      },
      destroy: {
        success: 'Project Priority deletado com sucesso',
      },
      destroyAll: {
        success: 'Project Priority(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Project Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Project Priority',
      },
      view: {
        title: 'Visualizar Project Priority',
      },
      importer: {
        title: 'Importar Project Priorities',
        fileName: 'projectPriority_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    projectStatus: {
      name: 'Project Status',
      label: 'Project Statuses',
      menu: 'Project Statuses',
      exporterFileName: 'Project Status_exportados',
      list: {
        menu: 'Project Statuses',
        title: 'Project Statuses',
      },
      create: {
        success: 'Project Status salvo com sucesso',
      },
      update: {
        success: 'Project Status salvo com sucesso',
      },
      destroy: {
        success: 'Project Status deletado com sucesso',
      },
      destroyAll: {
        success: 'Project Status(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Project Status',
      },
      fields: {
        id: 'Id',
        status: 'Status',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Project Status',
      },
      view: {
        title: 'Visualizar Project Status',
      },
      importer: {
        title: 'Importar Project Statuses',
        fileName: 'projectStatus_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    projectType: {
      name: 'Project Type',
      label: 'Project Types',
      menu: 'Project Types',
      exporterFileName: 'Project Type_exportados',
      list: {
        menu: 'Project Types',
        title: 'Project Types',
      },
      create: {
        success: 'Project Type salvo com sucesso',
      },
      update: {
        success: 'Project Type salvo com sucesso',
      },
      destroy: {
        success: 'Project Type deletado com sucesso',
      },
      destroyAll: {
        success: 'Project Type(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Project Type',
      },
      fields: {
        id: 'Id',
        type: 'Type',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Project Type',
      },
      view: {
        title: 'Visualizar Project Type',
      },
      importer: {
        title: 'Importar Project Types',
        fileName: 'projectType_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },
  },

  auth: {
    tenants: 'Áreas de Trabalho',
    profile: {
      title: 'Perfil',
      success: 'Perfil atualizado com sucesso',
    },
    createAnAccount: 'Criar uma conta',
    rememberMe: 'Lembrar-me',
    forgotPassword: 'Esqueci minha senha',
    signin: 'Entrar',
    signup: 'Registrar',
    signout: 'Sair',
    alreadyHaveAnAccount: 'Já possui uma conta? Entre.',
    social: {
      errors: {
        'auth-invalid-provider':
          'Este email está registrado para outro provedor.',
        'auth-no-email': `O email associado a esta conta é privado ou não existe.`,
      },
    },
    signinWithAnotherAccount: 'Entrar com outra conta',
    emailUnverified: {
      message: `Por favor, confirme seu email em <strong>{0}</strong> para continuar.`,
      submit: `Reenviar confirmação por email`,
    },
    passwordResetEmail: {
      message: 'Enviar email de redefinição de senha',
      error: `Email não encontrado`,
    },
    emptyPermissions: {
      message: `Você ainda não possui permissões. Aguarde o administrador conceder seus privilégios.`,
    },
    passwordReset: {
      message: 'Alterar senha',
    },
    passwordChange: {
      title: 'Mudar a Senha',
      success: 'Senha alterada com sucesso',
      mustMatch: 'Senhas devem ser iguais',
    },
    emailAddressVerificationEmail: {
      error: `Email não encontrado`,
    },
    verificationEmailSuccess: `Verificação de email enviada com sucesso`,
    passwordResetEmailSuccess: `Email de redefinição de senha enviado com sucesso`,
    passwordResetSuccess: `Senha alterada com sucesso`,
    verifyEmail: {
      success: 'Email verificado com sucesso.',
      message:
        'Aguarde um momento, seu email está sendo verificado...',
    },
  },

  roles: {
    admin: {
      label: 'Administrador',
      description: 'Acesso completo a todos os recursos',
    },
    custom: {
      label: 'Perfil Customizado',
      description: 'Acesso customizado',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Nome',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      status: 'Estado',
      phoneNumber: 'Telefone',
      role: 'Perfil',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
      roleUser: 'Perfil/Usuário',
      roles: 'Perfis',
      createdAtRange: 'Criado em',
      password: 'Senha',
      oldPassword: 'Senha Antiga',
      newPassword: 'Nova Senha',
      newPasswordConfirmation: 'Confirmação da Nova Senha',
      rememberMe: 'Lembrar-me',
    },
    status: {
      active: 'Ativo',
      invited: 'Convidado',
      'empty-permissions': 'Aguardando Permissões',
    },
    invite: 'Convidar',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} é inválido',
    },
    title: 'Usuários',
    menu: 'Usuários',
    doAddSuccess: 'Usuário(s) salvos com sucesso',
    doUpdateSuccess: 'Usuário salvo com sucesso',
    exporterFileName: 'usuarios_exportados',
    doDestroySuccess: 'Usuário deletado com sucesso',
    doDestroyAllSelectedSuccess:
      'Usuários deletado com sucesso',
    edit: {
      title: 'Editar usuário',
    },
    new: {
      title: 'Novo(s) Usuário(s)',
      titleModal: 'Novo Usuário',
      emailsHint:
        'Separe múltiplos endereços de e-mail usando a vírgula.',
    },
    view: {
      title: 'Visualizar Usuário',
      activity: 'Atividades',
    },
    importer: {
      title: 'Importar Usuários',
      fileName: 'usuarios_template_importacao',
      hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
    },
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Área de Trabalho',
    menu: 'Áreas de Trabalho',
    list: {
      menu: 'Áreas de Trabalho',
      title: 'Áreas de Trabalho',
    },
    create: {
      button: 'Criar Área de Trabalho',
      success: 'Área de Trabalho salva com sucesso',
    },
    update: {
      success: 'Área de Trabalho salva com sucesso',
    },
    destroy: {
      success: 'Área de Trabalho deletada com sucesso',
    },
    destroyAll: {
      success: 'Área(s) de Trabalho deletadas com sucesso',
    },
    edit: {
      title: 'Editar Área de Trabalho',
    },
    fields: {
      id: 'Id',
      name: 'Nome',
      tenantName: 'Nome da Área de Trabalho',
      tenantUrl: 'URL da Área de Trabalho',
      tenantId: 'Área de Trabalho',
      plan: 'Plano',
    },
    enumerators: {},
    new: {
      title: 'Nova Área de Trabalho',
    },
    invitation: {
      view: 'Ver Convites',
      invited: 'Convidado',
      accept: 'Aceitar Convite',
      decline: 'Recusar Convite',
      declined: 'Convite recusado com sucesso',
      acceptWrongEmail: 'Aceitar Convite Com Este Email',
    },
    select: 'Selecionar Área de Trabalho',
    url: {
      exists:
        'Esta URL de área de trabalho já está em uso.',
    },
  },

  plan: {
    menu: 'Planos',
    title: 'Planos',

    free: {
      label: 'Gratuito',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Growth',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Enterprise',
      price: '50',
      unit: '$',
    },

    pricingPeriod: 'mês',
    current: 'Plano Atual',
    subscribe: 'Assinar',
    manage: 'Gerenciar Assinatura',
    somethingWrong:
      'Há algo errado com sua assinatura. Por favor clique em Gerenciar Assinatura para mais informações.',
    cancelAtPeriodEnd:
      'O plano será cancelado no fim do período.',
    notPlanUser: `Esta assinatura não é controlada por você.`,
  },

  auditLog: {
    menu: 'Registros de Auditoria',
    title: 'Registros de Auditoria',
    exporterFileName: 'registros_autoria_exportados',
    entityNamesHint:
      'Separe múltiplas entidades por vírgula',
    fields: {
      id: 'Id',
      timestampRange: 'Período',
      entityName: 'Entidade',
      entityNames: 'Entidades',
      entityId: 'ID da Entidade',
      action: 'Ação',
      values: 'Valores',
      timestamp: 'Data',
      createdByEmail: 'Email do Usuário',
    },
  },
  settings: {
    title: 'Configurações',
    tenant: 'Tenant',
    menu: 'Configurações',
    save: {
      success: 'Configurações salvas com sucesso.',
    },
    fields: {
      primary: 'Cor Primária',
      secondary: 'Cor Secundária',
      shade: 'Tom',
      logos: 'Logo',
      backgroundImages: 'Papel de Parede',
    },
  },
  dashboard: {
    menu: 'Inicial',
    message: `Esta página usa dados falsos apenas para fins de demonstração. Você pode editá-la em frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Dia',
      red: 'Vermelho',
      green: 'Verde',
      yellow: 'Amarelho',
      grey: 'Cinza',
      blue: 'Azul',
      orange: 'Laranja',
      months: {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
      },
      eating: 'Comendo',
      drinking: 'Bebendo',
      sleeping: 'Dormindo',
      designing: 'Projetando',
      coding: 'Codificando',
      cycling: 'Pedalando',
      running: 'Correndo',
      customer: 'Cliente',
    },
  },
  errors: {
    backToHome: 'Voltar a página inicial',
    403: `Desculpe, você não tem acesso a esta página`,
    404: 'Desculpe, a página que você visitou não existe',
    500: 'Desculpe, o servidor está relatando um erro',
    429: 'Muitas requisições. Por favor, tente novamente mais tarde.',
    forbidden: {
      message: 'Acesso negado',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
    defaultErrorMessage: 'Ops, ocorreu um erro',
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida em modo de demonstração.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} é inválido',
      required: '${path} é obrigatório',
      oneOf:
        '${path} deve ser um dos seguintes valores: ${values}',
      notOneOf:
        '${path} não deve ser um dos seguintes valores: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: '${path} deve possuir ${length} caracteres',
      min: '${path} deve possuir ao menos ${min} caracteres',
      max: '${path} deve possui no máximo ${max} caracteres',
      matches:
        '${path} deve respeitar o padrão: "${regex}"',
      email: '${path} deve ser um email válido',
      url: '${path} deve ser uma URL válida',
      trim: '${path} deve ser uma palavra sem espaços em branco',
      lowercase: '${path} deve ser minúsculo',
      uppercase: '${path} deve ser maiúsculo',
      selected: '${path} deve ser selecionado',
    },
    number: {
      min: '${path} deve ser maior ou igual a ${min}',
      max: '${path} deve ser menor ou igual a ${max}',
      lessThan: '${path} deve ser menor que ${less}',
      moreThan: '${path} deve ser maior que ${more}',
      notEqual: '${path} não deve ser igual a ${notEqual}',
      positive: '${path} deve ser um número positivo',
      negative: '${path} deve ser um número negativo',
      integer: '${path} deve ser um inteiro',
    },
    date: {
      min: '${path} deve ser posterior a ${min}',
      max: '${path} deve ser mais cedo do que ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} não pode ter atributos não especificados no formato do objeto',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} é obrigatório`
          : `'${path} deve possuir ao menos ${min} itens`,
      max: '${path} deve possuir no máximo ${max} itens',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'Você deve fazer upload de uma imagem',
    size: 'O arquivo é muito grande. O tamanho máximo permitido é {0}',
    formats: `Formato inválido. Deve ser um destes: {0}.`,
  },
  importer: {
    line: 'Linha',
    status: 'Estado',
    pending: 'Pendente',
    imported: 'Importado',
    error: 'Erro',
    total: `{0} importado, {1} pendente e {2} com erro`,
    importedMessage: `Processados {0} de {1}.`,
    noNavigateAwayMessage:
      'Não saia desta página ou a importação será interrompida.',
    completed: {
      success:
        'Importação concluída. Todas as linhas foram importadas com sucesso.',
      someErrors:
        'O processamento foi concluído, mas algumas linhas não puderam ser importadas.',
      allErrors:
        'Importação falhou. Não há linhas válidas.',
    },
    form: {
      downloadTemplate: 'Baixe o modelo',
      hint: 'Clique ou arraste o arquivo para esta área para continuar.',
    },
    list: {
      discardConfirm:
        'Você tem certeza? Dados não importados serão perdidos.',
    },
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  autocomplete: {
    loading: 'Carregando...',
    noOptions: 'Não foram encontrados resultados',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'Sem imagem',
  },

  table: {
    noData: 'Nenhum Registro Encontrado',
    loading: 'Carregando...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} de {2}',
    labelRowsPerPage: 'Por página:',
  },
};

export default ptBR;

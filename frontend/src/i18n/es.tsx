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

const es = {
  common: {
    or: 'o',
    cancel: 'Cancelar',
    reset: 'Reiniciar',
    save: 'Guardar',
    search: 'Buscar',
    edit: 'Editar',
    remove: 'Eliminar',
    new: 'Nuevo',
    export: 'Exportar a Excel',
    noDataToExport: 'No hay datos para exportar',
    import: 'Importar',
    discard: 'Descartar',
    yes: 'Si',
    no: 'No',
    pause: 'Pausa',
    areYouSure: '¿Estás seguro?',
    doYouContinue:
      '¿Estás segura de que quieres continuar?',
    view: 'Ver',
    destroy: 'Eliminar',
    mustSelectARow: 'Debe seleccionar una fila',
    start: 'Comienzo',
    end: 'Final',
    select: 'Seleccione',
    continue: 'Continúa',
    filters: 'Filtros',
    more: 'More',
  },

  app: {
    title: 'VOR | GRC - Conciencia informada',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Configurador de Material UI',
      description: 'Vea nuestras opciones de tablero.',
      sidenavColor: 'Colores',
      sidenavType: {
        title: 'Tipo Sidenav',
        description:
          'Elige entre diferentes tipos de sidenav.',
        dark: 'Oscuro',
        transparent: 'Transparente',
        white: 'Blanco',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Claro / Oscuro',
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
      name: 'vendor',
      label: 'Vendors',
      menu: 'Vendor Register',
      info: 'Vendor Information',
      exporterFileName: 'exportacion_vendor',
      list: {
        menu: 'Vendors',
        title: 'Vendors',
      },
      create: {
        success: 'Vendor guardado con éxito',
      },
      update: {
        success: 'Vendor guardado con éxito',
      },
      destroy: {
        success: 'Vendor eliminado con éxito',
      },
      destroyAll: {
        success: 'Vendor(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Vendor',
      },
      view: {
        title: 'Ver Vendor',
      },
      importer: {
        title: 'Importar Vendors',
        fileName: 'vendor_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    vendorCategory: {
      name: 'vendorCategory',
      label: 'Vendor Categories',
      menu: 'Vendor Categories',
      exporterFileName: 'exportacion_vendorCategory',
      list: {
        menu: 'Vendor Categories',
        title: 'Vendor Categories',
      },
      create: {
        success: 'Vendor Category guardado con éxito',
      },
      update: {
        success: 'Vendor Category guardado con éxito',
      },
      destroy: {
        success: 'Vendor Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Vendor Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Vendor Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Vendor Category',
      },
      view: {
        title: 'Ver Vendor Category',
      },
      importer: {
        title: 'Importar Vendor Categories',
        fileName: 'vendorCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Task Register',
      info: 'Task Information',
      instances: 'Task Instances',
      exporterFileName: 'exportacion_task',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task guardado con éxito',
      },
      update: {
        success: 'Task guardado con éxito',
      },
      destroy: {
        success: 'Task eliminado con éxito',
      },
      destroyAll: {
        success: 'Task(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Task',
      },
      view: {
        title: 'Ver Task',
      },
      importer: {
        title: 'Importar Tasks',
        fileName: 'task_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    taskPriority: {
      name: 'taskPriority',
      label: 'Task Priorities',
      menu: 'Task Priorities',
      exporterFileName: 'exportacion_taskPriority',
      list: {
        menu: 'Task Priorities',
        title: 'Task Priorities',
      },
      create: {
        success: 'Task Priority guardado con éxito',
      },
      update: {
        success: 'Task Priority guardado con éxito',
      },
      destroy: {
        success: 'Task Priority eliminado con éxito',
      },
      destroyAll: {
        success: 'Task Priority(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Task Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Task Priority',
      },
      view: {
        title: 'Ver Task Priority',
      },
      importer: {
        title: 'Importar Task Priorities',
        fileName: 'taskPriority_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    taskList: {
      name: 'taskList',
      label: 'Task Lists',
      menu: 'Task Lists',
      exporterFileName: 'exportacion_taskList',
      list: {
        menu: 'Task Lists',
        title: 'Task Lists',
      },
      create: {
        success: 'Task List guardado con éxito',
      },
      update: {
        success: 'Task List guardado con éxito',
      },
      destroy: {
        success: 'Task List eliminado con éxito',
      },
      destroyAll: {
        success: 'Task List(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Task List',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        taskdisplaycolor: 'Display Color',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Task List',
      },
      view: {
        title: 'Ver Task List',
      },
      importer: {
        title: 'Importar Task Lists',
        fileName: 'taskList_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    qaLibrary: {
      name: 'qaLibrary',
      label: 'Q&A Library',
      menu: 'Q&A Library',
      exporterFileName: 'qaLibrary_export',
      list: {
        menu: 'Preguntas & Respuestas Library',
        title: 'Preguntas & Respuestas Library',
      },
      create: {
        success: 'Q&A Library guardado con éxito',
      },
      update: {
        success: 'Q&A Library guardado con éxito',
      },
      destroy: {
        success: 'Q&A Library eliminado con éxito',
      },
      destroyAll: {
        success: 'Q&A Library(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Q&A Library',
      },
      fields: {
        id: 'Id',
        question: 'Pregunta',
        answer: 'Respuesta',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
        aiKnowledgebase: 'AI Knowledgebase',
        expirationDate: 'Fecha de Caducidad',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Q&A Library',
      },
      view: {
        title: 'Ver Q&A Library',
      },
      importer: {
        title: 'Importar Q&A Library',
        fileName: 'qaLibrary_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    note: {
      name: 'note',
      label: 'Notes',
      menu: 'Notes',
      exporterFileName: 'exportacion_note',
      list: {
        menu: 'Notes',
        title: 'Notes',
      },
      create: {
        success: 'Note guardado con éxito',
      },
      update: {
        success: 'Note guardado con éxito',
      },
      destroy: {
        success: 'Note eliminado con éxito',
      },
      destroyAll: {
        success: 'Note(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Note',
      },
      fields: {
        id: 'Id',
        message: 'Message',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Note',
      },
      view: {
        title: 'Ver Note',
      },
      importer: {
        title: 'Importar Notes',
        fileName: 'note_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    risk: {
      name: 'risk',
      label: 'Risks',
      menu: 'Risk Register',
      info: 'Risk Information',
      exporterFileName: 'exportacion_risk',
      list: {
        menu: 'Risks',
        title: 'Risks',
      },
      create: {
        success: 'Risk guardado con éxito',
      },
      update: {
        success: 'Risk guardado con éxito',
      },
      destroy: {
        success: 'Risk eliminado con éxito',
      },
      destroyAll: {
        success: 'Risk(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Risk',
      },
      view: {
        title: 'Ver Risk',
      },
      importer: {
        title: 'Importar Risks',
        fileName: 'risk_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    riskCategory: {
      name: 'riskCategory',
      label: 'Risk Categories',
      menu: 'Risk Categories',
      exporterFileName: 'exportacion_riskCategory',
      list: {
        menu: 'Risk Categories',
        title: 'Risk Categories',
      },
      create: {
        success: 'Risk Category guardado con éxito',
      },
      update: {
        success: 'Risk Category guardado con éxito',
      },
      destroy: {
        success: 'Risk Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Risk Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Risk Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Risk Category',
      },
      view: {
        title: 'Ver Risk Category',
      },
      importer: {
        title: 'Importar Risk Categories',
        fileName: 'riskCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    product: {
      name: 'product',
      label: 'Products',
      menu: 'Products',
      info: 'Product Information',
      exporterFileName: 'exportacion_product',
      list: {
        menu: 'Products',
        title: 'Products',
      },
      create: {
        success: 'Product guardado con éxito',
      },
      update: {
        success: 'Product guardado con éxito',
      },
      destroy: {
        success: 'Product eliminado con éxito',
      },
      destroyAll: {
        success: 'Product(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Product',
      },
      view: {
        title: 'Ver Product',
      },
      importer: {
        title: 'Importar Products',
        fileName: 'product_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    productCategory: {
      name: 'productCategory',
      label: 'Product Categories',
      menu: 'Product Categories',
      exporterFileName: 'exportacion_productCategory',
      list: {
        menu: 'Product Categories',
        title: 'Product Categories',
      },
      create: {
        success: 'Product Category guardado con éxito',
      },
      update: {
        success: 'Product Category guardado con éxito',
      },
      destroy: {
        success: 'Product Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Product Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Product Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Product Category',
      },
      view: {
        title: 'Ver Product Category',
      },
      importer: {
        title: 'Importar Product Categories',
        fileName: 'productCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    newsArticle: {
      name: 'newsArticle',
      label: 'News',
      menu: 'News',
      exporterFileName: 'exportacion_newsArticle',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News guardado con éxito',
      },
      update: {
        success: 'News guardado con éxito',
      },
      destroy: {
        success: 'News eliminado con éxito',
      },
      destroyAll: {
        success: 'News(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo News',
      },
      view: {
        title: 'Ver News',
      },
      importer: {
        title: 'Importar News',
        fileName: 'newsArticle_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    newsFavorite: {
      name: 'newsFavorite',
      label: 'Favorites',
      menu: 'Favorites',
      exporterFileName: 'exportacion_newsFavorite',
      list: {
        menu: 'Favorites',
        title: 'Favorites',
      },
      create: {
        success: 'Favorite guardado con éxito',
      },
      update: {
        success: 'Favorite guardado con éxito',
      },
      destroy: {
        success: 'Favorite eliminado con éxito',
      },
      destroyAll: {
        success: 'Favorite(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Favorite',
      },
      fields: {
        id: 'Id',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Favorite',
      },
      view: {
        title: 'Ver Favorite',
      },
      importer: {
        title: 'Importar Favorites',
        fileName: 'newsFavorite_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    tag: {
      name: 'tag',
      label: 'Tags',
      menu: 'Tags',
      exporterFileName: 'exportacion_tag',
      list: {
        menu: 'Tags',
        title: 'Tags',
      },
      create: {
        success: 'Tag guardado con éxito',
      },
      update: {
        success: 'Tag guardado con éxito',
      },
      destroy: {
        success: 'Tag eliminado con éxito',
      },
      destroyAll: {
        success: 'Tag(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Tag',
      },
      fields: {
        id: 'Id',
        tag: 'Tag',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Tag',
      },
      view: {
        title: 'Ver Tag',
      },
      importer: {
        title: 'Importar Tags',
        fileName: 'tag_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    policyTemplate: {
      name: 'policyTemplate',
      label: 'Policy Templates',
      menu: 'Policy Templates',
      exporterFileName: 'exportacion_policyTemplate',
      list: {
        menu: 'Policy Templates',
        title: 'Policy Templates',
      },
      create: {
        success: 'Policy Template guardado con éxito',
      },
      update: {
        success: 'Policy Template guardado con éxito',
      },
      destroy: {
        success: 'Policy Template eliminado con éxito',
      },
      destroyAll: {
        success: 'Policy Template(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Policy Template',
      },
      view: {
        title: 'Ver Policy Template',
      },
      importer: {
        title: 'Importar Policy Templates',
        fileName: 'policyTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    policy: {
      name: 'policy',
      label: 'Policies',
      menu: 'Policies',
      exporterFileName: 'exportacion_policy',
      list: {
        menu: 'Policies',
        title: 'Policies',
      },
      create: {
        success: 'Policy guardado con éxito',
      },
      update: {
        success: 'Policy guardado con éxito',
      },
      destroy: {
        success: 'Policy eliminado con éxito',
      },
      destroyAll: {
        success: 'Policy(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Policy',
      },
      view: {
        title: 'Ver Policy',
      },
      importer: {
        title: 'Importar Policies',
        fileName: 'policy_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    vorAI: {
      name: 'questionaire',
      label: 'Questionaire',
      menu: 'Questionaire',
      title: 'Questionaire',
      buttons: {
        downloadExcelTemplate:
          'Descargar Plantilla de Excel',
        submitExtraction: 'Extraer preguntas',
        answerQuestions: 'Responder Preguntas',
        generateDocument: 'Generar Q&A Documento',
        trainStatus: 'Estado del Tren',
        uploadAndTrain: 'Subir & Tren',
      },
      enumerators: {
        models: {
          'gpt-4': 'GPT-4',
          'gpt-35-turbo': 'GPT-3.5',
        },
      },
      fields: {
        answer: 'Respuesta',
        apiBearerToken: 'API Bearer Token',
        apiURL: 'API URL',
        attachment: 'Adjunto',
        engine: 'Motor',
        frequencyPenalty: 'Penalización Frecuencia',
        maxTokens: 'Max Tokens',
        method: 'Method',
        presencePenalty: 'Penalización Presencia',
        prompt: 'Prompt',
        promptFiles: 'Word Documento',
        promptFileText: 'Prompt Archivo Texto',
        question: 'Pregunta',
        responseFromAPIService:
          'Respuesta del Servicio API',
        stopSequence: 'Detener Secuencia',
        temperature: 'Temperatura',
        topP: 'Top P',
      },
      importer: {
        fileName: 'VOR_AI_QA_template',
      },
      status: {
        submit: {
          started: 'Empezar a enviar',
          success: 'Enviado exitosamente',
          error: 'Ocurrió un error al enviar',
          files: 'Subiendo archivo(s) de entrenamiento',
          fineTunes: 'Aprender de un conjunto(s) de datos',
          status: 'Comprobar el estado del entrenamiento',
          submitExtractions: 'Envío de extracciones',
          completions:
            'Obtener la finalización(s) prevista',
          submits: 'Obteniendo respuesta',
        },
      },
      modal: {
        noQALibrary:
          'La biblioteca de preguntas y respuestas no tiene preguntas y respuestas elegibles para la IA.',
      },
    },

    campaign: {
      name: 'campaign',
      label: 'Campaigns',
      menu: 'Campaigns',
      exporterFileName: 'exportacion_campaign',
      list: {
        menu: 'Campaigns',
        title: 'Campaigns',
      },
      create: {
        success: 'Campaign guardado con éxito',
      },
      update: {
        success: 'Campaign guardado con éxito',
      },
      destroy: {
        success: 'Campaign eliminado con éxito',
      },
      destroyAll: {
        success: 'Campaign(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Campaign',
      },
      view: {
        title: 'Ver Campaign',
      },
      importer: {
        title: 'Importar Campaigns',
        fileName: 'campaign_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    campaignInstance: {
      name: 'campaignInstance',
      label: 'CampaignInstances',
      menu: 'CampaignInstances',
      exporterFileName: 'exportacion_campaignInstance',
      list: {
        menu: 'CampaignInstances',
        title: 'CampaignInstances',
      },
      create: {
        success: 'Campaign Instance guardado con éxito',
      },
      update: {
        success: 'Campaign Instance guardado con éxito',
      },
      destroy: {
        success: 'Campaign Instance eliminado con éxito',
      },
      destroyAll: {
        success: 'Campaign Instance(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Campaign Instance',
      },
      view: {
        title: 'Ver Campaign Instance',
      },
      importer: {
        title: 'Importar CampaignInstances',
        fileName: 'campaignInstance_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    campaignInstanceEmails: {
      name: 'campaignInstanceEmails',
      label: 'CampaignInstanceEmails',
      menu: 'CampaignInstanceEmails',
      exporterFileName:
        'exportacion_campaignInstanceEmails',
      list: {
        menu: 'CampaignInstanceEmails',
        title: 'CampaignInstanceEmails',
      },
      create: {
        success: 'Emails guardado con éxito',
      },
      update: {
        success: 'Emails guardado con éxito',
      },
      destroy: {
        success: 'Emails eliminado con éxito',
      },
      destroyAll: {
        success: 'Emails(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Emails',
      },
      view: {
        title: 'Ver Emails',
      },
      importer: {
        title: 'Importar CampaignInstanceEmails',
        fileName: 'campaignInstanceEmails_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    emailTemplate: {
      name: 'emailTemplate',
      label: 'Email Templates',
      menu: 'Email Templates',
      exporterFileName: 'exportacion_emailTemplate',
      list: {
        menu: 'Email Templates',
        title: 'Email Templates',
      },
      create: {
        success: 'Email Template guardado con éxito',
      },
      update: {
        success: 'Email Template guardado con éxito',
      },
      destroy: {
        success: 'Email Template eliminado con éxito',
      },
      destroyAll: {
        success: 'Email Template(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Email Template',
      },
      view: {
        title: 'Ver Email Template',
      },
      importer: {
        title: 'Importar Email Templates',
        fileName: 'emailTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    questionnaireTemplate: {
      name: 'questionnaireTemplate',
      label: 'Questionnaire Templates',
      menu: 'Questionnaire Templates',
      exporterFileName: 'exportacion_questionnaireTemplate',
      list: {
        menu: 'Questionnaire Templates',
        title: 'Questionnaire Templates',
      },
      create: {
        success:
          'Questionnaire Template guardado con éxito',
      },
      update: {
        success:
          'Questionnaire Template guardado con éxito',
      },
      destroy: {
        success:
          'Questionnaire Template eliminado con éxito',
      },
      destroyAll: {
        success:
          'Questionnaire Template(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Questionnaire Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        totalQuestionsRange: 'Total Questions',
        totalQuestions: 'Total Questions',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Questionnaire Template',
      },
      view: {
        title: 'Ver Questionnaire Template',
      },
      importer: {
        title: 'Importar Questionnaire Templates',
        fileName: 'questionnaireTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    client: {
      name: 'client',
      label: 'Clients',
      menu: 'Clients',
      exporterFileName: 'exportacion_client',
      list: {
        menu: 'Clients',
        title: 'Clients',
      },
      create: {
        success: 'Client guardado con éxito',
      },
      update: {
        success: 'Client guardado con éxito',
      },
      destroy: {
        success: 'Client eliminado con éxito',
      },
      destroyAll: {
        success: 'Client(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Client',
      },
      view: {
        title: 'Ver Client',
      },
      importer: {
        title: 'Importar Clients',
        fileName: 'client_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    clientCategory: {
      name: 'clientCategory',
      label: 'Client Categories',
      menu: 'Client Categories',
      exporterFileName: 'exportacion_clientCategory',
      list: {
        menu: 'Client Categories',
        title: 'Client Categories',
      },
      create: {
        success: 'Client Category guardado con éxito',
      },
      update: {
        success: 'Client Category guardado con éxito',
      },
      destroy: {
        success: 'Client Category eliminado con éxito',
      },
      destroyAll: {
        success: 'Client Category(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Client Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Client Category',
      },
      view: {
        title: 'Ver Client Category',
      },
      importer: {
        title: 'Importar Client Categories',
        fileName: 'clientCategory_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programTemplate: {
      name: 'programTemplate',
      label: 'Program Templates',
      menu: 'Program Templates',
      exporterFileName: 'exportacion_programTemplate',
      list: {
        menu: 'Program Templates',
        title: 'Program Templates',
      },
      create: {
        success: 'Program Template guardado con éxito',
      },
      update: {
        success: 'Program Template guardado con éxito',
      },
      destroy: {
        success: 'Program Template eliminado con éxito',
      },
      destroyAll: {
        success: 'Program Template(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Program Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Program Template',
      },
      view: {
        title: 'Ver Program Template',
      },
      importer: {
        title: 'Importar Program Templates',
        fileName: 'programTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programRequirementTemplate: {
      name: 'programRequirementTemplate',
      label: 'Requirement Templates',
      menu: 'Requirement Templates',
      exporterFileName:
        'exportacion_programRequirementTemplate',
      list: {
        menu: 'Requirement Templates',
        title: 'Requirement Templates',
      },
      create: {
        success: 'Requirement Template guardado con éxito',
      },
      update: {
        success: 'Requirement Template guardado con éxito',
      },
      destroy: {
        success: 'Requirement Template eliminado con éxito',
      },
      destroyAll: {
        success:
          'Requirement Template(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Requirement Template',
      },
      view: {
        title: 'Ver Requirement Template',
      },
      importer: {
        title: 'Importar Requirement Templates',
        fileName:
          'programRequirementTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programRequirementGuidanceTemplate: {
      name: 'programRequirementGuidanceTemplate',
      label: 'Requirement Guidances',
      menu: 'Requirement Guidances',
      exporterFileName:
        'exportacion_programRequirementGuidanceTemplate',
      list: {
        menu: 'Requirement Guidances',
        title: 'Requirement Guidances',
      },
      create: {
        success: 'Requirement Guidance guardado con éxito',
      },
      update: {
        success: 'Requirement Guidance guardado con éxito',
      },
      destroy: {
        success: 'Requirement Guidance eliminado con éxito',
      },
      destroyAll: {
        success:
          'Requirement Guidance(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Requirement Guidance',
      },
      view: {
        title: 'Ver Requirement Guidance',
      },
      importer: {
        title: 'Importar Requirement Guidances',
        fileName:
          'programRequirementGuidanceTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programControlTemplate: {
      name: 'programControlTemplate',
      label: 'Control Templates',
      menu: 'Control Templates',
      exporterFileName:
        'exportacion_programControlTemplate',
      list: {
        menu: 'Control Templates',
        title: 'Control Templates',
      },
      create: {
        success: 'Control Template guardado con éxito',
      },
      update: {
        success: 'Control Template guardado con éxito',
      },
      destroy: {
        success: 'Control Template eliminado con éxito',
      },
      destroyAll: {
        success: 'Control Template(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Control Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        requirementTemplates: 'Requirement Templates',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Control Template',
      },
      view: {
        title: 'Ver Control Template',
      },
      importer: {
        title: 'Importar Control Templates',
        fileName: 'programControlTemplate_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    program: {
      name: 'program',
      label: 'Programs',
      menu: 'Programs',
      exporterFileName: 'exportacion_program',
      list: {
        menu: 'Programs',
        title: 'Programs',
      },
      create: {
        success: 'Program guardado con éxito',
      },
      update: {
        success: 'Program guardado con éxito',
      },
      destroy: {
        success: 'Program eliminado con éxito',
      },
      destroyAll: {
        success: 'Program(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Program',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo Program',
      },
      view: {
        title: 'Ver Program',
      },
      importer: {
        title: 'Importar Programs',
        fileName: 'program_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programRequirement: {
      name: 'programRequirement',
      label: 'Requirements',
      menu: 'Requirements',
      exporterFileName: 'exportacion_programRequirement',
      list: {
        menu: 'Requirements',
        title: 'Requirements',
      },
      create: {
        success: 'Requirement guardado con éxito',
      },
      update: {
        success: 'Requirement guardado con éxito',
      },
      destroy: {
        success: 'Requirement eliminado con éxito',
      },
      destroyAll: {
        success: 'Requirement(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Requirement',
      },
      view: {
        title: 'Ver Requirement',
      },
      importer: {
        title: 'Importar Requirements',
        fileName: 'programRequirement_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    programControl: {
      name: 'programControl',
      label: 'Controls',
      menu: 'Controls',
      exporterFileName: 'exportacion_programControl',
      list: {
        menu: 'Controls',
        title: 'Controls',
      },
      create: {
        success: 'Control guardado con éxito',
      },
      update: {
        success: 'Control guardado con éxito',
      },
      destroy: {
        success: 'Control eliminado con éxito',
      },
      destroyAll: {
        success: 'Control(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Control',
      },
      view: {
        title: 'Ver Control',
      },
      importer: {
        title: 'Importar Controls',
        fileName: 'programControl_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    userGroup: {
      name: 'userGroup',
      label: 'User Groups',
      menu: 'User Groups',
      exporterFileName: 'exportacion_userGroup',
      list: {
        menu: 'User Groups',
        title: 'User Groups',
      },
      create: {
        success: 'User Group guardado con éxito',
      },
      update: {
        success: 'User Group guardado con éxito',
      },
      destroy: {
        success: 'User Group eliminado con éxito',
      },
      destroyAll: {
        success: 'User Group(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
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
        title: 'Nuevo User Group',
      },
      view: {
        title: 'Ver User Group',
      },
      importer: {
        title: 'Importar User Groups',
        fileName: 'userGroup_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    project: {
      name: 'project',
      label: 'Projects',
      menu: 'Projects',
      exporterFileName: 'exportacion_project',
      list: {
        menu: 'Projects',
        title: 'Projects',
      },
      create: {
        success: 'Project guardado con éxito',
      },
      update: {
        success: 'Project guardado con éxito',
      },
      destroy: {
        success: 'Project eliminado con éxito',
      },
      destroyAll: {
        success: 'Project(s) eliminado con éxito',
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
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Project',
      },
      view: {
        title: 'Ver Project',
      },
      importer: {
        title: 'Importar Projects',
        fileName: 'project_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    projectPriority: {
      name: 'projectPriority',
      label: 'Project Priorities',
      menu: 'Project Priorities',
      exporterFileName: 'exportacion_projectPriority',
      list: {
        menu: 'Project Priorities',
        title: 'Project Priorities',
      },
      create: {
        success: 'Project Priority guardado con éxito',
      },
      update: {
        success: 'Project Priority guardado con éxito',
      },
      destroy: {
        success: 'Project Priority eliminado con éxito',
      },
      destroyAll: {
        success: 'Project Priority(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Project Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Project Priority',
      },
      view: {
        title: 'Ver Project Priority',
      },
      importer: {
        title: 'Importar Project Priorities',
        fileName: 'projectPriority_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    projectStatus: {
      name: 'projectStatus',
      label: 'Project Statuses',
      menu: 'Project Statuses',
      exporterFileName: 'exportacion_projectStatus',
      list: {
        menu: 'Project Statuses',
        title: 'Project Statuses',
      },
      create: {
        success: 'Project Status guardado con éxito',
      },
      update: {
        success: 'Project Status guardado con éxito',
      },
      destroy: {
        success: 'Project Status eliminado con éxito',
      },
      destroyAll: {
        success: 'Project Status(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Project Status',
      },
      fields: {
        id: 'Id',
        status: 'Status',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Project Status',
      },
      view: {
        title: 'Ver Project Status',
      },
      importer: {
        title: 'Importar Project Statuses',
        fileName: 'projectStatus_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },

    projectType: {
      name: 'projectType',
      label: 'Project Types',
      menu: 'Project Types',
      exporterFileName: 'exportacion_projectType',
      list: {
        menu: 'Project Types',
        title: 'Project Types',
      },
      create: {
        success: 'Project Type guardado con éxito',
      },
      update: {
        success: 'Project Type guardado con éxito',
      },
      destroy: {
        success: 'Project Type eliminado con éxito',
      },
      destroyAll: {
        success: 'Project Type(s) eliminado con éxito',
      },
      edit: {
        title: 'Editar Project Type',
      },
      fields: {
        id: 'Id',
        type: 'Type',
        createdAt: 'Creado el',
        updatedAt: 'Actualizado el',
        createdAtRange: 'Creado el',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Nuevo Project Type',
      },
      view: {
        title: 'Ver Project Type',
      },
      importer: {
        title: 'Importar Project Types',
        fileName: 'projectType_import_template',
        hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio.',
      },
    },
  },
  auth: {
    tenants: 'Espacios de trabajo',
    profile: {
      title: 'Perfil',
      success: 'Perfil actualizado con éxito',
    },
    createAnAccount: 'Crea una cuenta',
    rememberMe: 'Recuérdame',
    forgotPassword: 'Se te olvidó tu contraseña',
    signin: 'Iniciar Sesión',
    signup: 'Registrarse',
    signout: 'Desconectar',
    alreadyHaveAnAccount:
      '¿Ya tienes una cuenta? Registrarse.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Inicia sesión con otra cuenta',
    passwordChange: {
      title: 'Cambia la contraseña',
      success: 'Contraseña cambiada correctamente',
      mustMatch: 'Las contraseñas deben coincidir',
    },
    emailUnverified: {
      message:
        'Confirme su correo electrónico en <strong>{0}</strong> para continuar.',
      submit: 'Reenviar verificación de correo electrónico',
    },
    emptyPermissions: {
      message:
        'Aún no tienes permisos. Espera a que el administrador te otorgue privilegios.',
    },
    passwordResetEmail: {
      message:
        'Enviar contraseña restablecer correo electrónico',
      error: 'Correo electrónico no reconocido',
    },
    passwordReset: {
      message: 'Restablecer la contraseña',
    },
    emailAddressVerificationEmail: {
      error: 'Correo electrónico no reconocido',
    },
    verificationEmailSuccess:
      'Correo electrónico de verificación enviado con éxito',
    passwordResetEmailSuccess:
      'Correo electrónico de restablecimiento de contraseña enviado correctamente',
    passwordResetSuccess:
      'Contraseña cambiada correctamente',
    verifyEmail: {
      success: 'Correo electrónico verificado con éxito.',
      message:
        'Solo un momento, su correo electrónico está siendo verificado ...',
    },
  },
  tenant: {
    name: 'inquilino',
    label: 'Espacios de trabajo',
    menu: 'Espacios de trabajo',
    list: {
      menu: 'Espacios de trabajo',
      title: 'Espacios de trabajo',
    },
    create: {
      button: 'Crear espacio de trabajo',
      success: 'Espacio de trabajo guardado correctamente',
    },
    update: {
      success: 'Espacio de trabajo guardado correctamente',
    },
    destroy: {
      success: 'Espacio de trabajo eliminado correctamente',
    },
    destroyAll: {
      success:
        'Espacio(s) de trabajo eliminado(s) correctamente',
    },
    edit: {
      title: 'Editar espacio de trabajo',
    },
    fields: {
      id: 'Id',
      name: 'Nombre',
      url: 'URL',
      tenantName: 'Nombre del espacio de trabajo',
      tenantId: 'Espacio de trabajo',
      tenantUrl: 'URL del espacio de trabajo',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'Nuevo espacio de trabajo',
    },
    invitation: {
      view: 'Ver invitaciones',
      invited: 'Invitado',
      accept: 'Aceptar la invitacion',
      decline: 'Rechazar invitación',
      declined: 'Invitación rechazada con éxito',
      acceptWrongEmail:
        'Aceptar invitación con este correo electrónico',
    },
    select: 'Seleccionar espacio de trabajo',
    validation: {
      url: 'La URL de su espacio de trabajo solo puede contener letras minúsculas, números y guiones (y debe comenzar con una letra o número).',
    },
  },
  roles: {
    admin: {
      label: 'Administración',
      description: 'Acceso total a todos los recursos.',
    },
    custom: {
      label: 'Rol personalizado',
      description: 'Acceso personalizado a recursos',
    },
  },
  user: {
    invite: 'Invitación',
    title: 'Usuarios',
    menu: 'Usuarios',
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Nombre completo',
      firstName: 'Nombre',
      lastName: 'Apellido',
      status: 'Estado',
      disabled: 'Discapacitado',
      phoneNumber: 'Número de teléfono',
      role: 'Rol',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
      roleUser: 'Rol/Usuario',
      roles: 'Roles',
      createdAtRange: 'Creado el',
      password: 'Contraseña',
      rememberMe: 'Recuérdame',
      oldPassword: 'Contraseña anterior',
      newPassword: 'Nueva contraseña',
      newPasswordConfirmation:
        'Nueva confirmación de contraseña',
    },
    enabled: 'Habilitado',
    disabled: 'Discapacitado',
    validations: {
      // eslint-disable-next-line
      email: 'El correo electrónico ${value} no es válido',
    },
    disable: 'Inhabilitar',
    enable: 'Habilitar',
    doEnableSuccess: 'Usuario habilitado con éxito',
    doDisableSuccess: 'Usuario deshabilitado con éxito',
    doDisableAllSuccess:
      'Usuario(s) deshabilitado con éxito',
    doEnableAllSuccess:
      'Usuario(s) habilitados correctamente',
    doAddSuccess: 'Usuario(s) guardado correctamente',
    doUpdateSuccess: 'Usuario guardado con éxito',
    status: {
      active: 'Activo',
      invited: 'Invitado',
      'empty-permissions': 'Esperando permisos',
    },
    exporterFileName: 'usuarios_exportacion',
    doDestroySuccess: 'Usuario eliminado con éxito',
    doDestroyAllSelectedSuccess:
      'Usuario(s) eliminado correctamente',
    edit: {
      title: 'Editar Usuario',
    },
    new: {
      title: 'Invitar Usuario(s)',
      titleModal: 'Nuevo Usuario',
      emailsHint:
        'Separe varias direcciones de correo electrónico utilizando el carácter de coma.',
    },
    view: {
      title: 'Ver Usuario',
      activity: 'Actividad',
    },
    importer: {
      title: 'Importar Usuarios',
      fileName: 'users_import_template',
      hint: 'Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio. Las relaciones deben ser la ID de los registros referenciados separados por espacio. Los roles deben ser los identificadores de roles separados por espacio.',
    },
    errors: {
      userAlreadyExists:
        'El usuario con este correo electrónico ya existe',
      userNotFound: 'Usuario no encontrado',
      disablingHimself: 'No puedes inhabilitarte',
      revokingOwnPermission:
        'No puede revocar su propio permiso de administrador',
    },
  },
  plan: {
    menu: 'Planes',
    title: 'Planes',
    free: {
      label: 'Gratis',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Crecimiento',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Empresa',
      price: '50',
      unit: '$',
    },
    pricingPeriod: 'mes',
    current: 'Plan Actual',
    subscribe: 'Suscribir',
    manage: 'Administrar Suscripción',
    cancelAtPeriodEnd:
      'Este plan se cancelará al final del período.',
    somethingWrong:
      'Hay algo mal con su suscripción. Vaya a administrar la suscripción para obtener más detalles.',
    notPlanUser:
      'No eres el administrador de esta suscripción.',
    demoHintHtml:
      'Sugerencia: Use esas <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">tarjetas de prueba</a> para la demostración.',
  },
  auditLog: {
    menu: 'Registros de auditoría',
    title: 'Registros de auditoría',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separe varias entidades con el carácter de coma.',
    fields: {
      id: 'Id',
      timestampRange: 'Período',
      entityName: 'Entidad',
      entityNames: 'Entidades',
      entityId: 'ID de entidad',
      action: 'Acción',
      values: 'Valores',
      timestamp: 'Fecha',
      createdByEmail: 'Email del usuario',
    },
  },
  settings: {
    title: 'Configuraciones',
    tenant: 'Tenant',
    menu: 'Configuraciones',
    save: {
      success:
        'Configuración guardada con éxito. La página se volverá a cargar en {0} segundos para que los cambios surtan efecto.',
    },
    fields: {
      primary: 'Color primario',
      secondary: 'Color secundario',
      logos: 'Logo',
      backgroundImages: 'Imágenes de fondo',
      shade: 'Sombra',
    },
  },
  dashboard: {
    menu: 'Tablero',
    message:
      'Esta página utiliza datos falsos solo con fines de demostración. Puede editarlo en frontend/view/dashboard/DashboardPage.ts.',
    charts: {
      day: 'Día',
      red: 'Rojo',
      green: 'Verde',
      yellow: 'Amarillo',
      grey: 'Gris',
      blue: 'Azul',
      orange: 'Naranja',
      months: {
        '1': 'Enero',
        '2': 'Febrero',
        '3': 'Marzo',
        '4': 'Abril',
        '5': 'Mayo',
        '6': 'Junio',
        '7': 'Julio',
      },
      eating: 'Comiendo',
      drinking: 'Bebiendo',
      sleeping: 'Dormiendo',
      designing: 'Diseñando',
      coding: 'Codificando',
      cycling: 'Pedalando',
      running: 'Corriendo',
      customer: 'Cliente',
    },
  },
  errors: {
    '403': 'Lo sentimos, no tienes acceso a esta página',
    '404': 'Lo sentimos, la página que visitaste no existe',
    '500': 'Lo sentimos, el servidor informa un error',
    '429':
      'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
    backToHome: 'Volver a Inicio',
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
    defaultErrorMessage: 'Ops, ocurrió un error',
  },

  preview: {
    error:
      'Lo sentimos, esta operación no está permitida en el modo de vista previa.',
  },

  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} no es válido',
      required: '${path} es obligatorio',
      oneOf:
        '${path} debe ser uno de los siguientes valores: ${values}',
      notOneOf:
        '${path} no debe ser uno de los siguientes valores: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} debe ser un ${type}`;
      },
    },
    string: {
      length:
        '${path} debe tener exactamente ${length} caracteres',
      min: '${path} debe tener al menos ${min} caracteres',
      max: '${path} debe tener como máximo ${max} caracteres',
      matches:
        '${path} debe coincidir con lo siguiente: "${regex}"',
      email:
        '${path} debe ser un correo electrónico válido',
      url: '${path} debe ser una URL válida',
      trim: '${path} debe ser una cadena recortada',
      lowercase:
        '${path} debe ser una cadena en minúsculas',
      uppercase: '${path} debe ser una cadena en mayúscula',
      selected: '${path} debe estar seleccionado',
    },
    number: {
      min: '${path} debe ser mayor o igual que ${min}',
      max: '${path} debe ser menor o igual que ${max}',
      lessThan: '${path} debe ser menor que ${less}',
      moreThan: '${path} debe ser mayor que ${more}',
      notEqual: '${path} no debe ser igual a ${notEqual}',
      positive: '${path} debe ser un número positivo',
      negative: '${path} debe ser un número negativo',
      integer: '${path} debe ser un número entero',
    },
    date: {
      min: 'El campo ${path} debe ser posterior a ${min}',
      max: 'El campo ${path} debe ser anterior a ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        'El campo ${path} no puede tener claves no especificadas en la forma del objeto',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} es obligatorio`
          : `'El campo ${path} debe tener al menos ${min} elementos`,
      max: 'El campo ${path} debe tener elementos menores o iguales a ${max}',
    },
  },
  fileUploader: {
    upload: 'Subir',
    image: 'Debes subir una imagen',
    size: 'El archivo es muy grande. El tamaño máximo permitido es {0}',
    formats: 'Formato inválido. Debe ser uno de: {0}.',
  },
  importer: {
    line: 'Línea',
    status: 'Estado',
    pending: 'Pendiente',
    imported: 'Importado',
    error: 'Error',
    total: '{0} importado, {1} pendiente y {2} con error',
    importedMessage: 'Procesado {0} de {1}.',
    noNavigateAwayMessage:
      'No navegue fuera de esta página o la importación se detendrá.',
    completed: {
      success:
        'Importación completada. Todas las filas se importaron correctamente.',
      someErrors:
        'Procesamiento completado, pero algunas filas no se pudieron importar.',
      allErrors:
        'Importación fallida. No hay filas válidas.',
    },
    form: {
      downloadTemplate: 'Descargar la plantilla',
      hint: 'Haga clic o arrastre el archivo a esta área para continuar.',
    },
    list: {
      discardConfirm:
        '¿Estás seguro? Los datos no importados se perderán.',
    },
    errors: {
      invalidFileEmpty: 'El archivo esta vacio',
      invalidFileExcel:
        'Solo se permiten archivos de Excel(.xlsx)',
      invalidFileUpload:
        'Archivo inválido. Asegúrese de estar utilizando la última versión de la plantilla.',
      importHashRequired: 'Se requiere hash de importación',
      importHashExistent:
        'Los datos ya han sido importados',
    },
  },

  autocomplete: {
    loading: 'Cargando...',
    noOptions: 'Datos no encontrados',
  },
  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },
  imagesViewer: {
    noImage: 'Sin imágen',
  },
  table: {
    noData: 'No se encontraron registros',
    loading: 'Cargando...',
  },
  pagination: {
    labelDisplayedRows: '{0}-{1} de {2}',
    labelRowsPerPage: 'Por página:',
  },
};

export default es;

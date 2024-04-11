const newsettingmenu = {
  general: {
    title: 'General',
    subcribemenu:{
      Note: "Notes",
      Tag: "Tags",
      Audit_Log: "Adit Logs",

    }
  },
  task: {
    title: 'Tasks',
    subcribemenu:{
      task_prioritie:'Task Priorities',
      task_list:'Task Lists',
    }
  },
  risk: {
    title: 'Risk',
    subcribemenu:{
      risk_category:'Risk Categories',
    }
  },
  project: {
    title: 'Projects',
    subcribemenu:{
      project_priorities:'Project Priorities',
      project_statuses:'Project Statuses',
      project_type:'Project Type',
    }
  },
  vendor: {
    title: 'Venders',
    subcribemenu:{
      vender_category:'Vender Categories',
    }
  },
  client: {
    title: 'Client',
    subcribemenu:{
      client_categories:'Client Categories',
    }
  }
}
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

const en = {
  common: {
    activate: 'Activate',
    add: 'Add',
    areYouSure: 'Are you sure?',
    doYouContinue: 'Are you sure you want to continue?',
    back: 'Back',
    boolean: {
      false: 'No',
      true: 'Yes',
    },
    cancel: 'Cancel',
    clone: 'Clone',
    close: 'Close',
    codes: 'Codes',
    continue: 'Continue',
    createdAt: 'Created At',
    createdBy: 'Created By',
    deactivate: 'Deactivate',
    destroy: 'Delete',
    discard: 'Discard',
    download: 'Download',
    edit: 'Edit',
    end: 'End',
    exit: 'Exit',
    export: 'Export to Excel',
    exportToJSON: 'Export to JSON',
    filters: 'Filters',
    grid: 'Grid',
    import: 'Import',
    keywords: 'Keywords',
    list: 'List',
    more: 'More',
    move: {
      up: 'Move Up',
      down: 'Move Down',
    },
    mustSelectARow: 'Must select a row',
    new: 'New',
    next: 'Next',
    no: 'No',
    noDataToExport: 'No data to export',
    ok: 'OK',
    or: 'or',
    outOf: ' out of ',
    pause: 'Pause',
    preview: 'Preview',
    publish: 'Publish',
    refresh: 'Refresh',
    reload: 'Reload',
    reset: 'Reset',
    save: 'Save',
    saveAndExit: 'Save & Exit',
    search: 'Search',
    seeMore: 'See More',
    select: 'Select',
    selectAll: 'Select All',
    selectNone: 'Select None',
    send: 'Send',
    settings: 'Settings',
    start: 'Start',
    submit: 'Submit',
    untitled: 'Untitled',
    upload: 'Upload',
    view: 'View',
    yes: 'Yes',
    links: 'Links',
    show: 'Show',
    hide: 'Hide',
    askAthena: 'Copilot',
    showAllUsers: 'Show All Users',
    showOnlyGroupUsers: 'Show Only Group Users',
    showAllUserGroups: 'Show All User Groups',
    showOnlyAssignedGroups: 'Show Only Assigned Groups',
  },

  app: {
    title: 'VOR | GRC - Informed Awareness',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Material UI Configurator',
      description: 'See our dashboard options.',
      sidenavColor: 'Colors',
      sidenavType: {
        title: 'Sidenav Type',
        description:
          'Choose between different sidenav types.',
        dark: 'Dark',
        transparent: 'Transparent',
        white: 'white',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Light / Dark',
    },
    AIConfigurator: {
      title: 'Copilot',
      description:
        'Type your questions in the box below and click Submit.',
      slide: 'Slide',
    },
  },

  collapses: {
    users: {
      menu: 'User Management',
    },
    clients: {
      menu: 'Clients',
    },
    compliance: {
      menu: 'Compliance',
    },
    complianceTemplates: {
      menu: 'Compliance Templates',
    },
    documents: {
      menu: 'Documents',
    },
    reports: {
      menu: 'Reports',
    },
    campaigns: {
      menu: 'Campaigns',
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
    projects: {
      menu: 'Projects',
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
          // title: 'Recurring Task On {0}',
          title: 'Recurring Task',
        },
        edit: {
          title: 'Edit Task',
        },
        new: {
          // title: 'New Task On {0}',
          title: 'New Task',
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
    vendorsSummary: {
      title: 'Vendors',
    },
  },

  entities: {
    vendor: {
      name: 'vendor',
      label: 'Vendors',
      menu: 'Vendor Register',
      info: 'Vendor Information',
      exporterFileName: 'vendor_export',
      list: {
        menu: 'Vendors',
        title: 'Vendors',
      },
      create: {
        success: 'Vendor successfully saved',
      },
      update: {
        success: 'Vendor successfully saved',
      },
      destroy: {
        success: 'Vendor successfully deleted',
      },
      destroyAll: {
        success: 'Vendor(s) successfully deleted',
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
        title: 'Edit Vendor',
      },
      openRisks: '{0} Open Risks',
      openTasks: '{0} Open Tasks',
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        name: 'Name',
        tags: 'Tags',
        status: 'Status',
        category: 'Category',
        rating: 'Rating',
        countryOfIncorporation: 'Country of Incorporation',
        dataProcessed: 'Data Processed',
        industry: 'Industry',
        users: 'Users',
        supportEmail: 'Support Email',
        supportPhoneNumber: 'Support Phone Number',
        infoSecEmail: 'Info Sec Email',
        infoSecPhoneNumber: 'Info Sec Phone Number',
        privacyEmail: 'Privacy Email',
        privacyPhoneNumber: 'Privacy Phone Number',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
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
        title: 'New Vendor',
      },
      view: {
        title: 'View Vendor',
      },
      importer: {
        title: 'Import Vendors',
        fileName: 'vendor_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    vendorCategory: {
      name: 'vendorCategory',
      label: 'Vendor Categories',
      menu: 'Vendor Categories',
      exporterFileName: 'vendorCategory_export',
      list: {
        menu: 'Vendor Categories',
        title: 'Vendor Categories',
      },
      create: {
        success: 'Vendor Category successfully saved',
      },
      update: {
        success: 'Vendor Category successfully saved',
      },
      destroy: {
        success: 'Vendor Category successfully deleted',
      },
      destroyAll: {
        success: 'Vendor Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Vendor Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Vendor Category',
      },
      view: {
        title: 'View Vendor Category',
      },
      importer: {
        title: 'Import Vendor Categories',
        fileName: 'vendorCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Task Register',
      info: 'Task Information',
      instances: 'Task Instances',
      exporterFileName: 'task_export',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task successfully saved',
      },
      update: {
        success: 'Task successfully saved',
      },
      destroy: {
        success: 'Task successfully deleted',
      },
      destroyAll: {
        success: 'Task(s) successfully deleted',
      },
      addToControl:
        'The task was successfully saved. Do you want to add this task to the Control?',
      edit: {
        title: 'Edit Task',
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
        newsArticles: 'News',
        products: 'Products',
        policyTemplates: 'Policy Templates',
        policies: 'Policies',
        highlights: 'Highlights',
        attachments: 'Attachments',
        tags: 'Tags',
        summary: 'Summary',
        requireReviewTasks: 'Require Review Tasks',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        allTasks: 'All Tasks',
        controlTasks: 'Control Tasks',
        nonControlTasks: 'Non-Control Tasks',
        risks: 'Risks',
        vendors: 'Vendors',
        clients: 'Clients',
        controls: 'Controls',
        projects: 'Projects',
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
        summary: {
          open: 'Open',
          overdue: 'Overdue',
          requireReview: 'Require Review',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Task',
      },
      add: {
        title: 'Add Task',
      },
      view: {
        title: 'View Task',
      },
      importer: {
        title: 'Import Tasks',
        fileName: 'task_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    taskPriority: {
      name: 'taskPriority',
      label: 'Task Priorities',
      menu: 'Task Priorities',
      exporterFileName: 'taskPriority_export',
      list: {
        menu: 'Task Priorities',
        title: 'Task Priorities',
      },
      create: {
        success: 'Task Priority successfully saved',
      },
      update: {
        success: 'Task Priority successfully saved',
      },
      destroy: {
        success: 'Task Priority successfully deleted',
      },
      destroyAll: {
        success: 'Task Priority(s) successfully deleted',
      },
      edit: {
        title: 'Edit Task Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Task Priority',
      },
      view: {
        title: 'View Task Priority',
      },
      importer: {
        title: 'Import Task Priorities',
        fileName: 'taskPriority_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    taskList: {
      name: 'taskList',
      label: 'Task Lists',
      menu: 'Task Lists',
      exporterFileName: 'taskList_export',
      list: {
        menu: 'Task Lists',
        title: 'Task Lists',
      },
      create: {
        success: 'Task List successfully saved',
      },
      update: {
        success: 'Task List successfully saved',
      },
      destroy: {
        success: 'Task List successfully deleted',
      },
      destroyAll: {
        success: 'Task List(s) successfully deleted',
      },
      edit: {
        title: 'Edit Task List',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        taskdisplaycolor: 'Display Color',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
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
        title: 'New Task List',
      },
      view: {
        title: 'View Task List',
      },
      importer: {
        title: 'Import Task Lists',
        fileName: 'taskList_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    qaLibrary: {
      name: 'qaLibrary',
      label: 'Q&A Library',
      menu: 'Q&A Library',
      exporterFileName: 'qaLibrary_export',
      list: {
        menu: 'Questions & Answers Library',
        title: 'Questions & Answers Library',
      },
      create: {
        success: 'Q&A Library successfully saved',
      },
      update: {
        success: 'Q&A Library successfully saved',
      },
      destroy: {
        success: 'Q&A Library successfully deleted',
      },
      destroyAll: {
        success: 'Q&A Library(s) successfully deleted',
      },
      edit: {
        title: 'Edit Q&A Library',
      },
      fields: {
        id: 'Id',
        question: 'Question',
        answer: 'Answer',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        aiKnowledgebase: 'AI Knowledgebase',
        expirationDate: 'Expiration Date',
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Q&A Library',
      },
      view: {
        title: 'View Q&A Library',
      },
      importer: {
        title: 'Import Q&A Library',
        fileName: 'qaLibrary_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    note: {
      name: 'note',
      label: 'Notes',
      menu: 'Notes',
      exporterFileName: 'note_export',
      list: {
        menu: 'Notes',
        title: 'Notes',
      },
      create: {
        success: 'Note successfully saved',
      },
      update: {
        success: 'Note successfully saved',
      },
      destroy: {
        success: 'Note successfully deleted',
      },
      destroyAll: {
        success: 'Note(s) successfully deleted',
      },
      edit: {
        title: 'Edit Note',
      },
      fields: {
        id: 'Id',
        message: 'Message',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Note',
      },
      view: {
        title: 'View Note',
      },
      importer: {
        title: 'Import Notes',
        fileName: 'note_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    risk: {
      name: 'risk',
      label: 'Risks',
      menu: 'Risk Register',
      info: 'Risk Information',
      exporterFileName: 'risk_export',
      list: {
        menu: 'Risks',
        title: 'Risks',
      },
      create: {
        success: 'Risk successfully saved',
      },
      update: {
        success: 'Risk successfully saved',
      },
      destroy: {
        success: 'Risk successfully deleted',
      },
      destroyAll: {
        success: 'Risk(s) successfully deleted',
      },
      edit: {
        title: 'Edit Risk',
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
        notes: 'Notes',
        newsArticles: 'News',
        products: 'Products',
        policyTemplates: 'Policy Templates',
        policies: 'Policies',
        highlights: 'Highlights',
        requirements: 'Requirements',
        controls: 'Controls',
        attachments: 'Attachments',
        tasks: 'Tasks',
        tags: 'Tags',
        openRisksOnly: 'Open Risks Only',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        summary: 'Summary',
        vendors: 'Vendors',
        clients: 'Clients',
        projects: 'Projects',
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
        summary: {
          open: 'Open',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Risk',
      },
      add: {
        title: 'Add Risk',
      },
      view: {
        title: 'View Risk',
      },
      importer: {
        title: 'Import Risks',
        fileName: 'risk_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    riskCategory: {
      name: 'riskCategory',
      label: 'Risk Categories',
      menu: 'Risk Categories',
      exporterFileName: 'riskCategory_export',
      list: {
        menu: 'Risk Categories',
        title: 'Risk Categories',
      },
      create: {
        success: 'Risk Category successfully saved',
      },
      update: {
        success: 'Risk Category successfully saved',
      },
      destroy: {
        success: 'Risk Category successfully deleted',
      },
      destroyAll: {
        success: 'Risk Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Risk Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Risk Category',
      },
      view: {
        title: 'View Risk Category',
      },
      importer: {
        title: 'Import Risk Categories',
        fileName: 'riskCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    product: {
      name: 'product',
      label: 'Products',
      menu: 'Marketplace',
      info: 'Product Information',
      exporterFileName: 'product_export',
      list: {
        menu: 'Marketplace',
        title: 'Marketplace',
      },
      create: {
        success: 'Product successfully saved',
      },
      update: {
        success: 'Product successfully saved',
      },
      destroy: {
        success: 'Product successfully deleted',
      },
      destroyAll: {
        success: 'Product(s) successfully deleted',
      },
      edit: {
        title: 'Edit Product',
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
        favorites: 'Show Favorite Products',
        tags: 'Tags',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Product',
      },
      view: {
        title: 'View Product',
      },
      importer: {
        title: 'Import Products',
        fileName: 'product_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addFavorite: 'Add Favorite',
      },
    },

    productCategory: {
      name: 'productCategory',
      label: 'Product Categories',
      menu: 'Product Categories',
      exporterFileName: 'productCategory_export',
      list: {
        menu: 'Product Categories',
        title: 'Product Categories',
      },
      create: {
        success: 'Product Category successfully saved',
      },
      update: {
        success: 'Product Category successfully saved',
      },
      destroy: {
        success: 'Product Category successfully deleted',
      },
      destroyAll: {
        success: 'Product Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Product Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Product Category',
      },
      view: {
        title: 'View Product Category',
      },
      importer: {
        title: 'Import Product Categories',
        fileName: 'productCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    document: {
      name: 'document',
      label: 'Documents',
      menu: 'Repository',
      exporterFileName: 'document_export',
      list: {
        menu: 'Documents',
        title: 'Documents',
      },
      create: {
        success: 'Document successfully saved',
      },
      update: {
        success: 'Document successfully saved',
      },
      destroy: {
        success: 'Document successfully deleted',
      },
      destroyAll: {
        success: 'Document(s) successfully deleted',
      },
      edit: {
        title: 'Edit Document',
      },
      fields: {
        id: 'Id',
        title: 'Attachment Title',
        type: 'Type',
        typeTitle: 'Type Title/Name',
        tags: 'Attachment Tags',
        name: 'Attachment File Name',
        uploader: 'Created By',
        uploadedAt: 'Created at',
        uploadedAtRange: 'Created at',
        size: 'Attachment Size',
        sizeRange: 'Attachment Size',
        extension: 'Attachment Type',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        files: 'Upload Documents',
      },
      enumerators: {
        type: {
          campaign: 'Campaign',
          campaignInstance: 'Questionnaire',
          client: 'Client',
          internal: 'Internal',
          policy: 'Policy',
          programControl: 'Program Control',
          project: 'Project',
          risk: 'Risk',
          task: 'Task',
          taskInstance: 'Task Instance',
          vendor: 'Vendor',
        },
        extension: {
          pdf: 'PDF',
          'doc,docx': 'Word',
          'xls,xlsx': 'Excel',
          csv: 'CSV',
          tsv: 'TSV',
          json: 'JSON',
          jsonl: 'JSONL',
        },
      },
      placeholders: {},
      hints: {},
      view: {
        title: 'View Document',
      },
    },

    highlight: {
      name: 'highlight',
      label: 'Highlights',
      menu: 'Highlights',
      info: 'Highlight Information',
      exporterFileName: 'highlight_export',
      list: {
        menu: 'Highlights',
        title: 'Highlights',
      },
      create: {
        success: 'Highlight successfully saved',
      },
      update: {
        success: 'Highlight successfully saved',
      },
      destroy: {
        success: 'Highlight successfully deleted',
      },
      destroyAll: {
        success: 'Highlight(s) successfully deleted',
      },
      edit: {
        title: 'Edit Highlight',
      },
      fields: {
        id: 'Id',
        title: 'Title',
        source: 'Source',
        description: 'Description',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
      },
      enumerators: {},
      placeholders: {
        noData: 'No highlights found',
      },
      hints: {},
      new: {
        title: 'New Highlight',
      },
      view: {
        title: 'View Highlight',
      },
      importer: {
        title: 'Import Highlight',
        fileName: 'highlight_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
      },
    },

    newsArticle: {
      name: 'newsArticle',
      label: 'News',
      menu: 'News',
      info: 'News Information',
      rss: 'RSS Information',
      exporterFileName: 'newsArticle_export',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News successfully saved',
      },
      update: {
        success: 'News successfully saved',
      },
      destroy: {
        success: 'News successfully deleted',
      },
      destroyAll: {
        success: 'News(s) successfully deleted',
      },
      edit: {
        title: 'Edit News',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        favorites: 'Show Bookmarked News',
        tags: 'Tags',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New News',
      },
      view: {
        title: 'View News',
      },
      importer: {
        title: 'Import News',
        fileName: 'newsArticle_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },

    newsFavorite: {
      name: 'newsFavorite',
      label: 'Favorites',
      menu: 'Favorites',
      exporterFileName: 'newsFavorite_export',
      list: {
        menu: 'Favorites',
        title: 'Favorites',
      },
      create: {
        success: 'Favorite successfully saved',
      },
      update: {
        success: 'Favorite successfully saved',
      },
      destroy: {
        success: 'Favorite successfully deleted',
      },
      destroyAll: {
        success: 'Favorite(s) successfully deleted',
      },
      edit: {
        title: 'Edit Favorite',
      },
      fields: {
        id: 'Id',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Favorite',
      },
      view: {
        title: 'View Favorite',
      },
      importer: {
        title: 'Import Favorites',
        fileName: 'newsFavorite_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    tag: {
      name: 'tag',
      label: 'Tags',
      menu: 'Tags',
      exporterFileName: 'tag_export',
      list: {
        menu: 'Tags',
        title: 'Tags',
      },
      create: {
        success: 'Tag successfully saved',
      },
      update: {
        success: 'Tag successfully saved',
      },
      destroy: {
        success: 'Tag successfully deleted',
      },
      destroyAll: {
        success: 'Tag(s) successfully deleted',
      },
      edit: {
        title: 'Edit Tag',
      },
      fields: {
        id: 'Id',
        tag: 'Tag',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {
        input: 'Add Tags (comma-separated)',
      },
      hints: {},
      new: {
        title: 'New Tag',
      },
      view: {
        title: 'View Tag',
      },
      importer: {
        title: 'Import Tags',
        fileName: 'tag_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    policyTemplate: {
      name: 'policyTemplate',
      label: 'Policy Templates',
      menu: 'Policy Templates',
      info: 'Policy Template Information',
      exporterFileName: 'policyTemplate_export',
      list: {
        menu: 'Policy Templates',
        title: 'Policy Templates',
      },
      create: {
        success: 'Policy Template successfully saved',
      },
      update: {
        success: 'Policy Template successfully saved',
      },
      destroy: {
        success: 'Policy Template successfully deleted',
      },
      destroyAll: {
        success: 'Policy Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Policy Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        lastUpdatedRange: 'Last Updated',
        lastUpdated: 'Last Updated',
        attachment: 'Attachment',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
        favorites: 'Show Bookmarked Policy Templates',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Policy Template',
      },
      view: {
        title: 'View Policy Template',
      },
      importer: {
        title: 'Import Policy Templates',
        fileName: 'policyTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },

    policy: {
      name: 'policy',
      label: 'Policies',
      menu: 'Policies',
      info: 'Policy Information',
      exporterFileName: 'policy_export',
      list: {
        menu: 'Policies',
        title: 'Policies',
      },
      create: {
        success: 'Policy successfully saved',
      },
      update: {
        success: 'Policy successfully saved',
      },
      destroy: {
        success: 'Policy successfully deleted',
      },
      destroyAll: {
        success: 'Editable Policy(s) successfully deleted',
      },
      edit: {
        title: 'Edit Policy',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        type: 'Type',
        description: 'Description',
        versionRange: 'Version',
        version: 'Version',
        lastPublishedDateRange: 'Last Published Date',
        lastPublishedDate: 'Last Published Date',
        publishedBy: 'Published By',
        publishedOn: 'Published on',
        attachment: 'Attachment',
        link: 'Link',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
        favorites: 'Show Bookmarked Policies',
        notes: 'Notes',
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
        title: 'New Policy',
      },
      view: {
        title: 'View Policy',
      },
      importer: {
        title: 'Import Policies',
        fileName: 'policy_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },

    vorAI: {
      name: 'questionaires',
      label: 'Questionaires',
      menu: 'Questionaires',
      title: 'Questionaires',
      buttons: {
        downloadExcelTemplate: 'Download Excel Template',
        submitExtraction: 'Extract Questions',
        answerQuestions: 'Answer Questions',
        generateDocument: 'Generate Q&A Document',
        trainStatus: 'Train Status',
        uploadAndTrain: 'Upload & Train',
      },
      enumerators: {
        models: {
          'gpt-4': 'GPT-4',
          'gpt-35-turbo': 'GPT-3.5',
        },
      },
      fields: {
        answer: 'Answer',
        apiBearerToken: 'API Bearer Token',
        apiURL: 'API URL',
        attachment: 'Attachment',
        engine: 'Engine',
        frequencyPenalty: 'Frequency Penalty',
        maxTokens: 'Max Tokens',
        method: 'Method',
        presencePenalty: 'Presence Penalty',
        prompt: 'Prompt',
        promptFiles: 'Word Document',
        promptFileText: 'Prompt File Text',
        question: 'Question',
        responseFromAPIService: 'Response From API Service',
        stopSequence: 'Stop Sequence',
        temperature: 'Temperature',
        topP: 'Top P',
      },
      importer: {
        fileName: 'VOR_AI_QA_template',
      },
      status: {
        submit: {
          started: 'Start submitting',
          success: 'Successfully submitted',
          error: 'Occurred an error on submitting',
          files: 'Uploading training file(s)',
          fineTunes: 'Learning from given dataset(s)',
          status: 'Checking training status',
          submitExtractions: 'Submitting Extractions',
          completions: 'Getting predicted completion(s)',
          submits: 'Getting response',
        },
      },
      modal: {
        noQALibrary:
          'The Q&A library does not have any eligible Questions and Answers for the AI.',
      },
    },

    campaign: {
      name: 'campaign',
      label: 'Campaigns',
      menu: 'Campaign Register',
      exporterFileName: 'campaign_export',
      list: {
        menu: 'Campaigns',
        title: 'Campaigns',
      },
      create: {
        success: 'Campaign successfully saved',
      },
      update: {
        success: 'Campaign successfully saved',
      },
      destroy: {
        success: 'Campaign successfully deleted',
      },
      destroyAll: {
        success: 'Campaign(s) successfully deleted',
      },
      send: {
        success: 'Campaign successfully sent',
      },
      sections: {
        start: 'New Campaign',
        about: 'About',
        createQuestionnaire: 'Create Questionnaire',
        editQuestionnaire: 'Edit Questionnaire',
        previewQuestionnaire: 'Preview Questionnaire',
        selectVendors: 'Select Vendors',
        selectClients: 'Select Clients',
        emailTemplate: 'Email Template',
        reviewAndSend: 'Review & Send',
      },
      edit: {
        title: 'Edit Campaign',
      },
      fields: {
        attachments: 'Attachments',
        audience: 'Audience',
        bcc: 'Bcc',
        body: 'Email Template Body',
        cc: 'Cc',
        clients: 'Clients',
        createdAt: 'Created at',
        createdAtRange: 'Created at',
        description: 'Description',
        dueDate: 'Due Date',
        dueDateRange: 'Due Date',
        emailTemplateId: 'Email Template Id',
        fromEmailAddress: 'From Email Address',
        id: 'Id',
        name: 'Name',
        progress: 'Progress',
        progressRange: 'Progress',
        questionnaire: 'Questionnaire',
        questionnaireId: 'Questionnaire Template Id',
        reference: 'Ref #',
        selectEmailTemplate: 'Select Email Template',
        status: 'Status',
        subject: 'Subject',
        to: 'To',
        totalRecipients: 'Total Recipients',
        totalRecipientsRange: 'Total Recipients',
        type: 'Type',
        updatedAt: 'Updated at',
        vendors: 'Vendors',

        useReminderEmailAfterCampaignEnrollment:
          'Reminder Email After Campaign Enrollment',
        campaignEnrollmentEmailTemplate:
          'Email Template For Campaign Enrollment',
        daysAfterCampaignEnrollment:
          'Days After Campaign Enrollment',
        useRepeatReminderEmail: 'Repeat Reminder Email',
        repeatReminderEmailTemplate:
          'Repeat Reminder Email Template',
        intervalDaysForRepeatReminderEmail: 'Interval Days',

        useReminderEmailComingDue:
          'Reminder Email Coming Due',
        emailTemplateComingDue: 'Email Template Coming Due',
        daysBeforeComingDue: 'Days Before Coming Due',

        useReminderEmailOverdue: 'Reminder Email Overdue',
        emailTemplateOverdue: 'Email Template Overdue',
        daysAfterOverdue: 'Days After Overdue',
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
        email: {
          primary: 'Primary Contact Email',
          support: 'Support Email Address',
          infoSec: 'Info Sec Email Address',
          privacy: 'Privacy Email Address',
        },
      },
      placeholders: {
        overwriteQuestionnaireTemplate:
          'Do you want to overwrite current questionnaire as "{0}"?',
        emailTemplateName: 'Email Template Name',
        questionnaireTemplateName:
          'Questionnaire Template Name',
        vendorQuestionnaire:
          'Manage your vendor due diligence program. Send your questionnaire, via email notifications, to multiple vendors.',
        clientQuestionnaire:
          'Receive feedback from your clients. Send your questionnaire, via email notifications, to multiple clients.',
        vendorEmail:
          'Send proactive  email notifications to multiple vendors.',
        clientEmail:
          'Proactively communicate information to your clients. For example, this could be security advisories for new vulnerabilities, the addition of new sub-processors or updates to your security program.',
        selectClientsQuestionnaire:
          'Click on the questionnaire that you want clients to answer?',
        selectVendorsQuestionnaire:
          'Click on the questionnaire that you want vendors to answer?',
        selectExistingQuestionnaireTemplate:
          'Select the existing questionnaire template',
        willReceiveThis: '{0} will receive this {1}',
        withoutEmailAddress:
          '{0} without a {1} email address configured',
        emailNames: {
          vendors: 'Support or Info Sec',
          clients: 'Info Sec',
        },
        reminderEmails: 'Reminder Emails',
        notReminderEmails:
          'Reminder Emails - Not Configured',
        firstReminder:
          'Send reminder email on day {0} using Template "{1}" after campaign start date',
        gentleReminder:
          'Gentle Reminder: Every {0} days using Template "{1}"',
        days: '{0} days',
        comingDue: 'Coming Due: {0} days before Due Date',
        reminderComingDue:
          'Send reminder email {0} days using Template "{1}" before the campaign due date',
        dueToday: 'Due Today: On the Due Date',
        reminderOverdue:
          ' Send reminder email {0} days using Template "{1}" after the campaign due date',
        overdue:
          'Overdue: {0} days after Due Date And every {1} days for a maximum of {2} days',
      },
      labels: {
        reminderEmailSettings: 'Reminder Email Settings',
        existingQuestionnaire: 'Existing Questionnaire',
        newQuestionnaire: 'New Custom Questionnaire',
        selectTemplate: 'Select Template',
      },
      hints: {},
      new: {
        title: 'New Campaign',
      },
      view: {
        title: 'View Campaign',
        instance: 'View Questionnaire',
      },
      importer: {
        title: 'Import Campaigns',
        fileName: 'campaign_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    campaignInstance: {
      name: 'campaignInstance',
      label: 'Questionnaires',
      menu: 'Questionnaires',
      exporterFileName: 'campaignInstance_export',
      list: {
        menu: 'Questionnaires',
        title: 'Questionnaires',
      },
      create: {
        success: 'Campaign Instance successfully saved',
      },
      update: {
        success: 'Questionnaire successfully saved',
      },
      submit: {
        success: 'Questionnaire successfully submitted',
      },
      destroy: {
        success: 'Campaign Instance successfully deleted',
      },
      destroyAll: {
        success:
          'Campaign Instance(s) successfully deleted',
      },
      edit: {
        title: 'Answer Questionnaire',
      },
      fields: {
        additionalContacts: 'Additional Contacts',
        campaign: 'Campaign',
        client: 'Client',
        createdAt: 'Created at',
        createdAtRange: 'Created at',
        id: 'Id',
        name: 'Name',
        progress: 'Progress',
        progressRange: 'Progress',
        questionnaire: 'Questionnaire',
        reference: 'Ref #',
        referenceRange: 'Ref #',
        score: 'Score',
        status: 'Status',
        submittedBy: 'Submitted By',
        submittedDate: 'Submitted Date',
        submittedDateRange: 'Submitted Date',
        title: 'Title',
        updatedAt: 'Updated at',
        users: 'Users',
        vendor: 'Vendor',
      },
      enumerators: {
        status: {
          'Not Started': 'Not Started',
          'In Progress': 'In Progress',
          Complete: 'Complete',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Campaign Instance',
      },
      view: {
        title: 'View Questionnaire',
      },
      importer: {
        title: 'Import CampaignInstances',
        fileName: 'campaignInstance_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    campaignInstanceEmails: {
      name: 'campaignInstanceEmails',
      label: 'CampaignInstanceEmails',
      menu: 'CampaignInstanceEmails',
      exporterFileName: 'campaignInstanceEmails_export',
      list: {
        menu: 'CampaignInstanceEmails',
        title: 'CampaignInstanceEmails',
      },
      create: {
        success: 'Emails successfully saved',
      },
      update: {
        success: 'Emails successfully saved',
      },
      destroy: {
        success: 'Emails successfully deleted',
      },
      destroyAll: {
        success: 'Emails(s) successfully deleted',
      },
      edit: {
        title: 'Edit Emails',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Emails',
      },
      view: {
        title: 'View Emails',
      },
      importer: {
        title: 'Import CampaignInstanceEmails',
        fileName: 'campaignInstanceEmails_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    emailTemplate: {
      name: 'emailTemplate',
      label: 'Email Templates',
      menu: 'Email Templates',
      exporterFileName: 'emailTemplate_export',
      list: {
        menu: 'Email Templates',
        title: 'Email Templates',
      },
      create: {
        success: 'Email Template successfully saved',
      },
      update: {
        success: 'Email Template successfully saved',
      },
      destroy: {
        success: 'Email Template successfully deleted',
      },
      destroyAll: {
        success: 'Email Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Email Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        fromEmailAddress: 'From Email Address',
        subject: 'Subject',
        body: 'Body',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        codes: {
          email: '[[email]]',
          first: '[[first]]',
          last: '[[last]]',
          full: '[[full]]',
        },
      },
      placeholders: {},
      hints: {
        codes: {
          email: 'Email Address',
          first: 'First Name',
          last: 'Last Name',
          full: 'Full Name',
        },
      },
      new: {
        title: 'New Email Template',
      },
      view: {
        title: 'View Email Template',
      },
      importer: {
        title: 'Import Email Templates',
        fileName: 'emailTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    questionnaire: {
      enumerators: {
        types: {
          input: 'Input',
          textarea: 'Textarea',
          'yes/no/N/A': 'Yes/No/N/A',
          'yes/no': 'Yes/No',
          select: 'Select',
        },
        bullet: {
          types: {
            none: 'None',
            numeric: 'Numeric',
            alphabetic: 'Alphabetic',
            ALPHABETIC: 'ALPHABETIC',
            custom: 'Custom',
          },
        },
      },
      labels: {
        bullet: {
          type: 'Bullet Type',
          prefixInherit: "Inherit Parent's Bullet",
          prefixText: 'Prefix',
          custom: 'Custom',
        },
        title: 'Title',
        question: 'Question',
      },
      hints: {
        questionnaire:
          'A section is a group of questions. Sections can have titles and contain multiple questions. A question can be set as mandatory or optional, have a score associated with the preferred answer and attachments can be requested. Additionally, questions can have nested questions.',
        editSectionInDetail:
          'To edit each section in detail, click a section title please.',
        answerSectionInDetail:
          'To answer each section in detail, click a section title please.',
        viewSectionInDetail:
          'To view each section in detail, click a section title please.',
        formatBullet: 'Format Bullet',
      },
      validations: {
        required: {
          questions: 'No questions',
          answer: '"{0}" required answer',
          attachment: '"{0}" required attachment',
        },
      },
    },

    questionnaireTemplate: {
      name: 'questionnaireTemplate',
      label: 'Questionnaire Templates',
      menu: 'Questionnaire Templates',
      exporterFileName: 'questionnaireTemplate_export',
      list: {
        menu: 'Questionnaire Templates',
        title: 'Questionnaire Templates',
      },
      create: {
        success:
          'Questionnaire Template successfully saved',
      },
      update: {
        success:
          'Questionnaire Template successfully saved',
        section: {
          required: 'Section name is required',
        },
        question: {
          required: 'Question is required',
        },
      },
      destroy: {
        success:
          'Questionnaire Template successfully deleted',
      },
      destroyAll: {
        success:
          'Questionnaire Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Questionnaire Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        totalQuestionsRange: 'Total Questions',
        totalQuestions: 'Total Questions',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        type: 'Type',
        questionMandatory: 'Question Mandatory',
        questionnaire: 'Questionnaire',
        attachment: 'Attachment',
        attachmentMandatory: 'Attachment Mandatory',
        showNestedQuestionsByScoreAnswer:
          'Score Answer - Show Nested Questions',
        scoreAnswer: 'Score Answer',
        multiSelect: 'Multi Select',
        answer: 'Answer',
        additionalInformation: 'Additional Information',
        score: 'Score',
      },
      labels: {
        addNestedQuestion: 'Add Nested Question',
        addQuestion: 'Add Question',
        addSection: 'Add Section',
        addSubSection: 'Add Sub Section',
        cloneQuestion: 'Clone Question',
        completedOf: 'Completed {0} of {1}',
        editOptions: 'Edit Options',
        options: 'Options',
        questions: '{0} Questions',
        sections: 'Sections',
        totalQuestions: '{0} Total Questions',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Questionnaire Template',
      },
      view: {
        title: 'View Questionnaire Template',
      },
      importer: {
        title: 'Import Questionnaire Templates',
        fileName: 'questionnaireTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    client: {
      name: 'client',
      label: 'Clients',
      menu: 'Client Register',
      info: 'Client Information',
      exporterFileName: 'client_export',
      list: {
        menu: 'Clients',
        title: 'Clients',
      },
      create: {
        success: 'Client successfully saved',
      },
      update: {
        success: 'Client successfully saved',
      },
      destroy: {
        success: 'Client successfully deleted',
      },
      destroyAll: {
        success: 'Client(s) successfully deleted',
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
        title: 'Edit Client',
      },
      openRisks: '{0} Open Risks',
      openTasks: '{0} Open Tasks',
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
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
        users: 'Users',
        infoSecEmail: 'Info Sec Email',
        infoSecPhoneNumber: 'Info Sec Phone Number',
        privacyEmail: 'Privacy Email',
        privacyPhoneNumber: 'Privacy Phone Number',
        contract: 'Contract',
        documentation: 'Documentation',
        gdprRopa: 'GDPR ROPA',
        risks: 'Risks',
        tasks: 'Tasks',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
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
        location: {
          UK: 'UK',
          US: 'US',
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
        title: 'New Client',
      },
      view: {
        title: 'View Client',
      },
      importer: {
        title: 'Import Clients',
        fileName: 'client_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    clientCategory: {
      name: 'clientCategory',
      label: 'Client Categories',
      menu: 'Client Categories',
      exporterFileName: 'clientCategory_export',
      list: {
        menu: 'Client Categories',
        title: 'Client Categories',
      },
      create: {
        success: 'Client Category successfully saved',
      },
      update: {
        success: 'Client Category successfully saved',
      },
      destroy: {
        success: 'Client Category successfully deleted',
      },
      destroyAll: {
        success: 'Client Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Client Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Client Category',
      },
      view: {
        title: 'View Client Category',
      },
      importer: {
        title: 'Import Client Categories',
        fileName: 'clientCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    programTemplate: {
      name: 'programTemplate',
      label: 'Program Templates',
      menu: 'Program Templates',
      info: 'Program Template Information',
      exporterFileName: 'programTemplate_export',
      list: {
        menu: 'Program Templates',
        title: 'Program Templates',
      },
      create: {
        success: 'Program Template successfully saved',
      },
      update: {
        success: 'Program Template successfully saved',
      },
      destroy: {
        success: 'Program Template successfully deleted',
      },
      destroyAll: {
        success: 'Program Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Program Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        requirementTemplates: 'Requirement Templates',
        totalRequirementTemplates:
          'Total Requirement Templates',
        totalControlTemplates: 'Total Control Templates',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Program Template',
      },
      view: {
        title: 'View Program Template',
      },
      importer: {
        title: 'Import Program Templates',
        fileName: 'programTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    programRequirementTemplate: {
      name: 'programRequirementTemplate',
      label: 'Requirement Templates',
      menu: 'Requirement Templates',
      info: 'Program Requirement Template Information',
      exporterFileName: 'programRequirementTemplate_export',
      list: {
        menu: 'Requirement Templates',
        title: 'Requirement Templates',
      },
      create: {
        success: 'Requirement Template successfully saved',
      },
      update: {
        success: 'Requirement Template successfully saved',
      },
      destroy: {
        success:
          'Requirement Template successfully deleted',
      },
      destroyAll: {
        success:
          'Requirement Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Requirement Template',
      },
      fields: {
        id: 'Id',
        programTemplates: 'Program Templates',
        guidanceTemplates: 'Guidance Templates',
        controlTemplates: 'Control Templates',
        totalControlTemplates: 'Total Control Templates',
        name: 'Name',
        description: 'Description',
        requirementID: 'Requirement ID',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Requirement Template',
      },
      view: {
        title: 'View Requirement Template',
      },
      importer: {
        title: 'Import Requirement Templates',
        fileName:
          'programRequirementTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    programRequirementGuidanceTemplate: {
      name: 'programRequirementGuidanceTemplate',
      label: 'Requirement Guidances',
      menu: 'Requirement Guidances',
      info: 'Requirement Guidance Template Information',
      exporterFileName:
        'programRequirementGuidanceTemplate_export',
      list: {
        menu: 'Requirement Guidances',
        title: 'Requirement Guidances',
      },
      create: {
        success: 'Requirement Guidance successfully saved',
      },
      update: {
        success: 'Requirement Guidance successfully saved',
      },
      destroy: {
        success:
          'Requirement Guidance successfully deleted',
      },
      destroyAll: {
        success:
          'Requirement Guidance(s) successfully deleted',
      },
      edit: {
        title: 'Edit Requirement Guidance',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        requirementTemplates: 'Requirement Templates',
        productCategories: 'Product Guidance',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Requirement Guidance',
      },
      view: {
        title: 'View Requirement Guidance',
      },
      importer: {
        title: 'Import Requirement Guidances',
        fileName:
          'programRequirementGuidanceTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    programControlTemplate: {
      name: 'programControlTemplate',
      label: 'Control Templates',
      menu: 'Control Templates',
      info: 'Control Template Information',
      exporterFileName: 'programControlTemplate_export',
      list: {
        menu: 'Control Templates',
        title: 'Control Templates',
      },
      create: {
        success: 'Control Template successfully saved',
      },
      update: {
        success: 'Control Template successfully saved',
      },
      addTask: {
        success: 'Task successfully added',
      },
      destroy: {
        success: 'Control Template successfully deleted',
      },
      destroyAll: {
        success: 'Control Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Control Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        requirementTemplates: 'Requirement Templates',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        requirementTemplateIDs: 'Requirement Template IDs',
        requirementTemplateNames:
          'Requirement Template Names',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Control Template',
      },
      view: {
        title: 'View Control Template',
      },
      importer: {
        title: 'Import Control Templates',
        fileName: 'programControlTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    program: {
      name: 'program',
      label: 'Programs',
      menu: 'Programs',
      info: 'Program Information',
      exporterFileName: 'program_export',
      list: {
        menu: 'Programs',
        title: 'Programs',
      },
      create: {
        success: 'Program successfully saved',
      },
      update: {
        success: 'Program successfully saved',
      },
      destroy: {
        success: 'Program successfully deleted',
      },
      destroyAll: {
        success: 'Program(s) successfully deleted',
      },
      edit: {
        title: 'Edit Program',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        tags: 'Tags',
        requirements: 'Requirements',
        controls: 'Controls',
        totalRequirements: 'Total Requirements',
        totalControls: 'Total Controls',
        totalControlHealth: 'Total Control Health',
        requirementID: 'Req ID: {0}',
        notes: 'Notes',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          Healthy: 'Healthy',
          AtRisk: 'At Risk',
          NonCompliance: 'Non Compliance',
          NoTasks: 'No Tasks',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Program',
      },
      view: {
        title: 'View Program',
      },
      importer: {
        title: 'Import Programs',
        fileName: 'program_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      wizard: {
        sections: {
          about: 'About',
          requirements: 'Select Requirements',
          controls: 'Select Controls',
          complete: 'Complete',
        },
        titles: {
          requirements:
            'Select Requirement Templates to be added to Program Requirements',
          controls:
            'Select Control Templates to be added to Program Controls',
        },
        start: {
          controls: '{0} Controls',
          customProgram: 'Custom Program',
          customProgramDescription: ' ',
          requirements: '{0} Requirements',
        },
      },
    },

    programRequirement: {
      name: 'programRequirement',
      label: 'Requirements',
      menu: 'Requirements',
      info: 'Requirement Information',
      exporterFileName: 'programRequirement_export',
      list: {
        menu: 'Requirements',
        title: 'Requirements',
      },
      create: {
        success: 'Requirement successfully saved',
      },
      update: {
        success: 'Requirement successfully saved',
      },
      destroy: {
        success: 'Requirement successfully deleted',
      },
      destroyAll: {
        success: 'Requirement(s) successfully deleted',
      },
      edit: {
        title: 'Edit Requirement',
      },
      fields: {
        id: 'Id',
        programs: 'Programs',
        controls: 'Controls',
        name: 'Name',
        description: 'Description',
        requirementID: 'Requirement ID',
        tags: 'Tags',
        notes: 'Notes',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        totalControls: 'Total Controls',
        totalControlHealth: 'Total Control Health',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Requirement',
      },
      add: {
        title: 'Add Requirement',
      },
      view: {
        title: 'View Requirement',
      },
      importer: {
        title: 'Import Requirements',
        fileName: 'programRequirement_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createRisk: 'Create Risk',
      },
    },

    programControl: {
      name: 'programControl',
      label: 'Controls',
      menu: 'Controls',
      info: 'Control Information',
      exporterFileName: 'programControl_export',
      list: {
        menu: 'Controls',
        title: 'Controls',
      },
      create: {
        success: 'Control successfully saved',
      },
      update: {
        success: 'Control successfully saved',
      },
      destroy: {
        success: 'Control successfully deleted',
      },
      destroyAll: {
        success: 'Control(s) successfully deleted',
      },
      addTask: {
        success: 'Task successfully added',
      },
      edit: {
        title: 'Edit Control',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        tasks: 'Tasks',
        requirements: 'Requirements',
        tags: 'Tags',
        notes: 'Notes',
        attachments: 'Attachments',
        totalRecurringTasks: 'Total Recurring Tasks',
        totalOneTimeTasks: 'Total One Time Tasks',
        totalTaskHealth: 'Total Task Health',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        requirementIDs: 'Requirement IDs',
        requirementNames: 'Requirement Names',
      },
      enumerators: {
        status: {
          Completed: 'Completed',
          OverDue: 'Over Due',
          Failed: 'Failed',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Control',
      },
      add: {
        title: 'Add Control',
      },
      view: {
        title: 'View Control',
      },
      importer: {
        title: 'Import Controls',
        fileName: 'programControl_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createRisk: 'Create Risk',
      },
    },

    userGroup: {
      name: 'userGroup',
      label: 'User Groups',
      menu: 'User Groups',
      info: 'User Group Information',
      exporterFileName: 'userGroup_export',
      list: {
        menu: 'User Groups',
        title: 'User Groups',
      },
      create: {
        success: 'User Group successfully saved',
      },
      update: {
        success: 'User Group successfully saved',
      },
      destroy: {
        success: 'User Group successfully deleted',
      },
      destroyAll: {
        success: 'User Group(s) successfully deleted',
      },
      toggle: {
        success: 'User Group successfully assigned',
      },
      edit: {
        title: 'Edit User Group',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        type: 'Type',
        users: 'Users',
        totalUsers: 'Total Users',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        type: {
          Default: 'Default',
          Office: 'Office',
          LineOfBusiness: 'Line of Business',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New User Group',
        titleModal: 'New User Group',
      },
      view: {
        title: 'View User Group',
      },
      importer: {
        title: 'Import User Groups',
        fileName: 'userGroup_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    project: {
      name: 'project',
      label: 'Projects',
      menu: 'Project Register',
      info: 'Project Information',
      exporterFileName: 'project_export',
      list: {
        menu: 'Projects',
        title: 'Projects',
      },
      create: {
        success: 'Project successfully saved',
      },
      update: {
        success: 'Project successfully saved',
      },
      destroy: {
        success: 'Project successfully deleted',
      },
      destroyAll: {
        success: 'Project(s) successfully deleted',
      },
      edit: {
        title: 'Edit Project',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
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
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        completed: 'Completed',
        remediated: 'Remediated',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Project',
      },
      view: {
        title: 'View Project',
      },
      importer: {
        title: 'Import Projects',
        fileName: 'project_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      addThisTask:
        'The task was successfully saved. Do you want to add this task to the Project?',
      addThisRisk:
        'The risk was successfully saved. Do you want to add this risk to the Project?',
    },

    projectPriority: {
      name: 'projectPriority',
      label: 'Project Priorities',
      menu: 'Project Priorities',
      exporterFileName: 'projectPriority_export',
      list: {
        menu: 'Project Priorities',
        title: 'Project Priorities',
      },
      create: {
        success: 'Project Priority successfully saved',
      },
      update: {
        success: 'Project Priority successfully saved',
      },
      destroy: {
        success: 'Project Priority successfully deleted',
      },
      destroyAll: {
        success: 'Project Priority(s) successfully deleted',
      },
      edit: {
        title: 'Edit Project Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Project Priority',
      },
      view: {
        title: 'View Project Priority',
      },
      importer: {
        title: 'Import Project Priorities',
        fileName: 'projectPriority_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    projectStatus: {
      name: 'projectStatus',
      label: 'Project Statuses',
      menu: 'Project Statuses',
      exporterFileName: 'projectStatus_export',
      list: {
        menu: 'Project Statuses',
        title: 'Project Statuses',
      },
      create: {
        success: 'Project Status successfully saved',
      },
      update: {
        success: 'Project Status successfully saved',
      },
      destroy: {
        success: 'Project Status successfully deleted',
      },
      destroyAll: {
        success: 'Project Status(s) successfully deleted',
      },
      edit: {
        title: 'Edit Project Status',
      },
      fields: {
        id: 'Id',
        status: 'Status',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Project Status',
      },
      view: {
        title: 'View Project Status',
      },
      importer: {
        title: 'Import Project Statuses',
        fileName: 'projectStatus_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    projectType: {
      name: 'projectType',
      label: 'Project Types',
      menu: 'Project Types',
      exporterFileName: 'projectType_export',
      list: {
        menu: 'Project Types',
        title: 'Project Types',
      },
      create: {
        success: 'Project Type successfully saved',
      },
      update: {
        success: 'Project Type successfully saved',
      },
      destroy: {
        success: 'Project Type successfully deleted',
      },
      destroyAll: {
        success: 'Project Type(s) successfully deleted',
      },
      edit: {
        title: 'Edit Project Type',
      },
      fields: {
        id: 'Id',
        type: 'Type',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Project Type',
      },
      view: {
        title: 'View Project Type',
      },
      importer: {
        title: 'Import Project Types',
        fileName: 'projectType_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },
  },

  profile: {
    title: 'Profile',
    sideNavItems: {
      basicInfo: 'Basic Info',
      changePassword: 'Change Password',
      twoFactorAuthentication: '2FA',
      sessions: 'Sessions',
      tasks: 'Tasks',
      risks: 'Risks',
      deleteAccount: 'Delete Account',
      userGroups: 'User Groups',
    },
    titles: {
      basicInfo: 'Basic Info',
      changePassword: 'Change Password',
      twoFactorAuthentication: 'Two-Factor Authentication',
      sessions: 'Sessions',
      sessionInDetail: 'Session in detail',
      tasks: 'Tasks',
      risks: 'Risks',
      deleteAccount: 'Delete Account',
    },
    changePassword: {
      charactersLength: '{0} minimum characters length',
      uppercaseLength: '{0} minimum uppercase character',
      lowercaseLength: '{0} minimum lowercase character',
      symbolsLength: '{0} minimum symbol with options {1}',
      numbersLength: '{0} minimum number',
    },
    hints: {
      strongPasswordGuide:
        'Please follow this guide for a strong password',
      deleteAccount:
        'Once you delete your account, there is no going back. Please be certain.',
      sessions:
        'This is a list of devices that have logged into your account. Remove those that you do not recognize.',
    },
    labels: {
      passwordRequirements: 'Password requirements',
    },
  },

  sessionDevice: {
    labels: {
      browser: '{0} on {1}',
      current: 'Your current session',
    },
  },

  auth: {
    tenants: 'Workspaces',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    promptKeepAliveTitle: '{0}s',
    promptKeepAlive:
      'Your session is about to expire and you will automatically be logged out if there is no more activity.',
    keepAlive: 'Keep alive',
    continueWorking: 'Continue Working',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
    users:'User',
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    custom: {
      label: 'Custom Role',
      description: 'Custom role access',
    },
    client: {
      label: 'Client Role',
      description: 'Client role access',
    },
    vendor: {
      label: 'Vendor Role',
      description: 'Vendor role access',
    },
    taskonly: {
      label: 'taskonly Role',
      description: 'taskonly role access',
    },
  },

  user: {
    fields: {
      impersonate: 'Impersonate',
      avatars: 'Avatar',
      createdAt: 'Created At',
      createdAtRange: 'Created At',
      email: 'Email',
      emails: 'Email(s)',
      firstName: 'First Name',
      fullName: 'Name',
      id: 'Id',
      jobTitle: 'Job Title',
      lastLoginAt: 'Last Login At',
      lastModifiedAt: 'Last Modified At',
      lastName: 'Last Name',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      oldPassword: 'Old Password',
      password: 'Password',
      phoneNumber: 'Phone Number',
      rememberMe: 'Remember me',
      role: 'Role',
      roles: 'Roles',
      roleUser: 'Role/User',
      status: 'Status',
      updatedAt: 'Updated At',
      userGroups: 'User Groups',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    impersonate: {
      title: 'Impersonate Mode',
      notification:
        'If you close this notification, your impersonate mode will be closed.',
    },
    invite: 'Invite',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Users',
    menu: 'Users',
    doAddSuccess: 'User successfully saved',
    doUpdateSuccess: 'User successfully saved',
    exporterFileName: 'users_export',
    doActivateSuccess: 'User successfully activated',
    doActivateAllSelectedSuccess:
      'Users successfully activated',
    doDeactivateSuccess: 'User successfully deactivated',
    doDeactivateAllSelectedSuccess:
      'Users successfully deactivated',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'Users successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'Invite User',
      titleModal: 'Invite User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  role: {
    menu: 'Roles',
    title: 'User Roles',
    labels: {
      assigned: 'Assigned',
      unassigned: 'Unassigned',
      roles: 'Roles',
      users: '{0} Users',
      selected: '{0}/{1} selected',
    },
    doAddRoleSuccess:
      'Selected users successfully assigned with {0}',
    doRemoveRoleSuccess:
      'Selected users successfully unassigned with {0}',
  },

  tenant: {
    name: 'Tenant',
    label: 'Workspaces',
    menu: 'Workspaces',
    list: {
      menu: 'Workspaces',
      title: 'Workspaces',
    },
    create: {
      button: 'Create Workspace',
      success: 'Workspace successfully saved',
    },
    update: {
      success: 'Workspace successfully saved',
    },
    destroy: {
      success: 'Workspace successfully deleted',
    },
    destroyAll: {
      success: 'Workspace(s) successfully deleted',
    },
    edit: {
      title: 'Edit Workspace',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'Workspace Name',
      tenantId: 'Workspace',
      tenantUrl: 'Workspace URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New Workspace',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select Workspace',
    validation: {
      url: 'Your workspace URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  plan: {
    menu: 'Subscriptions',
    title: 'Subscriptions',

    free: {
      label: 'Free',
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

    pricingPeriod: 'month',
    current: 'Current Subscription',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    sideNavItems: {
      settings: 'Settings',
      athena: 'Copilot',
    },
    athena: {
      title: 'Copilot',
      save: {
        success:
          'Copilot configurations successfully saved.',
      },
      isNotConfigured: `Vor AI Configurations weren't set yet.`,
    },
    settings: {
      title: 'Settings',
    },
    title: 'Tenant',
    tenant: 'Tenant',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      logos: 'Logo',
      backgroundImages: 'Background Images',
      shade: 'Shade',
      question: 'Questions',
    },
  },
  dashboard: {
    menu: 'Dashboard',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) =>
        `${path} must be a ${type}`,
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
    placeholder: {
      title: 'Click or drag and drop files here',
      size: '(Max {0})',
    },
    title: 'Title',
    file: 'File',
    uploadedBy: 'Uploaded by',
    uploadedAt: 'Uploaded at',
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint: 'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'No records found',
    loading: 'Loading...',
    noRequirements: 'No requirements found',
    noControls: 'No controls found',
  },

  fileCarousel: {
    noItems: 'No files found',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} of {2}',
    labelRowsPerPage: 'Per page:',
  },
};

export default en;

/**
 * I18n dictionary for the en.
 */

const ptBR = {
  app: {
    title: 'VOR | GRC - Consciência Informada',
  },

  auth: {
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'O email já está sendo usado',
    invalidEmail: 'Por favor forneça um email válido',
    passwordReset: {
      invalidToken:
        'Link de redefinição de senha inválido ou expirado',
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Link de verificação de email inválido ou expirado.',
      error: `Email não encontrado.`,
      signedInAsWrongUser: `Esta confirmação de email foi enviada para {0} mas você está acessando como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'A senha antiga é inválida',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      destroyingHimself: `Você não pode deletar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
      revokingPlanUser: `Você não pode revogar a permissão do responsável pelo plano ativo`,
      destroyingPlanUser: `Você não pode deletar o responsável pelo plano ativo`,
    },
  },

  tenant: {
    exists: 'Já existe um inquilino para esta aplicação.',
    url: {
      exists:
        'Esta URL de área de trabalho já está em uso.',
    },
    invitation: {
      notSameEmail: `Este convite foi enviado para {0} mas você está acessando como {1}.`,
    },
    planActive: `Existe um plano ativo para esta área de trabalho. Por favor primeiro cancele o plano.`,
  },

  importer: {
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

  errors: {
    inUse: {
      message: '`{0}` is in use',
    },
    notFound: {
      message: 'Não encontrado',
    },
    forbidden: {
      message: 'Não permitido',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  email: {
    error: `Email não configurado.`,
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida em modo de demonstração.',
  },

  entities: {
    vendor: {
      errors: {
        unique: {
          reference: 'Ref # deve ser único',
        },
      },
    },
    vendorCategory: {
      errors: {
        unique: {},
      },
    },
    task: {
      errors: {
        unique: {
          reference: 'Ref # deve ser único',
        },
      },
    },
    taskPriority: {
      errors: {
        unique: {},
      },
    },
    taskList: {
      errors: {
        unique: {},
      },
    },
    note: {
      errors: {
        unique: {},
      },
    },
    risk: {
      errors: {
        unique: {
          reference: 'Ref # deve ser único',
        },
      },
    },
    riskCategory: {
      errors: {
        unique: {},
      },
    },
    product: {
      errors: {
        unique: {
          reference: 'Ref # deve ser único',
        },
      },
    },
    productCategory: {
      errors: {
        unique: {
          name: 'Name deve ser único',
        },
      },
    },
    highlight: {
      errors: {
        unique: {},
      },
    },
    newsArticle: {
      errors: {
        unique: {},
      },
    },
    newsFavorite: {
      errors: {
        unique: {},
      },
    },
    tag: {
      errors: {
        unique: {},
      },
    },
    policyTemplate: {
      errors: {
        unique: {},
      },
    },
    policy: {
      errors: {
        unique: {
          name: 'Name deve ser único',
        },
      },
    },
    campaign: {
      errors: {
        unique: {
          name: 'Name deve ser único',
        },
      },
    },
    campaignInstance: {
      errors: {
        unique: {},
      },
    },
    campaignInstanceEmails: {
      errors: {
        unique: {},
      },
    },
    emailTemplate: {
      errors: {
        unique: {},
      },
    },
    questionnaireTemplate: {
      errors: {
        unique: {},
      },
    },
    client: {
      errors: {
        unique: {
          reference: 'Reference deve ser único',
        },
      },
    },
    clientCategory: {
      errors: {
        unique: {},
      },
    },
    programTemplate: {
      errors: {
        unique: {},
      },
    },
    programRequirementTemplate: {
      errors: {
        unique: {},
      },
    },
    programRequirementGuidanceTemplate: {
      errors: {
        unique: {},
      },
    },
    programControlTemplate: {
      errors: {
        unique: {},
      },
    },
    program: {
      errors: {
        unique: {},
      },
    },
    programRequirement: {
      errors: {
        unique: {},
      },
    },
    programControl: {
      errors: {
        unique: {},
      },
    },
    userGroup: {
      errors: {
        unique: {
          name: 'Name deve ser único',
        },
      },
    },
    project: {
      errors: {
        unique: {
          reference: 'Reference deve ser único',
        },
      },
    },
    projectPriority: {
      errors: {
        unique: {},
      },
    },
    projectStatus: {
      errors: {
        unique: {},
      },
    },
    projectType: {
      errors: {
        unique: {},
      },
    },
  },
};

export default ptBR;

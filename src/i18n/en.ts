/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'VOR | GRC - Informed Awareness',
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      deactivatingHimself: `You can't deactivate yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
      deactivatingPlanUser: `You can't deactivate the plan manager.`,
      impersonate: `You can't use this feature in impersonate mode.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
      importProgramNotExistent: `Program doesn't exist`,
      importRequirementNotExistent: `Requirement doesn't exist`,
    },
  },

  errors: {
    inUse: {
      message: '`{0}` is in use',
    },
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
      required: '{0} is required',
      invalid: '{0} is invalid',
    },
    custom: '{0}',
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  entities: {
    vendor: {
      errors: {
        unique: {
          reference: 'Ref # must be unique',
        },
      },
    },
    vendorCategory: {
      errors: {
        unique: {
          name: 'Name must be unique',
        },
      },
    },
    task: {
      errors: {
        unique: {
          reference: 'Ref # must be unique',
        },
      },
    },
    taskPriority: {
      errors: {
        unique: {
          priority: 'Priority must be unique',
        },
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
          reference: 'Ref # must be unique',
        },
      },
    },
    riskCategory: {
      errors: {
        unique: {
          name: 'Name must be unique',
        },
      },
    },
    product: {
      errors: {
        unique: {
          reference: 'Ref # must be unique',
        },
      },
    },
    productCategory: {
      errors: {
        unique: {
          name: 'Name must be unique',
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
        unique: {
          tag: 'Tag must be unique',
        },
      },
    },
    typeForm: {
      errors: {
        responseNotFound:
          'Type form response was not found for `{0}`',
      },
    },
    document: {
      errors: {},
    },
    policyTemplate: {
      errors: {
        unique: {},
      },
    },
    policy: {
      errors: {
        unique: {
          name: 'Name must be unique',
        },
        update: {
          published: `It's already published. Allowed to clone only.`,
          clone:
            'An editable version of this policy already exists. Please delete the current editable version before cloning a different version.',
        },
      },
    },
    campaign: {
      errors: {
        required: {
          emailTemplateId: 'Email Template is required',
        },
        exists: {
          name: 'Name already exists. Please select another.',
        },
        unique: {
          name: 'Name must be unique',
        },
        update: {
          inProgress: "Could not update. It's in progress.",
          completed: "Could not update. It's completed.",
        },
        destroy: {
          inProgress: "Could not delete. It's in progress.",
          completed: "Could not delete. It's completed.",
        },
      },
      fields: {
        to: 'To',
        fromEmailAddress: 'From Email Address',
        subject: 'subject',
        body: 'Email Template Body',
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
          reference: 'Reference must be unique',
        },
      },
    },
    clientCategory: {
      errors: {
        unique: {
          name: 'Name must be unique',
        },
      },
    },
    vorAI: {
      errors: {
        request: 'An error occurred during your request.',
      },
      messages: {
        fineTuneStatus: {
          remain: '{0} training tasks were not finished.',
          complete: 'All training tasks had been finished.',
        },
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
          name: 'Name must be unique',
        },
      },
    },
    project: {
      errors: {
        unique: {
          reference: 'Reference must be unique',
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

export default en;

/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      document: {
        id: 'document',
        folder: 'tenant/:tenantId/document',
        maxSizeInBytes: 20971520,
      },

      vendorLogo: {
        id: 'vendorLogo',
        folder: 'tenant/:tenantId/vendor/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      vendorContract: {
        id: 'vendorContract',
        folder: 'tenant/:tenantId/vendor/contract',
        maxSizeInBytes: 20971520,
      },
      vendorDocumentation: {
        id: 'vendorDocumentation',
        folder: 'tenant/:tenantId/vendor/documentation',
        maxSizeInBytes: 20971520,
      },

      taskAttachments: {
        id: 'taskAttachments',
        folder: 'tenant/:tenantId/task/attachments',
        maxSizeInBytes: 20971520,
      },

      riskAttachments: {
        id: 'riskAttachments',
        folder: 'tenant/:tenantId/risk/attachments',
        maxSizeInBytes: 20971520,
      },

      productLogo: {
        id: 'productLogo',
        folder: 'tenant/:tenantId/product/logo',
        maxSizeInBytes: 5242880,
      },

      policyTemplateAttachment: {
        id: 'policyTemplateAttachment',
        folder:
          'tenant/:tenantId/policyTemplate/attachment',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      policyAttachment: {
        id: 'policyAttachment',
        folder: 'tenant/:tenantId/policy/attachment',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      clientLogo: {
        id: 'clientLogo',
        folder: 'tenant/:tenantId/client/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      clientContract: {
        id: 'clientContract',
        folder: 'tenant/:tenantId/client/contract',
        maxSizeInBytes: 20971520,
      },
      clientDocumentation: {
        id: 'clientDocumentation',
        folder: 'tenant/:tenantId/client/documentation',
        maxSizeInBytes: 20971520,
      },

      questionnaireAttachment: {
        id: 'questionnaireAttachment',
        folder: 'tenant/:tenantId/questionnaire',
        maxSizeInBytes: 20971520,
      },
      prompt: {
        id: 'prompt',
        folder: 'tenant/:tenantId/prompt',
        maxSizeInBytes: 20971520,
      },

      campaignEmailAttachment: {
        id: 'campaignEmailAttachment',
        folder: 'tenant/:tenantId/campaign/email/',
        maxSizeInBytes: 20971520,
      },

      programControlAttachments: {
        id: 'programControlAttachments',
        folder:
          'tenant/:tenantId/programControl/attachments',
        maxSizeInBytes: 20971520,
      },

      projectAttachments: {
        id: 'projectAttachments',
        folder: 'tenant/:tenantId/project/attachments',
        maxSizeInBytes: 20971520,
      },

      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
    };
  }
}

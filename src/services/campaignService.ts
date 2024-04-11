import { getUserNameOrEmailPrefix } from '../utils/userUtils';
import { i18n } from '../i18n';
import { IServiceOptions } from './IServiceOptions';
import { toUniqueArray } from '../utils/arrayUtils';
import Campaign from '../database/models/campaign';
import CampaignInstanceEmailsRepository from '../database/repositories/campaignInstanceEmailsRepository';
import CampaignInstanceRepository from '../database/repositories/campaignInstanceRepository';
import CampaignRepository from '../database/repositories/campaignRepository';
import ClientRepository from '../database/repositories/clientRepository';
import EmailSender from './emailSender';
import EmailTemplateRepository from '../database/repositories/emailTemplateRepository';
import Error400 from '../errors/Error400';
import FileRepository from '../database/repositories/fileRepository';
import moment from 'moment';
import MongooseQueryUtils from '../database/utils/mongooseQueryUtils';
import MongooseRepository from '../database/repositories/mongooseRepository';
import QuestionnaireTemplateService from './questionnaireTemplateService';
import ReferenceRepository from '../database/repositories/referenceRepository';
import UserRepository from '../database/repositories/userRepository';
import VendorRepository from '../database/repositories/vendorRepository';

export default class CampaignService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.emailTemplateId =
      await EmailTemplateRepository.filterIdInTenant(
        data.emailTemplateId,
        this.options,
      );
    if (
      data.doServerValidation === true ||
      data.doServerValidation === 'true'
    ) {
      const requiredFields = [
        'to',
        'fromEmailAddress',
        'subject',
        'body',
      ];
      for (const field of requiredFields) {
        if (!data[field] || !data[field].length) {
          throw new Error400(
            this.options.language,
            'errors.validation.required',
            i18n(
              this.options.language,
              `entities.campaign.fields.${field}`,
            ),
          );
        }
      }
      if (!data.emailTemplateId) {
        const emailTemplate =
          await EmailTemplateRepository.create(
            {
              name: data.emailTemplateName,
              fromEmailAddress: data.fromEmailAddress,
              subject: data.subject,
              body: data.body,
            },
            { ...this.options, session },
          );
        data.emailTemplateId = emailTemplate.id;
      }
    }
    data.campaignEnrollmentEmailTemplate =
      await EmailTemplateRepository.filterIdInTenant(
        data.campaignEnrollmentEmailTemplate,
        this.options,
      );
    data.repeatReminderEmailTemplate =
      await EmailTemplateRepository.filterIdInTenant(
        data.repeatReminderEmailTemplate,
        this.options,
      );
    data.emailTemplateComingDue =
      await EmailTemplateRepository.filterIdInTenant(
        data.emailTemplateComingDue,
        this.options,
      );
    data.emailTemplateOverdue =
      await EmailTemplateRepository.filterIdInTenant(
        data.emailTemplateOverdue,
        this.options,
      );
    data.vendors = await VendorRepository.filterIdsInTenant(
      data.vendors,
      this.options,
    );
    data.clients = await ClientRepository.filterIdsInTenant(
      data.clients,
      this.options,
    );
    data.emailTemplate = {
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      fromEmailAddress: data.fromEmailAddress,
      subject: data.subject,
      body: data.body,
      attachments: await FileRepository.filterIdsInTenant(
        data.attachments,
        { ...this.options, session },
      ),
    };
  }

  async checkName(data) {
    const exists = await CampaignRepository.count(
      {
        _id: { $ne: MongooseQueryUtils.uuid(data.id) },
        name: data.name,
      },
      this.options,
    );
    if (exists) {
      throw new Error400(
        this.options.language,
        'entities.campaign.errors.exists.name',
      );
    }
    return true;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await QuestionnaireTemplateService.assignRelatedData(
        data,
        session,
      );

      await this.assignRelatedData(data, session);

      data.reference =
        await ReferenceRepository.getNextReference(
          Campaign,
          this.options,
        );

      data.status = 'Not Started';

      const record = await CampaignRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'campaign',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await QuestionnaireTemplateService.assignRelatedData(
        data,
        session,
      );

      await this.assignRelatedData(data, session);

      const record = await CampaignRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'campaign',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await CampaignRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async reviewById(id) {
    const campaign = await CampaignRepository.findById(
      id,
      this.options,
    );
    const parseDateOnly = (date) => {
      const unixTimestamp = moment(date).unix();
      return moment.unix(
        unixTimestamp - (unixTimestamp % 86400),
      );
    };
    const emailTemplate =
      await EmailTemplateRepository.findById(
        campaign.emailTemplateId,
        this.options,
      );
    const review = {
      totalVendorsOrClients: 0,
      noEmailVendorsOrClients: 0,
      dueDate: campaign.dueDate,
      currentDate: moment(),
      type: campaign.type,
      audience: campaign.audience,
      comingDueDays: parseDateOnly(campaign.dueDate).diff(
        parseDateOnly(moment()),
        'days',
      ),
      emailTemplateName: emailTemplate.name,
      // previewEmailTemplate: await this.previewEmailTemplate(
      //   {
      //     ...lodash.pick(campaign, ['vendors', 'clients']),
      //     ...lodash.pick(campaign.emailTemplate, [
      //       'to',
      //       'cc',
      //       'bcc',
      //       'body',
      //     ]),
      //   },
      // ),
      to: [],
      cc: [],
      previewEmailTemplate: campaign.emailTemplate.body,
    };
    const vendorsCount = await VendorRepository.count(
      {
        _id: { $in: campaign.vendors },
      },
      this.options,
    );
    const clientsCount = await ClientRepository.count(
      {
        _id: { $in: campaign.clients },
      },
      this.options,
    );
    review.totalVendorsOrClients =
      (vendorsCount ?? 0) + (clientsCount ?? 0);
    /**
     * Counts all vendors that didn't have one email address at least
     */
    review.noEmailVendorsOrClients +=
      await VendorRepository.count(
        {
          _id: { $in: campaign.vendors },
          $or: [
            {
              supportEmail: null,
            },
            {
              infoSecEmail: null,
            },
          ],
        },
        this.options,
      );
    review.noEmailVendorsOrClients +=
      await ClientRepository.count(
        {
          _id: { $in: campaign.clients },
          infoSecEmail: null,
        },
        this.options,
      );
    const vendors = await this.getVendors(campaign.vendors);
    const clients = await this.getClients(campaign.clients);
    /**
     * Extracts all vendors & clients email address as primary email
     */
    const emailMap = await this.getEmailMap(
      vendors,
      clients,
    );
    review.to = toUniqueArray(
      (campaign.emailTemplate.to ?? [])
        .reduce(
          (total, to) => [...total, ...emailMap[to]],
          [],
        )
        .filter(Boolean),
    );
    review.cc = toUniqueArray(
      (campaign.emailTemplate.cc ?? [])
        .reduce(
          (total, cc) => [...total, ...emailMap[cc]],
          [],
        )
        .filter(Boolean),
    );
    return review;
  }

  async getVendors(vendors) {
    const { rows: vendorEntities } =
      await VendorRepository.findAndCountAll(
        {
          filter: {
            receivers: true,
            receiverIds: vendors ?? [],
          },
        },
        this.options,
        true,
        true,
      );
    return vendorEntities;
  }

  async getClients(clients) {
    const { rows: vendorEntities } =
      await ClientRepository.findAndCountAll(
        {
          filter: {
            receivers: true,
            receiverIds: clients ?? [],
          },
        },
        this.options,
        true,
        true,
      );
    return vendorEntities;
  }

  async getEmailMap(vendors, clients) {
    const emailMap: {
      [key: string]: any[];
    } = {
      primary: [],
      support: [],
      infoSec: [],
      privacy: [],
    };
    const pushEmails = (entity) => {
      for (const key of Object.keys(emailMap)) {
        const propName = `${key}Email`;
        if (entity[propName]) {
          emailMap[key].push(entity[propName]);
        }
      }
      entity.users?.forEach(({ email }) =>
        emailMap.primary.push(email),
      );
    };
    (vendors ?? []).forEach(pushEmails);
    (clients ?? []).forEach(pushEmails);
    /**
     * Filter every email array
     */
    for (const key of Object.keys(emailMap)) {
      emailMap[key] = emailMap[key].filter(Boolean);
    }
    return emailMap;
  }

  async getEmailTypes({ to, cc, bcc }) {
    const emailTypes: string[] = [];
    [...(to ?? []), ...(cc ?? []), ...(bcc ?? [])]
      .filter(Boolean)
      .sort()
      .forEach(
        (emailType) =>
          !emailTypes.includes(emailType) &&
          emailTypes.push(emailType),
      );
    return emailTypes;
  }

  async getReplacedContent(content, email = null) {
    if (!content) {
      return content;
    }
    let newContent = content;
    if (email) {
      const user = (await UserRepository.findByEmail(
        email,
        this.options,
      )) ?? {
        email,
      };
      for (const key of Object.keys(
        EmailTemplateRepository.CODES.USER,
      )) {
        const codeSet =
          EmailTemplateRepository.CODES.USER[key];
        const regExpPattern = new RegExp(
          `\\[\\[${codeSet.code}\\]\\]`,
          'gi',
        );
        newContent = newContent.replace(
          regExpPattern,
          user[codeSet.prop] ??
            getUserNameOrEmailPrefix(user),
        );
      }
      newContent = newContent.replace(
        new RegExp(
          `\\[\\[${EmailTemplateRepository.CODES.EMAIL}\\]\\]`,
          'gi',
        ),
        email,
      );
    }
    return newContent;
  }

  async previewEmailTemplate(data) {
    const vendors = await this.getVendors(data.vendors);
    const clients = await this.getClients(data.clients);
    /**
     * Extracts all vendors & clients email address as primary email
     */
    const emailMap = await this.getEmailMap(
      vendors,
      clients,
    );
    const emailTypes = await this.getEmailTypes(data);
    for (const emailType of emailTypes) {
      for (const email of emailMap[emailType]) {
        return await this.getReplacedContent(
          data.body,
          email,
        );
      }
    }
    return data.body ?? null;
  }

  async send(id) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const campaign = await CampaignRepository.findById(
        id,
        this.options,
      );
      /**
       * Get available vendors & clients for email reminder
       */
      const vendors = await this.getVendors(
        campaign.vendors,
      );
      const clients = await this.getClients(
        campaign.clients,
      );
      if (campaign.type === 'Questionnaire') {
        /**
         * Initialize a campaign instance for broadcasting.
         */
        const campaignInstance = {
          reference: campaign.reference,
          campaign: id,
          dueDate: campaign.dueDate,
          name: campaign.name,
          status: 'Not Started',
          progress: 0,
          score: 0,
          questionnaire: campaign.questionnaire,
        };
        /**
         * Broadcast the campaign to every vendor.
         */
        for (const vendor of vendors) {
          await CampaignInstanceRepository.create(
            {
              ...campaignInstance,
              vendor,
              users: vendor.users,
            },
            {
              ...this.options,
              session,
            },
          );
        }

        /**
         * Broadcast the campaign to every client.
         */
        for (const client of clients) {
          await CampaignInstanceRepository.create(
            {
              ...campaignInstance,
              client,
              users: client.users,
            },
            {
              ...this.options,
              session,
            },
          );
        }
      }
      /**
       * Extracts all vendors & clients email address as primary email
       */
      const emailMap = await this.getEmailMap(
        vendors,
        clients,
      );
      /**
       * Listing emails for reminder
       */
      const emailTemplate = campaign.emailTemplate ?? {};
      const emailTypes = await this.getEmailTypes(
        emailTemplate,
      );
      /**
       * Send emails
       */
      for (const emailType of emailTypes) {
        for (const email of emailMap[emailType]) {
          const emailInstance =
            await CampaignInstanceEmailsRepository.create(
              {
                toEmailAddress: email,
                fromEmailAddress:
                  emailTemplate.fromEmailAddress,
                subject: emailTemplate.subject,
                body: await this.getReplacedContent(
                  emailTemplate.body,
                  email,
                ),
              },
              { ...this.options, session },
            );
          /**
           * Check if email sender is available
           */
          if (EmailSender.isConfigured) {
            /**
             * Send the email for reminder
             */
            await new EmailSender(
              EmailSender.TEMPLATES.CAMPAIGN_REMINDER,
              {
                body: emailTemplate.body,
              },
            ).sendTo(email, emailTemplate.fromEmailAddress);
            /**
             * Update the sent timestamp
             */
            await CampaignInstanceEmailsRepository.update(
              emailInstance.id,
              {
                sent: moment(),
              },
              { ...this.options, session },
            );
          }
        }
      }
      /**
       * Mark up `In Progress`
       */
      await CampaignRepository.update(
        id,
        {
          status: 'In Progress',
        },
        { ...this.options, session },
      );
      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return CampaignRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return CampaignRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return CampaignRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    if (data.reference ?? false) {
      delete data.reference;
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await CampaignRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}

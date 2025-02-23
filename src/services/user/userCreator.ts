import { IServiceOptions } from '../IServiceOptions';
import { tenantSubdomain } from '../tenantSubdomain';
import assert from 'assert';
import EmailSender from '../../services/emailSender';
import lodash from 'lodash';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import UserRepository from '../../database/repositories/userRepository';
import Roles from '../../security/roles';
import ClientRepository from '../../database/repositories/clientRepository';
import VendorRepository from '../../database/repositories/vendorRepository';

export default class UserCreator {
  options: IServiceOptions;
  session;
  data;
  emailsToInvite: Array<any> = [];
  emails: any = [];
  sendInvitationEmails = true;

  constructor(options) {
    this.options = options;
  }

  /**
   * Creates new user(s) via the User page.
   * Sends Invitation Emails if flagged.
   */
  async execute(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._addOrUpdateAll();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
    }
  }

  get _roles() {
    if (
      this.data.roles &&
      !Array.isArray(this.data.roles)
    ) {
      return [this.data.roles];
    } else {
      const uniqueRoles = [...new Set(this.data.roles)];
      return uniqueRoles;
    }
  }

  get _userGroups() {
    if (
      this.data.userGroups &&
      !Array.isArray(this.data.userGroups)
    ) {
      return [this.data.userGroups];
    } else {
      const uniqueUserGroups = [
        ...new Set(this.data.userGroups),
      ];
      return uniqueUserGroups;
    }
  }

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  get _profile() {
    return lodash.pick(this.data, [
      'firstName',
      'lastName',
      'jobTitle',
      'phoneNumber',
    ]);
  }

  /**
   * Creates or updates many users at once.
   */
  async _addOrUpdateAll() {
    return Promise.all(
      this.emails.map((email) => this._addOrUpdate(email)),
    );
  }

  /**
   * Creates or updates the user passed.
   * If the user already exists, it only adds the role to the user.
   */
  async _addOrUpdate(email) {
    let user =
      await UserRepository.findByEmailWithoutAvatar(email, {
        ...this.options,
        session: this.session,
      });

    if (!user) {
      user = await UserRepository.create(
        { email },
        {
          ...this.options,
          session: this.session,
        },
      );
    }

    const isUserAlreadyInTenant = user.tenants.some(
      (userTenant) =>
        userTenant.tenant.id ===
        this.options.currentTenant.id,
    );

    const tenantUser =
      await TenantUserRepository.updateRoles(
        this.options.currentTenant.id,
        user.id,
        this._roles,
        this._userGroups,
        {
          ...this.options,
          addUserGroups: true,
          addRoles: true,
          session: this.session,
        },
      );

    if (tenantUser.roles.includes(Roles.values.client)) {
      await ClientRepository.addUserAsSameMember(user.id, {
        ...this.options,
        session: this.session,
      });
    }

    if (tenantUser.roles.includes(Roles.values.vendor)) {
      await VendorRepository.addUserAsSameMember(user.id, {
        ...this.options,
        session: this.session,
      });
    }

    if (this._emails.length === 1) {
      await UserRepository.updateProfile(
        user.id,
        this._profile,
        {
          ...this.options,
          session: this.session,
        },
      );
    }

    if (!isUserAlreadyInTenant) {
      this.emailsToInvite.push({
        email,
        token: tenantUser.invitationToken,
      });
    }
  }

  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  async _sendAllInvitationEmails() {
    if (!this.sendInvitationEmails) {
      return;
    }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        const link = `${tenantSubdomain.frontendUrl(
          this.options.currentTenant,
        )}/auth/invitation?token=${emailToInvite.token}`;

        return new EmailSender(
          EmailSender.TEMPLATES.INVITATION,
          {
            tenant: this.options.currentTenant,
            link,
          },
        ).sendTo(emailToInvite.email);
      }),
    );
  }

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );

    assert(
      this.options.currentTenant.id,
      'tenantId is required',
    );

    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );

    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(
      this._emails && this._emails.length,
      'emails is required',
    );

    assert(
      this._roles && this._roles.length,
      'roles is required',
    );
  }
}

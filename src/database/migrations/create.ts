/**
 * This script is responsible for creating the MongoDB collections.
 * Run it via `npm run db:create`.
 */
require('dotenv').config();

import { BCRYPT_SALT_ROUNDS } from '../../services/auth/authService';
import { createCollections } from '../models';
import { databaseInit } from '../databaseConnection';
import {
  IRepositoryOptions,
  emptyRepositoryOptions,
} from '../repositories/IRepositoryOptions';
import bcrypt from 'bcrypt';
import MongooseRepository from '../repositories/mongooseRepository';
import Plans from '../../security/plans';
import Roles from '../../security/roles';
import TenantRepository from '../repositories/tenantRepository';
import TenantService from '../../services/tenantService';
import TenantUserRepository from '../repositories/tenantUserRepository';
import User from '../models/user';

databaseInit()
  .then(createCollections)
  .then(async (db) => {
    const session = await MongooseRepository.createSession(
      db,
    );
    const options: IRepositoryOptions =
      emptyRepositoryOptions({
        database: db,
        session: session,
      });
    try {
      const [builtinUser] = await User(db).create([
        {
          fullName: 'Vor',
          email: 'Vor@vor.co',
          tenants: [],
          password: await bcrypt.hash(
            'vor@vor.co',
            BCRYPT_SALT_ROUNDS,
          ),
          builtin: true,
        },
      ]);

      options.currentUser = builtinUser;

      const tenant = await TenantRepository.create(
        {
          name: 'vor',
          plan: Plans.values.free,
          planStatus: 'active',
        },
        options,
      );

      options.currentTenant = tenant;

      await TenantUserRepository.updateRoles(
        tenant.id,
        builtinUser.id,
        [Roles.values.admin],
        [],
        {
          ...options,
          addUserGroups: true,
          addRoles: true,
        },
      );

      await new TenantService(
        options,
      ).joinWithDefaultRolesOrAskApproval(
        {
          roles: [Roles.values.admin],
          tenantId: tenant.id,
        },
        { session: session },
      );

      await MongooseRepository.commitTransaction(session);

      console.info('Collections successfully created');
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      console.error(error);
    } finally {
      process.exit(1);
    }
  })
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { authMiddleware } from '../middlewares/authMiddleware';
import { contentType } from 'mime-types';
import { createRateLimiter } from './apiRateLimiter';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import { detectDeviceMiddleware } from '../middlewares/detectDeviceMiddleware';
import { impersonateMiddleware } from '../middlewares/impersonateMiddleware';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import * as fs from 'fs';
import authSocial from './auth/authSocial';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import setupSwaggerUI from './apiDocumentation';

const app = express();

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Detect the device info from request.
app.use(detectDeviceMiddleware);

// Check if the current user is in impersonate mode.
app.use(impersonateMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
const cspDirectives = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'script-src': ["'self'", "'unsafe-eval'"],
};

// console.log('----- Content Security Policy -----');
// console.log(cspDirectives);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...cspDirectives,
      },
    },
  }),
);

// Parses the body of POST/PUT request
// to JSON
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith('/api/plan/stripe/webhook')) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  }),
);

// Configure the Entity routes
const routes = express.Router();

// Enable Passport for Social Sign-in
authSocial(app, routes);

require('./document').default(routes);
require('./widget').default(routes);
require('./schedule').default(routes);
require('./mui').default(routes);
require('./auditLog').default(routes);
require('./auth').default(routes);
require('./sessionDevice').default(routes);
require('./plan').default(routes);
require('./tenant').default(routes);
require('./file').default(routes);
require('./user').default(routes);
require('./role').default(routes);
require('./settings').default(routes);
require('./vendor').default(routes);
require('./vendorCategory').default(routes);
require('./task').default(routes);
require('./taskInstance').default(routes);
require('./taskPriority').default(routes);
require('./taskList').default(routes);
require('./qaLibrary').default(routes);
require('./note').default(routes);
require('./risk').default(routes);
require('./riskCategory').default(routes);
require('./product').default(routes);
require('./productCategory').default(routes);
require('./productFavorite').default(routes);
require('./newsArticle').default(routes);
require('./newsFavorite').default(routes);
require('./tag').default(routes);
require('./policyTemplate').default(routes);
require('./policyTemplateFavorite').default(routes);
require('./policy').default(routes);
require('./policyFavorite').default(routes);
require('./campaign').default(routes);
require('./campaignInstance').default(routes);
require('./emailTemplate').default(routes);
require('./questionnaireTemplate').default(routes);
require('./client').default(routes);
require('./clientCategory').default(routes);
require('./highlight').default(routes);
require('./vorAI').default(routes);
require('./programTemplate').default(routes);
require('./programRequirementTemplate').default(routes);
require('./programRequirementGuidanceTemplate').default(
  routes,
);
require('./programControlTemplate').default(routes);
require('./program').default(routes);
require('./programRequirement').default(routes);
require('./programControl').default(routes);
require('./userGroup').default(routes);
require('./project').default(routes);
require('./projectPriority').default(routes);
require('./projectStatus').default(routes);
require('./projectType').default(routes);

// Loads the Tenant if the :tenantId param is passed
routes.param('tenantId', tenantMiddleware);

// Add the routes to the /api endpoint
app.use('/api', routes);

const mimes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
};

// For compressed files
app.get(
  ['*.css', '*.jpeg', '*.jpg', '*.js', '*.png', '*.svg'],
  (req, res, next) => {
    const gzUrl = path.resolve(
      __dirname,
      `../../frontend/build/${req.url}.gz`,
    );

    // only if file exists
    if (!fs.existsSync(gzUrl)) {
      return next();
    }

    res.set('Content-Encoding', 'gzip');
    const ext = path.extname(req.url);
    const ctnType =
      mimes[ext] ||
      contentType(ext) ||
      'application/octet-stream';
    res.set('Content-Type', ctnType);
    res.sendFile(gzUrl);
  },
);

app.use(
  express.static(
    path.resolve(__dirname, '../../frontend/build'),
  ),
);

app.get('*', function (req, res) {
  res.sendFile(
    path.resolve(
      __dirname,
      '../../frontend/build',
      'index.html',
    ),
  );
});

export default app;

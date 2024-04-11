import { i18n } from 'src/i18n';
import { Icon } from '@mui/material';
import config from 'src/config';
import Permissions from 'src/security/permissions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TaskIcon from '@mui/icons-material/Task';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Font } from 'pspdfkit';

const permissions = Permissions.values;

const visibleExtraMenus = false;

interface IPermission {
  id: string;
  allowedRoles: string[];
  allowedPlans: string[];
  allowedStorage?: any[];
}

interface IMenu {
  key?: string;
  path?: string;
  exact?: boolean;
  icon: any;
  name: string;
  permissionRequired?: IPermission;
  collapse?: (boolean | IMenu)[];
  noCollapse?: boolean;
}

type TMenus = Array<boolean | IMenu>;
type NSMenu = Array<boolean | IMenu>;

const menus: TMenus = [
  {
    path: '/',
    exact: true,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    name: i18n('dashboard.menu'),
    permissionRequired: permissions.dashboardRead,
  },

  {
    path: '/task',
    //key: 'tasks',
    exact: true,
    name: i18n('collapses.tasks.menu'),
    permissionRequired: permissions.taskRead,
    icon: <Icon fontSize="medium">assignment</Icon>,
  },

  {
    path: '/project',
    //key: 'project-management',
    exact: true,
    name: i18n('collapses.projects.menu'),
    permissionRequired: permissions.projectRead,
    icon: <Icon fontSize="medium">developer_board</Icon>,
  },

  {
    path: '/risk',
    //key: 'risk-management',
    exact: true,
    name: i18n('collapses.risks.menu'),
    permissionRequired: permissions.riskRead,
    icon: <Icon fontSize="medium">gpp_maybe</Icon>,
  },


  {
    name: i18n('collapses.compliance.menu'),
    key: 'compliance-management',
    icon: <Icon fontSize="medium">assured_workload</Icon>,
    permissionRequired: permissions.collapseComplianceRead,
    collapse: [
      {
        path: '/program',
        permissionRequired: permissions.programRead,
        name: i18n('entities.program.menu'),
        icon: <Icon>terminal</Icon>,
      },

      {
        path: '/program-requirement',
        permissionRequired:
          permissions.programRequirementRead,
        name: i18n('entities.programRequirement.menu'),
        icon: <Icon>explore</Icon>,
      },

      {
        path: '/program-control',
        permissionRequired: permissions.programControlRead,
        name: i18n('entities.programControl.menu'),
        icon: <Icon>tune</Icon>,
      },
    ],
  },

  {
    path: '/vendor',
    exact: true,
    name: i18n('collapses.vendors.menu'),
    permissionRequired: permissions.vendorRead,
    icon: <StorefrontIcon fontSize="medium" />, 
  },

  {
    path: '/client',
    exact: true,
    name: i18n('collapses.clients.menu'),
    permissionRequired: permissions.clientRead,
    icon: <Icon fontSize="medium">person</Icon>,
  },

  /* TEMPORARILY HIDE - 
  {
    name: "Trust", //i18n('collapses.vorAI.menu'),
    key: 'vor-ai',
    icon: <HandshakeIcon fontSize="medium" />, //<Icon fontSize="medium">Handshake</Icon>,
    permissionRequired: permissions.vorAIRead,
    collapse: [
      {
        path: '/questionaire',
        permissionRequired: permissions.vorAIRead,
        name: i18n('entities.vorAI.menu'),
        icon: <Icon>quiz</Icon>,
      },

      {
        path: '/qalibrary',
        permissionRequired: permissions.qaLibraryRead,
        name: i18n('entities.qaLibrary.menu'),
        icon: <Icon>comment</Icon>,
      },
    ],
  },*/

  {
    path: '/campaign',
    //key: 'campaigns',
    exact: true,
    name: i18n('collapses.campaigns.menu'),
    permissionRequired: permissions.campaignRead,
    icon: <Icon fontSize="medium">campaign</Icon>,
  },

/* TEMPORARILY HIDE - 
  {
    path: '/news-article',
    key: 'news',
    exact: true,
    name: i18n('entities.newsArticle.menu'),
    permissionRequired: permissions.newsArticleRead,
    icon: <Icon fontSize="medium">newspaper</Icon>,
  },

  visibleExtraMenus && {
    path: '/news-favorite',
    key: 'favorite',
    exact: true,
    name: i18n('entities.newsFavorite.menu'),
    permissionRequired: permissions.newsFavoriteRead,
    icon: <Icon fontSize="medium">favorite</Icon>,
  },*/


  visibleExtraMenus && {
    path: '/tag',
    key: 'tag',
    exact: true,
    name: i18n('entities.tag.menu'),
    permissionRequired: permissions.tagRead,
    icon: <Icon fontSize="medium">sell</Icon>,
  },

  {
    name: i18n('collapses.documents.menu'),
    key: 'documents',
    icon: <Icon fontSize="medium">folder</Icon>,
    permissionRequired: permissions.collapseDocumentRead,
    collapse: [
      {
        path: '/document',
        name: i18n('entities.document.menu'),
        permissionRequired: permissions.documentRead,
        icon: <Icon>upload_file</Icon>,
      },
      {
        path: '/highlight',
        name: i18n('entities.highlight.menu'),
        permissionRequired: permissions.highlightRead,
        icon: <Icon>highlight</Icon>,
      },
      {
        path: '/policy',
        name: i18n('entities.policy.menu'),
        permissionRequired: permissions.policyRead,
        icon: <Icon>policy</Icon>,
      },
      {
        path: '/policy-template',
        name: i18n('entities.policyTemplate.menu'),
        permissionRequired: permissions.policyTemplateRead,
        icon: <Icon>security</Icon>,
      },
    ],
  },

  
  {
    path: '/campaign-instance',
    name: i18n('entities.campaignInstance.menu'),
    permissionRequired: permissions.campaignInstanceRead,
    icon: <Icon fontSize="medium">question_answer</Icon>,
  },

  {
    name: i18n('collapses.reports.menu'),
    key: 'reports',
    icon: <Icon fontSize="medium">assessment</Icon>,
    permissionRequired: permissions.collapseReportRead,
    collapse: [
      {
        path: '/report/tasks-by-month',
        permissionRequired: permissions.taskRead,
        name: i18n('reports.tasksByMonth.menu'),
        icon: <Icon>task</Icon>,
      },
    ],
  },

  /* TEMPORARILY HIDE - 
  {
    path: '/product',
    permissionRequired: permissions.productRead,
    name: i18n('entities.product.menu'),
    icon: <Icon fontSize="medium">store</Icon>,
  },*/















/*
  {
    name: i18n('collapses.tasks.menu'),
    key: 'tasks',
    icon: <Icon fontSize="medium">assignment</Icon>,
    permissionRequired: permissions.collapseTaskRead,
    collapse: [
      {
        path: '/task',
        permissionRequired: permissions.taskRead,
        name: i18n('entities.task.menu'),
        icon: <Icon >task</Icon>,
      },

      {
        path: '/task-priority',
        permissionRequired: permissions.taskPriorityRead,
        name: i18n('entities.taskPriority.menu'),
        icon: <Icon fontSize="medium">low_priority</Icon>,
      },

      {
        path: '/task-list',
        permissionRequired: permissions.taskListRead,
        name: i18n('entities.taskList.menu'),
        icon: <Icon fontSize="medium">list_alt</Icon>,
      },

      {
        path: '/note',
        permissionRequired: permissions.noteRead,
        name: i18n('entities.note.menu'),
        icon: <Icon fontSize="medium">note</Icon>,
      },
    ],
  },*/
/*
  {
    name: i18n('collapses.risks.menu'),
    key: 'risk-management',
    icon: <Icon fontSize="medium">gpp_maybe</Icon>,
    permissionRequired: permissions.collapseRiskRead,
    collapse: [
      {
        path: '/risk',
        permissionRequired: permissions.riskRead,
        name: i18n('entities.risk.menu'),
        icon: <Icon fontSize="medium">assignment_late</Icon>,
      },

      {
        path: '/risk-category',
        permissionRequired: permissions.riskCategoryRead,
        name: i18n('entities.riskCategory.menu'),
        icon: <Icon fontSize="medium">crisis_alert</Icon>,
      },
    ],
  },*/
/*
  {
    name: i18n('collapses.projects.menu'),
    key: 'project-management',
    icon: <Icon>developer_board</Icon>,
    permissionRequired: permissions.collapseProjectRead,
    collapse: [
      {
        path: '/project',
        permissionRequired: permissions.projectRead,
        name: i18n('entities.project.menu'),
        icon: <Icon>developer_board</Icon>,
      },

      {
        path: '/project-priority',
        permissionRequired: permissions.projectPriorityRead,
        name: i18n('entities.projectPriority.menu'),
        icon: <Icon>move_up</Icon>,
      },

      {
        path: '/project-status',
        permissionRequired: permissions.projectStatusRead,
        name: i18n('entities.projectStatus.menu'),
        icon: <Icon>check_circle_outline</Icon>,
      },

      {
        path: '/project-type',
        permissionRequired: permissions.projectTypeRead,
        name: i18n('entities.projectType.menu'),
        icon: <Icon>design_services</Icon>,
      },
    ],
  },*/
/*
  {
    path: '/news-article',
    key: 'news',
    exact: true,
    name: i18n('entities.newsArticle.menu'),
    permissionRequired: permissions.newsArticleRead,
    icon: <Icon>newspaper</Icon>,
  },*/
/*
  visibleExtraMenus && {
    path: '/news-favorite',
    key: 'favorite',
    exact: true,
    name: i18n('entities.newsFavorite.menu'),
    permissionRequired: permissions.newsFavoriteRead,
    icon: <Icon>favorite</Icon>,
  },*/

/*
  {
    name: i18n('collapses.complianceTemplates.menu'),
    key: 'compliance-templates-management',
    icon: <Icon>widgets</Icon>,
    permissionRequired:
      permissions.collapseComplianceTemplatesRead,
    collapse: [
      {
        path: '/program-template',
        permissionRequired: permissions.programTemplateRead,
        name: i18n('entities.programTemplate.menu'),
        icon: <Icon>terminal</Icon>,
      },

      {
        path: '/program-requirement-template',
        permissionRequired:
          permissions.programRequirementTemplateRead,
        name: i18n(
          'entities.programRequirementTemplate.menu',
        ),
        icon: <Icon>explore</Icon>,
      },

      {
        path: '/program-requirement-guidance-template',
        permissionRequired:
          permissions.programRequirementGuidanceTemplateRead,
        name: i18n(
          'entities.programRequirementGuidanceTemplate.menu',
        ),
        icon: <Icon>help</Icon>,
      },

      {
        path: '/program-control-template',
        permissionRequired:
          permissions.programControlTemplateRead,
        name: i18n('entities.programControlTemplate.menu'),
        icon: <Icon>tune</Icon>,
      },
    ],
  },*/

  /*
  {
    name: i18n('collapses.vendors.menu'),
    key: 'vendor-management',
    icon: <StorefrontIcon />,
    permissionRequired: permissions.collapseVendorRead,
    collapse: [
      {
        path: '/vendor',
        permissionRequired: permissions.vendorRead,
        name: i18n('entities.vendor.menu'),
        icon: <StorefrontIcon />,
      },

      {
        path: '/vendor-category',
        permissionRequired: permissions.vendorCategoryRead,
        name: i18n('entities.vendorCategory.menu'),
        icon: <Icon>category</Icon>,
      },
    ],
  },*/
/*
  {
    name: i18n('collapses.clients.menu'),
    key: 'client-management',
    icon: <Icon>people_alt</Icon>,
    permissionRequired: permissions.collapseClientRead,
    collapse: [
      {
        path: '/client',
        permissionRequired: permissions.clientRead,
        name: i18n('entities.client.menu'),
        icon: <Icon>person</Icon>,
      },

      {
        path: '/client-category',
        permissionRequired: permissions.clientCategoryRead,
        name: i18n('entities.clientCategory.menu'),
        icon: <Icon>folder_shared</Icon>,
      },
    ],
  },*/


/*
  {
    name: i18n('collapses.campaigns.menu'),
    key: 'campaigns',
    icon: <Icon>campaign</Icon>,
    permissionRequired: permissions.collapseCampaignRead,
    collapse: [
      {
        path: '/campaign',
        permissionRequired: permissions.campaignRead,
        name: i18n('entities.campaign.menu'),
        icon: <Icon>campaign</Icon>,
      },
      {
        path: '/questionnaire-template',
        permissionRequired:
          permissions.questionnaireTemplateRead,
        name: i18n('entities.questionnaireTemplate.menu'),
        icon: <Icon>question_answer</Icon>,
      },
      {
        path: '/email-template',
        permissionRequired: permissions.emailTemplateRead,
        name: i18n('entities.emailTemplate.menu'),
        icon: <Icon>drafts</Icon>,
      },
    ],
  },*/


].filter(Boolean);

const profileRoutes: TMenus = [
  {
    name: i18n('auth.profile.title'),
    path: '/profile',
    icon: <Icon fontSize="medium">person_outline</Icon>,
  },
].filter(Boolean);

const tenantRoutes: TMenus = [
  {
    path: '/settings',
    name: i18n('settings.tenant'),
    permissionRequired: permissions.settingsEdit,
    icon: <Icon fontSize="medium">room_preferences</Icon>,
  },

  ['multi', 'multi-with-subdomain'].includes(
    config.tenantMode,
  ) && {
    name: i18n('tenant.list.title'),
    path: '/tenant',
    icon: <Icon fontSize="medium">apps</Icon>,
    permissionRequired: permissions.tenantRead,
  },

  config.isPlanEnabled && {
    path: '/plan',
    permissionRequired: permissions.planRead,
    icon: <Icon fontSize="medium">credit_card_outlined</Icon>,
    name: i18n('plan.menu'),
  },

  {
    path: '/audit-logs',
    name: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
    icon: <Icon fontSize="medium">restore</Icon>,
  },

  {
    path: '/task-priority',
    permissionRequired: permissions.taskPriorityRead,
    name: i18n('entities.taskPriority.menu'),
    icon: <Icon fontSize="medium">low_priority</Icon>,
  },

  {
    path: '/task-list',
    permissionRequired: permissions.taskListRead,
    name: i18n('entities.taskList.menu'),
    icon: <Icon fontSize="medium">list_alt</Icon>,
  },

  {
    path: '/note',
    permissionRequired: permissions.noteRead,
    name: i18n('entities.note.menu'),
    icon: <Icon fontSize="medium">note</Icon>,
  },

  {
    path: '/risk-category',
    permissionRequired: permissions.riskCategoryRead,
    name: i18n('entities.riskCategory.menu'),
    icon: <Icon fontSize="medium">crisis_alert</Icon>,
  },

  
  {
    path: '/project-priority',
    permissionRequired: permissions.projectPriorityRead,
    name: i18n('entities.projectPriority.menu'),
    icon: <Icon fontSize="medium">move_up</Icon>,
  },

  {
    path: '/project-status',
    permissionRequired: permissions.projectStatusRead,
    name: i18n('entities.projectStatus.menu'),
    icon: <Icon fontSize="medium">check_circle_outline</Icon>,
  },

  {
    path: '/project-type',
    permissionRequired: permissions.projectTypeRead,
    name: i18n('entities.projectType.menu'),
    icon: <Icon fontSize="medium">design_services</Icon>,
  },

  {
    path: '/vendor-category',
    permissionRequired: permissions.vendorCategoryRead,
    name: i18n('entities.vendorCategory.menu'),
    icon: <Icon>category</Icon>,
  },
  
  {
    path: '/client-category',
    permissionRequired: permissions.clientCategoryRead,
    name: i18n('entities.clientCategory.menu'),
    icon: <Icon>folder_shared</Icon>,
  },


  
  {
    name: i18n('collapses.complianceTemplates.menu'),
    key: 'compliance-templates-management',
    icon: <Icon>widgets</Icon>,
    permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse: [
      {
        path: '/program-template',
        permissionRequired: permissions.programTemplateRead,
        name: i18n('entities.programTemplate.menu'),
        icon: <Icon>terminal</Icon>,
      },

      {
        path: '/program-requirement-template',
        permissionRequired:
          permissions.programRequirementTemplateRead,
        name: i18n(
          'entities.programRequirementTemplate.menu',
        ),
        icon: <Icon>explore</Icon>,
      },

      {
        path: '/program-requirement-guidance-template',
        permissionRequired:
          permissions.programRequirementGuidanceTemplateRead,
        name: i18n(
          'entities.programRequirementGuidanceTemplate.menu',
        ),
        icon: <Icon>help</Icon>,
      },

      {
        path: '/program-control-template',
        permissionRequired:
          permissions.programControlTemplateRead,
        name: i18n('entities.programControlTemplate.menu'),
        icon: <Icon>tune</Icon>,
      },
    ],
  },

  {
    path: '/questionnaire-template',
    permissionRequired: permissions.questionnaireTemplateRead,
    name: i18n('entities.questionnaireTemplate.menu'),
    icon: <Icon>question_answer</Icon>,
  },
  {
    path: '/email-template',
    permissionRequired: permissions.emailTemplateRead,
    name: i18n('entities.emailTemplate.menu'),
    icon: <Icon>drafts</Icon>,
  },

].filter(Boolean);

const userRoutes: TMenus = [
  {
    path: '/user',
    name: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: <Icon>person</Icon>,
  },

  {
    path: '/user-group',
    name: i18n('entities.userGroup.menu'),
    permissionRequired: permissions.userGroupRead,
    icon: <Icon>person</Icon>,
  },

  {
    path: '/role',
    name: i18n('role.menu'),
    permissionRequired: permissions.roleRead,
    icon: <Icon>person</Icon>,
  },
].filter(Boolean);
const newsettingRoutes: NSMenu = [
  {
    name: i18n('General Settings'),
    key: 'general-settings',
    icon: <Icon>home</Icon>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/note',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Notes'),
        icon: <Icon></Icon>,
      },
      {
        path: '/tag',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Tags'),
        icon: <Icon></Icon>,
      },
      {
        path: '/audit-log',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Audit Logs'),
        icon: <Icon></Icon>,
      },
    ],
  },

  {
    name: i18n('Tasks'),
    key: 'tasks-settings',
    icon: <TaskIcon/>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/task-priority',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Task Priorities'),
        icon: <Icon></Icon>,
      },
      {
        path: '/task-list',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Task Lists'),
        icon: <Icon></Icon>,
      },
    ],
  },
  {
    name: i18n('Risks'),
    key: 'risks-settings',
    icon: <ReportGmailerrorredIcon/>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/risk-category',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Risk Categories'),
        icon: <Icon></Icon>,
      },
      
    ],
  },
  {
    name: i18n('Projects'),
    key: 'projects-settings',
    icon: <Icon>developer_board</Icon>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/project-priority',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Project Priorities'),
        icon: <Icon></Icon>,
      },
      {
        path: '/project-status',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Project Statuses'),
        icon: <Icon></Icon>,
      },
      {
        path: '/project-type',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Project Types'),
        icon: <Icon></Icon>,
      },
    ],
  },
  {
    name: i18n('Vendors'),
    key: 'vendors-settings',
    icon: <StorefrontIcon />, 
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/vendor-category',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Vendor Categories'),
        icon: <Icon></Icon>,
      },
    ],
  },
  {
    name: i18n('Clients'),
    key: 'clients-settings',
    icon: <Icon>person</Icon>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/client-category',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Client Categories'),
        icon: <Icon></Icon>,
      },
    ],
  },
  {
    name: i18n('Compliance Templates'),
    key: 'compliance-templates-settings',
    icon: <AssuredWorkloadIcon/>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/requirement-template',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Requirements Template'),
        icon: <Icon></Icon>,
      },
      {
        path: '/requirement-guidance',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Requirements Guidance'),
        icon: <Icon></Icon>,
      },
      {
        path: '/client-category',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Program Template'),
        icon: <Icon></Icon>,
      },
      {
        path: '/control-template',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Control Templates'),
        icon: <Icon></Icon>,
      },
    ],
  },
  {
    name: i18n('Campaigns'),
    key: 'campaigns-settings',
    icon: <Icon >campaign</Icon>,
    // permissionRequired: permissions.collapseComplianceTemplatesRead,
    collapse:[
      {
        path: '/questionaire-template',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Questionaire Templates'),
        icon: <Icon></Icon>,
      },
      {
        path: '/email-template',
        // permissionRequired: permissions.programTemplateRead,
        name: i18n('Email Templates'),
        icon: <Icon></Icon>,
      },
    ],
  },
].filter(Boolean);
export { menus, profileRoutes, tenantRoutes, userRoutes, newsettingRoutes };

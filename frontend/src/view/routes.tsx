import config from 'src/config';
import Permissions from 'src/security/permissions';

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    i18n: 'dashboard.menu',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: permissions.dashboardRead,
    exact: true,
  },

  {
    path: '/vor-ai',
    collapseName: 'vor-ai',
    i18n: 'collapses.vorAI.menu',
    parent: '/',
    redirect: '/questionaire',
    permissionRequired: permissions.vorAIRead,
    virtual: true,
  },

  {
    path: '/questionaire',
    collapseName: 'vor-ai',
    i18n: 'entities.vorAI.menu',
    loader: () =>
      import('src/view/vorAI/form/VORAIFormPage'),
    parent: '/vor-ai',
    permissionRequired: permissions.vorAIRead,
    exact: true,
  },

  {
    path: '/qalibrary',
    collapseName: 'vor-ai',
    i18n: 'entities.qaLibrary.menu',
    loader: () =>
      import('src/view/qaLibrary/list/QALibraryListPage'),
    parent: '/vor-ai',
    permissionRequired: permissions.qaLibraryRead,
    exact: true,
  },

  {
    path: '/qalibrary/new',
    collapseName: 'vor-ai',
    i18n: 'entities.qaLibrary.new.title',
    parent: '/qalibrary',
    loader: () =>
      import('src/view/qaLibrary/form/QALibraryFormPage'),
    permissionRequired: permissions.qaLibraryCreate,
    exact: true,
  },

  {
    path: '/qalibrary/importer',
    collapseName: 'vor-ai',
    i18n: 'entities.qaLibrary.importer.title',
    parent: '/qalibrary',
    loader: () =>
      import(
        'src/view/qaLibrary/importer/QALibraryImporterPage'
      ),
    permissionRequired: permissions.qaLibraryImport,
    exact: true,
  },

  {
    path: '/qalibrary/:id/edit',
    collapseName: 'vor-ai',
    i18n: 'entities.qaLibrary.edit.title',
    parent: '/qalibrary',
    loader: () =>
      import('src/view/qaLibrary/form/QALibraryFormPage'),
    permissionRequired: permissions.qaLibraryEdit,
    exact: true,
  },

  {
    path: '/qalibrary/:id',
    collapseName: 'vor-ai',
    i18n: 'entities.qaLibrary.view.title',
    parent: '/qalibrary',
    loader: () =>
      import('src/view/qaLibrary/view/QALibraryViewPage'),
    permissionRequired: permissions.qaLibraryRead,
    exact: true,
  },

  {
    path: '/report',
    collapseName: 'reports',
    i18n: 'collapses.reports.menu',
    parent: '/',
    redirect: '/report/tasks-by-month',
    permissionRequired: permissions.collapseReportRead,
    virtual: true,
  },

  {
    path: '/report/tasks-by-month',
    collapseName: 'reports',
    i18n: 'reports.tasksByMonth.menu',
    parent: '/report',
    loader: () =>
      import('src/view/report/view/TasksByMonthPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/person-name-breadcrumb',
    collapseName: 'my-profile',
    // labelCode: '{USER_TEXT}',
    i18n: 'roles.admin.label',
    parent: '/',
    redirect: '/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    collapseName: 'my-profile',
    i18n: 'tenant.list.title',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: permissions.tenantRead,
    exact: true,
  },

  {
    path: '/tenant/new',
    collapseName: 'my-profile',
    i18n: 'tenant.new.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: permissions.tenantCreate,
    exact: true,
  },

  {
    path: '/tenant/:id/edit',
    collapseName: 'my-profile',
    i18n: 'tenant.edit.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: permissions.tenantEdit,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/plan',
    i18n: 'plan.title',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/user',
    i18n: 'user.menu',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/user/new',
    i18n: 'user.new.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    i18n: 'user.importer.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },

  {
    path: '/user/:id/edit',
    i18n: 'user.edit.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },

  {
    path: '/user/:id',
    i18n: 'user.view.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/role',
    i18n: 'role.menu',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/user/role/UserRolePage'),
    permissionRequired: permissions.roleRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    collapseName: 'my-profile',
    i18n: 'auditLog.menu',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    collapseName: 'my-profile',
    i18n: 'settings.tenant',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/settings/SettingsPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/vendor-management',
    collapseName: 'vendor-management',
    i18n: 'collapses.vendors.menu',
    parent: '/',
    redirect: '/vendor',
    permissionRequired: permissions.collapseVendorRead,
    virtual: true,
  },

  {
    path: '/vendor',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.menu',
    parent: '/vendor-management',
    loader: () =>
      import('src/view/vendor/list/VendorListPage'),
    permissionRequired: permissions.vendorRead,
    exact: true,
  },

  {
    path: '/vendor/new',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.new.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/form/VendorFormPage'),
    permissionRequired: permissions.vendorCreate,
    exact: true,
  },

  {
    path: '/vendor/importer',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.importer.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/importer/VendorImporterPage'),
    permissionRequired: permissions.vendorImport,
    exact: true,
  },

  {
    path: '/vendor/:id/edit',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.edit.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/form/VendorFormPage'),
    permissionRequired: permissions.vendorEdit,
    exact: true,
  },

  {
    path: '/vendor/:id',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.view.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/view/VendorViewPage'),
    permissionRequired: permissions.vendorRead,
    exact: true,
  },

  {
    path: '/vendor-category',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.menu',
    parent: '/vendor-management',
    loader: () =>
      import(
        'src/view/vendorCategory/list/VendorCategoryListPage'
      ),
    permissionRequired: permissions.vendorCategoryRead,
    exact: true,
  },

  {
    path: '/vendor-category/new',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.new.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/form/VendorCategoryFormPage'
      ),
    permissionRequired: permissions.vendorCategoryCreate,
    exact: true,
  },

  {
    path: '/vendor-category/importer',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.importer.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/importer/VendorCategoryImporterPage'
      ),
    permissionRequired: permissions.vendorCategoryImport,
    exact: true,
  },

  {
    path: '/vendor-category/:id/edit',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.edit.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/form/VendorCategoryFormPage'
      ),
    permissionRequired: permissions.vendorCategoryEdit,
    exact: true,
  },

  {
    path: '/vendor-category/:id',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.view.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/view/VendorCategoryViewPage'
      ),
    permissionRequired: permissions.vendorCategoryRead,
    exact: true,
  },

  {
    path: '/tasks-breadcrumb',
    collapseName: 'tasks',
    i18n: 'collapses.tasks.menu',
    parent: '/',
    redirect: '/task',
    permissionRequired: permissions.collapseTaskRead,
    virtual: true,
  },

  {
    path: '/task',
    collapseName: 'tasks',
    i18n: 'entities.task.menu',
    parent: '/tasks-breadcrumb',
    loader: () => import('src/view/task/list/TaskListPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/task/new',
    collapseName: 'tasks',
    i18n: 'entities.task.new.title',
    parent: '/task',
    loader: () => import('src/view/task/form/TaskFormPage'),
    permissionRequired: permissions.taskCreate,
    exact: true,
  },

  {
    path: '/task/importer',
    collapseName: 'tasks',
    i18n: 'entities.task.importer.title',
    parent: '/task',
    loader: () =>
      import('src/view/task/importer/TaskImporterPage'),
    permissionRequired: permissions.taskImport,
    exact: true,
  },

  {
    path: '/task/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.task.edit.title',
    parent: '/task',
    loader: () => import('src/view/task/form/TaskFormPage'),
    permissionRequired: permissions.taskEdit,
    exact: true,
  },

  {
    path: '/task/:id',
    collapseName: 'tasks',
    i18n: 'entities.task.view.title',
    parent: '/task',
    loader: () => import('src/view/task/view/TaskViewPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/task-priority',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.menu',
    parent: '/tasks-breadcrumb',
    loader: () =>
      import(
        'src/view/taskPriority/list/TaskPriorityListPage'
      ),
    permissionRequired: permissions.taskPriorityRead,
    exact: true,
  },

  {
    path: '/task-priority/new',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.new.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/form/TaskPriorityFormPage'
      ),
    permissionRequired: permissions.taskPriorityCreate,
    exact: true,
  },

  {
    path: '/task-priority/importer',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.importer.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/importer/TaskPriorityImporterPage'
      ),
    permissionRequired: permissions.taskPriorityImport,
    exact: true,
  },

  {
    path: '/task-priority/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.edit.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/form/TaskPriorityFormPage'
      ),
    permissionRequired: permissions.taskPriorityEdit,
    exact: true,
  },

  {
    path: '/task-priority/:id',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.view.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/view/TaskPriorityViewPage'
      ),
    permissionRequired: permissions.taskPriorityRead,
    exact: true,
  },

  {
    path: '/task-list',
    collapseName: 'tasks',
    i18n: 'entities.taskList.menu',
    parent: '/tasks-breadcrumb',
    loader: () =>
      import('src/view/taskList/list/TaskListListPage'),
    permissionRequired: permissions.taskListRead,
    exact: true,
  },

  {
    path: '/task-list/new',
    collapseName: 'tasks',
    i18n: 'entities.taskList.new.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/form/TaskListFormPage'),
    permissionRequired: permissions.taskListCreate,
    exact: true,
  },

  {
    path: '/task-list/importer',
    collapseName: 'tasks',
    i18n: 'entities.taskList.importer.title',
    parent: '/task-list',
    loader: () =>
      import(
        'src/view/taskList/importer/TaskListImporterPage'
      ),
    permissionRequired: permissions.taskListImport,
    exact: true,
  },

  {
    path: '/task-list/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.taskList.edit.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/form/TaskListFormPage'),
    permissionRequired: permissions.taskListEdit,
    exact: true,
  },

  {
    path: '/task-list/:id',
    collapseName: 'tasks',
    i18n: 'entities.taskList.view.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/view/TaskListViewPage'),
    permissionRequired: permissions.taskListRead,
    exact: true,
  },

  {
    path: '/note',
    collapseName: 'tasks',
    i18n: 'entities.note.menu',
    parent: '/tasks-breadcrumb',
    loader: () => import('src/view/note/list/NoteListPage'),
    permissionRequired: permissions.noteRead,
    exact: true,
  },

  {
    path: '/note/new',
    collapseName: 'tasks',
    i18n: 'entities.note.new.title',
    parent: '/note',
    loader: () => import('src/view/note/form/NoteFormPage'),
    permissionRequired: permissions.noteCreate,
    exact: true,
  },

  {
    path: '/note/importer',
    collapseName: 'tasks',
    i18n: 'entities.note.importer.title',
    parent: '/note',
    loader: () =>
      import('src/view/note/importer/NoteImporterPage'),
    permissionRequired: permissions.noteImport,
    exact: true,
  },

  {
    path: '/note/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.note.edit.title',
    parent: '/note',
    loader: () => import('src/view/note/form/NoteFormPage'),
    permissionRequired: permissions.noteEdit,
    exact: true,
  },

  {
    path: '/note/:id',
    collapseName: 'tasks',
    i18n: 'entities.note.view.title',
    parent: '/note',
    loader: () => import('src/view/note/view/NoteViewPage'),
    permissionRequired: permissions.noteRead,
    exact: true,
  },

  {
    path: '/risk-management',
    collapseName: 'risk-management',
    i18n: 'collapses.risks.menu',
    parent: '/',
    redirect: '/risk',
    permissionRequired: permissions.collapseRiskRead,
    virtual: true,
  },

  {
    path: '/risk',
    collapseName: 'risk-management',
    i18n: 'entities.risk.menu',
    parent: '/risk-management',
    loader: () => import('src/view/risk/list/RiskListPage'),
    permissionRequired: permissions.riskRead,
    exact: true,
  },

  {
    path: '/risk/new',
    collapseName: 'risk-management',
    i18n: 'entities.risk.new.title',
    parent: '/risk',
    loader: () => import('src/view/risk/form/RiskFormPage'),
    permissionRequired: permissions.riskCreate,
    exact: true,
  },

  {
    path: '/risk/importer',
    collapseName: 'risk-management',
    i18n: 'entities.risk.importer.title',
    parent: '/risk',
    loader: () =>
      import('src/view/risk/importer/RiskImporterPage'),
    permissionRequired: permissions.riskImport,
    exact: true,
  },

  {
    path: '/risk/:id/edit',
    collapseName: 'risk-management',
    i18n: 'entities.risk.edit.title',
    parent: '/risk',
    loader: () => import('src/view/risk/form/RiskFormPage'),
    permissionRequired: permissions.riskEdit,
    exact: true,
  },

  {
    path: '/risk/:id',
    collapseName: 'risk-management',
    i18n: 'entities.risk.view.title',
    parent: '/risk',
    loader: () => import('src/view/risk/view/RiskViewPage'),
    permissionRequired: permissions.riskRead,
    exact: true,
  },

  {
    path: '/risk-category',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.menu',
    parent: '/risk-management',
    loader: () =>
      import(
        'src/view/riskCategory/list/RiskCategoryListPage'
      ),
    permissionRequired: permissions.riskCategoryRead,
    exact: true,
  },

  {
    path: '/risk-category/new',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.new.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/form/RiskCategoryFormPage'
      ),
    permissionRequired: permissions.riskCategoryCreate,
    exact: true,
  },

  {
    path: '/risk-category/importer',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.importer.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/importer/RiskCategoryImporterPage'
      ),
    permissionRequired: permissions.riskCategoryImport,
    exact: true,
  },

  {
    path: '/risk-category/:id/edit',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.edit.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/form/RiskCategoryFormPage'
      ),
    permissionRequired: permissions.riskCategoryEdit,
    exact: true,
  },

  {
    path: '/risk-category/:id',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.view.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/view/RiskCategoryViewPage'
      ),
    permissionRequired: permissions.riskCategoryRead,
    exact: true,
  },

  {
    path: '/product',
    collapseName: 'marketplace',
    i18n: 'entities.product.menu',
    parent: '/',
    loader: () =>
      import('src/view/product/list/ProductListPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/product/new',
    collapseName: 'marketplace',
    i18n: 'entities.product.new.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productCreate,
    exact: true,
  },

  {
    path: '/product/importer',
    collapseName: 'marketplace',
    i18n: 'entities.product.importer.title',
    parent: '/product',
    loader: () =>
      import(
        'src/view/product/importer/ProductImporterPage'
      ),
    permissionRequired: permissions.productImport,
    exact: true,
  },

  {
    path: '/product/:id/edit',
    collapseName: 'marketplace',
    i18n: 'entities.product.edit.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productEdit,
    exact: true,
  },

  {
    path: '/product/:id',
    collapseName: 'marketplace',
    i18n: 'entities.product.view.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/view/ProductViewPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/product-category',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/productCategory/list/ProductCategoryListPage'
      ),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },

  {
    path: '/product-category/new',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.new.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/form/ProductCategoryFormPage'
      ),
    permissionRequired: permissions.productCategoryCreate,
    exact: true,
  },

  {
    path: '/product-category/importer',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.importer.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/importer/ProductCategoryImporterPage'
      ),
    permissionRequired: permissions.productCategoryImport,
    exact: true,
  },

  {
    path: '/product-category/:id/edit',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.edit.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/form/ProductCategoryFormPage'
      ),
    permissionRequired: permissions.productCategoryEdit,
    exact: true,
  },

  {
    path: '/product-category/:id',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.view.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/view/ProductCategoryViewPage'
      ),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },

  {
    path: '/highlight',
    i18n: 'entities.highlight.menu',
    parent: '/documents',
    loader: () =>
      import('src/view/highlight/list/HighlightListPage'),
    permissionRequired: permissions.highlightRead,
    exact: true,
  },
  {
    path: '/highlight/new',
    i18n: 'entities.highlight.new.title',
    parent: '/highlight',
    loader: () =>
      import('src/view/highlight/form/HighlightFormPage'),
    permissionRequired: permissions.highlightCreate,
    exact: true,
  },
  {
    path: '/highlight/importer',
    i18n: 'entities.highlight.importer.title',
    parent: '/highlight',
    loader: () =>
      import(
        'src/view/highlight/importer/HighlightImporterPage'
      ),
    permissionRequired: permissions.highlightImport,
    exact: true,
  },
  {
    path: '/highlight/:id/edit',
    i18n: 'entities.highlight.edit.title',
    parent: '/highlight',
    loader: () =>
      import('src/view/highlight/form/HighlightFormPage'),
    permissionRequired: permissions.highlightEdit,
    exact: true,
  },
  {
    path: '/highlight/:id',
    i18n: 'entities.highlight.view.title',
    parent: '/highlight',
    loader: () =>
      import('src/view/highlight/view/HighlightViewPage'),
    permissionRequired: permissions.highlightRead,
    exact: true,
  },

  {
    path: '/news-article',
    i18n: 'entities.newsArticle.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/newsArticle/list/NewsArticleListPage'
      ),
    permissionRequired: permissions.newsArticleRead,
    exact: true,
  },
  {
    path: '/news-article/new',
    i18n: 'entities.newsArticle.new.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/form/NewsArticleFormPage'
      ),
    permissionRequired: permissions.newsArticleCreate,
    exact: true,
  },
  {
    path: '/news-article/importer',
    i18n: 'entities.newsArticle.importer.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/importer/NewsArticleImporterPage'
      ),
    permissionRequired: permissions.newsArticleImport,
    exact: true,
  },
  {
    path: '/news-article/:id/edit',
    i18n: 'entities.newsArticle.edit.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/form/NewsArticleFormPage'
      ),
    permissionRequired: permissions.newsArticleEdit,
    exact: true,
  },
  {
    path: '/news-article/:id',
    i18n: 'entities.newsArticle.view.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/view/NewsArticleViewPage'
      ),
    permissionRequired: permissions.newsArticleRead,
    exact: true,
  },

  {
    path: '/news-favorite',
    i18n: 'entities.newsFavorite.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/newsFavorite/list/NewsFavoriteListPage'
      ),
    permissionRequired: permissions.newsFavoriteRead,
    exact: true,
  },
  {
    path: '/news-favorite/new',
    i18n: 'entities.newsFavorite.new.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/form/NewsFavoriteFormPage'
      ),
    permissionRequired: permissions.newsFavoriteCreate,
    exact: true,
  },
  {
    path: '/news-favorite/importer',
    i18n: 'entities.newsFavorite.importer.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/importer/NewsFavoriteImporterPage'
      ),
    permissionRequired: permissions.newsFavoriteImport,
    exact: true,
  },
  {
    path: '/news-favorite/:id/edit',
    i18n: 'entities.newsFavorite.edit.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/form/NewsFavoriteFormPage'
      ),
    permissionRequired: permissions.newsFavoriteEdit,
    exact: true,
  },
  {
    path: '/news-favorite/:id',
    i18n: 'entities.newsFavorite.view.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/view/NewsFavoriteViewPage'
      ),
    permissionRequired: permissions.newsFavoriteRead,
    exact: true,
  },

  {
    path: '/tag',
    i18n: 'entities.tag.menu',
    parent: '/',
    loader: () => import('src/view/tag/list/TagListPage'),
    permissionRequired: permissions.tagRead,
    exact: true,
  },
  {
    path: '/tag/new',
    i18n: 'entities.tag.new.title',
    parent: '/tag',
    loader: () => import('src/view/tag/form/TagFormPage'),
    permissionRequired: permissions.tagCreate,
    exact: true,
  },
  {
    path: '/tag/importer',
    i18n: 'entities.tag.importer.title',
    parent: '/tag',
    loader: () =>
      import('src/view/tag/importer/TagImporterPage'),
    permissionRequired: permissions.tagImport,
    exact: true,
  },
  {
    path: '/tag/:id/edit',
    i18n: 'entities.tag.edit.title',
    parent: '/tag',
    loader: () => import('src/view/tag/form/TagFormPage'),
    permissionRequired: permissions.tagEdit,
    exact: true,
  },
  {
    path: '/tag/:id',
    i18n: 'entities.tag.view.title',
    parent: '/tag',
    loader: () => import('src/view/tag/view/TagViewPage'),
    permissionRequired: permissions.tagRead,
    exact: true,
  },

  {
    path: '/documents',
    collapseName: 'documents',
    i18n: 'collapses.documents.menu',
    parent: '/',
    redirect: '/document',
    permissionRequired: permissions.collapseDocumentRead,
    virtual: true,
  },

  {
    path: '/document',
    collapseName: 'documents',
    i18n: 'entities.document.menu',
    parent: '/documents',
    loader: () =>
      import('src/view/document/list/DocumentListPage'),
    permissionRequired: permissions.documentRead,
    exact: true,
  },

  {
    path: '/policy-template',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.menu',
    parent: '/documents',
    loader: () =>
      import(
        'src/view/policyTemplate/list/PolicyTemplateListPage'
      ),
    permissionRequired: permissions.policyTemplateRead,
    exact: true,
  },
  {
    path: '/policy-template/new',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.new.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/form/PolicyTemplateFormPage'
      ),
    permissionRequired: permissions.policyTemplateCreate,
    exact: true,
  },
  {
    path: '/policy-template/importer',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.importer.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/importer/PolicyTemplateImporterPage'
      ),
    permissionRequired: permissions.policyTemplateImport,
    exact: true,
  },
  {
    path: '/policy-template/:id/edit',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.edit.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/form/PolicyTemplateFormPage'
      ),
    permissionRequired: permissions.policyTemplateEdit,
    exact: true,
  },
  {
    path: '/policy-template/:id',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.view.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/view/PolicyTemplateViewPage'
      ),
    permissionRequired: permissions.policyTemplateRead,
    exact: true,
  },

  {
    path: '/policy',
    collapseName: 'documents',
    i18n: 'entities.policy.menu',
    parent: '/documents',
    loader: () =>
      import('src/view/policy/list/PolicyListPage'),
    permissionRequired: permissions.policyRead,
    exact: true,
  },
  {
    path: '/policy/new',
    collapseName: 'documents',
    i18n: 'entities.policy.new.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/form/PolicyFormPage'),
    permissionRequired: permissions.policyCreate,
    exact: true,
  },
  {
    path: '/policy/importer',
    collapseName: 'documents',
    i18n: 'entities.policy.importer.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/importer/PolicyImporterPage'),
    permissionRequired: permissions.policyImport,
    exact: true,
  },
  {
    path: '/policy/:id/:version/edit',
    collapseName: 'documents',
    i18n: 'entities.policy.edit.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/form/PolicyFormPage'),
    permissionRequired: permissions.policyEdit,
    exact: true,
  },
  {
    path: '/policy/:id/edit',
    collapseName: 'documents',
    i18n: 'entities.policy.edit.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/form/PolicyFormPage'),
    permissionRequired: permissions.policyEdit,
    exact: true,
  },
  {
    path: '/policy/:id/:version',
    collapseName: 'documents',
    i18n: 'entities.policy.view.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/view/PolicyViewPage'),
    permissionRequired: permissions.policyRead,
    exact: true,
  },
  {
    path: '/policy/:id',
    collapseName: 'documents',
    i18n: 'entities.policy.view.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/view/PolicyViewPage'),
    permissionRequired: permissions.policyRead,
    exact: true,
  },

  {
    path: '/campaigns',
    collapseName: 'campaigns',
    i18n: 'collapses.campaigns.menu',
    parent: '/',
    redirect: '/campaign',
    permissionRequired: permissions.collapseCampaignRead,
    virtual: true,
  },

  {
    path: '/campaign',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.menu',
    parent: '/campaigns',
    loader: () =>
      import('src/view/campaign/list/CampaignListPage'),
    permissionRequired: permissions.campaignRead,
    exact: true,
  },
  {
    path: '/campaign/new',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.new.title',
    parent: '/campaign',
    loader: () =>
      import('src/view/campaign/form/CampaignFormPage'),
    permissionRequired: permissions.campaignCreate,
    exact: true,
  },
  {
    path: '/campaign/importer',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.importer.title',
    parent: '/campaign',
    loader: () =>
      import(
        'src/view/campaign/importer/CampaignImporterPage'
      ),
    permissionRequired: permissions.campaignImport,
    exact: true,
  },
  {
    path: '/campaign/:id/edit',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.edit.title',
    parent: '/campaign',
    loader: () =>
      import('src/view/campaign/form/CampaignFormPage'),
    permissionRequired: permissions.campaignEdit,
    exact: true,
  },
  {
    path: '/campaign/:id',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.view.title',
    parent: '/campaign',
    loader: () =>
      import('src/view/campaign/view/CampaignViewPage'),
    permissionRequired: permissions.campaignRead,
    exact: true,
  },
  {
    path: '/campaign/:id/:instance',
    collapseName: 'campaigns',
    i18n: 'entities.campaign.view.instance',
    parent: '/campaign/:id',
    loader: () =>
      import(
        'src/view/campaign/view/CampaignInstanceViewPage'
      ),
    permissionRequired: permissions.campaignRead,
    exact: true,
  },

  {
    path: '/campaign-instance',
    collapseName: 'questionnaires',
    i18n: 'entities.campaignInstance.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/campaignInstance/list/CampaignInstanceListPage'
      ),
    permissionRequired: permissions.campaignInstanceRead,
    exact: true,
  },
  {
    path: '/campaign-instance/:id',
    collapseName: 'questionnaires',
    i18n: 'entities.campaignInstance.view.title',
    parent: '/campaign-instance',
    loader: () =>
      import(
        'src/view/campaignInstance/view/CampaignInstanceViewPage'
      ),
    permissionRequired: permissions.campaignInstanceRead,
    exact: true,
  },

  {
    path: '/email-template',
    collapseName: 'campaigns',
    i18n: 'entities.emailTemplate.menu',
    parent: '/campaigns',
    loader: () =>
      import(
        'src/view/emailTemplate/list/EmailTemplateListPage'
      ),
    permissionRequired: permissions.emailTemplateRead,
    exact: true,
  },
  {
    path: '/email-template/new',
    collapseName: 'campaigns',
    i18n: 'entities.emailTemplate.new.title',
    parent: '/email-template',
    loader: () =>
      import(
        'src/view/emailTemplate/form/EmailTemplateFormPage'
      ),
    permissionRequired: permissions.emailTemplateCreate,
    exact: true,
  },
  {
    path: '/email-template/importer',
    collapseName: 'campaigns',
    i18n: 'entities.emailTemplate.importer.title',
    parent: '/email-template',
    loader: () =>
      import(
        'src/view/emailTemplate/importer/EmailTemplateImporterPage'
      ),
    permissionRequired: permissions.emailTemplateImport,
    exact: true,
  },
  {
    path: '/email-template/:id/edit',
    collapseName: 'campaigns',
    i18n: 'entities.emailTemplate.edit.title',
    parent: '/email-template',
    loader: () =>
      import(
        'src/view/emailTemplate/form/EmailTemplateFormPage'
      ),
    permissionRequired: permissions.emailTemplateEdit,
    exact: true,
  },
  {
    path: '/email-template/:id',
    collapseName: 'campaigns',
    i18n: 'entities.emailTemplate.view.title',
    parent: '/email-template',
    loader: () =>
      import(
        'src/view/emailTemplate/view/EmailTemplateViewPage'
      ),
    permissionRequired: permissions.emailTemplateRead,
    exact: true,
  },

  {
    path: '/questionnaire-template',
    collapseName: 'campaigns',
    i18n: 'entities.questionnaireTemplate.menu',
    parent: '/campaigns',
    loader: () =>
      import(
        'src/view/questionnaireTemplate/list/QuestionnaireTemplateListPage'
      ),
    permissionRequired:
      permissions.questionnaireTemplateRead,
    exact: true,
  },
  {
    path: '/questionnaire-template/new',
    collapseName: 'campaigns',
    i18n: 'entities.questionnaireTemplate.new.title',
    parent: '/questionnaire-template',
    loader: () =>
      import(
        'src/view/questionnaireTemplate/form/QuestionnaireTemplateFormPage'
      ),
    permissionRequired:
      permissions.questionnaireTemplateCreate,
    exact: true,
  },
  {
    path: '/questionnaire-template/importer',
    collapseName: 'campaigns',
    i18n: 'entities.questionnaireTemplate.importer.title',
    parent: '/questionnaire-template',
    loader: () =>
      import(
        'src/view/questionnaireTemplate/importer/QuestionnaireTemplateImporterPage'
      ),
    permissionRequired:
      permissions.questionnaireTemplateImport,
    exact: true,
  },
  {
    path: '/questionnaire-template/:id/edit',
    collapseName: 'campaigns',
    i18n: 'entities.questionnaireTemplate.edit.title',
    parent: '/questionnaire-template',
    loader: () =>
      import(
        'src/view/questionnaireTemplate/form/QuestionnaireTemplateFormPage'
      ),
    permissionRequired:
      permissions.questionnaireTemplateEdit,
    exact: true,
  },
  {
    path: '/questionnaire-template/:id',
    collapseName: 'campaigns',
    i18n: 'entities.questionnaireTemplate.view.title',
    parent: '/questionnaire-template',
    loader: () =>
      import(
        'src/view/questionnaireTemplate/view/QuestionnaireTemplateViewPage'
      ),
    permissionRequired:
      permissions.questionnaireTemplateRead,
    exact: true,
  },

  {
    path: '/client-management',
    collapseName: 'client-management',
    i18n: 'collapses.clients.menu',
    parent: '/',
    redirect: '/client',
    permissionRequired: permissions.collapseClientRead,
    virtual: true,
  },

  {
    path: '/client',
    collapseName: 'client-management',
    i18n: 'entities.client.menu',
    parent: '/client-management',
    loader: () =>
      import('src/view/client/list/ClientListPage'),
    permissionRequired: permissions.clientRead,
    exact: true,
  },
  {
    path: '/client/new',
    collapseName: 'client-management',
    i18n: 'entities.client.new.title',
    parent: '/client',
    loader: () =>
      import('src/view/client/form/ClientFormPage'),
    permissionRequired: permissions.clientCreate,
    exact: true,
  },
  {
    path: '/client/importer',
    collapseName: 'client-management',
    i18n: 'entities.client.importer.title',
    parent: '/client',
    loader: () =>
      import('src/view/client/importer/ClientImporterPage'),
    permissionRequired: permissions.clientImport,
    exact: true,
  },
  {
    path: '/client/:id/edit',
    collapseName: 'client-management',
    i18n: 'entities.client.edit.title',
    parent: '/client',
    loader: () =>
      import('src/view/client/form/ClientFormPage'),
    permissionRequired: permissions.clientEdit,
    exact: true,
  },
  {
    path: '/client/:id',
    collapseName: 'client-management',
    i18n: 'entities.client.view.title',
    parent: '/client',
    loader: () =>
      import('src/view/client/view/ClientViewPage'),
    permissionRequired: permissions.clientRead,
    exact: true,
  },

  {
    path: '/client-category',
    collapseName: 'client-management',
    i18n: 'entities.clientCategory.menu',
    parent: '/client-management',
    loader: () =>
      import(
        'src/view/clientCategory/list/ClientCategoryListPage'
      ),
    permissionRequired: permissions.clientCategoryRead,
    exact: true,
  },
  {
    path: '/client-category/new',
    collapseName: 'client-management',
    i18n: 'entities.client.new.title',
    parent: '/client-category',
    loader: () =>
      import(
        'src/view/clientCategory/form/ClientCategoryFormPage'
      ),
    permissionRequired: permissions.clientCategoryCreate,
    exact: true,
  },
  {
    path: '/client-category/importer',
    collapseName: 'client-management',
    i18n: 'entities.client.importer.title',
    parent: '/client-category',
    loader: () =>
      import(
        'src/view/clientCategory/importer/ClientCategoryImporterPage'
      ),
    permissionRequired: permissions.clientCategoryImport,
    exact: true,
  },
  {
    path: '/client-category/:id/edit',
    collapseName: 'client-management',
    i18n: 'entities.client.edit.title',
    parent: '/client-category',
    loader: () =>
      import(
        'src/view/clientCategory/form/ClientCategoryFormPage'
      ),
    permissionRequired: permissions.clientCategoryEdit,
    exact: true,
  },
  {
    path: '/client-category/:id',
    collapseName: 'client-management',
    i18n: 'entities.client.view.title',
    parent: '/client-category',
    loader: () =>
      import(
        'src/view/clientCategory/view/ClientCategoryViewPage'
      ),
    permissionRequired: permissions.clientCategoryRead,
    exact: true,
  },

  {
    path: '/compliance-templates-management',
    collapseName: 'compliance-templates-management',
    i18n: 'collapses.complianceTemplates.menu',
    parent: '/',
    redirect: '/program-template',
    permissionRequired:
      permissions.collapseComplianceTemplatesRead,
    virtual: true,
  },

  {
    path: '/program-template',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programTemplate.menu',
    parent: '/compliance-templates-management',
    loader: () =>
      import(
        'src/view/programTemplate/list/ProgramTemplateListPage'
      ),
    permissionRequired: permissions.programTemplateRead,
    exact: true,
  },
  {
    path: '/program-template/new',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programTemplate.new.title',
    parent: '/program-template',
    loader: () =>
      import(
        'src/view/programTemplate/form/ProgramTemplateFormPage'
      ),
    permissionRequired: permissions.programTemplateCreate,
    exact: true,
  },
  {
    path: '/program-template/importer',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programTemplate.importer.title',
    parent: '/program-template',
    loader: () =>
      import(
        'src/view/programTemplate/importer/ProgramTemplateImporterPage'
      ),
    permissionRequired: permissions.programTemplateImport,
    exact: true,
  },
  {
    path: '/program-template/:id/edit',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programTemplate.edit.title',
    parent: '/program-template',
    loader: () =>
      import(
        'src/view/programTemplate/form/ProgramTemplateFormPage'
      ),
    permissionRequired: permissions.programTemplateEdit,
    exact: true,
  },
  {
    path: '/program-template/:id',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programTemplate.view.title',
    parent: '/program-template',
    loader: () =>
      import(
        'src/view/programTemplate/view/ProgramTemplateViewPage'
      ),
    permissionRequired: permissions.programTemplateRead,
    exact: true,
  },

  {
    path: '/program-requirement-template',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementTemplate.menu',
    parent: '/compliance-templates-management',
    loader: () =>
      import(
        'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListPage'
      ),
    permissionRequired:
      permissions.programRequirementTemplateRead,
    exact: true,
  },
  {
    path: '/program-requirement-template/new',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementTemplate.new.title',
    parent: '/program-requirement-template',
    loader: () =>
      import(
        'src/view/programRequirementTemplate/form/ProgramRequirementTemplateFormPage'
      ),
    permissionRequired:
      permissions.programRequirementTemplateCreate,
    exact: true,
  },
  {
    path: '/program-requirement-template/importer',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementTemplate.importer.title',
    parent: '/program-requirement-template',
    loader: () =>
      import(
        'src/view/programRequirementTemplate/importer/ProgramRequirementTemplateImporterPage'
      ),
    permissionRequired:
      permissions.programRequirementTemplateImport,
    exact: true,
  },
  {
    path: '/program-requirement-template/:id/edit',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementTemplate.edit.title',
    parent: '/program-requirement-template',
    loader: () =>
      import(
        'src/view/programRequirementTemplate/form/ProgramRequirementTemplateFormPage'
      ),
    permissionRequired:
      permissions.programRequirementTemplateEdit,
    exact: true,
  },
  {
    path: '/program-requirement-template/:id',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementTemplate.view.title',
    parent: '/program-requirement-template',
    loader: () =>
      import(
        'src/view/programRequirementTemplate/view/ProgramRequirementTemplateViewPage'
      ),
    permissionRequired:
      permissions.programRequirementTemplateRead,
    exact: true,
  },

  {
    path: '/program-requirement-guidance-template',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementGuidanceTemplate.menu',
    parent: '/compliance-templates-management',
    loader: () =>
      import(
        'src/view/programRequirementGuidanceTemplate/list/ProgramRequirementGuidanceTemplateListPage'
      ),
    permissionRequired:
      permissions.programRequirementGuidanceTemplateRead,
    exact: true,
  },
  {
    path: '/program-requirement-guidance-template/new',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementGuidanceTemplate.new.title',
    parent: '/program-requirement-guidance-template',
    loader: () =>
      import(
        'src/view/programRequirementGuidanceTemplate/form/ProgramRequirementGuidanceTemplateFormPage'
      ),
    permissionRequired:
      permissions.programRequirementGuidanceTemplateCreate,
    exact: true,
  },
  {
    path: '/program-requirement-guidance-template/importer',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementGuidanceTemplate.importer.title',
    parent: '/program-requirement-guidance-template',
    loader: () =>
      import(
        'src/view/programRequirementGuidanceTemplate/importer/ProgramRequirementGuidanceTemplateImporterPage'
      ),
    permissionRequired:
      permissions.programRequirementGuidanceTemplateImport,
    exact: true,
  },
  {
    path: '/program-requirement-guidance-template/:id/edit',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementGuidanceTemplate.edit.title',
    parent: '/program-requirement-guidance-template',
    loader: () =>
      import(
        'src/view/programRequirementGuidanceTemplate/form/ProgramRequirementGuidanceTemplateFormPage'
      ),
    permissionRequired:
      permissions.programRequirementGuidanceTemplateEdit,
    exact: true,
  },
  {
    path: '/program-requirement-guidance-template/:id',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programRequirementGuidanceTemplate.view.title',
    parent: '/program-requirement-guidance-template',
    loader: () =>
      import(
        'src/view/programRequirementGuidanceTemplate/view/ProgramRequirementGuidanceTemplateViewPage'
      ),
    permissionRequired:
      permissions.programRequirementGuidanceTemplateRead,
    exact: true,
  },

  {
    path: '/program-control-template',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programControlTemplate.menu',
    parent: '/compliance-templates-management',
    loader: () =>
      import(
        'src/view/programControlTemplate/list/ProgramControlTemplateListPage'
      ),
    permissionRequired:
      permissions.programControlTemplateRead,
    exact: true,
  },
  {
    path: '/program-control-template/new',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programControlTemplate.new.title',
    parent: '/program-control-template',
    loader: () =>
      import(
        'src/view/programControlTemplate/form/ProgramControlTemplateFormPage'
      ),
    permissionRequired:
      permissions.programControlTemplateCreate,
    exact: true,
  },
  {
    path: '/program-control-template/importer',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programControlTemplate.importer.title',
    parent: '/program-control-template',
    loader: () =>
      import(
        'src/view/programControlTemplate/importer/ProgramControlTemplateImporterPage'
      ),
    permissionRequired:
      permissions.programControlTemplateImport,
    exact: true,
  },
  {
    path: '/program-control-template/:id/edit',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programControlTemplate.edit.title',
    parent: '/program-control-template',
    loader: () =>
      import(
        'src/view/programControlTemplate/form/ProgramControlTemplateFormPage'
      ),
    permissionRequired:
      permissions.programControlTemplateEdit,
    exact: true,
  },
  {
    path: '/program-control-template/:id',
    collapseName: 'compliance-templates-management',
    i18n: 'entities.programControlTemplate.view.title',
    parent: '/program-control-template',
    loader: () =>
      import(
        'src/view/programControlTemplate/view/ProgramControlTemplateViewPage'
      ),
    permissionRequired:
      permissions.programControlTemplateRead,
    exact: true,
  },

  {
    path: '/compliance-management',
    collapseName: 'compliance-management',
    i18n: 'collapses.compliance.menu',
    parent: '/',
    redirect: '/program',
    permissionRequired: permissions.collapseComplianceRead,
    virtual: true,
  },

  {
    path: '/program',
    collapseName: 'compliance-management',
    i18n: 'entities.program.menu',
    parent: '/compliance-management',
    loader: () =>
      import('src/view/program/list/ProgramListPage'),
    permissionRequired: permissions.programRead,
    exact: true,
  },
  {
    path: '/program/new',
    collapseName: 'compliance-management',
    i18n: 'entities.program.new.title',
    parent: '/program',
    loader: () =>
      import('src/view/program/form/ProgramFormPage'),
    permissionRequired: permissions.programCreate,
    exact: true,
  },
  {
    path: '/program/importer',
    collapseName: 'compliance-management',
    i18n: 'entities.program.importer.title',
    parent: '/program',
    loader: () =>
      import(
        'src/view/program/importer/ProgramImporterPage'
      ),
    permissionRequired: permissions.programImport,
    exact: true,
  },
  {
    path: '/program/:id/edit',
    collapseName: 'compliance-management',
    i18n: 'entities.program.edit.title',
    parent: '/program',
    loader: () =>
      import('src/view/program/form/ProgramFormPage'),
    permissionRequired: permissions.programEdit,
    exact: true,
  },
  {
    path: '/program/:id',
    collapseName: 'compliance-management',
    i18n: 'entities.program.view.title',
    parent: '/program',
    loader: () =>
      import('src/view/program/view/ProgramViewPage'),
    permissionRequired: permissions.programRead,
    exact: true,
  },

  {
    path: '/program-requirement',
    collapseName: 'compliance-management',
    i18n: 'entities.programRequirement.menu',
    parent: '/compliance-management',
    loader: () =>
      import(
        'src/view/programRequirement/list/ProgramRequirementListPage'
      ),
    permissionRequired: permissions.programRequirementRead,
    exact: true,
  },
  {
    path: '/program-requirement/new',
    collapseName: 'compliance-management',
    i18n: 'entities.programRequirement.new.title',
    parent: '/program-requirement',
    loader: () =>
      import(
        'src/view/programRequirement/form/ProgramRequirementFormPage'
      ),
    permissionRequired:
      permissions.programRequirementCreate,
    exact: true,
  },
  {
    path: '/program-requirement/importer',
    collapseName: 'compliance-management',
    i18n: 'entities.programRequirement.importer.title',
    parent: '/program-requirement',
    loader: () =>
      import(
        'src/view/programRequirement/importer/ProgramRequirementImporterPage'
      ),
    permissionRequired:
      permissions.programRequirementImport,
    exact: true,
  },
  {
    path: '/program-requirement/:id/edit',
    collapseName: 'compliance-management',
    i18n: 'entities.programRequirement.edit.title',
    parent: '/program-requirement',
    loader: () =>
      import(
        'src/view/programRequirement/form/ProgramRequirementFormPage'
      ),
    permissionRequired: permissions.programRequirementEdit,
    exact: true,
  },
  {
    path: '/program-requirement/:id',
    collapseName: 'compliance-management',
    i18n: 'entities.programRequirement.view.title',
    parent: '/program-requirement',
    loader: () =>
      import(
        'src/view/programRequirement/view/ProgramRequirementViewPage'
      ),
    permissionRequired: permissions.programRequirementRead,
    exact: true,
  },

  {
    path: '/program-control',
    collapseName: 'compliance-management',
    i18n: 'entities.programControl.menu',
    parent: '/compliance-management',
    loader: () =>
      import(
        'src/view/programControl/list/ProgramControlListPage'
      ),
    permissionRequired: permissions.programControlRead,
    exact: true,
  },
  {
    path: '/program-control/new',
    collapseName: 'compliance-management',
    i18n: 'entities.programControl.new.title',
    parent: '/program-control',
    loader: () =>
      import(
        'src/view/programControl/form/ProgramControlFormPage'
      ),
    permissionRequired: permissions.programControlCreate,
    exact: true,
  },
  {
    path: '/program-control/importer',
    collapseName: 'compliance-management',
    i18n: 'entities.programControl.importer.title',
    parent: '/program-control',
    loader: () =>
      import(
        'src/view/programControl/importer/ProgramControlImporterPage'
      ),
    permissionRequired: permissions.programControlImport,
    exact: true,
  },
  {
    path: '/program-control/:id/edit',
    collapseName: 'compliance-management',
    i18n: 'entities.programControl.edit.title',
    parent: '/program-control',
    loader: () =>
      import(
        'src/view/programControl/form/ProgramControlFormPage'
      ),
    permissionRequired: permissions.programControlEdit,
    exact: true,
  },
  {
    path: '/program-control/:id',
    collapseName: 'compliance-management',
    i18n: 'entities.programControl.view.title',
    parent: '/program-control',
    loader: () =>
      import(
        'src/view/programControl/view/ProgramControlViewPage'
      ),
    permissionRequired: permissions.programControlRead,
    exact: true,
  },

  {
    path: '/user-group',
    collapseName: 'my-profile',
    i18n: 'entities.userGroup.menu',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/userGroup/list/UserGroupListPage'),
    permissionRequired: permissions.userGroupRead,
    exact: true,
  },
  {
    path: '/user-group/new',
    collapseName: 'my-profile',
    i18n: 'entities.userGroup.new.title',
    parent: '/user-group',
    loader: () =>
      import(
        'src/view/userGroup/form/NewUserGroupFormPage'
      ),
    permissionRequired: permissions.userGroupCreate,
    exact: true,
  },
  {
    path: '/user-group/importer',
    collapseName: 'my-profile',
    i18n: 'entities.userGroup.importer.title',
    parent: '/user-group',
    loader: () =>
      import(
        'src/view/userGroup/importer/UserGroupImporterPage'
      ),
    permissionRequired: permissions.userGroupImport,
    exact: true,
  },
  {
    path: '/user-group/:id/edit',
    collapseName: 'my-profile',
    i18n: 'entities.userGroup.edit.title',
    parent: '/user-group',
    loader: () =>
      import(
        'src/view/userGroup/form/EditUserGroupFormPage'
      ),
    permissionRequired: permissions.userGroupEdit,
    exact: true,
  },
  {
    path: '/user-group/:id',
    collapseName: 'my-profile',
    i18n: 'entities.userGroup.view.title',
    parent: '/user-group',
    loader: () =>
      import('src/view/userGroup/view/UserGroupViewPage'),
    permissionRequired: permissions.userGroupRead,
    exact: true,
  },

  {
    path: '/projects-breadcrumb',
    collapseName: 'project-management',
    i18n: 'collapses.projects.menu',
    parent: '/',
    redirect: '/project',
    permissionRequired: permissions.collapseProjectRead,
    virtual: true,
  },

  {
    path: '/project',
    collapseName: 'project-management',
    i18n: 'entities.project.menu',
    parent: '/projects-breadcrumb',
    loader: () =>
      import('src/view/project/list/ProjectListPage'),
    permissionRequired: permissions.projectRead,
    exact: true,
  },
  {
    path: '/project/new',
    collapseName: 'project-management',
    i18n: 'entities.project.new.title',
    parent: '/project',
    loader: () =>
      import('src/view/project/form/ProjectFormPage'),
    permissionRequired: permissions.projectCreate,
    exact: true,
  },
  {
    path: '/project/importer',
    collapseName: 'project-management',
    i18n: 'entities.project.importer.title',
    parent: '/project',
    loader: () =>
      import(
        'src/view/project/importer/ProjectImporterPage'
      ),
    permissionRequired: permissions.projectImport,
    exact: true,
  },
  {
    path: '/project/:id/edit',
    collapseName: 'project-management',
    i18n: 'entities.project.edit.title',
    parent: '/project',
    loader: () =>
      import('src/view/project/form/ProjectFormPage'),
    permissionRequired: permissions.projectEdit,
    exact: true,
  },
  {
    path: '/project/:id',
    collapseName: 'project-management',
    i18n: 'entities.project.view.title',
    parent: '/project',
    loader: () =>
      import('src/view/project/view/ProjectViewPage'),
    permissionRequired: permissions.projectRead,
    exact: true,
  },

  {
    path: '/project-priority',
    collapseName: 'project-management',
    i18n: 'entities.projectPriority.menu',
    parent: '/projects-breadcrumb',
    loader: () =>
      import(
        'src/view/projectPriority/list/ProjectPriorityListPage'
      ),
    permissionRequired: permissions.projectPriorityRead,
    exact: true,
  },
  {
    path: '/project-priority/new',
    collapseName: 'project-management',
    i18n: 'entities.projectPriority.new.title',
    parent: '/project-priority',
    loader: () =>
      import(
        'src/view/projectPriority/form/ProjectPriorityFormPage'
      ),
    permissionRequired: permissions.projectPriorityCreate,
    exact: true,
  },
  {
    path: '/project-priority/importer',
    collapseName: 'project-management',
    i18n: 'entities.projectPriority.importer.title',
    parent: '/project-priority',
    loader: () =>
      import(
        'src/view/projectPriority/importer/ProjectPriorityImporterPage'
      ),
    permissionRequired: permissions.projectPriorityImport,
    exact: true,
  },
  {
    path: '/project-priority/:id/edit',
    collapseName: 'project-management',
    i18n: 'entities.projectPriority.edit.title',
    parent: '/project-priority',
    loader: () =>
      import(
        'src/view/projectPriority/form/ProjectPriorityFormPage'
      ),
    permissionRequired: permissions.projectPriorityEdit,
    exact: true,
  },
  {
    path: '/project-priority/:id',
    collapseName: 'project-management',
    i18n: 'entities.projectPriority.view.title',
    parent: '/project-priority',
    loader: () =>
      import(
        'src/view/projectPriority/view/ProjectPriorityViewPage'
      ),
    permissionRequired: permissions.projectPriorityRead,
    exact: true,
  },

  {
    path: '/project-status',
    collapseName: 'project-management',
    i18n: 'entities.projectStatus.menu',
    parent: '/projects-breadcrumb',
    loader: () =>
      import(
        'src/view/projectStatus/list/ProjectStatusListPage'
      ),
    permissionRequired: permissions.projectStatusRead,
    exact: true,
  },
  {
    path: '/project-status/new',
    collapseName: 'project-management',
    i18n: 'entities.projectStatus.new.title',
    parent: '/project-status',
    loader: () =>
      import(
        'src/view/projectStatus/form/ProjectStatusFormPage'
      ),
    permissionRequired: permissions.projectStatusCreate,
    exact: true,
  },
  {
    path: '/project-status/importer',
    collapseName: 'project-management',
    i18n: 'entities.projectStatus.importer.title',
    parent: '/project-status',
    loader: () =>
      import(
        'src/view/projectStatus/importer/ProjectStatusImporterPage'
      ),
    permissionRequired: permissions.projectStatusImport,
    exact: true,
  },
  {
    path: '/project-status/:id/edit',
    collapseName: 'project-management',
    i18n: 'entities.projectStatus.edit.title',
    parent: '/project-status',
    loader: () =>
      import(
        'src/view/projectStatus/form/ProjectStatusFormPage'
      ),
    permissionRequired: permissions.projectStatusEdit,
    exact: true,
  },
  {
    path: '/project-status/:id',
    collapseName: 'project-management',
    i18n: 'entities.projectStatus.view.title',
    parent: '/project-status',
    loader: () =>
      import(
        'src/view/projectStatus/view/ProjectStatusViewPage'
      ),
    permissionRequired: permissions.projectStatusRead,
    exact: true,
  },

  {
    path: '/project-type',
    collapseName: 'project-management',
    i18n: 'entities.projectType.menu',
    parent: '/projects-breadcrumb',
    loader: () =>
      import(
        'src/view/projectType/list/ProjectTypeListPage'
      ),
    permissionRequired: permissions.projectTypeRead,
    exact: true,
  },
  {
    path: '/project-type/new',
    collapseName: 'project-management',
    i18n: 'entities.projectType.new.title',
    parent: '/project-type',
    loader: () =>
      import(
        'src/view/projectType/form/ProjectTypeFormPage'
      ),
    permissionRequired: permissions.projectTypeCreate,
    exact: true,
  },
  {
    path: '/project-type/importer',
    collapseName: 'project-management',
    i18n: 'entities.projectType.importer.title',
    parent: '/project-type',
    loader: () =>
      import(
        'src/view/projectType/importer/ProjectTypeImporterPage'
      ),
    permissionRequired: permissions.projectTypeImport,
    exact: true,
  },
  {
    path: '/project-type/:id/edit',
    collapseName: 'project-management',
    i18n: 'entities.projectType.edit.title',
    parent: '/project-type',
    loader: () =>
      import(
        'src/view/projectType/form/ProjectTypeFormPage'
      ),
    permissionRequired: permissions.projectTypeEdit,
    exact: true,
  },
  {
    path: '/project-type/:id',
    collapseName: 'project-management',
    i18n: 'entities.projectType.view.title',
    parent: '/project-type',
    loader: () =>
      import(
        'src/view/projectType/view/ProjectTypeViewPage'
      ),
    permissionRequired: permissions.projectTypeRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  // {
  //   path: '/auth/signup',
  //   loader: () => import('src/view/auth/SignupPage'),
  // },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

export function findRoute(url = null, routes = []) {
  return (
    !!url &&
    (routes.find((route) => url === route.path) ||
      routes.find(
        (route) =>
          /\/:[\w\d_-]+/g.test(route.path) &&
          new RegExp(
            `^${route.path.replace(
              /:[\w\d_-]+/g,
              '[\\w\\d]+',
            )}$`,
          ).test(url),
      ))
  );
}

export function matchedRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, privateRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}

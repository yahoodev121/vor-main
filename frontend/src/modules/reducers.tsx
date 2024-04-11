import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import plan from 'src/modules/plan/planReducers';
import user from 'src/modules/user/userReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import vendor from 'src/modules/vendor/vendorReducers';
import vendorCategory from 'src/modules/vendorCategory/vendorCategoryReducers';
import task from 'src/modules/task/taskReducers';
import taskPriority from 'src/modules/taskPriority/taskPriorityReducers';
import taskList from 'src/modules/taskList/taskListReducers';
import qaLibrary from 'src/modules/qaLibrary/qaLibraryReducers';
import note from 'src/modules/note/noteReducers';
import risk from 'src/modules/risk/riskReducers';
import riskCategory from 'src/modules/riskCategory/riskCategoryReducers';
import product from 'src/modules/product/productReducers';
import productCategory from 'src/modules/productCategory/productCategoryReducers';
import newsArticle from 'src/modules/newsArticle/newsArticleReducers';
import newsFavorite from 'src/modules/newsFavorite/newsFavoriteReducers';
import tag from 'src/modules/tag/tagReducers';
import policyTemplate from 'src/modules/policyTemplate/policyTemplateReducers';
import policy from 'src/modules/policy/policyReducers';
import campaign from 'src/modules/campaign/campaignReducers';
import campaignInstance from 'src/modules/campaignInstance/campaignInstanceReducers';
import emailTemplate from 'src/modules/emailTemplate/emailTemplateReducers';
import questionnaireTemplate from 'src/modules/questionnaireTemplate/questionnaireTemplateReducers';
import client from 'src/modules/client/clientReducers';
import clientCategory from 'src/modules/clientCategory/clientCategoryReducers';
import highlight from 'src/modules/highlight/highlightReducers';
import programTemplate from 'src/modules/programTemplate/programTemplateReducers';
import programRequirementTemplate from 'src/modules/programRequirementTemplate/programRequirementTemplateReducers';
import programRequirementGuidanceTemplate from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateReducers';
import programControlTemplate from 'src/modules/programControlTemplate/programControlTemplateReducers';
import program from 'src/modules/program/programReducers';
import programRequirement from 'src/modules/programRequirement/programRequirementReducers';
import programControl from 'src/modules/programControl/programControlReducers';
import userGroup from 'src/modules/userGroup/userGroupReducers';
import project from 'src/modules/project/projectReducers';
import projectPriority from 'src/modules/projectPriority/projectPriorityReducers';
import projectStatus from 'src/modules/projectStatus/projectStatusReducers';
import projectType from 'src/modules/projectType/projectTypeReducers';
import { combineReducers } from 'redux';
import form from 'src/modules/form/formReducers';
import document from 'src/modules/document/documentReducers';
import mui from 'src/modules/mui/muiReducers';
import widget from 'src/modules/widget/widgetReducers';
import taskInstance from 'src/modules/taskInstance/taskInstanceReducers';
import sessionDevice from 'src/modules/sessionDevice/sessionDeviceReducers';
import vorAI from 'src/modules/vorAI/vorAIReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    document,
    form,
    mui,
    widget,
    taskInstance,
    sessionDevice,
    layout,
    auth,
    tenant,
    plan,
    user,
    auditLog,
    settings,
    vendor,
    vendorCategory,
    task,
    taskPriority,
    taskList,
    qaLibrary,
    note,
    risk,
    riskCategory,
    product,
    productCategory,
    newsArticle,
    newsFavorite,
    tag,
    policyTemplate,
    policy,
    campaign,
    campaignInstance,
    emailTemplate,
    questionnaireTemplate,
    client,
    clientCategory,
    highlight,
    vorAI,
    programTemplate,
    programRequirementTemplate,
    programRequirementGuidanceTemplate,
    programControlTemplate,
    program,
    programRequirement,
    programControl,
    userGroup,
    project,
    projectPriority,
    projectStatus,
    projectType,
  });

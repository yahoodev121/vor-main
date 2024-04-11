const models = [
  require('./mui').default,
  require('./tenant').default,
  require('./auditLog').default,
  require('./settings').default,
  require('./file').default,
  require('./user').default,
  require('./sessionDevice').default,
  require('./reference').default,
  require('./vendor').default,
  require('./vendorCategory').default,
  require('./task').default,
  require('./taskInstance').default,
  require('./taskPriority').default,
  require('./taskList').default,
  require('./note').default,
  require('./risk').default,
  require('./riskCategory').default,
  require('./product').default,
  require('./productCategory').default,
  require('./productFavorite').default,
  require('./newsArticle').default,
  require('./newsFavorite').default,
  require('./tag').default,
  require('./tagRef').default,
  require('./policyTemplate').default,
  require('./policyTemplateFavorite').default,
  require('./policy').default,
  require('./policyFavorite').default,
  require('./policyInstance').default,
  require('./campaign').default,
  require('./campaignInstance').default,
  require('./campaignInstanceEmails').default,
  require('./emailTemplate').default,
  require('./questionnaireTemplate').default,
  require('./client').default,
  require('./clientCategory').default,
  require('./highlight').default,
  require('./programTemplate').default,
  require('./programRequirementTemplate').default,
  require('./programRequirementGuidanceTemplate').default,
  require('./programControlTemplate').default,
  require('./program').default,
  require('./programRequirement').default,
  require('./programControl').default,
  require('./qaLibrary').default,
  require('./userGroup').default,
  require('./project').default,
  require('./projectPriority').default,
  require('./projectStatus').default,
  require('./projectType').default,
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}

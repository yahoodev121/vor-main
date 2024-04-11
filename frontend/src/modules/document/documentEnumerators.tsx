import { i18n } from 'src/i18n';
import { extractExtensionFrom } from 'src/modules/shared/fileUpload/fileUploader';

export const DOCUMENT_EXTS = {
  CSV: 'csv',
  EXCEL: 'xls,xlsx',
  JSON: 'json',
  JSONL: 'jsonl',
  PDF: 'pdf',
  TSV: 'tsv',
  WORD: 'doc,docx',
};

export const DOCUMENT_TYPES = {
  CAMPAIGN_INSTANCE: 'campaignInstance',
  CAMPAIGN: 'campaign',
  CLIENT: 'client',
  INTERNAL: 'internal',
  POLICY: 'policy',
  PROGRAM_CONTROL: 'programControl',
  PROJECT: 'project',
  RISK: 'risk',
  TASK_INSTANCE: 'taskInstance',
  TASK: 'task',
  VENDOR: 'vendor',
};

const documentEnumerators = {
  type: [
    DOCUMENT_TYPES.CAMPAIGN_INSTANCE,
    DOCUMENT_TYPES.CAMPAIGN,
    DOCUMENT_TYPES.CLIENT,
    DOCUMENT_TYPES.INTERNAL,
    DOCUMENT_TYPES.POLICY,
    DOCUMENT_TYPES.PROGRAM_CONTROL,
    DOCUMENT_TYPES.PROJECT,
    DOCUMENT_TYPES.RISK,
    DOCUMENT_TYPES.TASK_INSTANCE,
    DOCUMENT_TYPES.TASK,
    DOCUMENT_TYPES.VENDOR,
  ],
  typeColor: [],
  extension: [
    DOCUMENT_EXTS.CSV,
    DOCUMENT_EXTS.EXCEL,
    DOCUMENT_EXTS.JSON,
    DOCUMENT_EXTS.JSONL,
    DOCUMENT_EXTS.PDF,
    DOCUMENT_EXTS.TSV,
    DOCUMENT_EXTS.WORD,
  ],
};

export const getDocumentType = (filename) => {
  const ext = extractExtensionFrom(filename);
  const key = documentEnumerators.extension.find((exts) =>
    exts
      .split(/[ ]*,[ ]*/)
      .map((v) => v.toLowerCase())
      .includes(ext),
  );
  if (!key) {
    return null;
  }
  return i18n(
    `entities.document.enumerators.extension.${key}`,
  );
};

export default documentEnumerators;

import FileSaver from 'file-saver';

export const JSON_TYPE = 'application/json';
export const JSON_TYPE_WITH_CHARSET = `${JSON_TYPE};charset=UTF-8`;
export const JSON_EXTENSION = '.json';

export class JsonExporter {
  static exportAsJSONFile(json, fileName) {
    let excelBuffer = JSON.stringify(json, null, 2);
    this.saveAsJSONFile(excelBuffer, fileName);
  }

  static saveAsJSONFile(buffer, fileName) {
    const data = new Blob([buffer], {
      type: JSON_TYPE_WITH_CHARSET,
    });
    FileSaver.saveAs(data, fileName + JSON_EXTENSION);
  }
}

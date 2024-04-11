import { i18n } from 'src/i18n';

export class JsonImporter {
  static async doReadFile(file) {
    let rawData = await this._readFile(file);

    if (!rawData) {
      throw new Error(
        i18n('importer.errors.invalidFileEmpty'),
      );
    }

    return JSON.parse(String(rawData));
  }

  static async _readFile(file) {
    if (!file) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          if (!e || !e.target) {
            reject(new Error());
            return;
          }

          resolve(e.target.result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (e) => {
        reject();
      };

      reader.readAsText(file);
    });
  }
}

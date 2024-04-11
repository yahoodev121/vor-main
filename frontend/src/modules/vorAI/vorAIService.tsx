import { getUrlBasedOnTenant } from 'src/modules/utils';
import authAxios from 'src/modules/shared/axios/authAxios';

export default class VORAIService {
  static async import(values, importHash) {
    return null;
  }

  static async files(apiKey, files) {
    const body = {
      data: {
        apiKey,
        files,
      },
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/files'),
      body,
    );

    return response.data;
  }

  static async fineTunes(apiKey, trainingFiles, model) {
    const body = {
      data: {
        apiKey,
        trainingFiles,
        model,
      },
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/fine-tunes'),
      body,
    );

    return response.data;
  }

  static async status(apiKey) {
    const body = {
      data: {
        apiKey,
      },
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/status'),
      body,
    );

    return response.data;
  }

  static async completions(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/completions'),
      body,
    );

    return response.data;
  }

  static async completionsOnConfigurator(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/completions-on-configurator'),
      body,
    );

    return response.data;
  }

  static async submitExtractions(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/submit-extractions'),
      body,
    );

    return response.data;
  }

  static async save(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/save'),
      body,
    );

    return response.data;
  }

  static async find() {
    const response = await authAxios.get(
      getUrlBasedOnTenant('vor-ai'),
    );

    return response.data;
  }

  static async generateAnswers(file, text) {
    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/generate-answers'),
      { file, text },
      { responseType: 'blob' },
    );

    return response.data;
  }

  static async getTextFromWord(path) {
    const response = await authAxios.post(
      getUrlBasedOnTenant('vor-ai/get-text-from-word'),
      { path },
    );

    return response.data;
  }
}

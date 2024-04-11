const config =
  require(`./${process.env.REACT_APP_ENVIRONMENT}`).default;

config.isDevMode = process.env.NODE_ENV === 'development';

export default config;

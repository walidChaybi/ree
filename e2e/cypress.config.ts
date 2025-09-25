import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// @ts-ignore
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import cypressOnFix from "cypress-on-fix";

const baseOrigin = 'http://tech.rece.devng.diplomatie.gouv.fr/rece/';
const basePath = 'rece-ui/';

export default defineConfig({
  env: {
    ENV: 'dev',
    BASE_ORIGIN: baseOrigin,
    BASE_PATH: basePath,
  },
  reporter: 'cypress-multi-reporters', // Permet d'utiliser plusieurs reporters
  reporterOptions: {
    reporterEnabled: 'spec, mocha-junit-reporter, mochawesome',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/junit-[hash].xml'
    },
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      embeddedScrennshots: true,
      inlineAssets: true
    }
  }, 

  e2e: {
    experimentalSourceRewriting: false,
    experimentalModifyObstructiveThirdPartyCode: true, 
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: baseOrigin + basePath,
    watchForFileChanges: false,
    specPattern: 'e2e/features/**/*.feature',
    defaultCommandTimeout: 10000,
    supportFile: 'e2e/support/e2e.ts',

    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {

      on = cypressOnFix(on);
      
      require('cypress-mochawesome-reporter/plugin')(on);

      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      on('task', {
        async dynamicRequire(pathToModule: string) {
          // Permet la MAJ des datas dans le fichier JSON si nous effectuons une modif dedans sans avoir à relancer le browser cypress
          delete require.cache[require.resolve(`./data/${pathToModule}`)];
          const mod = require(`./data/${pathToModule}`); // ou await import(pathToModule) si ESM
          return mod;
        },
      });

      return config;
    },
  },
});
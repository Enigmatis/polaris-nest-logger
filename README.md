<p align="center">
    <img height="190" src="https://github.com/Enigmatis/polaris-nest-logger/raw/master/polarisen.png" alt="polaris logo" /><br><br>
    Use <a href="https://github.com/Enigmatis/polaris-logs">polaris-logs</a> easily in nestjs apps!<br><br>
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/@enigmatis/polaris-nest-logger">
    <img alt="npm (scoped with tag)" src="https://img.shields.io/npm/v/@enigmatis/polaris-nest-logger/beta">
    <img alt="Travis (.org) branch" src="https://travis-ci.com/Enigmatis/polaris-nest-logger.svg?branch=master">
    <a href="https://www.codacy.com/gh/Enigmatis/polaris-nest-logger?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Enigmatis/polaris-nest-logger&amp;utm_campaign=Badge_Coverage"><img src="https://api.codacy.com/project/badge/Coverage/8a6a540509f644259f675750a147a1c4"/></a>
    <a href="https://www.codacy.com/gh/Enigmatis/polaris-nest-logger?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Enigmatis/polaris-nest-logger&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/8a6a540509f644259f675750a147a1c4"/></a>
</p>

# polaris-nest-logger

Want to use polaris-logger in your nest js app?

You are welcome to use our PolarisNestLoggerModule!

### Getting started
- This module has to be used in a nestjs project, so make sure you have one, and that you have installed `@nestjs/core` & `@nestjs/common`
- run `npm install @enigmatis/polaris-nest-logger`

### Using the module

In your `app.module`, import the `PolarisNestLoggerModule` in one of the following ways:

#### using `register` method:
```javascript
@Module({
    imports: [PolarisNestLoggerModule.register(polarisNestLoggerOptions)],
})
export class AppModule{}
```
The options argument should be of type `PolarisNestLoggerOptions`.

#### using `registerAsync` method:
With `registerAsync` method you can provide a factory method that will return your configuration, so that the configuration can be generated dynamically using your own providers. For example:
```javascript
@Module({
    imports: [
        PolarisNestLoggerModule.registerAsync({
            imports: [CommonModule],
            inject: [ApiConfigService],
            useFactory: async (apiConfigService: ApiConfigService): Promise<PolarisNestLoggerOptions> => {
                const applicationProperties: ApplicationProperties = apiConfigService.config.app;
                const loggerConfiguration: LoggerConfiguration = {...apiConfigService.config.logger, loggerLevel: apiConfigService.config.logger.level};
                return {applicationProperties, loggerConfiguration};
            }
        }) 
    ],
})
export class AppModule{}
```
    

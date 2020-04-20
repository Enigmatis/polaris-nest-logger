import {PolarisLoggerFactory} from "./polaris-logger-factory.service";
import {LoggerConfiguration, PolarisLogger} from "@enigmatis/polaris-logs";
import {ApplicationProperties} from "@enigmatis/polaris-common";
import * as util from 'util';

describe("PolarisLoggerService", () => {
    let polarisLoggerService: PolarisLoggerFactory;
    let loggerConfiguration: LoggerConfiguration;
    let applicationProperties: ApplicationProperties;

    beforeEach(() => {
        polarisLoggerService = new PolarisLoggerFactory();
        loggerConfiguration = {
            loggerLevel: 'debug',
            writeToConsole: true
        };
        applicationProperties = {
            component: 'ads',
            id: 'asdf',
            name: 'asd',
        };
    });

    describe("getLogger", () => {
        it("returns correct polaris logger", ()=>{
            const result = polarisLoggerService.createPolarisLogger(loggerConfiguration, applicationProperties);
            expect(util.inspect(result)).toEqual(util.inspect(new PolarisLogger(loggerConfiguration, applicationProperties)));
        });
    });
});

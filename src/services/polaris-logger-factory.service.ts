import {Injectable} from "@nestjs/common";
import {LoggerConfiguration, PolarisLogger} from "@enigmatis/polaris-logs";
import {ApplicationProperties} from "@enigmatis/polaris-common";

@Injectable()
export class PolarisLoggerFactory {
    createPolarisLogger(loggerConfiguration: LoggerConfiguration, appProperties: ApplicationProperties) {
        return new PolarisLogger(loggerConfiguration, appProperties);
    }
}

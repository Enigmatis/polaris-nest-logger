import {PolarisNestLogger} from "./polaris-nest-logger";
import {PolarisLogger} from "@enigmatis/polaris-logs";
import {PolarisLoggerFactory} from "./polaris-logger-factory.service";
import {PolarisNestLoggerOptions} from "../common/polaris-nest-logger-options";

describe("NestLogger", () => {
    let nestLogger: PolarisNestLogger;

    let polarisLoggerMock: PolarisLogger;
    let polarisLoggerFactoryMock: PolarisLoggerFactory;
    let options: PolarisNestLoggerOptions;

    beforeEach(async () => {
        polarisLoggerMock = {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            fatal: jest.fn(),
            debug: jest.fn(),
            trace: jest.fn(),
        } as any;
        polarisLoggerFactoryMock = {
            createPolarisLogger: jest.fn().mockReturnValue(polarisLoggerMock)
        };

        options = {
            applicationProperties: {
                id: 'bla',
                name: 'bla', component: 'bla', version: 'bla', environment: 'bla'
            },
            loggerConfiguration: {
                loggerLevel: 'debug', writeToConsole: false, writeFullMessageToConsole: false
            },
        };

        nestLogger = new PolarisNestLogger(options, polarisLoggerFactoryMock);
    });

    describe("log", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.log("bla", polarisLogProperties);

            expect(polarisLoggerMock.info).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("context message is sent, handled correctly", () => {
            nestLogger.log("bla", "mos");

            expect(polarisLoggerMock.info).toHaveBeenCalledWith("bla", {customProperties: {nestJsContext: "mos"}});
        });

        test("only message is sent, handled correctly", () => {
            nestLogger.log("bla");

            expect(polarisLoggerMock.info).toHaveBeenCalledWith("bla", undefined);
        });
    });

    describe("error", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.error("bla", null, polarisLogProperties);

            expect(polarisLoggerMock.error).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("context is sent, handled correctly", () => {
            nestLogger.error("bla", null, "mos");

            expect(polarisLoggerMock.error).toHaveBeenCalledWith("bla", {customProperties: {nestJsContext: "mos", nestJsTrace: null}});
        });

        test("trace is sent, handled correctly", () => {
            nestLogger.error("bla", "mos");

            expect(polarisLoggerMock.error).toHaveBeenCalledWith("bla", {customProperties: {nestJsTrace: "mos", nestJsContext: undefined}});
        });

        test("trace and context are sent, handled correctly", () => {
            nestLogger.error("bla", "mos", "bli");

            expect(polarisLoggerMock.error).toHaveBeenCalledWith("bla", {customProperties: {nestJsTrace: "mos", nestJsContext: "bli"}});
        });


        test("only message is sent, handled correctly", () => {
            nestLogger.error("bla");

            expect(polarisLoggerMock.error).toHaveBeenCalledWith("bla", undefined);
        });
    });

    describe("warn", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.warn("bla", polarisLogProperties);

            expect(polarisLoggerMock.warn).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("context message is sent, handled correctly", () => {
            nestLogger.warn("bla", "mos");

            expect(polarisLoggerMock.warn).toHaveBeenCalledWith("bla", {customProperties: {nestJsContext: "mos"}});
        });

        test("only message is sent, handled correctly", () => {
            nestLogger.warn("bla");

            expect(polarisLoggerMock.warn).toHaveBeenCalledWith("bla", undefined);
        });
    });

    describe("fatal", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.fatal("bla", polarisLogProperties);

            expect(polarisLoggerMock.fatal).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("only message is sent, handled correctly", () => {
            nestLogger.fatal("bla");

            expect(polarisLoggerMock.fatal).toHaveBeenCalledWith("bla", undefined);
        });
    });

    describe("debug", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.debug("bla", polarisLogProperties);

            expect(polarisLoggerMock.debug).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("context message is sent, handled correctly", () => {
            nestLogger.debug("bla", "mos");

            expect(polarisLoggerMock.debug).toHaveBeenCalledWith("bla", {customProperties: {nestJsContext: "mos"}});
        });

        test("only message is sent, handled correctly", () => {
            nestLogger.debug("bla");

            expect(polarisLoggerMock.debug).toHaveBeenCalledWith("bla", undefined);
        });
    });

    describe("verbose", () => {
        test("polarisLogProperties is sent, handled correctly", () => {
            const polarisLogProperties = {logId: "a"};
            nestLogger.verbose("bla", polarisLogProperties);

            expect(polarisLoggerMock.trace).toHaveBeenCalledWith("bla", polarisLogProperties);
        });

        test("context message is sent, handled correctly", () => {
            nestLogger.verbose("bla", "mos");

            expect(polarisLoggerMock.trace).toHaveBeenCalledWith("bla", {customProperties: {nestJsContext: "mos"}});
        });

        test("only message is sent, handled correctly", () => {
            nestLogger.verbose("bla");

            expect(polarisLoggerMock.trace).toHaveBeenCalledWith("bla", undefined);
        });
    });
});

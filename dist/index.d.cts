declare const SnowDBParser: {
    STRING: "string";
    BUFFER: "buffer";
    OBJECT: "object";
};
type ParserType = (typeof SnowDBParser)[keyof typeof SnowDBParser];
interface SnowDBResult<T> {
    data: T;
    deleted: boolean;
}
declare class Document<T = unknown> {
    private name;
    private db;
    private parser;
    constructor(name: string, db: SnowDB, parser: ParserType);
    private parseResult;
    private toBuffer;
    last<U = T>(id: string): U | null;
    save(id: string, data: object | string | Buffer): void;
    delete(id: string): boolean;
    versions<U = T>(id: string, limit: number, offset: number): SnowDBResult<U>[];
    versionsStream<U = T>(id: string, limit: number, offset: number, callback: (deleted: boolean, record: U) => void): void;
    all<U = T>(id: string): SnowDBResult<U>[];
    allStream<U = T>(id: string, callback: (deleted: boolean, record: U) => void): void;
    collect(start: number, len: number, callback: (deleted: boolean, record: T) => void): void;
    for(id: string): {
        last: <U = T>() => U | null;
        save: (data: Buffer | string | object) => void;
        delete: () => boolean;
        all: <U = T>() => SnowDBResult<U>[];
        allStream: <U = T>(cb: (deleted: boolean, data: U) => void) => void;
        versions: <U = T>(limit: number, offset: number) => SnowDBResult<U>[];
        versionsStream: <U = T>(limit: number, offset: number, cb: (deleted: boolean, data: U) => void) => void;
    };
}

declare class SnowDB {
    mergeThreshold: number;
    pathDB: string;
    constructor(pathDB: string, mergeThreshold?: number);
    connect(): this;
    document<T>(name: string, parser: ParserType): Document;
}

export { Document, type ParserType, SnowDB, SnowDBParser, type SnowDBResult };

declare class Recorder {
    private record;
    private tokenizer;
    constructor();
    start: () => void;
    testResult(str: string): Promise<void>;
    handleAudio(str: string): Promise<void>;
}
export declare const recorder: Recorder;
export {};

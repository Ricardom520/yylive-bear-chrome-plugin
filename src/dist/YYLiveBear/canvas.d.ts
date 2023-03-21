declare class Canvas {
    readonly canvas: HTMLCanvasElement;
    constructor();
    init(): void;
    dbclick(fn: () => void): void;
    private canvasRender;
    private drawChatBox;
    fillText(str: string, x: number, y: number): void;
}
export default Canvas;

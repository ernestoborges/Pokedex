export function drawDisplayCells(
    ctx: any,
    canvasElement: any,
    start: number,
    barWidth: number,
    barHeight: number,
    blockHeight: number,
    blockGap: number,
    fill: any,
) {
    let nBlocks = Math.trunc(barHeight / (blockHeight + blockGap))
    for (let j = 0; j <= nBlocks; j++) {
        let Y0 = (blockHeight + blockGap) * j
        let blockFloor = canvasElement.height - Y0 - blockHeight

        let gradient = ctx.createLinearGradient(
            start,
            blockFloor,
            start,
            blockFloor + blockHeight
        );

        gradient.addColorStop(0, fill[0]);
        gradient.addColorStop(0.2, fill[0]);
        gradient.addColorStop(0.2, fill[1]);
        gradient.addColorStop(0.8, fill[1]);
        gradient.addColorStop(0.8, fill[0]);
        gradient.addColorStop(1.0, fill[0]);

        ctx.fillStyle = gradient;
        ctx.fillRect(start, blockFloor, barWidth, blockHeight);
    }
}
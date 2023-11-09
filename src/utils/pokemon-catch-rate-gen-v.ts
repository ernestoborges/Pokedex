export function catchRateV(CR: number, BB: number, MHP?: number, CHP?: number, SB?: number) {

    let M = MHP ? MHP : 1
    let H = CHP ? CHP : 1
    let S = SB ? SB : 1

    let X = Math.floor(Math.floor(Math.floor((3 * M - 2 * H) * CR * BB) / (3 * M)) * S);
    if (X > 255) X = 255;
    if (X < 1) X = 1;

    const Y = Math.floor(65536 / Math.sqrt(Math.sqrt(255 / X)));
    let p = (Y / 65536.0) ** 3 * 100;
    return p
}
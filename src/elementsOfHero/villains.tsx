type levelInfo = {
    name:string,
    level:number
}

export const villainsRegister = new Map<string, levelInfo>([
    ["DesertDead", { name: "DesertDead", level: 1 }],
    ["MountainGiant", { name: "MountainGiant", level: 2 }],
    ["DiscoCrawler", { name: "DiscoCrawler", level: 3 }],
    ["CastleJuggerknight", { name: "CastleJuggerknight", level: 4 }],
]);
// ─── Interior color palettes (curated, room-tagged) ─────────────────────────
// Used by the /interior-color-palettes hub page and surfaced in the generator's
// curated set (see app/lib/colorUtils.ts).

export type InteriorPalette = {
    title: string;
    /** One of: Living Room, Bedroom, Kitchen, Bathroom, Home Office */
    room: string;
    style: string;
    colors: string[];
    description: string;
};

export const INTERIOR_PALETTES: InteriorPalette[] = [
    {
        "title": "Coastal Calm",
        "room": "Living Room",
        "style": "Coastal",
        "colors": [
            "#EDE8DD",
            "#A7B8B5",
            "#3E5C66",
            "#C9A98C",
            "#FBFAF6"
        ],
        "description": "Airy and breezy seaside mood: warm sandy off-white (#EDE8DD) on ~60% of walls, soft sea-glass green-gray (#A7B8B5) as the ~30% secondary on built-ins or a sofa, deep harbor teal (#3E5C66) as the ~10% accent in cushions and art, with driftwood tan (#C9A98C) and crisp near-white trim (#FBFAF6) finishing the woodwork."
    },
    {
        "title": "Smoked Clay & Charcoal",
        "room": "Living Room",
        "style": "Moody/Dramatic",
        "colors": [
            "#3A3B38",
            "#9C7B66",
            "#D8C7B0",
            "#B86A4B",
            "#1E1F1D"
        ],
        "description": "Cocooning, dramatic evening lounge: deep olive-charcoal (#3A3B38) wraps ~60% of the walls, smoky clay-brown (#9C7B66) as the ~30% secondary on a sofa or rug, terracotta (#B86A4B) as the ~10% accent in throws, lifted by warm oat (#D8C7B0) cushions and near-black (#1E1F1D) for fireplace and frames."
    },
    {
        "title": "Warm Greige Gallery",
        "room": "Living Room",
        "style": "Modern Neutral",
        "colors": [
            "#D9D2C5",
            "#B5A998",
            "#6E6555",
            "#A88A6A",
            "#F4F1EA"
        ],
        "description": "Polished, social and timeless: soft greige (#D9D2C5) on ~60% of the walls, deeper mushroom taupe (#B5A998) as the ~30% secondary in upholstery, espresso-bronze (#6E6555) as the ~10% accent in legs and lighting, with a leather-tan (#A88A6A) note and warm white trim (#F4F1EA)."
    },
    {
        "title": "Sage & Linen",
        "room": "Bedroom",
        "style": "Sage & Cream",
        "colors": [
            "#C7CEBE",
            "#EAE6DA",
            "#8A9684",
            "#B79C84",
            "#FCFBF7"
        ],
        "description": "Calm, restful and soft: muted sage (#C7CEBE) on ~60% of the walls, creamy linen (#EAE6DA) as the ~30% secondary in bedding and curtains, deeper moss (#8A9684) as the ~10% accent in pillows, warmed by a light oak/tan (#B79C84) and clean off-white (#FCFBF7) trim."
    },
    {
        "title": "Dusty Blue Hush",
        "room": "Bedroom",
        "style": "Classic",
        "colors": [
            "#B9C4CC",
            "#E7E3DB",
            "#5E6E78",
            "#C9B7A6",
            "#FBFAF6"
        ],
        "description": "Serene, low-contrast retreat: dusty blue-gray (#B9C4CC) on ~60% of the walls, soft greige bedding (#E7E3DB) as the ~30% secondary, slate denim (#5E6E78) as the ~10% accent on a headboard or throw, with a warm sand (#C9B7A6) and bright trim (#FBFAF6) keeping it fresh."
    },
    {
        "title": "Blush & Warm Greige",
        "room": "Bedroom",
        "style": "Japandi",
        "colors": [
            "#E3D2C8",
            "#CFC2B4",
            "#8E7A6E",
            "#A98C7D",
            "#F6F1EA"
        ],
        "description": "Soft, grounded and intimate: dusty blush-greige (#E3D2C8) on ~60% of the walls, warm taupe (#CFC2B4) as the ~30% secondary in linens, smoky walnut (#8E7A6E) as the ~10% accent in furniture, with a clay-rose (#A98C7D) tone and creamy trim (#F6F1EA)."
    },
    {
        "title": "Herb Garden Kitchen",
        "room": "Kitchen",
        "style": "Classic",
        "colors": [
            "#F2EDE1",
            "#5A6B52",
            "#C9A36A",
            "#3D4A39",
            "#FCFAF4"
        ],
        "description": "Fresh and appetizing classic: warm white (#F2EDE1) on ~60% of walls and upper cabinets, sage-herb green (#5A6B52) as the ~30% secondary on lower cabinets or an island, with golden oak/brass (#C9A36A) as the ~10% accent in hardware and wood, deepened by forest (#3D4A39) and a crisp trim (#FCFAF4)."
    },
    {
        "title": "Buttercream & Clay",
        "room": "Kitchen",
        "style": "Warm Earthy/Terracotta",
        "colors": [
            "#F3E6C9",
            "#E8D5B5",
            "#B5603F",
            "#8A5A3B",
            "#FBF6EC"
        ],
        "description": "Sunny, inviting and rustic: buttery cream (#F3E6C9) on ~60% of the walls, soft wheat (#E8D5B5) as the ~30% secondary in cabinetry, terracotta clay (#B5603F) as the ~10% accent in tile and pottery, grounded by warm walnut (#8A5A3B) shelving and a light trim (#FBF6EC)."
    },
    {
        "title": "Navy & Oak Galley",
        "room": "Kitchen",
        "style": "Modern Neutral",
        "colors": [
            "#F4F1EA",
            "#2E3B4E",
            "#C5A678",
            "#9AA39A",
            "#FFFFFF"
        ],
        "description": "Clean and confident: soft white (#F4F1EA) on ~60% of walls and uppers, deep navy (#2E3B4E) as the ~30% secondary on the island and lower cabinets, warm oak (#C5A678) as the ~10% accent in counters and stools, with a sage-gray (#9AA39A) note and pure white (#FFFFFF) trim."
    },
    {
        "title": "Eucalyptus Spa",
        "room": "Bathroom",
        "style": "Coastal",
        "colors": [
            "#CBD6CF",
            "#EEF0EC",
            "#5F7A74",
            "#C2A98E",
            "#FCFDFB"
        ],
        "description": "Fresh, calming and spa-like: soft blue-green eucalyptus (#CBD6CF) on ~60% of the walls, near-white (#EEF0EC) as the ~30% secondary in tile and fixtures, deeper teal-green (#5F7A74) as the ~10% accent in vanity or trim, warmed by a teak-wood tone (#C2A98E) and bright white (#FCFDFB)."
    },
    {
        "title": "Soft White & Teak",
        "room": "Bathroom",
        "style": "Scandinavian",
        "colors": [
            "#F1EFEA",
            "#DDD8CE",
            "#B89B79",
            "#7E8B86",
            "#FFFFFF"
        ],
        "description": "Bright, serene and uncluttered: warm soft white (#F1EFEA) on ~60% of the walls, pale greige (#DDD8CE) as the ~30% secondary in tile and stone, warm teak (#B89B79) as the ~10% accent in the vanity and shelving, with a muted slate-green (#7E8B86) note and clean white (#FFFFFF) fixtures."
    },
    {
        "title": "Slate Blue Bath",
        "room": "Bathroom",
        "style": "Moody/Dramatic",
        "colors": [
            "#41515A",
            "#D7DCDB",
            "#A88B6E",
            "#9FB0B2",
            "#F7F9F8"
        ],
        "description": "Cool, refined and a touch dramatic: deep slate blue (#41515A) on ~60% of the lower walls or vanity, pale stone gray (#D7DCDB) as the ~30% secondary in tile, brass-toned wood (#A88B6E) as the ~10% accent in fixtures and mirror, with a misty aqua (#9FB0B2) and crisp white (#F7F9F8) trim."
    },
    {
        "title": "Forest Study",
        "room": "Home Office",
        "style": "Moody/Dramatic",
        "colors": [
            "#33433A",
            "#E6DECF",
            "#B98A4B",
            "#7C8A78",
            "#F4F0E6"
        ],
        "description": "Focused yet warm: deep forest green (#33433A) on ~60% of the walls and built-in shelving, warm oat (#E6DECF) as the ~30% secondary in seating and rug, ochre-brass (#B98A4B) as the ~10% accent in lamps and hardware, lifted by a soft sage (#7C8A78) and creamy trim (#F4F0E6)."
    },
    {
        "title": "Warm Greige Workspace",
        "room": "Home Office",
        "style": "Modern Neutral",
        "colors": [
            "#DAD3C6",
            "#A99B86",
            "#5C5346",
            "#B07B4F",
            "#F5F2EB"
        ],
        "description": "Calm, productive and grounded: warm greige (#DAD3C6) on ~60% of the walls, soft taupe (#A99B86) as the ~30% secondary in cabinetry and textiles, espresso brown (#5C5346) as the ~10% accent in the desk and frames, with a leather-cognac (#B07B4F) chair note and warm white (#F5F2EB) trim."
    },
    {
        "title": "Terracotta & Olive Den",
        "room": "Home Office",
        "style": "Warm Earthy/Terracotta",
        "colors": [
            "#E4D4BE",
            "#9A8456",
            "#A8553A",
            "#6B6B4B",
            "#F6F0E4"
        ],
        "description": "Energizing yet earthy: warm sand (#E4D4BE) on ~60% of the walls, olive-khaki (#9A8456) as the ~30% secondary in shelving and textiles, burnt terracotta (#A8553A) as the ~10% accent in art and a chair, grounded by muted olive (#6B6B4B) and a soft cream (#F6F0E4) trim."
    }
];

export const INTERIOR_ROOMS = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Home Office"] as const;

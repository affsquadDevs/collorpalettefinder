// ─── Interior color palettes (curated, room-tagged) ─────────────────────────
// Used by the /interior-color-palettes hub + /interior-color-palettes/[room]
// spoke pages, and surfaced in the generator's curated set (colorUtils.ts).

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
        "title": "Olive Grove Lounge",
        "room": "Living Room",
        "style": "Earthy Heritage",
        "colors": [
            "#D7CFBE",
            "#5C6647",
            "#A9762F",
            "#8A8C7A",
            "#F4F0E6"
        ],
        "description": "Grounded, sophisticated and made for evening light: warm oat-greige (#D7CFBE) as the ~60% dominant on walls, deep olive (#5C6647) as the ~30% secondary on a sofa, built-ins, or a justified fireplace wall, with aged-brass ochre (#A9762F) as the ~10% accent in lamps and art, softened by a sage-gray (#8A8C7A) and creamy trim (#F4F0E6)."
    },
    {
        "title": "Plaster & Rust",
        "room": "Living Room",
        "style": "Mediterranean Warm-Minimal",
        "colors": [
            "#EBE2D2",
            "#C2562E",
            "#7A4A33",
            "#D8B98C",
            "#FBF7EF"
        ],
        "description": "Sun-warmed and inviting for a bright, window-filled room: soft plaster cream (#EBE2D2) as the ~60% dominant on walls, terracotta rust (#C2562E) as the ~10% accent in cushions, art, and ceramics, with walnut brown (#7A4A33) as a grounding mid-tone, a wheat-tan (#D8B98C) secondary in upholstery, and bright warm trim (#FBF7EF)."
    },
    {
        "title": "Ink Blue Salon",
        "room": "Living Room",
        "style": "Tonal Jewel",
        "colors": [
            "#2F3B4C",
            "#9FA6A0",
            "#C2A878",
            "#54616B",
            "#F2EFE8"
        ],
        "description": "Deep, calm and quietly glamorous — best in a bright living room that can carry the depth: inky slate-blue (#2F3B4C) as the ~60% dominant on walls or a feature media wall, muted sage-gray (#9FA6A0) as the ~30% secondary in seating and curtains, antique gold (#C2A878) as the ~10% accent in lighting and frames, with a softer steel-blue (#54616B) bridge tone and warm off-white trim (#F2EFE8)."
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
        "title": "Plum Smoke Cocoon",
        "room": "Bedroom",
        "style": "Moody/Dramatic",
        "colors": [
            "#4A4250",
            "#D8D2D6",
            "#7E7384",
            "#B8A6A0",
            "#F4F1F3"
        ],
        "description": "A grown-up, cocooning night retreat: smoky grayed-plum (#4A4250) wraps ~60% of the walls as the dominant, soft mauve-gray (#D8D2D6) carries ~30% in bedding and curtains as the secondary, with a dusty heather (#7E7384) as the gentle ~10% accent on a headboard or throw, warmed by clay-taupe (#B8A6A0) and a near-white trim (#F4F1F3) so the depth stays restful rather than heavy."
    },
    {
        "title": "Mushroom & Putty",
        "room": "Bedroom",
        "style": "Warm Minimal",
        "colors": [
            "#C8BDB0",
            "#E8E1D6",
            "#8C8071",
            "#A99683",
            "#FAF7F1"
        ],
        "description": "Quiet, grounded warm minimalism: soft mushroom greige (#C8BDB0) on ~60% of the walls as the dominant, creamy putty (#E8E1D6) as the ~30% secondary in linens and drapery, deeper walnut-taupe (#8C8071) as the barely-there ~10% accent in furniture, with a sandy clay (#A99683) note and warm white trim (#FAF7F1) for a low-contrast, lamplight-friendly calm."
    },
    {
        "title": "Oat & Faded Indigo",
        "room": "Bedroom",
        "style": "Coastal",
        "colors": [
            "#E4DECF",
            "#9FAAB2",
            "#5A6B78",
            "#C2AE96",
            "#FBF9F3"
        ],
        "description": "A soft, washed seaside calm: warm oat (#E4DECF) on ~60% of the walls as the dominant, misty blue-gray (#9FAAB2) as the ~30% secondary in bedding and curtains, faded indigo (#5A6B78) as the muted ~10% accent on an upholstered headboard, grounded by driftwood tan (#C2AE96) and a creamy off-white trim (#FBF9F3) that keeps the whole room gently low-contrast."
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
        "title": "Charcoal & Brass Scullery",
        "room": "Kitchen",
        "style": "Industrial Modern",
        "colors": [
            "#E9E4D8",
            "#3A3F3D",
            "#2A2E2C",
            "#B08D57",
            "#F7F4EC"
        ],
        "description": "Tailored and quietly dramatic: warm greige (#E9E4D8) on the ~60% of walls and uppers, deep charcoal-green (#3A3F3D) as the ~30% secondary on lower cabinets and the island, antique brass (#B08D57) as the ~10% accent in hardware and a pendant, anchored by near-black (#2A2E2C) iron details and a crisp warm-white trim (#F7F4EC)."
    },
    {
        "title": "Slate Blue & Marble Cook's Kitchen",
        "room": "Kitchen",
        "style": "Transitional",
        "colors": [
            "#EEF0EF",
            "#6E8089",
            "#3F4F58",
            "#C9B79C",
            "#FCFCFB"
        ],
        "description": "Clean and chef-serious: cool marble white (#EEF0EF) on the ~60% of walls and uppers, muted slate blue (#6E8089) as the ~30% secondary on base cabinets, deep petrol blue (#3F4F58) as the ~10% accent on the island, warmed by an oak-butcher-block tone (#C9B79C) and bright white (#FCFCFB) trim."
    },
    {
        "title": "Plaster Pink & Walnut Bistro",
        "room": "Kitchen",
        "style": "Parisian Bistro",
        "colors": [
            "#EAD9CC",
            "#D8B89E",
            "#7A4A36",
            "#5C6B4F",
            "#FBF3EC"
        ],
        "description": "Soft, warm and appetizing: dusty plaster pink (#EAD9CC) on the ~60% of walls, warm terracotta-blush (#D8B89E) as the ~30% secondary on cabinetry, rich walnut (#7A4A36) as the ~10% accent in shelving and a butcher block, with a muted olive (#5C6B4F) note and creamy trim (#FBF3EC)."
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
        "title": "Warm Plaster & Clay",
        "room": "Bathroom",
        "style": "Warm Earthy/Terracotta",
        "colors": [
            "#EFE7DA",
            "#E3D3C2",
            "#B07258",
            "#8A6F5C",
            "#FBF7F0"
        ],
        "description": "A boutique-hotel warmth that forgives bad bathroom lighting: warm plaster off-white (#EFE7DA) on ~60% of the walls, soft mushroom-greige (#E3D3C2) as the ~30% secondary in tile and stone, terracotta clay (#B07258) as the ~10% accent in towels and pottery, grounded by a walnut-vanity tone (#8A6F5C) and a creamy trim (#FBF7F0)."
    },
    {
        "title": "Inky Green Powder Room",
        "room": "Bathroom",
        "style": "Maximalist/Jewel-Tone",
        "colors": [
            "#2C3A33",
            "#C9CFC6",
            "#A6814F",
            "#4F6357",
            "#F4F2EA"
        ],
        "description": "A brave, jewel-box mood for a small windowless half-bath: deep inky forest-green (#2C3A33) wrapping ~60% of the walls, ceiling and trim, pale sage stone (#C9CFC6) as the ~30% secondary in the sink and counter, unlacquered brass (#A6814F) as the ~10% accent in fixtures and the mirror frame, with a muted eucalyptus (#4F6357) note and a soft warm white (#F4F2EA)."
    },
    {
        "title": "Greige & Soft Aqua",
        "room": "Bathroom",
        "style": "Transitional",
        "colors": [
            "#E6E2DA",
            "#CFD6D2",
            "#7C9690",
            "#B49B7E",
            "#FCFBF7"
        ],
        "description": "A balanced, broadly flattering everyday bath that splits the difference between warm and cool: warm greige (#E6E2DA) on ~60% of the walls, soft aqua-gray (#CFD6D2) as the ~30% secondary in tile, muted teal (#7C9690) as the ~10% accent in a vanity or cabinet, warmed by a light oak tone (#B49B7E) and a clean trim (#FCFBF7)."
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
    },
    {
        "title": "Eucalyptus Focus",
        "room": "Home Office",
        "style": "Biophilic",
        "colors": [
            "#A9B49C",
            "#EDE7DA",
            "#5E6E5A",
            "#B5733E",
            "#F5F2EA"
        ],
        "description": "A calm-alert biophilic scheme for long screen days: soft eucalyptus sage (#A9B49C) as the ~60% dominant on the walls, warm putty (#EDE7DA) as the ~30% secondary in storage and textiles, deep moss (#5E6E5A) and a warm ochre (#B5733E) sharing the ~10% accent in shelving and a leather chair, with creamy trim (#F5F2EA)."
    },
    {
        "title": "Soft Clay & Paper",
        "room": "Home Office",
        "style": "Scandinavian Warm",
        "colors": [
            "#E4DDCB",
            "#CFC3AC",
            "#6F6353",
            "#9AA68F",
            "#FBF8F1"
        ],
        "description": "The bright-but-not-sterile answer to the all-white office: a warm low-chroma oat (#E4DDCB) as the ~60% dominant on the walls, soft wheat (#CFC3AC) as the ~30% secondary in cabinetry, espresso walnut (#6F6353) as the ~10% accent in the desk and frames, lifted by a muted sage note (#9AA68F) and a clean warm white (#FBF8F1) trim."
    },
    {
        "title": "Ink Library",
        "room": "Home Office",
        "style": "Deep Jewel",
        "colors": [
            "#2C3A4A",
            "#D8CDB8",
            "#8A6A3E",
            "#7E8B8A",
            "#F3EFE6"
        ],
        "description": "A cocooning, enclosed focus-cave for a small office and a flattering on-camera backdrop: deep ink blue-slate (#2C3A4A) as the ~60% dominant on the walls and built-ins, warm oat (#D8CDB8) as the ~30% secondary in seating and paper, aged-brass gold (#8A6A3E) as the ~10% accent in lamps and hardware, with a muted teal-gray (#7E8B8A) note and soft cream (#F3EFE6) trim."
    }
];

export const INTERIOR_ROOMS = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Home Office"] as const;

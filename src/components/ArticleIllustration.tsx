import React from 'react';

interface ArticleIllustrationProps {
  type: string;
  className?: string;
}

export const ArticleIllustration: React.FC<ArticleIllustrationProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'button-stitch':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Technical Diagram</span>
            <span className="text-xs text-[#5C4D44]">Thread Shank Architecture</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="280" rx="8" fill="#FFFFFF"/>
            
            {/* Garment Base Layer */}
            <path d="M 60 210 L 540 210" stroke="#8C7A6B" stroke-width="8" stroke-linecap="round"/>
            <text x="70" y="235" fill="#5C4D44" font-size="12" font-family="system-ui">Garment Fabric (Front Placket)</text>

            {/* Left Diagram: Flat vs Shank */}
            <g transform="translate(60, 40)">
              <text x="30" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">1. Spaced Placement</text>
              <rect x="30" y="45" width="100" height="14" rx="4" fill="#EAE5DE" stroke="#261E1A" stroke-width="2"/>
              <circle cx="60" cy="52" r="3" fill="#261E1A"/>
              <circle cx="100" cy="52" r="3" fill="#261E1A"/>
              
              {/* Toothpick spacer */}
              <line x1="20" y1="52" x2="140" y2="52" stroke="#D4A373" stroke-width="4" stroke-linecap="round"/>
              <text x="145" y="55" fill="#8C7A6B" font-size="11" font-family="system-ui">Spacer (Toothpick)</text>

              {/* Thread loops through fabric */}
              <line x1="60" y1="52" x2="60" y2="170" stroke="#C87878" stroke-width="2.5"/>
              <line x1="100" y1="52" x2="100" y2="170" stroke="#C87878" stroke-width="2.5"/>
            </g>

            {/* Right Diagram: Wound Thread Shank */}
            <g transform="translate(340, 40)">
              <text x="30" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">2. Wound Thread Shank</text>
              {/* Elevated Button */}
              <rect x="40" y="45" width="100" height="14" rx="4" fill="#FAF6F0" stroke="#577861" stroke-width="2"/>
              <circle cx="70" cy="52" r="3" fill="#577861"/>
              <circle cx="110" cy="52" r="3" fill="#577861"/>
              
              {/* Thread Shank Column */}
              <rect x="84" y="60" width="12" height="110" rx="3" fill="#C87878" opacity="0.25"/>
              {/* Coiled Thread Windings */}
              <path d="M 82 80 C 100 78, 100 84, 82 86 M 82 96 C 100 94, 100 100, 82 102 M 82 112 C 100 110, 100 116, 82 118 M 82 128 C 100 126, 100 132, 82 134 M 82 144 C 100 142, 100 148, 82 150" stroke="#C87878" stroke-width="3" stroke-linecap="round"/>
              
              {/* Overlapping buttonhole layer indicator */}
              <path d="M 120 100 L 220 100 L 220 135 L 120 135 Z" fill="#E3EBE5" opacity="0.6" stroke="#577861" stroke-dasharray="4 3"/>
              <text x="135" y="122" fill="#3F5947" font-size="11" font-weight="500" font-family="system-ui">Buttonhole Room</text>
              <text x="98" y="165" fill="#261E1A" font-size="11" font-weight="600" font-family="system-ui">Wound Stem</text>
            </g>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Cross-section illustration showing how a temporary spacer provides the exact thread clearance required to create a sturdy wound shank.</p>
        </div>
      );

    case 'tshirt-hole':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Mending Diagram</span>
            <span className="text-xs text-[#5C4D44]">Knit Loop Stabilization</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="280" rx="8" fill="#FFFFFF"/>
            
            {/* Step 1: Knit Grid with Hole */}
            <g transform="translate(40, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">A. Open Broken Loops</text>
              {/* Knit Rib loops */}
              <path d="M 20 50 Q 30 35, 40 50 Q 50 65, 60 50 Q 70 35, 80 50 Q 90 65, 100 50" stroke="#C5D7C9" stroke-width="3" fill="none"/>
              <path d="M 20 80 Q 30 65, 40 80 Q 50 95, 60 80 Q 70 65, 80 80 Q 90 95, 100 80" stroke="#C5D7C9" stroke-width="3" fill="none"/>
              <path d="M 20 110 Q 30 95, 40 110 Q 50 125, 60 110 Q 70 95, 80 110 Q 90 125, 100 110" stroke="#C5D7C9" stroke-width="3" fill="none"/>
              {/* Pin hole gap */}
              <circle cx="80" cy="80" r="18" fill="#F7EBEB" stroke="#C87878" stroke-dasharray="3 3"/>
              <text x="65" y="85" fill="#964E4E" font-size="10" font-family="system-ui">Hole</text>
              <text x="10" y="160" fill="#5C4D44" font-size="11" font-family="system-ui">Open jersey loops risk running</text>
            </g>

            {/* Step 2: Fusible Knit Backing */}
            <g transform="translate(230, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">B. Fusible Backing (Underside)</text>
              <rect x="20" y="45" width="120" height="90" rx="8" fill="#F3F6F4" stroke="#577861" stroke-width="1.5"/>
              {/* Rounded stabilizer patch */}
              <circle cx="80" cy="90" r="32" fill="#E3EBE5" stroke="#3F5947" stroke-width="2"/>
              <circle cx="80" cy="90" r="10" fill="#FAF7F2" stroke="#8C7A6B" stroke-dasharray="2 2"/>
              <text x="25" y="160" fill="#5C4D44" font-size="11" font-family="system-ui">Rounded patch prevents peeling</text>
            </g>

            {/* Step 3: Loop Capture & Closure */}
            <g transform="translate(420, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">C. Loop Catch & Close</text>
              <circle cx="70" cy="90" r="28" fill="#FAF6F0" stroke="#C5D7C9"/>
              {/* Thread capturing all 4 quadrants */}
              <path d="M 55 75 L 85 105 M 85 75 L 55 105 M 70 65 L 70 115 M 45 90 L 95 90" stroke="#C87878" stroke-width="2"/>
              <circle cx="70" cy="90" r="3" fill="#577861"/>
              <text x="15" y="160" fill="#5C4D44" font-size="11" font-family="system-ui">Fine thread brings edges flush</text>
            </g>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Stabilizing the underside with lightweight flexible knit interfacing prevents runs while hand stitches gently close the gap without puckering.</p>
        </div>
      );

    case 'pant-hem':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Stitch Anatomy</span>
            <span className="text-xs text-[#5C4D44]">Tailor’s Blind Catch Stitch</span>
          </div>
          <svg viewBox="0 0 600 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="260" rx="8" fill="#FFFFFF"/>
            
            {/* Outer Trouser Fabric */}
            <rect x="40" y="30" width="520" height="90" fill="#F3F6F4" stroke="#D6CCC0" stroke-width="1.5"/>
            <text x="60" y="60" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">Outer Trouser Layer (Right Side Out / Folded In)</text>

            {/* Folded Hem Allowance */}
            <rect x="40" y="120" width="520" height="80" fill="#EAE5DE" stroke="#577861" stroke-width="1.5"/>
            <text x="60" y="170" fill="#5C4D44" font-size="12" font-weight="600" font-family="system-ui">Hem Allowance (Turned Up Inside 1.5"–2")</text>

            {/* Alternating Catch Stitch (Cross Stitch) Path */}
            <path d="M 80 135 L 120 100 L 160 135 L 200 100 L 240 135 L 280 100 L 320 135 L 360 100 L 400 135 L 440 100 L 480 135" stroke="#C87878" stroke-width="2.5" stroke-linecap="round"/>
            
            {/* Bite indicators */}
            <circle cx="120" cy="100" r="4" fill="#3F5947"/>
            <circle cx="200" cy="100" r="4" fill="#3F5947"/>
            <circle cx="280" cy="100" r="4" fill="#3F5947"/>
            <circle cx="360" cy="100" r="4" fill="#3F5947"/>
            <circle cx="440" cy="100" r="4" fill="#3F5947"/>

            <text x="130" y="85" fill="#3F5947" font-size="11" font-weight="600" font-family="system-ui">1–2 thread bite only</text>
            <text x="210" y="155" fill="#964E4E" font-size="11" font-weight="500" font-family="system-ui">Firm bite in hem allowance</text>
            <text x="40" y="235" fill="#5C4D44" font-size="11" font-family="system-ui">Stitch works left-to-right with needle pointing left, providing lateral flexibility as trousers drape.</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">The alternating catch stitch flexes naturally with body movement without puckering or leaving visible thread marks on the trouser exterior.</p>
        </div>
      );

    case 'body-measurements':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Measurement Landmarks</span>
            <span className="text-xs text-[#5C4D44]">Pattern Sizing Reference</span>
          </div>
          <svg viewBox="0 0 600 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="300" rx="8" fill="#FFFFFF"/>
            
            {/* Torso Silhouette */}
            <path d="M 230 40 Q 250 45, 270 40 L 290 65 L 305 95 Q 295 125, 305 145 L 290 170 Q 285 200, 310 240 L 290 280 L 210 280 L 190 240 Q 215 200, 210 170 L 195 145 Q 205 125, 195 95 L 210 65 Z" fill="#F3F6F4" stroke="#577861" stroke-width="2"/>
            
            {/* High Bust Line */}
            <line x1="150" y1="95" x2="350" y2="95" stroke="#C87878" stroke-width="2" stroke-dasharray="4 3"/>
            <text x="360" y="98" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">1. High Bust (Armpit level)</text>
            
            {/* Full Bust Line */}
            <line x1="140" y1="120" x2="360" y2="120" stroke="#577861" stroke-width="2.5"/>
            <text x="370" y="123" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">2. Full Bust (Apex)</text>

            {/* Natural Waist Line */}
            <line x1="150" y1="165" x2="350" y2="165" stroke="#C87878" stroke-width="3"/>
            <text x="360" y="168" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">3. Natural Waist (Elastic guide)</text>

            {/* High Hip */}
            <line x1="145" y1="205" x2="355" y2="205" stroke="#C5D7C9" stroke-width="2" stroke-dasharray="4 3"/>
            <text x="365" y="208" fill="#5C4D44" font-size="12" font-family="system-ui">4. High Hip (Pelvic crest, +3")</text>

            {/* Full Hip Line */}
            <line x1="135" y1="235" x2="365" y2="235" stroke="#577861" stroke-width="2.5"/>
            <text x="375" y="238" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">5. Full Hip (Widest seat point)</text>

            <rect x="50" y="70" width="80" height="40" rx="4" fill="#FAF6F0" stroke="#D6CCC0"/>
            <text x="60" y="93" fill="#5C4D44" font-size="11" font-family="system-ui">Tape Level</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Keep the measuring tape parallel to the floor at all times. Using an elastic band around your torso anchors the true natural waistline.</p>
        </div>
      );

    case 'fabric-flowers':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Craft Construction</span>
            <span className="text-xs text-[#5C4D44]">Gathered Rosette Method</span>
          </div>
          <svg viewBox="0 0 600 260" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="260" rx="8" fill="#FFFFFF"/>
            
            {/* Step 1: Strip with running stitch */}
            <g transform="translate(30, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">1. Folded Strip & Running Line</text>
              <rect x="10" y="40" width="160" height="35" fill="#F7EBEB" stroke="#E8B4B4" stroke-width="2"/>
              <line x1="15" y1="68" x2="165" y2="68" stroke="#C87878" stroke-width="2" stroke-dasharray="5 4"/>
              <text x="15" y="95" fill="#5C4D44" font-size="11" font-family="system-ui">Folded top edge / 1/4" stitch at bottom</text>
            </g>

            {/* Step 2: Gathered Ruffle */}
            <g transform="translate(225, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">2. Cinch Ruffle</text>
              <path d="M 15 65 Q 25 35, 35 65 Q 45 35, 55 65 Q 65 35, 75 65 Q 85 35, 95 65 Q 105 35, 115 65 Q 125 35, 135 65" fill="#F7EBEB" stroke="#C87878" stroke-width="2.5"/>
              <text x="15" y="95" fill="#5C4D44" font-size="11" font-family="system-ui">Pull gathering thread slowly</text>
            </g>

            {/* Step 3: Coiled Rose & Base */}
            <g transform="translate(400, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">3. Coiled Blossom & Felt Base</text>
              <ellipse cx="80" cy="65" rx="55" ry="35" fill="#FAF6F0" stroke="#577861" stroke-width="1.5"/>
              <path d="M 60 65 C 60 50, 100 50, 100 65 C 100 80, 50 85, 45 65 C 40 45, 110 40, 115 70" stroke="#C87878" stroke-width="2.5" fill="none"/>
              <circle cx="80" cy="65" r="9" fill="#EAE5DE" stroke="#261E1A" stroke-width="1.5"/>
              <text x="10" y="115" fill="#5C4D44" font-size="11" font-family="system-ui">Center button & felt disk backing</text>
            </g>
            
            <rect x="30" y="150" width="540" height="70" rx="6" fill="#F3F6F4" stroke="#E3EBE5"/>
            <text x="50" y="175" fill="#261E1A" font-size="12" font-weight="600" font-family="system-ui">Assembly Principle:</text>
            <text x="50" y="195" fill="#5C4D44" font-size="11" font-family="system-ui">Continuous hand stitches allow seamless gathers that roll into a stable rosette without glue, ensuring full washability.</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Hand-gathered petal ruffles create soft, organic rose curves anchored with a center button and felt backing plate.</p>
        </div>
      );

    case 'loose-seam':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Repair Diagram</span>
            <span className="text-xs text-[#5C4D44]">Backstitch Overlap Technique</span>
          </div>
          <svg viewBox="0 0 600 240" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="240" rx="8" fill="#FFFFFF"/>
            
            {/* Seam line */}
            <line x1="50" y1="110" x2="550" y2="110" stroke="#D6CCC0" stroke-width="4"/>

            {/* Left factory stitches */}
            <path d="M 60 110 L 180 110" stroke="#3F5947" stroke-width="5" stroke-dasharray="10 4"/>
            <text x="60" y="80" fill="#3F5947" font-size="11" font-weight="600" font-family="system-ui">Factory Stitches</text>

            {/* Gap zone */}
            <path d="M 210 110 L 390 110" stroke="#C87878" stroke-width="2" stroke-dasharray="2 3"/>
            <text x="260" y="80" fill="#964E4E" font-size="12" font-weight="600" font-family="system-ui">Popped Seam Gap</text>

            {/* Right factory stitches */}
            <path d="M 420 110 L 540 110" stroke="#3F5947" stroke-width="5" stroke-dasharray="10 4"/>
            <text x="440" y="80" fill="#3F5947" font-size="11" font-weight="600" font-family="system-ui">Factory Stitches</text>

            {/* Hand Backstitch Repair with 1/2" Overlap */}
            <path d="M 150 130 L 450 130" stroke="#C87878" stroke-width="4"/>
            
            {/* Overlap zones */}
            <rect x="150" y="100" width="50" height="40" fill="#E3EBE5" opacity="0.5" stroke="#577861" stroke-dasharray="3 3"/>
            <text x="145" y="160" fill="#577861" font-size="11" font-weight="600" font-family="system-ui">1/2" Overlap</text>

            <rect x="400" y="100" width="50" height="40" fill="#E3EBE5" opacity="0.5" stroke="#577861" stroke-dasharray="3 3"/>
            <text x="395" y="160" fill="#577861" font-size="11" font-weight="600" font-family="system-ui">1/2" Overlap</text>

            <text x="50" y="200" fill="#5C4D44" font-size="11" font-family="system-ui">Starting and stopping 1/2 inch into intact factory stitches locks both ends and stops unraveling permanently.</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Overlapping the intact factory seam by 1/2 inch on either side distributes mechanical strain and prevents future splits.</p>
        </div>
      );

    case 'needle-types':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Needle Reference Chart</span>
            <span className="text-xs text-[#5C4D44]">Geometry & Fabric Compatibility</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="280" rx="8" fill="#FFFFFF"/>
            
            {/* Needle 1: Universal */}
            <g transform="translate(40, 30)">
              <rect x="0" y="0" width="115" height="190" rx="6" fill="#F3F6F4" stroke="#E3EBE5"/>
              <text x="15" y="25" fill="#261E1A" font-size="12" font-weight="700" font-family="system-ui">Universal</text>
              <text x="15" y="42" fill="#577861" font-size="10" font-weight="600" font-family="system-ui">80/12 – 90/14</text>
              <path d="M 57 60 L 57 110 L 57 130" stroke="#261E1A" stroke-width="4"/>
              <ellipse cx="57" cy="133" rx="2" ry="3" fill="#261E1A"/>
              <text x="10" y="155" fill="#5C4D44" font-size="9" font-family="system-ui">Slightly rounded tip</text>
              <text x="10" y="172" fill="#261E1A" font-size="10" font-weight="500" font-family="system-ui">Wovens & Linens</text>
            </g>

            {/* Needle 2: Ballpoint / Jersey */}
            <g transform="translate(175, 30)">
              <rect x="0" y="0" width="115" height="190" rx="6" fill="#F7EBEB" stroke="#E8B4B4"/>
              <text x="15" y="25" fill="#261E1A" font-size="12" font-weight="700" font-family="system-ui">Ballpoint</text>
              <text x="15" y="42" fill="#964E4E" font-size="10" font-weight="600" font-family="system-ui">70/10 – 80/12</text>
              <path d="M 57 60 L 57 110" stroke="#261E1A" stroke-width="4"/>
              <circle cx="57" cy="120" r="5" fill="#261E1A"/>
              <text x="10" y="155" fill="#5C4D44" font-size="9" font-family="system-ui">Spherical rounded tip</text>
              <text x="10" y="172" fill="#261E1A" font-size="10" font-weight="500" font-family="system-ui">Jersey knits, tees</text>
            </g>

            {/* Needle 3: Microtex / Sharp */}
            <g transform="translate(310, 30)">
              <rect x="0" y="0" width="115" height="190" rx="6" fill="#F3F6F4" stroke="#E3EBE5"/>
              <text x="15" y="25" fill="#261E1A" font-size="12" font-weight="700" font-family="system-ui">Microtex Sharp</text>
              <text x="15" y="42" fill="#577861" font-size="10" font-weight="600" font-family="system-ui">60/8 – 70/10</text>
              <path d="M 57 60 L 57 110 L 57 138" stroke="#261E1A" stroke-width="3"/>
              <path d="M 54 135 L 57 142 L 60 135 Z" fill="#261E1A"/>
              <text x="10" y="155" fill="#5C4D44" font-size="9" font-family="system-ui">Very slim acute point</text>
              <text x="10" y="172" fill="#261E1A" font-size="10" font-weight="500" font-family="system-ui">Silks, microfiber</text>
            </g>

            {/* Needle 4: Jeans / Denim */}
            <g transform="translate(445, 30)">
              <rect x="0" y="0" width="115" height="190" rx="6" fill="#EAE5DE" stroke="#D6CCC0"/>
              <text x="15" y="25" fill="#261E1A" font-size="12" font-weight="700" font-family="system-ui">Jeans / Denim</text>
              <text x="15" y="42" fill="#5C4D44" font-size="10" font-weight="600" font-family="system-ui">90/14 – 110/18</text>
              <path d="M 57 60 L 57 110 L 57 132" stroke="#261E1A" stroke-width="6"/>
              <path d="M 53 130 L 57 139 L 61 130 Z" fill="#261E1A"/>
              <text x="10" y="155" fill="#5C4D44" font-size="9" font-family="system-ui">Reinforced blade</text>
              <text x="10" y="172" fill="#261E1A" font-size="10" font-weight="500" font-family="system-ui">Denim, heavy canvas</text>
            </g>

            <text x="40" y="245" fill="#5C4D44" font-size="11" font-family="system-ui">Tip style determines whether the needle pushes between knit loops or pierces clean through woven fiber yarns.</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Matching needle point and blade diameter to your fabric prevents skipped stitches, fabric runs, and broken needles.</p>
        </div>
      );

    case 'tote-bag':
      return (
        <div className={`w-full bg-[#FAF6F0] rounded-xl border border-[#E3EBE5] p-6 overflow-hidden ${className}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#577861]">Cutting &amp; Assembly Pattern</span>
            <span className="text-xs text-[#5C4D44]">Flat-Bottom Tote Architecture</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="280" rx="8" fill="#FFFFFF"/>
            
            {/* Body Panel Pattern Piece */}
            <g transform="translate(60, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">Body Panel Cut Layout (Cut 2)</text>
              {/* Outer panel with boxed corner cutouts */}
              <path d="M 20 40 L 180 40 L 180 180 L 155 180 L 155 155 L 180 155 M 155 180 L 45 180 L 45 155 L 20 155 L 20 40 Z" fill="#F3F6F4" stroke="#577861" stroke-width="2"/>
              <text x="75" y="32" fill="#577861" font-size="11" font-weight="600" font-family="system-ui">15" Width</text>
              <text x="188" y="115" fill="#577861" font-size="11" font-weight="600" font-family="system-ui">16" Height</text>
              
              {/* Boxed corner cutout indicators */}
              <rect x="20" y="155" width="25" height="25" fill="#FAF6F0" stroke="#C87878" stroke-dasharray="2 2"/>
              <rect x="155" y="155" width="25" height="25" fill="#FAF6F0" stroke="#C87878" stroke-dasharray="2 2"/>
              <text x="22" y="172" fill="#964E4E" font-size="9" font-family="system-ui">2"x2"</text>
              <text x="157" y="172" fill="#964E4E" font-size="9" font-family="system-ui">2"x2"</text>
            </g>

            {/* Box-X Stitch Detail */}
            <g transform="translate(340, 30)">
              <text x="10" y="20" fill="#261E1A" font-size="13" font-weight="600" font-family="system-ui">Box-X Strap Reinforcement</text>
              <rect x="30" y="45" width="80" height="135" rx="4" fill="#FAF6F0" stroke="#D6CCC0"/>
              {/* Strap entering */}
              <rect x="45" y="70" width="50" height="110" fill="#EAE5DE" stroke="#5C4D44" stroke-width="1.5"/>
              {/* Box-X Stitch */}
              <rect x="52" y="75" width="36" height="36" fill="#FFFFFF" stroke="#C87878" stroke-width="2.5"/>
              <line x1="52" y1="75" x2="88" y2="111" stroke="#C87878" stroke-width="2.5"/>
              <line x1="88" y1="75" x2="52" y2="111" stroke="#C87878" stroke-width="2.5"/>
              <text x="95" y="96" fill="#964E4E" font-size="11" font-weight="600" font-family="system-ui">Box-X Stitch</text>
              <text x="20" y="175" fill="#5C4D44" font-size="10" font-family="system-ui">Disperses handle load across canvas fibers</text>
            </g>

            <text x="60" y="245" fill="#5C4D44" font-size="11" font-family="system-ui">Pinching and stitching the 2" cutouts creates a clean 4" flat base that stands upright when loaded.</text>
          </svg>
          <p className="text-xs text-[#5C4D44] mt-2 text-center">Cutting 2-inch squares out of bottom corners produces a self-standing 4-inch deep boxed base.</p>
        </div>
      );

    default:
      return null;
  }
};

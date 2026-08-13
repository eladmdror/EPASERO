/**
 * FAQ content — spec §7.
 *
 * Supplied by Epasero as "0. FAQs.docx" and generated from it verbatim, so the
 * wording here is the client's own. These answers quote real AED figures and
 * make regulatory claims about Dubai Municipality and NOC approvals: treat them
 * as authored copy, not as text to paraphrase or "improve". Any change should
 * come from Epasero.
 *
 * Grouped by service line, mirroring the six services in §4.4.
 */
export type Faq = {
  question: string
  answer: string
}

export type FaqCategory = {
  title: string
  faqs: Faq[]
}

export const faqCategories: FaqCategory[] = [
  {
    title: 'Interior Design',
    faqs: [
      {
        question: 'How much does interior design cost in Dubai?',
        answer:
          "Interior design costs in Dubai typically range from AED 100 to AED 250 per square metre, depending on the studio's expertise and project scope. Luxury or highly bespoke projects may sit above this range. Always confirm what is included in the cost, as concept design, 3D renderings, material selection, and site supervision are not always bundled together.",
      },
      {
        question: 'What interior design styles are most popular in Dubai?',
        answer:
          'The most in-demand styles in Dubai include contemporary luxury, modern minimalism, transitional design, and warm Mediterranean-inspired interiors. Biophilic design, incorporating natural materials and greenery, is also growing in popularity. Many clients opt for fully bespoke concepts that blend influences to suit their personal lifestyle.',
      },
      {
        question: 'What does an interior designer do?',
        answer:
          'An interior designer manages the full creative and technical process of transforming a space, including floor plan layouts, material and finish selection, lighting, furniture, and 3D visualisations during the build. An experienced designer ensures the result is both visually elegant and functionally practical.',
      },
      {
        question: 'Should I hire an interior designer for a small apartment in Dubai?',
        answer:
          'Yes. Smaller spaces often benefit most from professional space planning, as a skilled designer can make a compact apartment feel significantly larger and more functional. For investors, a professionally designed apartment can also achieve stronger returns and greater tenant appeal, making it easier to sell or rent in Dubai\u2019s competitive property market.',
      },
      {
        question: 'How do I choose the right interior design company in Dubai?',
        answer:
          'Look for a company with a strong portfolio, experience in projects similar to yours, transparent pricing, and a structured process from concept to completion. It is also worth checking whether the company handles both design and fit-out in-house, which typically produces more cohesive results than splitting the two across separate firms.',
      },
      {
        question: 'How long does an interior design project take in Dubai?',
        answer:
          'The design phase alone, covering concept development, material selection, and 3D visualisation, typically takes 4 to 8 weeks depending on the size and complexity of the project. Larger or more bespoke projects may take longer, particularly if custom furniture or imported materials are involved. The fit-out or construction phase is separate and runs after the design is approved.',
      },
      {
        question: 'What is a 3D interior design visualisation and do I need one?',
        answer:
          'A 3D visualisation is a photorealistic rendering of your space before any physical work begins. It allows you to see exactly how the finished interior will look, making it far easier to approve finishes, layouts, and furniture choices. It also significantly reduces the risk of costly changes during the construction phase, making it a worthwhile investment for most projects.',
      },
      {
        question: 'Can I share my own inspiration images with my interior designer?',
        answer:
          'Absolutely. Sharing inspiration images, mood boards, or references from platforms like Pinterest or Instagram is strongly encouraged. It helps your designer understand your aesthetic preferences quickly and gives them a strong foundation to develop a concept that genuinely reflects your taste and lifestyle.',
      },
      {
        question: 'What rooms deliver the best return on interior design investment?',
        answer:
          "In residential properties in Dubai, the living area, master bedroom, kitchen, outdoor space, garden, and entrance tend to deliver the strongest return on investment, as these are the spaces that most influence a buyer's or tenant's first impression. For commercial spaces, reception areas and client-facing zones have the most impact on business perception.",
      },
      {
        question: 'Do interior design companies in Dubai source furniture and materials?',
        answer:
          'Many full-service interior design firms in Dubai offer furniture procurement and material sourcing as part of their service. This can include locally available pieces, while custom items can be produced either locally or sourced internationally. Always clarify upfront whether procurement is included or charged separately, as this can significantly affect the overall project budget.',
      },
      {
        question:
          'How does interior design for commercial spaces differ from residential projects?',
        answer:
          'Commercial interior design places greater emphasis on functionality, brand identity, and the experience of multiple users simultaneously. Layouts must account for workflow efficiency, customer flow, accessibility requirements, and compliance with Dubai Municipality regulations. The materials and finishes selected also need to be more durable and suited to higher foot traffic than those used in a private home.',
      },
    ],
  },
  {
    title: 'Renovation & Fit-Out',
    faqs: [
      {
        question: 'What is the difference between renovation and fit-out?',
        answer:
          'A fit-out transforms a bare or unfinished space into a fully functional one, which is common in new-build developments handed over in shell condition. Renovation involves upgrading or transforming an existing finished space, which may include demolition, reconfiguration, and replacement of outdated finishes or systems. Both require clear planning and skilled execution.',
      },
      {
        question: 'How much does a residential fit-out cost in Dubai?',
        answer:
          'Residential fit-out costs in Dubai fall into three broad tiers. A standard finish ranges from AED 1,000 to AED 1,500 per square metre. A mid-range finish with better materials and custom joinery ranges from AED 1,500 to AED 2,500 per square metre. A luxury fit-out can exceed AED 3,000 to AED 5,000 per square metre. These figures typically cover construction and finishes but may not include furniture and loose items.',
      },
      {
        question: 'How long does a fit-out or renovation take in Dubai?',
        answer:
          'A standard apartment fit-out typically takes 6 to 10 weeks. A large villa or penthouse renovation can take 3 to 6 months. Delays can arise from custom material lead times, building management NOC approvals, or mid-project design changes, all of which can be minimised with thorough upfront planning and a clear project brief.',
      },
      {
        question: 'Do I need permits or NOC approvals to renovate in Dubai?',
        answer:
          'Yes. Most renovation and fit-out works in Dubai require a No Objection Certificate (NOC) from your building management or master community developer before work begins. Structural changes may also require approval from Dubai Municipality. A professional contractor should be familiar with this process and ideally manages the submissions on your behalf.',
      },
      {
        question: 'What should I look for when choosing a fit-out company in Dubai?',
        answer:
          'Key factors include a strong portfolio, experience with similar project types, detailed and transparent quotations, and clear communication throughout. Choosing a company that manages design and project execution in-house reduces coordination issues and tends to produce more consistent results from concept through to completion.',
      },
      {
        question: 'How much does it cost to renovate a villa in Dubai?',
        answer:
          'Villa renovation costs in Dubai vary widely based on scope. A cosmetic refresh, including painting, flooring, and fixtures, may cost AED 750 to AED 1,250 per square metre. A full structural renovation with new layouts, finishes, and upgraded systems can range from AED 1,750 to AED 5,000 per square metre, depending on the materials and finishes selected.',
      },
      {
        question: 'How much does it cost to renovate an apartment in Dubai?',
        answer:
          'The cost of renovating an apartment in Dubai depends on several factors, including the size of the property, scope of work, quality of finishes, level of customisation, and whether kitchens or bathrooms are being fully upgraded. A light refresh will cost significantly less than a full renovation, so it is always best to obtain a tailored quotation based on your specific requirements.',
      },
      {
        question: 'Is renovation worth it before selling a property in Dubai?',
        answer:
          "In most cases, yes. A well-executed renovation increases a property's market value and makes it significantly more attractive to buyers. Updated kitchens, bathrooms, and fresh finishes are the most impactful upgrades. In Dubai's competitive property market, a move-in ready home consistently sells faster and at a premium compared to dated or worn spaces.",
      },
      {
        question: 'Can I live in my home during a renovation in Dubai?',
        answer:
          'It depends on the scope of work. For cosmetic updates like painting or flooring in specific rooms, it is often possible to remain in the property. For major renovations involving structural works, full demolition, or works affecting essential services like plumbing and electricity, it is usually more practical and comfortable to relocate temporarily for the duration of the project.',
      },
      {
        question: 'What are the most common renovation mistakes homeowners make in Dubai?',
        answer:
          "The most common mistakes include underestimating the budget, not accounting for NOC approval timelines, choosing materials without considering Dubai's climate, and making design changes mid-project. Skipping the design phase and going straight to construction is also a frequent pitfall, often resulting in costly revisions. Working with an experienced design-and-build firm from the outset avoids most of these issues.",
      },
      {
        question: 'How much does a commercial fit-out cost in Dubai?',
        answer:
          'Commercial fit-out costs in Dubai vary significantly depending on the type of space and the level of finish required. A standard office fit-out typically ranges from AED 1000 to AED 1,750 per square metre. Retail and hospitality spaces with more bespoke requirements can range from AED 1,500 to AED 4,000 per square metre or more. The cost is heavily influenced by joinery complexity, branded elements, and the quality of materials specified.',
      },
      {
        question: 'How do fit-out companies in Dubai manage large-scale commercial projects?',
        answer:
          'Reputable fit-out companies manage large-scale commercial projects through a dedicated project management structure, typically assigning a project manager, site supervisor, and design lead to each project. This team coordinates all trades, manages the procurement schedule, monitors quality at each stage, and provides regular progress updates to the client. Clear milestones, detailed programmes, and proactive communication are the hallmarks of a well-run commercial project.',
      },
      {
        question:
          'What fit-out services do developers need when delivering residential units in Dubai?',
        answer:
          'Developers delivering residential units in Dubai typically require fit-out services across a range of specifications, from standard finishes for affordable units to full luxury packages for premium developments. Services commonly needed include kitchen and joinery installation, bathroom tiling and fixtures, flooring, painting, built-in wardrobes, and MEP finishing. Developers also frequently require model unit fit-outs and common area upgrades for lobbies, gyms, and shared amenity spaces.',
      },
    ],
  },
  {
    title: 'Architectural Design',
    faqs: [
      {
        question: 'What does an architectural designer do in a residential project?',
        answer:
          'An architectural designer is responsible for the structural and spatial vision of a project, including floor plan optimisation, structural planning, fa\u00e7ade design, and compliance with local building codes. They ensure the form, flow, and function of a space work together before any construction begins, and produce the technical drawings required for authority approvals.',
      },
      {
        question: 'Do I need an architect for a renovation or fit-out in Dubai?',
        answer:
          'For cosmetic renovations, an architect is generally not required. However, if the project involves structural changes, extensions, new openings, or significant layout alterations, architectural drawings are typically required to obtain the necessary approvals from Dubai Municipality. In such cases, a Municipality licensed engineer must sign off on the design and compliance. Many integrated design-and-build firms include architectural services as part of their offering.',
      },
      {
        question: 'What is the difference between an architect and an interior designer?',
        answer:
          'An architect focuses on the structural, spatial, and regulatory aspects of a building, including how it is built, how spaces connect, and how the structure meets safety and compliance standards. An interior designer focuses on the aesthetic and functional experience within those spaces. On larger projects, the two disciplines work closely together, and some studios in Dubai offer both services under one roof.',
      },
      {
        question: 'How much does architectural design cost in Dubai?',
        answer:
          'Architectural design fees in Dubai are typically calculated as a percentage of the total construction cost, commonly between 10% and 20%, or agreed as a fixed fee based on the scope of work. Factors affecting cost include project complexity, the number of design revisions, authority submission requirements, and whether the architect is also responsible for construction supervision.',
      },
      {
        question: 'What approvals are needed for new construction or structural changes in Dubai?',
        answer:
          'Any new construction or structural alteration in Dubai requires approval from Dubai Municipality and, depending on the location, the master developer or community authority. Drawings must meet local building code standards and be approved by a Dubai Municipality licensed engineer. The approval timeline varies based on the project type and the authority involved, typically ranging from a few weeks to a few months.',
      },
      {
        question: 'What is an architectural concept design?',
        answer:
          'An architectural concept design is the initial creative stage of a project where the overall vision, spatial arrangement, and design language are established. It includes schematic floor plans, massing studies, and visual representations of the proposed design direction. The concept design stage allows clients to evaluate and refine the design before it progresses to detailed technical drawings and authority submissions.',
      },
      {
        question: 'Can architects in Dubai design both residential and commercial projects?',
        answer:
          'Yes. Licensed architects in Dubai practice across residential, commercial, hospitality, and mixed-use sectors. The scope and regulatory requirements differ between project types, so it is important to work with a firm that has relevant experience in the specific category of project you are undertaking, whether that is a private villa, a retail fit-out, or a commercial building.',
      },
      {
        question: 'What is the role of an architect during construction?',
        answer:
          'During construction, an architect reviews work on site to ensure it is being executed in accordance with the approved drawings and design intent. They issue clarifications, review contractor submissions, and address any technical issues that arise. This oversight role, often called contract administration or site supervision, is an important quality-control measure, particularly on complex or high-specification projects.',
      },
      {
        question: 'What is space planning and why does it matter?',
        answer:
          'Space planning is the process of arranging the functional areas and circulation within a space to maximise efficiency, comfort, and flow. Good space planning ensures rooms are the right size for their intended use, that movement through the space feels natural, and that no area is wasted. It is one of the most impactful and often overlooked aspects of both architectural design and interior design, particularly in apartments and commercial fit-outs where space is at a premium.',
      },
      {
        question: 'How does sustainable design apply to projects in Dubai?',
        answer:
          'Sustainable design in Dubai focuses on energy efficiency, water conservation, and the use of environmentally responsible materials. This includes high-performance glazing to reduce solar heat gain, efficient HVAC systems, LED lighting, low-flow plumbing fixtures, and where possible, materials with low environmental impact. The Dubai Green Building Regulations set minimum sustainability standards for new construction, and many clients are increasingly requesting sustainability features beyond the minimum requirement.',
      },
    ],
  },
  {
    title: 'Interior Styling',
    faqs: [
      {
        question: 'What is interior styling and how is it different from interior design?',
        answer:
          'Interior styling focuses on the decorative finishing layer of a space, including furniture arrangement, soft furnishings, artwork, accessories, lighting, and plants. It works with an existing or newly built space to create a cohesive, polished look. Interior design, by contrast, involves full spatial and technical planning that often includes construction works. Styling is ideal for spaces that need a visual refresh without structural changes.',
      },
      {
        question: 'Is interior styling worth it for rental properties in Dubai?',
        answer:
          "Yes. In Dubai's rental market, presentation directly impacts rental yield and leasing speed. A professionally styled property photographs better, stands out in listings, and attracts higher-quality tenants. For short-term rental platforms, styling is especially impactful. Many investors see a measurable return through improved occupancy rates and the ability to command premium rents.",
      },
      {
        question: 'How much does interior styling cost in Dubai?',
        answer:
          'A basic styling consultation and layout service for a one-bedroom apartment may start from AED 4,000 to AED 8,000. A full styling package including furniture sourcing and installation for a larger villa can range from AED 20,000 upwards. The scope should be clearly defined upfront to avoid ambiguity over what is and is not included in the service.',
      },
      {
        question: 'Can an interior stylist work with my existing furniture?',
        answer:
          'Yes. A good stylist works with whatever budget and existing pieces are available. They will assess what you already have, recommend what to keep, replace, or reposition, and source new accessories or accent pieces to pull the look together. This is often a cost-effective way to dramatically improve a space without a full redesign or renovation.',
      },
      {
        question: 'What is property staging and how does it differ from interior styling?',
        answer:
          'Property staging is the process of furnishing and styling a space specifically to make it more appealing for sale or rent. It is a targeted, often temporary exercise focused on maximising buyer or tenant appeal. Interior styling is broader and may be intended for long-term residential enjoyment or brand expression in commercial spaces. Both disciplines share similar techniques but serve different objectives.',
      },
      {
        question: 'How long does an interior styling project take in Dubai?',
        answer:
          'A styling project for a one-to-two-bedroom apartment can typically be completed within one to two weeks once the brief is agreed and items are sourced. Larger properties or projects requiring bespoke or imported pieces may take three to six weeks. The timeline is largely driven by how quickly furniture and accessories can be procured and delivered.',
      },
      {
        question: 'What are the key elements of a well-styled interior in Dubai?',
        answer:
          "A well-styled interior balances proportion, texture, colour, and lighting. Key elements include a cohesive colour palette, layered lighting from multiple sources, a mix of materials such as wood, metal, and fabric, thoughtfully placed artwork, and curated accessories that add personality without cluttering the space. In Dubai's luxury market, the quality and finish of individual pieces matters significantly.",
      },
      {
        question: "Can interior styling improve a property's sale price in Dubai?",
        answer:
          'Yes. Styled properties in Dubai consistently attract more interest, receive offers faster, and often achieve stronger sale prices than empty or poorly presented equivalents. Buyers find it easier to emotionally connect with a space they can visualise living in, and a professional styling job communicates that a property has been well cared for and thoughtfully considered.',
      },
    ],
  },
  {
    title: 'Landscaping',
    faqs: [
      {
        question: 'How much does landscaping cost in Dubai?',
        answer:
          'A basic garden design and installation for a villa in Dubai can start from AED 25,000 to AED 50,000. A comprehensive landscaping project with hardscaping, irrigation, lighting, and premium planting can range from AED 60,000 to AED 200,000. Features such as pergolas, water features, or outdoor kitchens add to the overall cost and should be budgeted for separately.',
      },
      {
        question: "What plants work best for landscaping in Dubai's climate?",
        answer:
          'Drought-tolerant species that perform well in Dubai include bougainvillea, frangipani, oleander, date palms, desert rose, and various ornamental grasses. For shaded or irrigated areas, a wider range of tropical plants can thrive. A professional landscaper familiar with UAE conditions will recommend the right mix of plants that look beautiful year-round while minimising water usage.',
      },
      {
        question: 'What is hardscaping and why is it important in Dubai?',
        answer:
          'Hardscaping refers to the non-plant elements of a landscape design, including paving, decking, retaining walls, pergolas, water features, and boundary structures. In Dubai, where outdoor living is valued for much of the year, hardscaping plays a central role in creating functional spaces for dining, entertaining, and relaxation. A well-balanced design combines hardscaping and planting in proportion to the size and intended use of the outdoor area.',
      },
      {
        question: 'Do I need a permit for landscaping works in Dubai?',
        answer:
          'Minor soft landscaping such as planting and garden maintenance generally does not require permits. However, structural additions such as pergolas, boundary walls, or major earthworks may require approval from your community master developer or Dubai Municipality. It is always advisable to check with your building or community management before commencing any outdoor construction works.',
      },
      {
        question: "How do I maintain a garden in Dubai's heat?",
        answer:
          'The key to maintaining a healthy landscape in Dubai is an efficient drip irrigation system on a timer, combined with the right choice of heat-tolerant plants. Mulching garden beds helps retain moisture and regulate soil temperature. Regular pruning, soil-appropriate fertilisation, and seasonal replanting of annuals keep outdoor spaces looking their best. Many homeowners opt for an annual landscaping maintenance contract for year-round upkeep.',
      },
      {
        question: 'What is an irrigation system and do I need one for my Dubai garden?',
        answer:
          "An irrigation system is an automated network of pipes and emitters that delivers water directly to plant roots on a timed schedule. In Dubai's climate, where temperatures regularly exceed 40 degrees Celsius in summer, a properly designed drip irrigation system is considered essential rather than optional for any serious garden. It conserves water, reduces manual effort, and significantly improves plant health and survival rates.",
      },
      {
        question: 'How long does a landscaping project take in Dubai?',
        answer:
          'A straightforward garden design and planting project for a villa can typically be completed within 2 to 4 weeks. Larger projects involving structural hardscaping, custom paving, water features, or pergola construction may take 8 to 12 weeks. The timeline also depends on material availability and the complexity of the irrigation and lighting systems being installed.',
      },
      {
        question: 'Can landscaping increase the value of a property in Dubai?',
        answer:
          'Yes. A well-designed outdoor space adds measurable value to a property in Dubai, particularly for villas in premium communities. Landscaped gardens, functional outdoor living areas, and well-maintained exteriors improve kerb appeal, attract more buyers, and can justify a higher asking price. For rental properties, an attractive garden can also increase rental yield and reduce vacancy periods.',
      },
      {
        question: 'What outdoor living features are most popular in Dubai villa landscaping?',
        answer:
          'The most requested outdoor features in Dubai villa landscaping include shaded pergolas and covered seating areas, outdoor kitchens and barbecue stations, decorative water features and fountains, ambient garden lighting, and private swimming pools. Fire pits and lounge areas are also popular for the cooler months. These features extend the usable living area of a home and are particularly valued in family-oriented villa communities.',
      },
      {
        question: 'What is the best time of year to undertake landscaping works in Dubai?',
        answer:
          'The cooler months between October and April are the optimal time for landscaping works in Dubai. Temperatures are more suitable for plant establishment and outdoor construction, and newly planted greenery has time to develop strong root systems before the intense summer heat arrives. Works carried out in summer are not impossible but require more intensive irrigation and plant care to ensure survival and healthy establishment.',
      },
      {
        question: 'How do I choose a landscaping company in Dubai?',
        answer:
          'Look for a company with a portfolio of completed projects in Dubai, demonstrable knowledge of the local climate and plant species, and experience in both soft landscaping and hardscaping. Ask about their approach to irrigation design, whether they offer ongoing maintenance, and whether they can manage authority approvals if structural works are required. Client references and site visits to completed projects are also a strong indicator of quality.',
      },
      {
        question: 'Can a landscaping company in Dubai help with sustainable or low-water gardens?',
        answer:
          "Yes. Sustainable landscaping is increasingly in demand in Dubai, driven by both environmental awareness and the practical need to manage water costs. Experienced landscaping companies can design gardens using drought-tolerant species, mulched beds, gravel features, and drip irrigation systems that significantly reduce water consumption. This approach produces beautiful, low-maintenance outdoor spaces that are well suited to Dubai's arid climate and aligned with the UAE's broader sustainability goals.",
      },
    ],
  },
]

/** Categories that actually have answered questions — empty ones never render. */
export const publishedFaqCategories = faqCategories
  .map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => faq.answer.trim().length > 0),
  }))
  .filter(category => category.faqs.length > 0)

export const publishedFaqCount = publishedFaqCategories.reduce(
  (total, category) => total + category.faqs.length,
  0,
)

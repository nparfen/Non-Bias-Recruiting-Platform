const assessmentData = {
    culture: [
        {
            title: "Dominant Characteristics",
            test:[
                {key: "A", question: "The organisation is a very personal place. It is like an extended family. People seem to share a lot of themselves."},
                {key: "B", question: "The organisation is a very dynamic and enterpreneurial place. People are willing to stick their necks out and take risks."},
                {key: "C", question: "The organisation is very results oriented. A major concern is with getting the job done. People are very competitve and achievement oriented."},
                {key: "D", question: "The organisation is a very controlled and structured place. Formal procedures generally govern what people do."}
            ]
        },
        {
            title: "Organisational Leadership",
            test:[
                {key: "A", question: "The leadership in the organisation is generally considered to exemplify mentoring, facilitating or nurturing."},
                {key: "B", question: "The leadership in the organisation is generally considered to exemplify entrepreneurship, innovating, or risk taking."},
                {key: "C", question: "The leadership in the organisation is generally considered to exemplify aggressive, results-oriented, no-nonsense focus"},
                {key: "D", question: "The leadership in the organisation is generally considered to exemplify coordinating, organising, or smooth-running efficiency."}
            ]
        },
        {
            title: "Management of Employees",
            test:[
                {key: "A", question: "The management style in the organisation is characterised by teamwork, consensus, and participation."},
                {key: "B", question: "The management style in the organisation is characterised by individual risk-taking, innovation, freedom, and uniqness."},
                {key: "C", question: "The management style in the organisation is characterised by hard-driving competitveness, high demands, and achievement."},
                {key: "D", question: "The management style in the organisation is characterised by security of employment, conformity, predictability, and stability in relationships."}
            ]
        },
        {
            title: "Organisational Glue",
            test:[
                {key: "A", question: "The glue that holds the organisation together is loyalty and mutual trust. Commitment to this organisation runs trust."},
                {key: "B", question: "The glue that holds the organisation together is commitment to innovation and development. There is an emphasis on being on the cutting edge."},
                {key: "C", question: "The glue that holds the organisation together is the emphasis on achievement and goal accomplishment. Aggressiveness and winning are common themes."},
                {key: "D", question: "The glue that holds the organisation together is formal rules and policies. Maintaining a smooth-running organisation is important."}
            ]
        },
        {
            title: "Strategic Emphasis",
            test:[
                {key: "A", question: "The organisation emphasises human development. High trust, openess, and participation persists."},
                {key: "B", question: "The organisation emphasises acquiring new resources and creating new challenges. Trying new things and prospecting for opportunities are valued."},
                {key: "C", question: "The organisation emphasises competitve actions and achievement. Hitting stretch targets and winning in the marketplace are dominant."},
                {key: "D", question: "The organisation emphasises permanence and stability. Efficiency, control and smooth operations are important."}
            ]
        },
        {
            title: "Criteria Success",
            test:[
                {key: "A", question: "The organisation defines success on the basis of the development of human resources, teamwork, employee commitment, and concern for people."},
                {key: "B", question: "The organisation defines success on the basis of having the most unique or the newest products. It is a product leader and innovator."},
                {key: "C", question: "The organisation defines success on the basis of winning in the marketplace and outpacing the competition. Competitve market leadership is key."},
                {key: "D", question: "The organisation defines success on the basis of efficiency. Dependable delivery, smooth scheduling, and low costs production are critical."}
            ]
        }
    ],
    personalities: [
        [
            "Easygoing",
            "Flexible",
            "Casual",
            "Liberal",
            "Modern"
        ],
        [
            "Optimistic",
            "Visionary",
            "Adventurous",
            "Big-thinking",
            "Entrepreneurial"
        ],
        [
            "Creative",
            "Imaginative",
            "Innovative",
            "Curious",
            "Progressive"
        ],
        [
            "Multi-leveled",
            "Open-minded",
            "Adaptable",
            "Keen",
            "Enthusiastic"
        ],
        [
            "Original",
            "Stylish",
            "Glamorous",
            "Individualistic",
            "Sophisticated"
        ],
        [
            "Opinionated",
            "Outspoken",
            "Talkative",
            "Questioning",
            "Articulate"
        ],
        [
            "Honest",
            "Intuitive",
            "Spontaneous",
            "Transparent",
            "Freethinking"
        ],
        [
            "Humble",
            "Idealistic",
            "Mindful",
            "Modest",
            "Warm"
        ],
        [
            "Clear-headed",
            "Methodical",
            "Objective",
            "Observant",
            "Realistic"
        ],
        [
            "Businesslike",
            "Practical",
            "Professional",
            "Quality-motivated",
            "Meticulous"
        ],
        [
            "Serious",
            "Systematic",
            "Impersonal",
            "Conservative",
            "Reserved"
        ],
        [
            "Reliable",
            "Organised",
            "Responsible",
            "Capable",
            "Independent"
        ],
        [
            "Dynamic",
            "Energetic",
            "Charismatic",
            "Intense",
            "Busy"
        ],
        [
            "Stable",
            "Solid",
            "Conventional",
            "Constant",
            "Reliable"
        ],
        [
            "Tenacious",
            "Persistent",
            "Determined",
            "Goal-oriented"
        ],
        [
            "Cooperative",
            "Friendly",
            "Helpful",
            "Approachable",
            "Personable"
        ],
        [
            "Loyal",
            "Devoted",
            "Motivated",
            "Conscientious",
            "Dedicated"
        ],
        [
            "Hardworking",
            "Winning",
            "Competitive",
            "Focused",
            "Ambitious"
        ],
        [
            "Daring",
            "Eager",
            "Aspiring",
            "Courageous",
            "Passionate"
        ],
        [
            "Forceful",
            "Strong",
            "Persuasive",
            "Confident",
            "Decisive"
        ],
        [
            "Constant",
            "Process driven",
            "Responsible",
            "Predictable",
            "Serious"
        ],
        [
            "Patient",
            "Balanced",
            "Calm",
            "Quiet"
        ],
        [
            "Diligent",
            "Disciplined",
            "Perfectionist",
            "Precise",
            "Thorough"
        ],
        [
            "Selfless",
            "Considerate",
            "Empathetic",
            "Caring",
            "Kind"
        ],
        [
            "Insightful",
            "Intelligent",
            "Logical",
            "Neat",
            "Rational"
        ],
        [
            "Skilled",
            "Efficient",
            "Autonomous",
            "Resourceful",
            "Self-sufficient"
        ],
        [
            "Incorruptible",
            "Firm",
            "Formal",
            "Mature",
            "Punctual"
        ],
        [
            "Dominating",
            "Tough",
            "Impersonal",
            "Strict",
            "Autoritarian"
        ]
    ],
    values: [
        "Inspire change",
        "Think no limit",
        "Break the mould",
        "Move fast",
        "Be bold",
        "Keep improving",
        "Fail fast - learn fast",
        "Dream big",
        "Innovate, create, implement",
        "Communicate freely",
        "Respect each other's point of view",
        "Stay passionate",
        "Diversity is the strenght",
        "Spread the joy",
        "Protect Mother Nature",
        "Help less fortunate",
        "Be independent - value the team",
        "Have fun",
        "Be professional",
        "Be accountable",
        "Get stuff done",
        "Look the par - act the par",
        "Adhere to the principles",
        "Safety & reliability ",
        "Be cost-conscious",
        "Stick to the process",
        "Efficiency, efficiency, efficiency",
        "Work hard - play hard",
        "Deliver outstanding product/service",
        "KISS - Keep it stupid simple",
        "Show me the money!",
        "Love your customer",
        "Customer is king",
        "Build relationships - never know where business can come from",
        "Comitted in heart and mind",
        "What we do, we do well"
    ]
}

export default assessmentData;
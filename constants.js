const conversions = {
	classToOutcomes: {
		CSE100: ["core"],
		CSE101: ["core"],
		CSE110: ["core"],
		CSE100R: ["core"],
		CSE120: ["systems"],
		CSE123: ["systems"],
		CSE124: ["systems"],
		CSE127: ["systems", "applications"],
		CSE132C: ["systems"],
		CSE140: ["systems", "theory", "applications"],
		CSE140L: ["systems", "applications"],
		CSE141: ["systems"],
		CSE141L: ["systems"],
		CSE142: ["systems", "applications"],
		CSE142L: ["systems", "applications"],
		CSE143: ["systems"],
		CSE145: ["systems", "applications"],
		CSE148: ["systems", "applications"],
		CSE160: ["systems"],
		DSC102: ["systems"],
		ECE111: ["systems"],
		ECE140A: ["systems", "applications"],
		ECE140B: ["systems", "applications"],
		CSE105: ["theory"],
		CSE106: ["theory"],
		CSE107: ["theory"],
		CSE130: ["theory"],
		CSE132A: ["theory"],
		CSE150A: ["theory"],
		DSC120: ["theory"],
		MATH170A: ["theory"],
		MATH170B: ["theory"],
		MATH170C: ["theory"],
		MATH171A: ["theory"],
		MATH171B: ["theory"],
		MATH181D: ["theory"],
		MATH187A: ["theory"],
		CSE112: ["applications"],
		CSE118: ["applications"],
		CSE125: ["applications"],
		CSE131: ["applications"],
		CSE132B: ["applications"],
		CSE134B: ["applications"],
		CSE135: ["applications"],
		CSE136: ["applications"],
		CSE150B: ["applications"],
		CSE151A: ["applications"],
		CSE151B: ["applications"],
		CSE152A: ["applications"],
		CSE152B: ["applications"],
		CSE156: ["applications"],
		CSE158: ["applications"],
		CSE158R: ["applications"],
		CSE163: ["applications"],
		CSE165: ["applications"],
		CSE166: ["applications"],
		CSE167: ["applications"],
		CSE168: ["applications"],
		CSE169: ["applications"],
		CSE170: ["applications"],
		CSE175: ["applications"],
		CSE176A: ["applications"],
		CSE176E: ["applications"],
		CSE181: ["applications"],
		CSE182: ["applications"],
		CSE184: ["applications"],
		CSE185: ["applications"],
		CSE193: ["applications"],
		CSE194: ["applications"],
		COGS108: ["applications"],
		COGS109: ["applications"],
		COGS118A: ["applications"],
		COGS118B: ["applications"],
		COGS118C: ["applications"],
		COGS120: ["applications"],
		COGS121: ["applications"],
		COGS122: ["applications"],
		COGS123: ["applications"],
		COGS124: ["applications"],
		COGS125: ["applications"],
		COGS126: ["applications"],
		COGS127: ["applications"],
		COGS181: ["applications"],
		COGS185: ["applications"],
		COGS186: ["applications"],
		COGS187A: ["applications"],
		COGS187B: ["applications"],
		COGS188: ["applications"],
		COGS189: ["applications"],
		DSGN100: ["applications"],
		ECON172A: ["applications"],
		ECON172B: ["applications"],
		ECE148: ["applications"],
		ENG100D: ["applications"],
		ENG100L: ["applications"],
		EDS124AR: ["applications"],
		EDS124BR: ["applications"],
		LIGN165: ["applications"],
		LIGN167: ["applications"],
		MATH114: ["applications"],
		MATH155A: ["applications"],
		MATH189: ["applications"],
		MUS171: ["applications"],
		MUS172: ["applications"],
		MUS177: ["applications"],
		VIS141A: ["applications"],
		VIS141B: ["applications"],
		CSE109: ["electives"],
		CSE192: ["electives"],
		CSE195: ["electives"],
		CSE197: ["electives"],
		CSE198: ["electives"],
		CSE199: ["electives"],
		CSE199H: ["electives"],
	},
	outcomeToClasses: {
		core: ["CSE100", "CSE101", "CSE110", "CSE100R"],
		systems: [
			"CSE120",
			"CSE123",
			"CSE124",
			"CSE127",
			"CSE132C",
			"CSE140",
			"CSE140L",
			"CSE141",
			"CSE141L",
			"CSE142",
			"CSE142L",
			"CSE143",
			"CSE145",
			"CSE148",
			"CSE160",
			"DSC102",
			"ECE111",
			"ECE140A",
			"ECE140B",
		],
		theory: [
			"CSE105",
			"CSE106",
			"CSE107",
			"CSE130",
			"CSE132A",
			"CSE140",
			"CSE150A",
			"DSC120",
			"MATH170A",
			"MATH170B",
			"MATH170C",
			"MATH171A",
			"MATH171B",
			"MATH181D",
			"MATH187A",
		],
		applications: [
			"CSE112",
			"CSE118",
			"CSE125",
			"CSE127",
			"CSE131",
			"CSE132B",
			"CSE134B",
			"CSE135",
			"CSE136",
			"CSE140",
			"CSE140L",
			"CSE142",
			"CSE142L",
			"CSE145",
			"CSE148",
			"CSE150B",
			"CSE151A",
			"CSE151B",
			"CSE152A",
			"CSE152B",
			"CSE156",
			"CSE158",
			"CSE158R",
			"CSE163",
			"CSE165",
			"CSE166",
			"CSE167",
			"CSE168",
			"CSE169",
			"CSE170",
			"CSE175",
			"CSE176A",
			"CSE176E",
			"CSE181",
			"CSE182",
			"CSE184",
			"CSE185",
			"CSE193",
			"CSE194",
			"COGS108",
			"COGS109",
			"COGS118A",
			"COGS118B",
			"COGS118C",
			"COGS120",
			"COGS121",
			"COGS122",
			"COGS123",
			"COGS124",
			"COGS125",
			"COGS126",
			"COGS127",
			"COGS181",
			"COGS185",
			"COGS186",
			"COGS187A",
			"COGS187B",
			"COGS188",
			"COGS189",
			"DSGN100",
			"ECON172A",
			"ECON172B",
			"ECE140A",
			"ECE140B",
			"ECE148",
			"ENG100D",
			"ENG100L",
			"EDS124AR",
			"EDS124BR",
			"LIGN165",
			"LIGN167",
			"MATH114",
			"MATH155A",
			"MATH189",
			"MUS171",
			"MUS172",
			"MUS177",
			"VIS141A",
			"VIS141B",
		],
		electives: [
			"CSE109",
			"CSE192",
			"CSE195",
			"CSE197",
			"CSE198",
			"CSE199",
			"CSE199H",
		],
	},
};

const exampleAuditText = `FA23\tCOGS108\t4.00\tA+\t\t\nData Science in Practice\nSP22\tEDS 124BR\t4.00\tB+\t\t\nTeach Computational Thinking\nSP22\tLIGN165\t4.00\tB+\t\t\nComputational Linguistics`;
const exampleCSVtext = "CSE 100, CSE 101, CSE 110";

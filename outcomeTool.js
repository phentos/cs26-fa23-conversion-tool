// conversions['classToOutcomes', 'outcomeToClasses']
let t;
let dragged;

function parseAndDisplay() {
	populateTable(fetchParse());
}

function populateTable(entries) {
	t = document.getElementById("results");
	activateHeaderDrops();

	while (entries.length) {
		let ne = entries.pop();
		let ol = getOutcomes(ne);
		let tb = "electives";

		for (o of ol) {
			let ttb = document.getElementById(`${o}Classes`);

			if (o == "uncounted" ? true : ttb.childElementCount < 3) {
				tb = o;
				break;
			}
		}

		addEntryToTable(ne, tb);
	}
	updateCounts();
}

function addEntryToTable(ne, tb) {
	let tr = conjureRow(ne);
	document.getElementById(`${tb}Classes`).appendChild(tr);
}

function conjureRow(e) {
	let tr = document.createElement("tr");
	let td = document.createElement("td");

	td.textContent = e;
	let ol = getOutcomes(e);

	for (o of ol) {
		td.classList.add(o);
	}

	if (!ol.includes("core") && !ol.includes("uncounted")) {
		td.classList.add("electives");
	}

	bindEvents(td);
	tr.appendChild(td);

	return tr;
}

function bindEvents(td) {
	if (td.classList.contains("core")) {
		return;
	}
	td.setAttribute("draggable", "true");
	td.addEventListener("dragstart", (event) => {
		dragged = event.target;
		toggleHighlight(event.target.classList, true);
		event.target.classList.add("dragging");
	});

	td.addEventListener("dragend", (event) => {
		event.target.classList.remove("dragging");
		toggleHighlight(event.target.classList, false);
	});

	td.addEventListener("mouseenter", (event) => {
		toggleHighlight(event.target.classList, true);
	});

	td.addEventListener("mouseleave", (event) => {
		toggleHighlight(event.target.classList, false);
	});
}

function toggleHighlight(cl, add) {
	for (c of [...cl, "electives"]) {
		add
			? outcomeHeaders[c].classList.add("highlight")
			: outcomeHeaders[c].classList.remove("highlight");
	}
}

function bindDrops(th) {
	th.addEventListener("dragover", (event) => {
		if (dragged.classList.contains(event.target.classList[0])) {
			event.preventDefault();
		}
	});

	th.addEventListener("dragenter", (event) => {
		if (dragged.classList.contains(event.target.classList[0])) {
			event.target.classList.add("dragover");
		}
	});

	th.addEventListener("dragleave", (event) => {
		if (event.target.classList.contains("dragover")) {
			event.target.classList.remove("dragover");
		}
	});

	th.addEventListener("drop", (event) => {
		event.preventDefault();
		event.target.classList.remove("dragover");
		moveCell(event.target);
	});
}

function moveCell(where) {
	let o = where.classList[0];

	dragged.parentNode.removeChild(dragged);
	document.getElementById(`${o}Classes`).appendChild(dragged);
	dragged = null;

	updateCounts();
}

const outcomeHeaders = {};
function activateHeaderDrops() {
	t.querySelectorAll("th").forEach((th) => {
		if (!th.classList.contains("core")) {
			bindDrops(th);
		}
		outcomeHeaders[th.classList[0]] = th;
	});
}

function updateCounts() {
	for (o of ["core", "systems", "theory", "applications"]) {
		setNeeds(o, 3);
	}

	setNeeds("electives", 6);
}

function setNeeds(o, req) {
	let cc = getcc(o);
	let r = cc >= req ? 0 : req - cc;
	let po = o[0].toUpperCase() + o.slice(1);
	outcomeHeaders[o].innerText = `${po} (${r} needed)`;
}

function getcc(o) {
	return document.getElementById(`${o}Classes`).childElementCount;
}

function getClasses(o) {
	let cl = conversions["outcomeToClasses"][o];
	return cl ? cl : console.warn(`getClasses called on bad outcome ${o}`);
}

function getOutcomes(c) {
	let ol = conversions["classToOutcomes"][c];
	return ol ? ol : ["uncounted"];
}

function fetchParse() {
	const checkbox = document.getElementById("auditCheckbox");
	let input = document.getElementById("classInput").value;

	if (checkbox.checked) {
		input = parseAudit(input);
	}

	return input.split(",").map((s) => s.replaceAll(" ", "").toUpperCase());
}

function parseAudit(input) {
	const auditLines = input.replaceAll(" ", "").split("\n");
	const classList = [];
	auditLines.forEach((line) => {
		const parts = line.split("\t");
		if (parts.length > 1 && parts[1].trim() !== "") {
			classList.push(parts[1].trim());
		}
	});
	return classList.join(",");
}

function toggleAuditTemplate() {
	const checkbox = document.getElementById("auditCheckbox");
	const textarea = document.getElementById("classInput");
	const auditText = `FA23\tCOGS108\t4.00\tA+\t\t\nData Science in Practice\nSP22\tEDS 124BR\t4.00\tB+\t\t\nTeach Computational Thinking\nSP22\tLIGN165\t4.00\tB+\t\t\nComputational Linguistics`;
	textarea.value = "";

	if (checkbox.checked) {
		textarea.placeholder = auditText;
	} else {
		textarea.placeholder = "CSE 100, CSE 101, CSE 110";
	}
}

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
		let tb = "uncounted";
		for (o of ol) {
			console.log(`${o}`);
			let ttb = document.getElementById(`${o}Classes`);
			console.log(`${ttb.childElementCount}`);
			if (ttb.childElementCount < 3) {
				tb = o;
				break;
			}
		}
		addEntryToTable(ne, tb);
	}
}

function addEntryToTable(ne, tb) {
	console.log(`addEntry to ${tb}`);
	let tr = conjureRow(ne);
	document.getElementById(`${tb}Classes`).appendChild(tr);
}

function conjureRow(e) {
	let tr = document.createElement("tr");
	let td = document.createElement("td");
	td.setAttribute("draggable", "true");
	bindDrag(td);
	td.textContent = e;
	for (o of getOutcomes(e)) {
		td.classList.add(o);
	}
	tr.appendChild(td);

	return tr;
}

function bindDrag(td) {
	td.addEventListener("dragstart", (event) => {
		dragged = event.target;
		event.target.classList.add("dragging");
	});

	td.addEventListener("dragend", (event) => {
		event.target.classList.remove("dragging");
	});
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
	// document.getElementById
}

function activateHeaderDrops() {
	t.querySelectorAll("th").forEach((th) => {
		bindDrops(th);
	});
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

	return input.split(",").map((s) => s.trim().toUpperCase());
}

function parseAudit(input) {
	const auditLines = input.split("\n");
	const classList = [];
	auditLines.forEach((line) => {
		const parts = line.split("\t");
		if (parts.length > 1 && parts[1].trim() !== "") {
			classList.push(parts[1].trim());
		}
	});
	return classList.join(", ");
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

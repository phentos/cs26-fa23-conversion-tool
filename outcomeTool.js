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

    for (o of ol) {
      let cap = o == "electives" ? 6 : 3;

      if (o == "uncounted" ? true : getcc(o) < cap) {
        let otb = document.getElementById(`${o}Classes`);
        addEntryToTable(ne, otb);
        break;
      }
    }
  }
  updateCounts();
}

/**
 *
 * @param {string} ne	a class code, e.g. 'CSE 100'
 * @param {string} tb	the table to add to
 */
function addEntryToTable(ne, tb) {
  tb.appendChild(makeCell(ne));
}

function makeCell(e) {
  let td = document.createElement("td");
  td.textContent = e;

  let ol = getOutcomes(e);
  for (o of ol) {
    td.classList.add(o);
  }

  if (!(ol.includes("core") || ol.includes("uncounted"))) {
    td.classList.add("electives");
  }

  if (!td.classList.contains("core")) {
    activateDrag(td);
  }

  return td;
}

function activateDrag(td) {
  const tdo = function (e) {
    return getOutcomes(e.target.textContent);
  };
  td.setAttribute("draggable", "true");
  td.addEventListener("dragstart", (event) => {
    dragged = event.target;
    toggleHighlight(tdo(event), true);
    event.target.classList.add("dragging");
  });

  td.addEventListener("dragend", (event) => {
    event.target.classList.remove("dragging");
    toggleHighlight(tdo(event), false);
  });

  td.addEventListener("mouseenter", (event) => {
    if (dragged) {
      return;
    }
    toggleHighlight(tdo(event), true);
  });

  td.addEventListener("mouseleave", (event) => {
    if (dragged) {
      return;
    }
    toggleHighlight(tdo(event), false);
  });
}

let debug = true;
function toggleHighlight(ol, add) {
  for (o of ol) {
    add
      ? outcomeHeaders[o].classList.add("highlight")
      : outcomeHeaders[o].classList.remove("highlight");
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
  if (ol) {
    if (!(ol.includes("core") || ol.includes("electives"))) {
      ol.push("electives");
    }
  } else {
    ol = ["uncounted"];
  }
  return ol;
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

class PLO {
  constructor() {
    this.outcomeToClass = {
      core: ["CSE 100", "CSE 101", "CSE 110", "CSE 100R"],
      systems:
        "CSE 120, CSE 123, CSE 124, CSE 127, CSE 132C, CSE 140, CSE 140L, CSE 141, CSE 141L, CSE 142, CSE 142L, CSE 143, CSE 145, CSE 148, CSE 160, DSC 102, ECE 111, ECE 140A, ECE 140B".split(
          ", "
        ),
      theory:
        "CSE 105, CSE 106, CSE 107, CSE 130, CSE 132A, CSE 140, CSE 150A, DSC 120, MATH 170A, MATH 170B, MATH 170C, MATH 171A, MATH 171B, MATH 181D, MATH 187A".split(
          ", "
        ),
      applications:
        "CSE 112, CSE 118, CSE 125, CSE 127, CSE 131, CSE 132B, CSE 134B, CSE 135, CSE 136, CSE 140, CSE 140L, CSE 142, CSE 142L, CSE 145, CSE 148, CSE 150B, CSE 151A, CSE 151B, CSE 152A, CSE 152B, CSE 156, CSE 158 or CSE 158R, CSE 163, CSE 165, CSE 166, CSE 167, CSE 168, CSE 169, CSE 170, CSE 175, CSE 176A, CSE 176E, CSE 181, CSE 182, CSE 184, CSE 185, CSE 193, CSE 194, COGS 108, COGS 109, COGS 118A, COGS 118B, COGS 118C, COGS 120, COGS 121, COGS 122, COGS 123, COGS 124, COGS 125, COGS 126, COGS 127, COGS 181, COGS 185, COGS 186, COGS 187A, COGS 187B, COGS, 188, COGS 189, DSGN 100,  ECON 172A, ECON 172B, ECE 140A, ECE 140B, ECE 148, ENG 100D/ENG 100L, EDS 124AR, EDS 124BR, LIGN 165, LIGN 167, MATH 114, MATH 155A, MATH 189, MUS 171, MUS 172, MUS 177, VIS 141A, VIS 141B".split(
          ", "
        ),
      open: "CSE 109, CSE 192, CSE 195, CSE 197, CSE 198, CSE 199, CSE 199H".split(
        ", "
      ),
    };
    this.classToOutcome = {};
    for (let o in this.outcomeToClass) {
      this.outcomeToClass[o].forEach((c) => {
        if (!this.classToOutcome[c]) {
          this.classToOutcome[c] = [];
        }
        this.classToOutcome[c].push(o);
      });
    }
  }

  getClass(c) {
    return this.classToOutcome[c] || ["uncounted"];
  }
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

function parseAndDisplay() {
  const checkbox = document.getElementById("auditCheckbox");
  let input = document.getElementById("classInput").value;

  if (checkbox.checked) {
    const auditLines = input.split("\n");
    const classList = [];
    auditLines.forEach((line) => {
      const parts = line.split("\t");
      if (parts.length > 1 && parts[1].trim() !== "") {
        classList.push(parts[1].trim());
      }
    });
    input = classList.join(", ");
  }

  const classes = input.split(",").map((s) => s.trim());
  const results = {
    core: [],
    systems: [],
    theory: [],
    applications: [],
    electives: [],
    uncounted: [],
  };

  const r = new PLO();
  classes.forEach((c) => {
    let ol = r.getClass(c);
    ol.forEach((o) => {
      if (!results[o].includes(c)) {
        results[o].push(c);
      }
    });
  });

  displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Create the Selection section
    const selectionDiv = document.createElement('div');
    selectionDiv.id = 'selection';
    const selectionHeader = document.createElement('h3');
    selectionHeader.textContent = 'Selection';
    selectionDiv.appendChild(selectionHeader);

    // Create the Result section
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    const resultHeader = document.createElement('h3');
    resultHeader.textContent = 'Result';
    resultDiv.appendChild(resultHeader);

    // Create columns for each key in Result section
    Object.keys(results).forEach(category => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column', category);
        columnDiv.setAttribute('data-category', category);
        const columnHeader = document.createElement('h4');
        columnHeader.textContent = category.toUpperCase();
        columnDiv.appendChild(columnHeader);
        resultDiv.appendChild(columnDiv);

        // Add 'core' and the input classes to the 'core' column
        if (category === 'core') {
            results[category].forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.textContent = course;
                columnDiv.appendChild(courseDiv);
            });
        }
    });

    // Populate Selection section with unique classes not in 'uncounted' or 'core'
    const addedCourses = new Set(); // To keep track of added courses
    Object.keys(results).forEach(category => {
        if (category !== 'uncounted' && category !== 'core') {
            results[category].forEach(course => {
                if (!addedCourses.has(course)) {
                    const courseDiv = document.createElement('div');
                    const courseLabel = document.createElement('label');
                    courseLabel.textContent = course;
                    courseDiv.appendChild(courseLabel);

                    const dropdown = document.createElement('select');
                    dropdown.setAttribute('name', course);
                    dropdown.setAttribute('onchange', 'updateResult(this)');

                    // Default dropdown option
                    const defaultOption = document.createElement('option');
                    defaultOption.textContent = 'CHOOSE ONE';
                    defaultOption.setAttribute('value', '');
                    dropdown.appendChild(defaultOption);

                    // Add options for each key it is present in, and 'electives'
                    const outcomes = new PLO().getClass(course);
                    outcomes.forEach(outcome => {
                        if (outcome !== 'uncounted' && outcome !== 'core') {
                            const option = document.createElement('option');
                            option.textContent = outcome.toUpperCase();
                            option.setAttribute('value', outcome);
                            dropdown.appendChild(option);
                        }
                    });
                    const electiveOption = document.createElement('option');
                    electiveOption.textContent = 'ELECTIVES';
                    electiveOption.setAttribute('value', 'electives');
                    dropdown.appendChild(electiveOption);

                    courseDiv.appendChild(dropdown);
                    selectionDiv.appendChild(courseDiv);
                    addedCourses.add(course); // Mark this course as added
                }
            });
        }
    });

    resultsDiv.appendChild(selectionDiv);
    resultsDiv.appendChild(resultDiv);
}


function updateResult(selectElement) {
    const selectedCategory = selectElement.value;
    const course = selectElement.name;
    
    // Clear course from all columns before placing it in a new one
    document.querySelectorAll('.column').forEach(column => {
        Array.from(column.children).forEach(child => {
            if (child.tagName === 'DIV' && child.textContent === course) {
                child.remove();
            }
        });
    });
    
    if (selectedCategory) {
        // Place course in the selected category column
        const categoryColumn = document.querySelector(`.column.${selectedCategory}`);
        const courseDiv = document.createElement('div');
        courseDiv.textContent = course;
        categoryColumn.appendChild(courseDiv);
    }

    checkRequirements();
}

function checkRequirements() {
    
}

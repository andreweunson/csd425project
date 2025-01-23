const start_btn = document.getElementById('start_btn');

let start = false;

//dictionary of taken classes
let taken = {};
//currently available classes
let available = ["105", "107"];

// A list of classes for which key class is a prerequisite
let prereq = {
    "105": ["103", "110"],
    "107": ["109", "110"]
}

// A list of classes which are prerequisites for a key class
let classPrerequisites = {
    "103": ["105"],
    "109": ["107"],
    "110": ["105", "107"],
}

document.querySelectorAll(".lesson").forEach(lesson => {
    lesson.addEventListener("click", () => {
        // When clicked, if start button was clicked before (start=true) and current class is available and not taken
        if (start && lesson.classList.contains("available") && !lesson.classList.contains("taken")) {
            taken[lesson.id] = true;

            // change bg color to green
            lesson.classList.add("taken");
            lesson.classList.remove("available");

            // remove id from available array
            available.splice(available.indexOf(lesson.id), 1);
            start = false;

            // if class is prerequisite
            if (prereq[lesson.id]) {
                // for each class where this class is prereq
                prereq[lesson.id].forEach((dependableClass) => {

                    // assume dependableClass can be made available
                    let allPrereqTaken = true;

                    // Check all prerequisites for dependableClass to see if any of them is not taken yet
                    classPrerequisites[dependableClass].forEach(classe => {
                        if (!taken[classe]) {
                            allPrereqTaken = false;
                        }
                    });

                    if (allPrereqTaken) {
                        available.push(dependableClass);
                    }
                })
            }

            available.forEach(value => {
                document.getElementById(value).classList.remove("available");
            })

        }
    })
});

start_btn.addEventListener("click", function () {
    start = true;
    available.forEach(value => {
        document.getElementById(value).classList.add("available");
    })
});
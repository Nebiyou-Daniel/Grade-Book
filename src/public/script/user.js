

// dom elements needed

const table = document.querySelector('#myTable');
const rows = table.querySelectorAll('tbody tr');
const editButtons = table.querySelectorAll('.edit-btn');
const deleteButtons = table.querySelectorAll('.delete-btn');
const years = document.getElementById('years');
const semesterOne = document.getElementById('semOne');
const semesterTwo = document.getElementById('semTwo');
const addCourseBtn = document.getElementById('addCourse');
const form = document.getElementById('form');
const tbody = document.getElementById('table-body');
const userName = document.getElementById('userName');
const cgpa = document.getElementById('cgpa');
const semesterGpa = document.getElementById('gpa')

const courseName = document.getElementById("courseName");
const creditHours = document.getElementById("numberOfCredits");
const courseGrade = document.getElementById("grade");

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function () {
        updateTable();
    });
});


function displaySuccessMessage(messageContent) {
    let messageText = document.getElementById("message-text");
    messageText.innerHTML = messageContent;

    let messageContainer = document.getElementById("message-container");
    messageContainer.style.display = "block";

    setTimeout(function () {
        messageContainer.style.display = "none";
    }, 2000);
}

function displayErrorMessage(errorContent) {
    const errorPopup = document.getElementById("error-popup");
    const errorText = document.getElementById("error-text");

    errorText.innerHTML = errorContent;
    errorPopup.style.display = "block";

    setTimeout(function () {
        errorPopup.style.display = "none";
    }, 2000);
}


function displayTop(message) {
    const popup = document.getElementById("popup");
    const messageElement = document.getElementById("message");

    messageElement.innerText = message;
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 2000);
}

// displaySuccessMessage("Course Deleted Successfully. ")
// displayErrorMessage('Error test message  ')
// displayTop("Course Deleted Successfully ")

const editButton = document.createElement('img')
editButton.classList.add('edit-btn', 'cursor');
editButton.setAttribute('src', "images/edit.png");

const deleteButton = document.createElement('img')
deleteButton.classList.add('delete-btn', 'cursor');
deleteButton.setAttribute('src', "images/delete.png");

const token = localStorage.getItem('access_token');

// on startup do these
// get the name, all grades, all gpa, cgpa, 
getMe();
reload();


form.addEventListener('submit', function (event) {
    event.preventDefault();
})




let yearData = {
    '11': [['course', '5', 'A+'], ['computer Architecture', '7', 'A-']],
    '12': [],
    '21': [],
    '22': [],
    '31': [],
    '32': [],
    '41': [],
    '42': [],
    '51': [],
    '52': [],
}

/**
 * 
 * @param {Array[Object]} courses: a list of course object with attributes name, grade, credit hours
 */
function updateYeardata(courses) {
    // reset the yeardata
    for (key in yearData) {
        while (yearData[key].length > 0) {
            yearData[key].pop();
        }
    }

    // for each course add it to the right key
    let newCourseList;
    let yearSem;
    for (let course of courses) {
        newCourseList = [],
            newCourseList.push(course.courseName)
        newCourseList.push(course.creditHours)
        newCourseList.push(course.grade)
        yearSem = "";
        yearSem += course.year;
        yearSem += course.semester;

        yearData[yearSem].push(newCourseList);
    }
}

let gpaData = {
    '11': "0",
    '12': "0",
    '21': "0",
    '22': "0",
    '31': "0",
    '32': "0",
    '41': "0",
    '42': "0",
    '51': "0",
    '52': "0"
}

/**
 * gets course names, gpa and cgpa, then update the table to the current values in the yearData
 */
async function reload() {
    await getCourses();
    await getgpa();
    await updateTable();
    getcgpa();
}

/**
 * @returns void, sets the yearData to the course of the current user's data
 */
async function getCourses() {
    // fetch courses
    const response = await fetch('http:localhost:3003/courses', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    if (data.success) {
        updateYeardata(data.courses);
        displayTop("reloaded");
    } else {
        displayErrorMessage("unable to fetch courses.")
        return;
    }
}



/**
 * 
 * @returns void, sets the name at the top right nav to the user's first Name.
 */
async function getMe() {

    const response = await fetch('http:localhost:3003/user/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();


    if (response.ok) {
        userName.innerHTML = (data.fullName).split(' ')[0];
    } else {
        userName.innerHTML = '...';
        console.log("unable to fetch userName");
    }
}

/**
 * @return void: updates the gpaData to the current user gpa
 */
async function getgpa() {
    const response = await fetch('http:localhost:3003/courses/gpa', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    if (response.ok) {
        gpaData = data.gpa;
    }
}


/**
 * @return void: sets the cgpa's innertext to the current user cgpa
 */
async function getcgpa() {
    const response = await fetch('http:localhost:3003/courses/cgpa', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    if (response.ok) {
        cgpa.innerHTML = data.cgpa;
    }
}

/**
 * @returns array query, query[0] = the selected year and query[1] = selected semester.
 */
function currSelected() {
    let query = [];
    const allYears = document.querySelectorAll(".year");
    for (let i = 0; i < allYears.length; i++) {
        const yearBtn = allYears[i];
        if (yearBtn.checked) {
            query.push(yearBtn.value);
            break;
        }
    }
    if (semesterOne.checked) {
        query.push('1');

    } else {
        query.push('2');
    }
    return query;
}

/**
 * @returns Void: updates the tables in the current table,and 
 * fills it with the data that is the currently selected table grades and courses
 */
async function updateTable() {

    // check which year and semester is checked
    let currSelect = currSelected();
    let yearSem = currSelect[0] + currSelect[1];

    // set current year, semester gpa
    semesterGpa.innerText = gpaData[yearSem];

    // render table by values at the yearData
    tbody.innerHTML = '';

    let rowsData = yearData[yearSem];

    if (rowsData.length === 0) {
        tbody.innerHTML = "<p>EMPTY : Insert Course !</p>";
        return;
    }
    // iterating through the year data, creatig rows on the way.
    for (let i = 0; i < rowsData.length; i++) {
        let rowData = rowsData[i];
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = i + 1;
        tr.append(td);
        for (let cellData of rowData) {
            let td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        }
        // creating the buttons
        let editButton = document.createElement('img')
        editButton.classList.add('edit-btn', 'cursor');
        editButton.setAttribute('src', "images/edit.png");

        let deleteButton = document.createElement('img')
        deleteButton.classList.add('delete-btn', 'cursor');
        deleteButton.setAttribute('src', "images/delete.png");

        let editBtn = document.createElement('td');
        editBtn.appendChild(editButton);
        let delBtn = document.createElement('td');
        delBtn.appendChild(deleteButton);
        tr.appendChild(editBtn);
        tr.appendChild(delBtn);
        tbody.appendChild(tr);
    }
}


// edit, delete and add course fetches below

const editPopup = document.querySelector("#popup-background");
const deletePopup = document.querySelector("#delete-popup");
const okEdit = document.querySelector("#ok-edit");
const cancelBtn = document.querySelector("#cancel-edit");
const okDelete = document.querySelector("#ok-delete");
const cancelDelete = document.querySelector("#cancel-delete");

// flags to ensure that the addEventListener is done only once, to 
// avoid multiple listeners that would messup our operation
let isOkEditClicked = false;
let isCancelBtnClicked = false;
let isOkDeleteClicked = false;
let isCancelDeleteBtnClicked = false;

table.addEventListener("click", event => {
    if (event.target.classList.contains("edit-btn")) {
        console.log("edit btn-clicked");
        let row = event.target.parentElement.parentElement;
        var elements = row.children;
        let column1 = elements.item(1);
        let column2 = elements.item(2);
        let column3 = elements.item(3);


        let indexToEdit = row.firstElementChild;
        let prevCourseName = indexToEdit.nextSibling;


        editPopup.classList.remove("hidden");
        let editCourseName = document.getElementById("courseNameEdit");
        let editCreditHours = document.getElementById("creditHourEdit");
        let editGrade = document.getElementById("gradeEdit");

        editCourseName.value = column1.innerText;
        editCreditHours.value = parseInt(column2.innerText);
        editGrade.value = column3.innerText;

        if (!isOkEditClicked) {
            okEdit.addEventListener("click", async () => {
                isOkEditClicked = true;

                // for debudding purpose
                console.log(prevCourseName.innerHTML, editCourseName.value, editCreditHours.value, editGrade.value);

                await editCourseFetch(prevCourseName.innerHTML, editCourseName.value, editCreditHours.value, editGrade.value)
                editPopup.classList.add("hidden");
            });
        }

        if (!isCancelBtnClicked) {
            cancelBtn.addEventListener("click", () => {
                isCancelBtnClicked = true;
                editPopup.classList.add("hidden");
            });
        }
    } else if (event.target.classList.contains("delete-btn")) {
        let row = event.target.parentElement.parentElement;
        let indexToEdit = row.firstElementChild;
        let deleteCourseName = indexToEdit.nextSibling;

        deletePopup.classList.remove("hidden");

        if (!isOkDeleteClicked) {
            okDelete.addEventListener("click", async () => {
                isOkDeleteClicked = true;

                deletePopup.classList.add("hidden");

                await deleteCourseFetch(deleteCourseName.innerHTML);
            });
        }

        if (!isCancelDeleteBtnClicked) {
            cancelDelete.addEventListener("click", () => {
                isCancelBtnClicked = true;
                deletePopup.classList.add("hidden");
            });
        }
    }
});


/**
 * 
 * @param {String} prevCourseName
 * @param {String} editCourseName 
 * @param {String} editCreditHours 
 * @param {String} editGrade 
 * @returns 
 */
async function editCourseFetch(prevCourseName, editCourseName, editCreditHours, editGrade) {
    const response = await fetch('http:localhost:3003/courses/', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prevCourseName, editCourseName, editCreditHours, editGrade }),
    });

    if (response.ok) {
        reload();
        displaySuccessMessage("Course Edited Successfully. ")
    } else {
        displayErrorMessage(`Failed to edit the selected course. `)
        return;
    }
}

/**
 * 
 * @param {String} deleteCourseName 
 * @returns void
 * deletes course from course in the user grades.
 */
async function deleteCourseFetch(deleteCourseName) {
    const response = await fetch('http:localhost:3003/courses', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deleteCourseName }),
    });

    if (response.ok) {
        reload();
        displaySuccessMessage("Course Deleted Successfully. ")
    } else {
        displayErrorMessage(`Failed to delete the selected course. `)
        return;
    }
}


// add course button 
addCourseBtn.addEventListener('click', async function () {
    const yearSelected = currSelected()['0'];
    const semSelected = currSelected()['1'];

    if (creditHours.value == "", courseName.value == "", courseGrade.value == "") {
        return false;
    }

    await addCourseFetch(courseName.value, courseGrade.value, creditHours.value, yearSelected, semSelected);
})

async function addCourseFetch(courseName, courseGrade, creditHours, year, semester) {
    const response = await fetch('http:localhost:3003/courses/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseName, courseGrade, creditHours, year, semester }),
    });

    if (response.ok) {
        reload();
        displaySuccessMessage("Course added successfully. ")
    } else {
        displayErrorMessage(`Failed to add course.`)
        return;
    }
}



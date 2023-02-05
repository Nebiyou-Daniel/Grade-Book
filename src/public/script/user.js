

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
const username = document.getElementById('userName');
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


const editButton = document.createElement('img')
editButton.classList.add('edit-btn', 'cursor');
editButton.setAttribute('src', "images/edit.png");

const deleteButton = document.createElement('img')
deleteButton.classList.add('delete-btn', 'cursor');
deleteButton.setAttribute('src', "images/delete.png");

const token = localStorage.getItem('token');

// on startup
getName();
reload();

form.addEventListener('submit', function (event) {
    event.preventDefault();
})

let yearData = {
    '01': {
        courses: [],
        gpa: 0
    },
    '02': {
        courses: [],
        gpa: 0
    },
    '11': {
        courses: [],
        gpa: 0
    },
    '12': {
        courses: [],
        gpa: 0
    },
    '21': {
        courses: [],
        gpa: 0
    },
    '22': {
        courses: [],
        gpa: 0
    },
    '31': {
        courses: [],
        gpa: 0
    },
    '32': {
        courses: [],
        gpa: 0
    },
    '41': {
        courses: [],
        gpa: 0
    },
    '42': {
        courses: [],
        gpa: 0
    },
    '51': {
        courses: [],
        gpa: 0
    },
    '52': {
        courses: [],
        gpa: 0
    }
}

async function reload() {
    // fetch grades
    const response = await fetch('getgrades', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ userName, email, password, universityName, studyLevel }),
    });
    const data = await response.json();

    if (data.success) {
        yearData = data.grades;
        cgpa.innerHTML = data.cgpa;

    } else {
        console.log("unable to fetch data");
        return;
    }
    updateTable();
}



// fetchName
async function getName() {

    const response = await fetch('https://reqres.in/api/user/2', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ userName, email, password, universityName, studyLevel }),
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
        userName.innerHTML = data.data.name;
    } else {
        console.log("unable to fetch userName");
        return;
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


function updateTable() {
    // check which year and semester is checked
    let yearSem = currSelected()[0] + currSelected()[1];

    // render table by values at the yearData
    tbody.innerHTML = '';

    let rowsData = yearData[yearSem].courses;

    if (rowsData.length === 0) {
        tbody.innerHTML = "<i>EMPTY: insert data</i>";
        return;
    }
    // here goes nothing
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
            // console.log(1);
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
    semesterGpa.innerText = yearData[yearSem].gpa;
}


// edit grade

const editPopup = document.querySelector("#popup-background");
const deletePopup = document.querySelector("#delete-popup");
const okEdit = document.querySelector("#ok-edit");
const cancelBtn = document.querySelector("#cancel-edit");
const okDelete = document.querySelector("#ok-delete");
const cancelDelete = document.querySelector("#cancel-delete");

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
            okEdit.addEventListener("click", () => {
                isOkEditClicked = true;

                editCourseFetch(prevCourseName, editCourseName.value, editCreditHours.value, editGrade.value)
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
            okDelete.addEventListener("click", () => {
                isOkDeleteClicked = true;

                deletePopup.classList.add("hidden");
                deleteCourseFetch(deleteCourseName);
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


async function editCourseFetch(prevCourseName, editCourseName, editCreditHours, editGrade) {
    const response = await fetch('editcourseapi', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prevCourseName, editCourseName, editCreditHours, editGrade }),
    });
    const data = await response.json();

    if (data.success) {
        reload();

    } else {
        console.log("unable to edit data");
        return;
    }
}

async function deleteCourseFetch(deleteCourseName) {
    const response = await fetch('editcourseapi', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deleteCourseName }),
    });
    const data = await response.json();

    if (data.success) {
        reload();
    } else {
        console.log("unable to delete data");
        return;
    }
}


// addcourse
addCourseBtn.addEventListener('click', function () {
    const yearSelected = currSelected()['0'];
    const semSelected = currSelected()['1'];
    
    if (creditHours.value=="", courseName.value=="", courseGrade.value == ""){
        return false;
    }
    if (yearSelected == 0) {
        console.log('select appropriate year');
    } else {
        addCourseFetch(courseName.value, courseGrade.value, creditHours.value, yearSelected, semSelected);
    }
})

async function addCourseFetch (courseName, courseGrade, creditHours, year, semester) {
    const response = await fetch('editcourseapi', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseName, courseGrade, creditHours, year, semester}),
    });
    const data = await response.json();

    if (data.success) {
        reload();
    } else {
        console.log("unable to add data");
        return;
    }
}



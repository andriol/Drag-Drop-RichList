const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];
const check = document.querySelector(".check-btn");
const list = document.getElementById("draggable-list");

let dragStartIndex;
const itemsList = [];

richList();
check.addEventListener("click", checkOrder);

// display the array's objects in a random order
function richList() {
  richestPeople
    .map((person) => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((person) => person.value)
    .forEach(function (person, index) {
      const element = document.createElement("li");
      const attribute = document.createAttribute("data-index");
      attribute.value = index;
      element.setAttributeNode(attribute);
      element.innerHTML = ` <span class="number">${index}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      itemsList.push(element);
      list.appendChild(element);
    });
  addEventListener();
}
// iterate over li and the person's name
function addEventListener() {
  const draggable = document.querySelectorAll(".draggable");
  const draggableList = document.querySelectorAll(".draggable-list li");

  draggable.forEach(function (item) {
    item.addEventListener("dragstart", dragStart);
  });

  draggableList.forEach(function (item) {
    item.addEventListener("dragover", dragOver);

    item.addEventListener("drop", dragDrop);
  });
}
function dragStart(e) {
  const div = e.currentTarget;
  dragStartIndex = +div.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  const div = e.currentTarget;
  const dragEndIndex = +div.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
}
// we swap  the person's position in the array
function swapItems(indexOne, IndexTwo) {
  const itemOne = itemsList[indexOne].querySelector(".draggable");
  const itemTwo = itemsList[IndexTwo].querySelector(".draggable");

  itemsList[indexOne].appendChild(itemTwo);
  itemsList[IndexTwo].appendChild(itemOne);
}
// checking if they are in the right order or not
function checkOrder() {
  itemsList.forEach(function (list, index) {
    const person = list.querySelector(".draggable").innerText;

    if (person !== richestPeople[index]) {
      list.classList.add("wrong");
    } else {
      list.classList.remove("wrong");
      list.classList.add("right");
    }
  });
}

const list = document.getElementById("active-list");
const userId = document.getElementById("user-id");
const selectExercise = document.getElementById("exercise-select");
const fieldSets = document.getElementById("sets-field");
const fieldReps = document.getElementById("reps-field");
const fieldWeight = document.getElementById("weight-field");
const fieldRest = document.getElementById("rest-field");
const fieldEffort = document.getElementById("effort-field");

const content = [];

async function newFormHandler(event) {
  event.preventDefault();

  const user_id = userId.value;

  const response = await fetch(`/api/workout`, {
    method: "POST",
    body: JSON.stringify({
      //   double check naming is correct
      user_id,
      // content of workout
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}


function addEntry(event) {
  event.preventDefault();

  let lastIndex = list.lastChild ? list.lastChild.dataset.index : 0;

  const newItem = document.createElement("li");

  newItem.textContent = `${lastIndex++} ${selectExercise.options[selectExercise.selectedIndex].text}: ${fieldSets.value} sets/${fieldReps.value} reps, ${fieldWeight.value}, ${fieldRest.value} rest, ${fieldEffort.value} effort`;
  newItem.dataset.index = lastIndex;

  const exerciseId = selectExercise.options[selectExercise.selectedIndex].value;

  content.push({ 
    exercise_id: exerciseId,
    set_count: fieldSets.value,
    rep_count: fieldReps.value,
    weight: fieldWeight.value,
    rest: fieldRest.value,
    effort: fieldEffort.value
  });
  console.log(content);

  list.appendChild(newItem);
}

document.getElementById("add-workout-form").addEventListener("submit", newFormHandler);
document.getElementById("add-entry").addEventListener("click", addEntry);
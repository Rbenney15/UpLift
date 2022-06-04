const list = document.getElementById("active-list");
const userId = document.getElementById("user-id");
const selectExercise = document.getElementById("exercise-select");
const fieldSets = document.getElementById("sets-field");
const fieldReps = document.getElementById("reps-field");
const fieldWeight = document.getElementById("weight-field");
const fieldRest = document.getElementById("rest-field");
const fieldEffort = document.getElementById("effort-field");

const workoutContent = [];

async function newFormHandler(event) {
  event.preventDefault();

  const user_id = userId.value;

  filteredContent = workoutContent.filter(entry => entry.li_add);

  const response = await fetch(`/api/workout`, {
    method: "POST",
    body: JSON.stringify({
      //   double check naming is correct
      user_id,
      // content of workout
      content: filteredContent,
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

  const lastChild = list.lastChild;
  const newIndex = lastChild ? +lastChild.getAttribute("data-index") + 1 : 0;

  const newItem = document.createElement("li");
  newItem.dataset.index = newIndex;
  newItem.dataset.add = true;

  const entryContent = {
    sets: fieldSets.value,
    reps: fieldReps.value,
    weight: fieldWeight.value,
    rest: fieldRest.value,
    effort: fieldEffort.value
  };

  newItem.innerHTML = `<a href="#" onclick="deleteEntry(parentElement)" style="text-decoration: none; color: light-gray" aria-label="Remove exercise from new workout">×</a> ${selectExercise.options[selectExercise.selectedIndex].text}: ${formatEntry(entryContent)}`;

  const exerciseId = selectExercise.options[selectExercise.selectedIndex].value;

  workoutContent.push({ 
    li_add: true,
    exercise_id: exerciseId,
    set_count: fieldSets.value,
    rep_count: fieldReps.value,
    weight: fieldWeight.value,
    rest: fieldRest.value,
    effort: fieldEffort.value
  });
  
  list.appendChild(newItem);
}

function deleteEntry(element) {
  workoutContent[element.dataset.index].li_add = false;
  element.remove();
}

const formatEntry = (content) => {
  const sets = content.sets? `${content.sets} sets` : '';
  const reps = content.reps? `${content.reps} reps` : '';
  const setrep = sets || reps? [sets, reps].filter(Boolean).join(', ') : '';
  const rest = content.rest? `rest for ${content.rest}` : '';

  const entry = [setrep, content.weight, rest, content.effort].filter(Boolean).join(', ');
  return entry;
};

document.getElementById("add-workout-form").addEventListener("submit", newFormHandler);
document.getElementById("add-entry").addEventListener("click", addEntry);
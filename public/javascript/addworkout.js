const list = document.getElementById("active-list");
const selectExercise = document.getElementById("exercise-select");
const fieldSets = document.getElementById("sets-field");
const fieldReps = document.getElementById("reps-field");
const fieldWeight = document.getElementById("weight-field");
const fieldRest = document.getElementById("rest-field");
const fieldEffort = document.getElementById("effort-field");

async function newFormHandler(event) {
  event.preventDefault();
  //   double check naming is correct (correct paths)
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/posts`, {
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
    // make sure path is correct
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}


function addEntry(event) {
  event.preventDefault();

  let lastIndex = list.lastChild ? list.lastChild.dataset.index : 0;

  const newItem = document.createElement("li");

  const content = {
    sets: fieldSets.value,
    reps: fieldReps.value,
    weight: fieldWeight.value,
    rest: fieldRest.value,
    effort: fieldEffort.value
  };

  // newItem.textContent = `${lastIndex++} ${selectExercise.options[selectExercise.selectedIndex].text}: ${fieldSets.value} sets/${fieldReps.value} reps, ${fieldWeight.value}, ${fieldRest.value} rest, ${fieldEffort.value} effort`;
  newItem.textContent = `${selectExercise.options[selectExercise.selectedIndex].text}: ${formatEntry(content)}`;
  newItem.dataset.index = lastIndex++;

  list.appendChild(newItem);
}

const formatEntry = (content) => {
  const sets = content.sets? `${content.sets} sets` : '';
  const reps = content.reps? `${content.reps} reps` : '';
  const setrep = sets || reps? [sets, reps].filter(Boolean).join('/') : '';
  const rest = content.rest? `rest for ${content.rest}` : '';

  const entry = [setrep, content.weight, rest, content.effort].filter(Boolean).join(', ');
  return entry;
};

document.getElementById("add-workout-form").addEventListener("submit", newFormHandler);
document.getElementById("add-entry").addEventListener("click", addEntry);
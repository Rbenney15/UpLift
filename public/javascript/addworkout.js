async function newFormHandler(event) {
    event.preventDefault();
//   double check naming is correct (correct paths)
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        //   double check naming is correct
        title,
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
  
  document.querySelector("#new-post-form").addEventListener("submit", newFormHandler);  

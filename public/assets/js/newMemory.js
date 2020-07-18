$(document).ready(function () {
  const newMemoryForm = $("#saveNewMemories");
  const title = $("#title");
  const date = $("#date");
  const description = $("#description");
  const location = $("#location");
  const rating = $("#rating");
  const category = $("#category");
  // const url = $("#url");

  newMemoryForm.on("click", function (event) {
    // let eventId;
    // // Sets a flag for whether or not we're updating a post to be false initially
    // let updating = false;
    event.preventDefault();
    let ratingStars = $("#rating input[name='star']:checked");

    console.log(ratingStars);
    const newEventData = {
      title: title.val().trim(),
      date: date.val().trim(),
      description: description.val().trim(),
      location: location.val().trim(),
      category: category.val().trim(),
      rating: ratingStars.val(),
    };
    console.log(newEventData);
    // If we're updating a memory run updateMemory to update a memory
    // Otherwise run submitmemory to create a whole new event
    // if (updating) {
    //   newEventData.id = eventId;
    //   updateEvent(newEventData);
    // } else {
    //   submitNewMemory(newEventData);
    // }
    submitNewMemory(newEventData);

    title.val("");
    date.val("");
    description.val("");
    location.val("");
    category.val("");
    rating.val("");
  });

  function submitNewMemory(newEvent) {
    $.post("/api/newMemory", newEvent)
      .then(function (data) {
        window.location.href = "/memories";
      })
      .catch(function (err) {
        throw err;
      });
  }

  // Update a given post, bring user to the blog page when done
  function updateMemory(memory) {
    $.ajax({
      method: "PUT",
      url: "/api/memories",
      data: post,
    }).then(function () {
      window.location.href = "/memories";
    });
  }
});

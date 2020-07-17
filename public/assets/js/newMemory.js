$(document).ready(function () {
  const newMemoryForm = $("#newMemoryForm");
  const title = $("#title");
  const date = $("#date");
  const description = $("#description");
  const location = $("#location");
  const rating = $("#rating");
  // const category = $("#category");
  // const url = $("#url");

  newMemoryForm.on("submit", function (event) {
    // let eventId;
    // // Sets a flag for whether or not we're updating a post to be false initially
    // let updating = false;
    event.preventDefault();
    const newEventData = {
      title: title.val().trim(),
      date: date.val().trim(),
      description: description.val().trim(),
      location: location.val().trim(),
      rating: rating.val().trim(),
    };
    console.log(newEventData);
    // If we're updating a memory run updateMemory to update a memory
    // Otherwise run submitmemory to create a whole new event
    if (updating) {
      newEventData.id = eventId;
      updateEvent(newEventData);
    } else {
      submitNewMemory(newEventData);
    }

    title.val("");
    date.val("");
    description.val("");
    location.val("");
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

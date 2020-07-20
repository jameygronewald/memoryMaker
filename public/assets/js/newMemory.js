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
    // // Sets a flag for whether or not we're updating a post to be false initially
    // let updating = false;
    event.preventDefault();
    let ratingStars = $("#rating input[name='star']:checked");

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
  });

  function submitNewMemory(newEvent) {
    const formData = new FormData();

    Object.keys(newEvent).forEach(function (field) {
      const value = newEvent[field];
      formData.append(field, value);
    });

    $.each($("input[type='file']")[0].files, function (i, file) {
      formData.append("file[]", file);
    });

    // $.ajax({
    //   type: "POST",
    //   url: "/api/newMemory",
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   data: formData,
    //   success: function (result) {
    //     window.location.href = "/memories";
    //   },
    //   error: function (err) {
    //     // throw err;
    //     alert("Please, make sure to fill out each field and choose rating for your memories!");
    //   },
    // });
    $.ajax({
      type: "POST",
      url: "/api/newMemory",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
    })
      .then(res => {
        window.location.replace(`/memories/${res.UserUsername}`);
      })
      .catch(function (err) {
        alert("Please, make sure to fill out each field with at least 3 characters and choose rating for your memories!");
  });
  }

  // Update a given event, bring user to the blog page when done
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

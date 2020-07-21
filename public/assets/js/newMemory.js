$(document).ready(function () {
  const newMemoryForm = $("#saveNewMemories");
  const title = $("#title");
  const date = $("#date");
  const description = $("#description");
  const location = $("#location");
  const rating = $("#rating");
  const category = $("#category");

  newMemoryForm.on("click", (event) => {
    event.preventDefault();
    let ratingStars = $("#rating input[name='star']:checked");
    const memoryId = event.target.getAttribute("data-id");
    const newEventData = {
      title: title.val().trim(),
      date: date.val().trim(),
      description: description.val().trim(),
      location: location.val().trim(),
      category: category.val().trim(),
      rating: ratingStars.val(),
    };
    // If we're updating a memory, memoryId will have a value and we will run updateMemory to update a memory
    // Otherwise run submitMemory to create a whole new event
    if (!memoryId) {
      submitNewMemory(newEventData);
    } else {
      updateMemory(newEventData);
    }

    title.val("");
    date.val("");
    description.val("");
    location.val("");
    category.val("");
  });

  const submitNewMemory = (newEvent) => {
    const formData = new FormData();

    Object.keys(newEvent).forEach((field) => {
      const value = newEvent[field];
      formData.append(field, value);
    });

    $.each($("input[type='file']")[0].files, (i, file) => {
      formData.append("file[]", file);
    });

    $.ajax({
      type: "POST",
      url: "/api/newMemory",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
    })
      .then((res) => {
        toastr.success("Memory created!");
        setTimeout(() => window.location.replace(`/memories`), 2000);
      })
      .catch(() => {
        toastr.error(
          "Please, make sure to fill out each field with at least 3 characters and choose rating for your memories!"
        );
      });
  };
  // Update a given event, bring user to the blog page when done
  const updateMemory = (memory) => {
    const memoryId = event.target.getAttribute("data-id");
    $.ajax({
      method: "PUT",
      url: "/api/newMemory/" + memoryId,
      data: memory,
    }).then(() => {
      toastr.success("Memory has been updated");
      setTimeout(() => window.location.replace("/memories"), 2000);
    }).catch(() => {
      toastr.error(
        "Please, make sure to fill out each field with at least 3 characters and choose ratingto update your memories!"
      );
    });
  };
});

$(document).ready(function () {
  const idNum = window.location.pathname.split("/")[3];
  const update = $("#update-memory");
  const del = $("#delete-memory");


  function updateMemory(par, eventId) {
    $.ajax({
      method: "GET",
      url: "/newMemory/" + idNum,
      data: par,
    }).then(function () {
      window.location.href = "/newMemory/" + idNum;
    });
  }
  update.on("click", (event) => {
    event.preventDefault();
    const memoryId = event.target.getAttribute("data-id");

    console.log(typeof memoryId);
    const updMemory = {
      id: parseInt(memoryId),
      title: $("#title").text(),
      date: $("#date").text(),
      description: $("#description").text(),
      rating: $("#rating").text(),
      location: $("#location").text(),
      category: $("#category").text(),
      image: $("#image").text(),
    };

    updateMemory(updMemory, updMemory.id);
  });

  function delMemory(event) {
    const memoryId = event.target.getAttribute("data-id");
    $.ajax({
      method: "DELETE",
      url: "/memories/id/" + memoryId,
    }).then(function () {
      alert("deleted");
    window.location.href = "/memories";
    });
  }
  del.on("click", (event) => {
    event.preventDefault();
    const memoryId = event.target.getAttribute("data-id");
    delMemory(event);
  });
});

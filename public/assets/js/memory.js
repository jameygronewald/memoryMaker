$(document).ready(function () {
  const idNum = window.location.pathname.split("/")[3];
  const update = $("#update-memory");
  const del = $("#delete-memory");

  function updateMemory(par) {
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
    var updMemory = {
      id: parseInt(memoryId),
      title: $("#title").text(),
      date: $("#date").text(),
      description: $("#description").text(),
      rating: $("#rating").text(),
      location: $("#location").text(),
      category: $("#category").text(),
      image: $("#image").text(),
    };
    updateMemory(updMemory);
  });

  function delMemory() {
    const memoryId = event.target.getAttribute("data-id");

    $.ajax({
      method: "DELETE",
      url: "/api/memories/id/" + memoryId,
    }).then(function () {
      alert("deleted");
    });
  }
  del.on("click", (event) => {
    event.preventDefault();
    const memoryId = event.target.getAttribute("data-id");
    // window.location.href = "/memories";
    delMemory();
  });
});

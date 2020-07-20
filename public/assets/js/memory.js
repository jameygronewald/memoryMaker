$(document).ready(function () {
    const idNum = window.location.pathname.split("/")[3];
  const update = $("#update-memory");
  function updateMemory(par) {

    $.ajax({
      method: "PUT",
      url: "/api/newMemory/" + idNum,
      data: par,
    }).then(function () {
      window.location.href = "/newMemory/"+ idNum;
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
      image: $("#image").text(),
    };
    updateMemory(updMemory);
  });
});

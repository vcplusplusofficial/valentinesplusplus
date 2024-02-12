document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.querySelector(".backwards");
  backButton.addEventListener("click", function () {
    // Navigate back to the homepage (index.html)
    window.location.href = "/";
  });

  // Access the script tag by its id
  const scriptTag = document.getElementById("rowData");
  console.log("this is scriptag ", scriptTag)
  // Retrieve the content of the script tag
  const rowDataString = scriptTag.textContent;

  // Parse the content as JSON
  const rowData = JSON.parse(rowDataString);

  // Now you can use the rowData object
  console.log(rowData);
});


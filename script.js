let rows;

// Function to show or hide the rows based on search input
function searchName(inputValue) {
  rows.each(function () {
    var firstName = $(this).find(".column2").text().toLowerCase();
    if (firstName.indexOf(inputValue.toLowerCase()) !== -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

$(document).ready(function () {
  //API Call using Promise and then blocks
  function getData() {
    return new Promise(function (resolve, reject) {
      $.get(
        "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
        function (userData) {
          resolve(userData).fail(function (error) {
            reject(error);
          });
        }
      );
    });
  }

  getData()
    .then(function (userData) {
      rows = $(".data-row");

      // Loop through each row and enter data dynamically into rows
      let i;
      for (i = 0; i < rows.length; i++) {
        let row = rows[i];
        let rowData = userData[i];

        $(row).find(".column1").text(rowData.id);
        $(row).find(".column2").text(rowData.firstName);
        $(row).find(".column3").text(rowData.lastName);
        $(row).find(".column4").text(rowData.email);
        $(row).find(".column5").text(rowData.phone);
      }

      // On input Event listener for the search box input
      $("#search-box").on("input", function () {
        var inputValue = $(this).val();
        searchName(inputValue);
      });

      // Selecting HYML elements for displaying user data in right sectiion
      var userName = $("#info-content div:nth-child(1)");
      var description = $("#info-content div:nth-child(2)");
      var address = $("#info-content div:nth-child(3)");
      var city = $("#info-content div:nth-child(4)");
      var state = $("#info-content div:nth-child(5)");
      var zip = $("#info-content div:nth-child(6)");

      // Loop through each row to add onClick event
      for (let j = 0; j < rows.length; j++) {
        let descriptionData = userData[j];

        $(rows[j]).click(function () {
          rows.removeClass("active");
          $(rows[j]).addClass("active");
          userName.text(
            `User Selected: ${descriptionData.firstName} ${descriptionData.lastName}`
          );
          description.find("textarea").val(`${descriptionData.description}`);
          address.text(`Address: ${descriptionData.address.streetAddress}`);
          city.text(`City: ${descriptionData.address.city}`);
          state.text(`State: ${descriptionData.address.state}`);
          zip.text(`Zip: ${descriptionData.address.zip}`);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

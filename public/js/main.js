// main.js
document.addEventListener("DOMContentLoaded", function () {
    // Chọn tất cả các ô input trong form
    const inputs = document.querySelectorAll("form input");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (input.value.trim() === "") {
          alert("Trường này không được bỏ trống");
        }
      });
    });
  });
  
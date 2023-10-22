Caman.Filter.register("blackAndWhite", function (grey) {
  this.greyscale();
  this.sepia(10);
  this.exposure(10);
  this.contrast(15);
  return this.vignette("60%", 35);
});

Caman.Filter.register("bright", function (grey) {
  this.brightness(7);
  this.exposure(5);
  this.contrast(16);
  return this.vibrance(7);
});

(function () {
  var busy, caman, filters, render;

  caman = null;
  filters = {};
  busy = false;

  render = function () {
    if (busy) {
      return;
    }
    busy = true;
    caman.revert(false);
    for (var filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        var value = parseFloat(filters[filter], 10);
        if (value === 0) {
          continue;
        }
        caman[filter](value);
      }
    }
    caman.render(function () {
      busy = false;
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("processedImageElement")) {
      return;
    }
    caman = Caman('#processedImageElement');
    console.log("Caman initialized.");
    var filterInputs = document.querySelectorAll('.FilterSetting input');
    filterInputs.forEach(function (input) {
      var filter = input.getAttribute('data-filter');
      filters[filter] = input.value;
      input.addEventListener('input', function () {
        var filter = this.getAttribute('data-filter');
        var value = this.value;
        filters[filter] = value;
        this.nextElementSibling.innerHTML = value;
        render();
      });
    });
  });
})();

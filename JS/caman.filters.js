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
    var presetCaman, presetBusy;
  
    presetCaman = null;
    presetBusy = false;
  
    var renderPreset = function (preset) {
      if (presetBusy) {
        return;
      }

      let x = document.getElementById("imageContainer");
      if (x.style.display === "none") {
        alert("Please select an image first.");
        return;
      }

      var presetFilters = document.querySelectorAll("#PresetFilters a");
      for (var i = 0; i < presetFilters.length; i++) {
        presetFilters[i].classList.remove('Active');
      }
      var $filter = document.querySelector("a[data-preset='" + preset + "']");
      var name = $filter.innerHTML;
      $filter.classList.add('Active');
      $filter.innerHTML = 'Rendering...';
      presetBusy = true;
      presetCaman.revert(false);
      presetCaman[preset]();
      presetCaman.render(function () {
        $filter.innerHTML = name;
        presetBusy = false;
      });
    };
  
    document.addEventListener("DOMContentLoaded", function () {
      presetCaman = Caman('#processedImageElement');
  
      var presetFilters = document.getElementById('PresetFilters');
      presetFilters.addEventListener('click', function (e) {
        if (e.target && e.target.matches('a')) {
          renderPreset(e.target.getAttribute('data-preset'));
        }
      });
    });

  })();

function core() {
  /* Header */
  const gridContainer = document.querySelector(".header-container");
  const gridHeaderContainer = document.getElementById("header");
  const gridTitleContainer = gridHeaderContainer
    ? gridHeaderContainer.querySelector("h1")
    : null;

  // Generate grid items
  function buildGrid() {
    // Remove previous items
    document
      .querySelectorAll(".header-container-item")
      .forEach((n) => n.remove());

    // Calculate number of columns and rows from container size (cell = 50px + 5px gap = 55px)
    const cellSize = 55;

    const rect = gridContainer.getBoundingClientRect();
    let squaresColumns = Math.max(1, Math.ceil(rect.width / cellSize));
    let squaresRows = Math.max(1, Math.ceil(rect.height / cellSize));

    // Get title rectangle if present
    let rectTitle = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
    if (gridTitleContainer) {
      rectTitle = gridTitleContainer.getBoundingClientRect();
    }

    // Convert title rect to grid-relative coordinates
    const titleRel = {
      left: rectTitle.left - rect.left,
      top: rectTitle.top - rect.top,
      right: rectTitle.right - rect.left,
      bottom: rectTitle.bottom - rect.top,
    };

    // Clamp the title rect to the grid bounds
    titleRel.left = Math.max(0, Math.min(rect.width, titleRel.left));
    titleRel.top = Math.max(0, Math.min(rect.height, titleRel.top));
    titleRel.right = Math.max(0, Math.min(rect.width, titleRel.right));
    titleRel.bottom = Math.max(0, Math.min(rect.height, titleRel.bottom));

    // Align title to the cell grid (round top to the next cell boundary and set height to one cell)
    if (typeof cellSize === 'number' && cellSize > 0) {
      titleRel.top = Math.min(rect.height, Math.ceil(titleRel.top / cellSize) * cellSize);
      titleRel.bottom = Math.min(rect.height, titleRel.top + cellSize);
    }

    // Generate grid items
    for (let i = 0; i < squaresColumns * squaresRows; i++) {
      const currentRow = Math.floor(i / squaresColumns);
      const currentCol = i % squaresColumns;

      const cellLeft = currentCol * cellSize;
      const cellTop = currentRow * cellSize;
      const cellRight = cellLeft + cellSize;
      const cellBottom = cellTop + cellSize;

      // Skip cells that overlap the title area
      const titleHasSize = titleRel && titleRel.right > titleRel.left && titleRel.bottom > titleRel.top;
      if (titleHasSize) {
        const noOverlap =
          cellRight <= titleRel.left ||
          cellLeft >= titleRel.right ||
          cellBottom <= titleRel.top ||
          cellTop >= titleRel.bottom;

        if (!noOverlap) continue;
      }

      // Render a tile with 70% probability
      if (Math.random() < 0.7) {
        const div = document.createElement("div");
        div.classList.add("header-container-item");
        div.style.left = `${currentCol * cellSize}px`;
        div.style.top = `${currentRow * cellSize}px`;
        gridContainer.appendChild(div);
      }
    }

    // Render the header above grid items
    const gridHeaderContainer = document.getElementById("header");
    if (gridHeaderContainer) {
      gridContainer.appendChild(gridHeaderContainer);
    }
  }

  // Initial build
  buildGrid();

  let isMouseOverGrid = false;
  gridContainer.addEventListener("mouseenter", () => isMouseOverGrid = true);
  gridContainer.addEventListener("mouseleave", () => isMouseOverGrid = false);
  setInterval(() => !isMouseOverGrid && buildGrid(), 1500);

  // Rebuild on resize so the grid matches the new container size
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(buildGrid, 150);
  });

  // Apply a gravity-like effect to an item
  function applyGravity(item) {
    let posY = parseFloat(item.style.top); // Current top position
    let velocityY = 0; // Initial falling speed
    let rotation = 0; // Initial rotation
    const gravity = 0.5; // Simulated gravity
    const xDirection = (Math.random() - 0.5) * 4; // Random horizontal shift

    function fall() {
      velocityY += gravity; // Increase the velocity over time
      posY += velocityY; // Move the square down
      rotation += 5; // Rotate the square while falling

      item.style.top = `${posY}px`;
      item.style.left = `${parseFloat(item.style.left) + xDirection}px`;
      item.style.transform = `rotate(${rotation}deg)`;

      // Stop the animation once the square moves outside the screen
      if (posY < window.innerHeight) {
        requestAnimationFrame(fall);
      } else {
        // Remove the item once it falls out of view
        item.remove();
      }
    }

    requestAnimationFrame(fall);
  }

  // Add mousemove listener to the grid container
  gridContainer.addEventListener("mousemove", (event) => {
    const items = document.querySelectorAll(".header-container-item");

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();

      // Check if the mouse is near the square
      if (
        Math.abs(event.clientX - rect.left - rect.width / 2) < 30 &&
        Math.abs(event.clientY - rect.top - rect.height / 2) < 30
      ) {
        applyGravity(item);
      }
    });
  });

  /* Wrapper */
  var wrapper = document.getElementById("wrapper");
  var wrapperRect = wrapper.getBoundingClientRect();

  window.addEventListener(
    "resize",
    function (event) {
      wrapperRect = wrapper.getBoundingClientRect();
    },
    true
  );

  wrapper.style.cursor = "pointer";
  wrapper.onclick = function (event) {
    var windowObjectReference;
    var windowFeatures =
      "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes";

    if (event.clientX < wrapperRect.width / 2) {
      windowObjectReference = window.open(
        "https://hitbox.it",
        "Hitbox",
        windowFeatures
      );
    } else {
      windowObjectReference = window.open(
        "https://hitbox.it/summer-edition-2018",
        "Event",
        windowFeatures
      );
    }
  };

  /* Banner */
  var eventDate = new Date("2025-04-12").getTime();
  var eventClickable = false;

  var banner = document.getElementById("banner");
  var bannerTime = document.getElementById("call-to-action");
  var bannerInfo = document.getElementById("event-info");
  var bannerBottomBorderWidth = getComputedStyle(
    bannerTime,
    null
  ).getPropertyValue("border-bottom-width");

  var timerTick = setInterval(
    (function tick() {
      var now = new Date().getTime();
      var distance = eventDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the call-to-action text with the remaining time
      document.getElementById("call-to-action").innerHTML =
        "<h1>Next event in " +
        days +
        "d " +
        hours +
        "h " +
        minutes +
        "m " +
        seconds +
        "s " +
        "</h1>";

      // If the countdown is over
      if (distance < 0) {
        clearInterval(timerTick);
        banner.style.display = "none";
      }

      return tick;
    })(),
    1000
  );

  function showInfo() {
    banner.style.gridTemplateRows = "60px 40px";
    bannerTime.style.borderStyle = "none solid none solid";
    bannerTime.style.paddingBottom = bannerBottomBorderWidth;
    bannerInfo.style.display = "block";
  }

  function hideInfo() {
    banner.style.gridTemplateRows = "60px 0px";
    bannerTime.style.borderStyle = "none solid solid solid";
    bannerTime.style.paddingBottom = "0px";
    bannerInfo.style.display = "none";
  }

  if (eventClickable) {
    bannerTime.style.cursor = "pointer";
    bannerTime.onclick = function () {
      if (window.getComputedStyle(bannerInfo).display === "none") {
        showInfo();
      } else {
        hideInfo();
      }
    };
  } else {
    showInfo();
  }

  /* Discord */
  var discord = document.getElementById("discord");
  var discordText = discord.innerHTML;

  discord.style.cursor = "pointer";
  discord.onmouseover = function () {
    discord.innerHTML = "discord.iffclan.com";
  };
  discord.onmouseout = function () {
    discord.innerHTML = discordText;
  };
  discord.onclick = function () {
    var windowObjectReference;
    var windowFeatures =
      "menubar=yes, location=yes, resizable=yes, scrollbars=yes, status=yes";
    windowObjectReference = window.open(
      "http://discord.iffclan.com",
      "Discord",
      windowFeatures
    );
  };

  /* Events */
  var chronology = document.querySelectorAll("[class=chronology]");
  var boxList = document.getElementById("box-list");
  var list = document.querySelectorAll("[class=list]");

  var boxListMB = window
    .getComputedStyle(boxList, null)
    .getPropertyValue("margin-bottom");

  function listStatus(i) {
    for (var j = 0; j < list.length; j++) {
      if (i != j) {
        list[j].style.display = "none";
      } else {
        if (window.getComputedStyle(list[i]).display === "none") {
          boxList.style.marginBottom = "0px";
          list[i].style.display = "block";
        } else {
          boxList.style.marginBottom =
            (parseInt(boxListMB) * 2).toString() + "px";
          list[i].style.display = "none";
        }
        chronology[i].scrollIntoView();
      }
    }
  }

  for (var i = 0; i < chronology.length; i++) {
    chronology[i].style.cursor = "pointer";
  }

  chronology[0].onclick = function () {
    listStatus(0);
  };
  chronology[1].onclick = function () {
    listStatus(1);
  };
  chronology[2].onclick = function () {
    listStatus(2);
  };

  /* Times */
  var times = document.querySelectorAll("[class=time]");

  times.forEach((time) => {
    var date = new Date(time.innerHTML);
    var options = { year: "numeric", month: "long", day: "numeric" };
    var newTime = date.toLocaleDateString("en-UK", options);
    time.innerHTML = newTime;

    time.onmouseover = function () {
      newTime = date.toLocaleDateString("it-IT", options);
      time.innerHTML = newTime;
    };
    time.onmouseout = function () {
      newTime = date.toLocaleDateString("en-UK", options);
      time.innerHTML = newTime;
    };
  });
}

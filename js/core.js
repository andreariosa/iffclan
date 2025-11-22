function core() {
  /***************Header***************/
  const gridContainer = document.querySelector(".header-container");
  const gridHeaderContainer = document.getElementById("header");
  const gridTitleContainer = gridHeaderContainer
    ? gridHeaderContainer.querySelector("h1")
    : null;

  // Generate the grid items
  function buildGrid() {
    // Remove previous items
    document
      .querySelectorAll(".header-container-item")
      .forEach((n) => n.remove());

    // Calculate columns/rows from container size (cell = 50px + 5px gap = 55px)
    const cellSize = 55;

    const rect = gridContainer.getBoundingClientRect();
    let squaresColumns = Math.max(1, Math.ceil(rect.width / cellSize));
    let squaresRows = Math.max(1, Math.ceil(rect.height / cellSize));

    const rectTitle = gridTitleContainer.getBoundingClientRect();
    let squaresColumnsTitle =
      Math.max(1, Math.ceil(rectTitle.width / cellSize)) + 1;
    let squaresRowsTitle =
      Math.max(1, Math.ceil(rectTitle.height / cellSize)) - 1;

    // Generate the grid items
    for (let i = 0; i < squaresColumns * squaresRows; i++) {
      // Skip items that overlap the title
      if (
        i / squaresColumns >=
          Math.floor((squaresRows - squaresRowsTitle) / 2) &&
        i / squaresColumns < Math.floor((squaresRows + squaresRowsTitle) / 2) &&
        i % squaresColumns >=
          Math.floor((squaresColumns - squaresColumnsTitle) / 2) &&
        i % squaresColumns <
          Math.floor((squaresColumns + squaresColumnsTitle) / 2)
      ) {
        continue;
      }

      // Skip items that overlap the title
      if (
        i / squaresColumns >=
          Math.floor((squaresRows - squaresRowsTitle) / 2) &&
        i / squaresColumns < Math.floor((squaresRows + squaresRowsTitle) / 2) &&
        i % squaresColumns >=
          Math.floor((squaresColumns - squaresColumnsTitle) / 2) &&
        i % squaresColumns <
          Math.floor((squaresColumns + squaresColumnsTitle) / 2)
      ) {
        continue;
      }

      // 30% chance to keep a tile
      const keepProbability = 0.3;
      if (Math.random() < keepProbability) {
        continue;
      }

      const div = document.createElement("div");
      div.classList.add("header-container-item");
      // Set position in the grid
      div.style.left = `${(i % squaresColumns) * cellSize}px`;
      div.style.top = `${Math.floor(i / squaresColumns) * cellSize}px`;
      gridContainer.appendChild(div);
    }

    // Move the header element to the end of the container so it paints above the grid items
    const gridHeaderContainer = document.getElementById("header");
    if (gridHeaderContainer) {
      gridContainer.appendChild(gridHeaderContainer);
    }
  }

  // Initial build
  buildGrid();

  // Rebuild on resize so grid matches new resolution/container size
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(buildGrid, 150);
  });

  // Function to apply gravity-like effect
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

      // Stop the animation if the square moves outside the screen
      if (posY < window.innerHeight) {
        requestAnimationFrame(fall);
      } else {
        // Remove the item once it falls out of view
        item.remove();
      }
    }

    requestAnimationFrame(fall);
  }

  // Event listener for mousemove over the grid container
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

  /***************Wrapper***************/
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

  /***************Banner***************/
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

      // Output the result
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

      // If the count down is over
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

  /***************Discord***************/
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

  /***************Events***************/
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

  /***************Times***************/
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

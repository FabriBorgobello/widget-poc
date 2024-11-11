const BASE_URL = "https://fully-frontend-git-dev-fully.vercel.app";

(function () {
  // Retrieve settings from global configuration object or set defaults
  const settings = window.fullyAIWidgetSettings || {};
  const companyId = settings.companyId;
  const assistantId = settings.assistantId;
  const url = `${BASE_URL}/company/${companyId}/assistant/${assistantId}/chat?initialMode=typeMode`;
  const position = settings.position || "bottom-right"; // Default position of widget
  const delay = settings.delay || 0; // Delay before showing the button

  // Function to create and display the widget
  function loadWidget() {
    console.log("[Widget] - Loading FullyAI widget");
    if (window.fullyAIWidgetLoaded) return;
    window.fullyAIWidgetLoaded = true;

    // Hide the button after loading the widget
    const button = document.getElementById("fullyai-widget-button");
    if (button) button.style.display = "none";

    // Create the widget container
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "fullyai-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.width = "300px";
    widgetContainer.style.height = "400px";

    // Set the position of the widget based on configuration
    if (position === "bottom-right") {
      widgetContainer.style.bottom = "20px";
      widgetContainer.style.right = "20px";
    } else if (position === "bottom-left") {
      widgetContainer.style.bottom = "20px";
      widgetContainer.style.left = "20px";
    }

    // Create an iframe and set the source to the FullyAI URL
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.allow = `camera ${BASE_URL}; microphone ${BASE_URL}`;
    widgetContainer.appendChild(iframe);

    // Add the widget to the body of the host page
    document.body.appendChild(widgetContainer);

    console.log("[Widget] - FullyAI widget loaded successfully");
  }

  // Function to create and display the button
  function createButton() {
    const button = document.createElement("button");
    button.id = "fullyai-widget-button";
    button.innerText = "Open FullyAI";
    button.style.position = "fixed";

    // Set the position of the button based on configuration
    if (position === "bottom-right") {
      button.style.bottom = "20px";
      button.style.right = "20px";
    } else if (position === "bottom-left") {
      button.style.bottom = "20px";
      button.style.left = "20px";
    }

    // Add the click event listener to load the widget
    button.addEventListener("click", loadWidget);

    // Add the button to the body of the host page
    document.body.appendChild(button);
    console.log("[Widget] - FullyAI button added successfully");
  }

  // Show the button after a delay or immediately when the page loads
  if (delay > 0) {
    setTimeout(createButton, delay);
  } else {
    if (document.readyState === "complete") {
      createButton();
    } else {
      window.addEventListener("load", createButton);
    }
  }
})();

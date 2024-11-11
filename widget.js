(function () {
  // Retrieve settings from global configuration object or set defaults
  const settings = window.fullyAIWidgetSettings || {};
  const externalUrl = settings.url || "https://fullyai.com"; // FullyAI URL or specific page
  const position = settings.position || "bottom-right"; // Default position of widget
  const delay = settings.delay || 0; // Delay before loading the widget

  // Function to create and load the widget
  function loadWidget() {
    // Ensure the widget only loads once
    console.log("[Widget] - Loading FullyAI widget");
    if (window.fullyAIWidgetLoaded) return;
    window.fullyAIWidgetLoaded = true;

    // Create the widget container
    console.log("[Widget] - Creating widget container");
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "fullyai-widget-container";
    widgetContainer.style.position = "fixed";

    // Set the position of the widget based on configuration
    console.log("[Widget] - Setting widget position");
    if (position === "bottom-right") {
      widgetContainer.style.bottom = "20px";
      widgetContainer.style.right = "20px";
    } else if (position === "bottom-left") {
      widgetContainer.style.bottom = "20px";
      widgetContainer.style.left = "20px";
    } // Additional positions could be added similarly

    // Create an iframe and set the source to the FullyAI URL
    console.log("[Widget] - Creating iframe");
    const iframe = document.createElement("iframe");
    iframe.src = externalUrl;
    iframe.style.width = "100%"; // Set dimensions as required
    iframe.style.height = "100%";
    iframe.style.border = "none";
    widgetContainer.appendChild(iframe);

    // Add the widget to the body of the host page
    console.log("[Widget] - Appending widget to body");
    document.body.appendChild(widgetContainer);

    console.log("[Widget] - FullyAI widget loaded successfully");
  }

  // Load the widget after the specified delay or once the page loads
  if (delay > 0) {
    setTimeout(loadWidget, delay);
  } else {
    if (document.readyState === "complete") {
      loadWidget();
    } else {
      window.addEventListener("load", loadWidget);
    }
  }
})();
